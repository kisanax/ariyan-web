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

  const handleDownloadTemplate = () => {
    const templateData = [{
      "Nama Produk": "Contoh Alat Lab",
      "Deskripsi": "Deskripsi singkat mengenai produk ini.",
      "Kategori": "Laboratory",
      "Brand": "Mindray",
      "Principal": "PT Principal Indonesia",
      "Gambar": "https://example.com/image.jpg",
      "NIE": "AKL 1234567890",
      "TKDN": "45.50%",
      "Spesifikasi": "Dimensi: 10x20cm; Berat: 5kg; Daya: 220V",
      "Fitur": "Mudah digunakan; Layar sentuh; Hemat energi",
      "Aplikasi / Penggunaan": "Klinik; Rumah Sakit; Puskesmas"
    }];

    const worksheet = XLSX.utils.json_to_sheet(templateData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Template");
    XLSX.writeFile(workbook, "Template-Import-Produk.xlsx");
  };

  const handleExport = async () => {
    setIsExporting(true);
    setLogs([]);
    addLog("Memulai proses Export data produk...");

    try {
      const query = `*[_type == "product"]{
        name, 
        shortDescription,
        nie,
        tkdn,
        specifications,
        features,
        applications,
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
        "Gambar": p.Gambar || "",
        "NIE": p.nie || "",
        "TKDN": p.tkdn || "",
        "Spesifikasi": p.specifications ? p.specifications.join("; ") : "",
        "Fitur": p.features ? p.features.join("; ") : "",
        "Aplikasi / Penggunaan": p.applications ? p.applications.join("; ") : ""
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
      
      const rows = XLSX.utils.sheet_to_json<any>(worksheet, { raw: false, defval: "" });
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
        
        const nie = row["NIE"] || row["nie"] || row["Nomor Izin Edar"] || "";
        const tkdn = row["TKDN"] || row["tkdn"] || row["Nilai TKDN"] || "";

        const parseArray = (val: any) => {
          if (!val) return undefined;
          // Pisahkan berdasarkan titik koma (;) atau garis baru (\n)
          return String(val).split(/[\n;]+/).map(s => s.trim()).filter(Boolean);
        };

        const specifications = parseArray(row["Spesifikasi"] || row["spesifikasi"]);
        const features = parseArray(row["Fitur"] || row["fitur"]);
        const applications = parseArray(row["Aplikasi / Penggunaan"] || row["Aplikasi"] || row["Penggunaan"]);

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
          ...(nie && { nie: String(nie) }),
          ...(tkdn && { tkdn: String(tkdn) }),
          ...(specifications && specifications.length > 0 && { specifications }),
          ...(features && features.length > 0 && { features }),
          ...(applications && applications.length > 0 && { applications }),
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
    <Card padding={5} sizing="border">
      <Stack space={5}>
        {/* Header */}
        <Box>
          <Text size={4} weight="bold">
            Manajemen Data Produk (Excel)
          </Text>
          <Box marginTop={2}>
            <Text size={1} muted>
              Upload file .xlsx untuk memasukkan produk secara massal, atau unduh
              seluruh data produk ke dalam format Excel.
            </Text>
          </Box>
        </Box>

        {/* Import & Export Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          {/* Card: Import */}
          <Card padding={4} radius={2} border>
            <Stack space={4}>
              {/* Step 1 */}
              <Box>
                <Inline space={2}>
                  <div
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: "50%",
                      background: "#2563eb",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 12,
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    1
                  </div>
                  <Text size={2} weight="bold">
                    Download Template
                  </Text>
                </Inline>
                <Box marginTop={2} marginLeft={4}>
                  <Text size={1} muted>
                    Mulai dengan mengunduh format kolom yang benar.
                  </Text>
                </Box>
                <Box marginTop={3} marginLeft={4}>
                  <Button
                    text="Download Template Excel"
                    tone="default"
                    mode="ghost"
                    icon={() => (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                    )}
                    onClick={handleDownloadTemplate}
                    disabled={isLoading || isExporting}
                  />
                </Box>
              </Box>

              {/* Divider */}
              <hr style={{ border: "none", borderTop: "1px solid #e5e7eb", margin: 0 }} />

              {/* Step 2 */}
              <Box>
                <Inline space={2}>
                  <div
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: "50%",
                      background: "#2563eb",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 12,
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    2
                  </div>
                  <Text size={2} weight="bold">
                    Import Data (Upload)
                  </Text>
                </Inline>
                <Box marginTop={2} marginLeft={4}>
                  <Text size={1} muted>
                    Pilih file Excel (.xlsx) yang sudah diisi sesuai template.
                  </Text>
                </Box>
                <Box marginTop={3} marginLeft={4}>
                  <label
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "8px 16px",
                      border: "1px dashed #cbd5e1",
                      borderRadius: 6,
                      cursor: isLoading || isExporting ? "not-allowed" : "pointer",
                      background: "#f8fafc",
                      fontSize: 13,
                      color: file ? "#0f172a" : "#64748b",
                      transition: "border-color 0.2s",
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                    {file ? file.name : "Pilih file .xlsx"}
                    <input
                      type="file"
                      accept=".xlsx, .xls"
                      onChange={handleFileChange}
                      disabled={isLoading || isExporting}
                      style={{ display: "none" }}
                    />
                  </label>
                </Box>
                <Box marginTop={3} marginLeft={4}>
                  <Button
                    text={isLoading ? "Sedang Mengimpor..." : "Mulai Import"}
                    tone="primary"
                    mode="default"
                    icon={() => (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="16 16 12 12 8 16" />
                        <line x1="12" y1="12" x2="12" y2="21" />
                        <path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3" />
                      </svg>
                    )}
                    disabled={!file || isLoading || isExporting}
                    onClick={handleImport}
                  />
                </Box>
              </Box>
            </Stack>
          </Card>

          {/* Card: Export */}
          <Card padding={4} radius={2} border>
            <Stack space={4}>
              <Inline space={2}>
                <div
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    background: "#16a34a",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 12,
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  ↓
                </div>
                <Text size={2} weight="bold">
                  Export Data (Download)
                </Text>
              </Inline>
              <Box marginLeft={4}>
                <Text size={1} muted>
                  Unduh seluruh data produk saat ini menjadi file Excel (.xlsx).
                  Berguna untuk backup atau edit massal.
                </Text>
              </Box>
              <Box marginLeft={4}>
                <Button
                  text={isExporting ? "Menyiapkan File..." : "Download Excel"}
                  tone="positive"
                  mode="default"
                  icon={() => (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                  )}
                  disabled={isLoading || isExporting}
                  onClick={handleExport}
                />
              </Box>
            </Stack>
          </Card>
        </div>

        {/* Log Proses */}
        {logs.length > 0 && (
          <Box>
            <Text size={2} weight="bold">
              Log Proses:
            </Text>
            <Card
              padding={3}
              marginTop={2}
              radius={2}
              tone="transparent"
              border
              style={{ maxHeight: 300, overflowY: "auto" }}
            >
              <Stack space={2}>
                {logs.map((log, index) => (
                  <Code key={index} size={1}>
                    {log}
                  </Code>
                ))}
              </Stack>
            </Card>
          </Box>
        )}
      </Stack>
    </Card>
  );
}
