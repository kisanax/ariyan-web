"use client";

import { useState, useEffect } from "react";
import { Share2, Mail, Link as LinkIcon, Check } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";

export default function ShareButton({ 
  title, 
  text, 
  url 
}: { 
  title: string, 
  text: string, 
  url?: string 
}) {
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const [isNativeShareAvailable, setIsNativeShareAvailable] = useState(false);

  useEffect(() => {
    setShareUrl(url || window.location.href);
    if (typeof navigator !== "undefined" && navigator.share) {
      setIsNativeShareAvailable(true);
    }
  }, [url]);

  const handleNativeShare = async (e: React.MouseEvent) => {
    if (isNativeShareAvailable) {
      e.preventDefault();
      try {
        await navigator.share({
          title,
          text,
          url: shareUrl,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.log("Failed to copy", err);
    }
  };

  const waUrl = `https://wa.me/?text=${encodeURIComponent(text + "\n\n" + shareUrl)}`;
  const mailUrl = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(text + "\n\n" + shareUrl)}`;

  const triggerBtn = (
    <button 
      onClick={isNativeShareAvailable ? handleNativeShare : undefined}
      className="inline-flex items-center justify-center gap-2 rounded-lg border border-ink-200 bg-white px-4 py-3 text-sm font-medium text-ink-700 transition-colors hover:bg-ink-50 hover:text-brand"
    >
      <Share2 size={16} />
      <span>Bagikan</span>
    </button>
  );

  if (isNativeShareAvailable) {
    return triggerBtn;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {triggerBtn}
      </DialogTrigger>
      <DialogContent className="max-w-sm rounded-2xl p-6">
        <div className="mb-4">
          <h3 className="text-lg font-bold text-ink-900">Bagikan Tautan</h3>
          <p className="text-sm text-ink-500">Pilih platform untuk membagikan tautan ini.</p>
        </div>
        
        <div className="flex flex-col gap-3">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-xl p-3 border border-ink-100 bg-white hover:border-[#25D366] hover:bg-[#25D366]/5 transition-colors group"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#25D366]/10 text-[#25D366] group-hover:bg-[#25D366] group-hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </div>
            <span className="font-medium text-ink-900">WhatsApp</span>
          </a>

          <a
            href={mailUrl}
            className="flex items-center gap-3 rounded-xl p-3 border border-ink-100 bg-white hover:border-blue-500 hover:bg-blue-500/5 transition-colors group"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500/10 text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-colors">
              <Mail size={18} />
            </div>
            <span className="font-medium text-ink-900">Email</span>
          </a>

          <button
            onClick={handleCopy}
            className="flex items-center gap-3 rounded-xl p-3 border border-ink-100 bg-white hover:border-brand hover:bg-brand/5 transition-colors group w-full text-left"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-brand/10 text-brand group-hover:bg-brand group-hover:text-white transition-colors">
              {copied ? <Check size={18} /> : <LinkIcon size={18} />}
            </div>
            <span className="font-medium text-ink-900">
              {copied ? "Tautan Disalin!" : "Salin Tautan"}
            </span>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
