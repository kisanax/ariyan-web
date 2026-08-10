import React, { useState } from "react";
import { useClient } from "sanity";
import { Card, Text, Button, Stack, Box, Inline, Code } from "@sanity/ui";
import * as XLSX from "xlsx";

export function ImportProductsTool() {
  const client = useClient({ apiVersion: "2024-01-01" });
  const [isLoading, setIsLoading] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [file, setFile] = useState<File | null>(null);

  const [isExporting, setIsExporting] = useState(false);

  const addLog = (msg: string) => setLogs((prev) => [...prev, msg]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleExport = async () => {
    setIsExporting(true);
    setLogs([]);
    addLog("Memulai proses Export data produk...");

    try {
      const query = `*[_type == "product"]{
        name, 
        shortDescription,
        "Kategori": category->name,
        "Brand": brand->name,
        "Principal": principal->name,
        "Gambar": gallery[0].asset->url
      }`;
      const products = await client.fetch(query);
      
      addLog(`Berhasil mengambil ${products.length} produk dari database.`);
      
      const exportData = products.map((p: any) => ({
        "Nama Produk": p.name || "",
        "Deskripsi": p.shortDescription || "",
        "Kategori": p.Kategori || "",
        "Brand": p.Brand || "",
        "Principal": p.Principal || "",
        "Gambar": p.Gambar || ""
      }));

      const worksheet = XLSX.utils.json_to_sheet(exportData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Produk");
      
      XLSX.writeFile(workbook, "Data-Produk-Ariyan.xlsx");
      addLog("Berhasil mengunduh file Data-Produk-Ariyan.xlsx");
      
    } catch (err: any) {
      addLog(`Error saat export: ${err.message}`);
    } finally {
      setIsExporting(false);
    }
  };

  const handleImport = async () => {
    if (!file) return;

    setIsLoading(true);
    setLogs([]);
    addLog(`Mulai membaca file: ${file.name}`);

    try {
      addLog("Mempersiapkan referensi Kategori, Brand, dan Principal...");
      const [categories, brands, principals] = await Promise.all([
        client.fetch('*[_type == "category"]{_id, name}'),
        client.fetch('*[_type == "brand"]{_id, name}'),
        client.fetch('*[_type == "principal"]{_id, name}')
      ]);

      const catMap = new Map(categories.filter((c:any) => c.name).map((c:any) => [c.name.toLowerCase(), c._id]));
      const brandMap = new Map(brands.filter((b:any) => b.name).map((b:any) => [b.name.toLowerCase(), b._id]));
      const princMap = new Map(principals.filter((p:any) => p.name).map((p:any) => [p.name.toLowerCase(), p._id]));

      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      
      const rows = XLSX.utils.sheet_to_json<any>(worksheet);
      addLog(`Berhasil membaca ${rows.length} baris dari Excel.`);

      let successCount = 0;
      let errorCount = 0;

      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        
        const name = row["Nama Produk"] || row["name"] || row["Name"] || row["NAMA PRODUK"];
        const shortDescription = row["Deskripsi"] || row["Deskripsi Singkat"] || row["description"] || "";
        const catName = row["Kategori"] || row["kategori"] || row["Category"] || "";
        const brandName = row["Brand"] || row["brand"] || "";
        const princName = row["Principal"] || row["principal"] || "";
        const imageUrl = row["Gambar"] || row["gambar"] || row["Image"] || row["Foto"] || "";

        if (!name) {
          addLog(`Baris ${i + 2}: Diabaikan (Nama Produk kosong)`);
          errorCount++;
          continue;
        }

        const slugString = name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, "");
          
        let imageAssetId = null;
        if (imageUrl && typeof imageUrl === 'string' && imageUrl.startsWith('http')) {
          try {
            const response = await fetch(imageUrl);
            if (!response.ok) throw new Error("Akses ditolak atau URL mati");
            const blob = await response.blob();
            const filename = imageUrl.split('/').pop()?.split('?')[0] || 'image.jpg';
            const asset = await client.assets.upload('image', blob, { filename });
            imageAssetId = asset._id;
          } catch (err: any) {
            addLog(`Baris ${i + 2}: Gagal unduh gambar (${err.message}) - Disimpan tanpa gambar.`);
          }
        }

        const doc: any = {
          _type: "product",
          name: name,
          slug: {
            _type: "slug",
            current: slugString,
          },
          shortDescription: shortDescription,
        };

        if (catName && catMap.has(catName.toLowerCase())) {
          doc.category = { _type: "reference", _ref: catMap.get(catName.toLowerCase()) };
        }
        if (brandName && brandMap.has(brandName.toLowerCase())) {
          doc.brand = { _type: "reference", _ref: brandMap.get(brandName.toLowerCase()) };
        }
        if (princName && princMap.has(princName.toLowerCase())) {
          doc.principal = { _type: "reference", _ref: princMap.get(princName.toLowerCase()) };
        }
        
        if (imageAssetId) {
          doc.gallery = [{
            _type: 'image',
            asset: { _type: 'reference', _ref: imageAssetId }
          }];
        }

        try {
          await client.create(doc);
          successCount++;
          if (successCount % 10 === 0) {
             addLog(`Progress: ${successCount} produk berhasil diimpor...`);
          }
        } catch (err: any) {
          addLog(`Baris ${i + 2}: Error saat menyimpan "${name}" - ${err.message}`);
          errorCount++;
        }
      }

      addLog(`SELESAI! Berhasil: ${successCount} | Gagal: ${errorCount}`);
    } catch (err: any) {
      addLog(`Error fatal: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card padding={4} sizing="border">
      <Stack space={5}>
        <Box>
          <Text size={4} weight="bold">Manajemen Data Produk (Excel)</Text>
          <Box marginTop={3}>
            <Text muted>
              Upload file .xlsx untuk memasukkan produk secara massal, atau unduh seluruh data produk Anda ke dalam format Excel.
            </Text>
          </Box>
        </Box>

        <Inline space={4}>
          <Card padding={4} radius={2} border style={{ flex: 1 }}>
            <Stack space={4}>
              <Text size={2} weight="bold">Import Data (Upload)</Text>
              <input 
                type="file" 
                accept=".xlsx, .xls" 
                onChange={handleFileChange}
                disabled={isLoading || isExporting}
              />
              <Box>
                <Button
                  text={isLoading ? "Sedang Mengimpor..." : "Mulai Import"}
                  tone="primary"
                  mode="default"
                  disabled={!file || isLoading || isExporting}
                  onClick={handleImport}
                />
              </Box>
            </Stack>
          </Card>

          <Card padding={4} radius={2} border style={{ flex: 1 }}>
            <Stack space={4}>
              <Text size={2} weight="bold">Export Data (Download)</Text>
              <Text size={1} muted>Unduh seluruh data produk saat ini menjadi file Excel (.xlsx).</Text>
              <Box>
                <Button
                  text={isExporting ? "Menyiapkan File..." : "Download Excel"}
                  tone="positive"
                  mode="default"
                  disabled={isLoading || isExporting}
                  onClick={handleExport}
                />
              </Box>
            </Stack>
          </Card>
        </Inline>

        {logs.length > 0 && (
          <Box marginTop={4}>
            <Text size={2} weight="bold">Log Proses:</Text>
            <Card padding={3} marginTop={2} radius={2} tone="transparent" border style={{ maxHeight: "300px", overflowY: "auto" }}>
              <Stack space={2}>
                {logs.map((log, index) => (
                  <Code key={index} size={1}>{log}</Code>
                ))}
              </Stack>
            </Card>
          </Box>
        )}
      </Stack>
    </Card>
  );
}
