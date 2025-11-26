"use client";

import { useMemo, useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { ManualPaperForm } from "./ManualPaperForm";
import { ManualPaperList } from "./ManualPaperList";
import { ManualPaperTemplate } from "./ManualPaperTemplate";
import { ManualPaperRecord, PurchaseChannel } from "./types";
import { useManualPaperStore } from "./useManualPaperStore";
import { format } from "date-fns";

interface ManualPaperPageProps {
  initialRecords?: ManualPaperRecord[];
}

export function ManualPaperPage({ initialRecords }: ManualPaperPageProps) {
  const { records, addRecord } = useManualPaperStore(initialRecords);
  const [showForm, setShowForm] = useState(false);
  const [previewRecord, setPreviewRecord] = useState<ManualPaperRecord | null>(null);
  const [downloadTarget, setDownloadTarget] = useState<ManualPaperRecord | null>(null);
  const hiddenRef = useRef<HTMLDivElement>(null);
  const captureTargetRef = useRef<HTMLDivElement>(null);
  const [previewZoom, setPreviewZoom] = useState<"fit" | "100" | "125">("fit");

  const cloneWithInlineStyles = (source: HTMLElement) => {
    const clone = source.cloneNode(true) as HTMLElement;

    const apply = (origin: HTMLElement, target: HTMLElement) => {
      const styles = getComputedStyle(origin);
      const serialized = Array.from(styles)
        .map((prop) => `${prop}:${styles.getPropertyValue(prop)};`)
        .join("");
      target.setAttribute("style", serialized);
      target.removeAttribute("class");

      Array.from(origin.childNodes).forEach((child, index) => {
        const targetNode = target.childNodes[index];
        if (child.nodeType === Node.ELEMENT_NODE && targetNode instanceof HTMLElement) {
          apply(child as HTMLElement, targetNode);
        }
      });
    };

    apply(source, clone);
    return clone;
  };

  const handleCreateRecord = (values: { customerName: string; purchaseDate: string; purchaseChannel: PurchaseChannel }) => {
    const record: ManualPaperRecord = {
      id: crypto.randomUUID(),
      customerName: values.customerName,
      purchaseDate: values.purchaseDate,
      purchaseChannel: values.purchaseChannel,
      createdAt: new Date().toISOString(),
    };

    addRecord(record);
    setShowForm(false);
    setPreviewRecord(record);
  };

  const formatFileName = (record: ManualPaperRecord) => {
    const datePart = format(new Date(record.purchaseDate), "yyyyMMdd");
    const safeName = record.customerName.replace(/[^a-z0-9]+/gi, "_").replace(/_{2,}/g, "_").replace(/^_|_$/g, "");
    return `ManualPaper-${safeName || "Customer"}-${datePart}.pdf`;
  };

  const handleDownload = async (record: ManualPaperRecord) => {
    setDownloadTarget(record);
    await new Promise((resolve) => requestAnimationFrame(() => resolve(null)));
    await new Promise((resolve) => setTimeout(resolve, 50));

    const element = captureTargetRef.current;
    if (!element) return;

    const clone = cloneWithInlineStyles(element);

    const sandbox = document.createElement("div");
    sandbox.style.position = "fixed";
    sandbox.style.inset = "0";
    sandbox.style.opacity = "0";
    sandbox.style.pointerEvents = "none";
    sandbox.style.zIndex = "-1";
    sandbox.appendChild(clone);
    document.body.appendChild(sandbox);

    const canvas = await html2canvas(clone, { scale: 2, backgroundColor: "#f6f6f6" });
    document.body.removeChild(sandbox);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({ orientation: "portrait", unit: "pt", format: "a5" });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const ratio = Math.min(pageWidth / canvas.width, pageHeight / canvas.height);
    const imgWidth = canvas.width * ratio;
    const imgHeight = canvas.height * ratio;
    const x = (pageWidth - imgWidth) / 2;
    const y = (pageHeight - imgHeight) / 2;

    pdf.addImage(imgData, "PNG", x, y, imgWidth, imgHeight);
    pdf.save(formatFileName(record));
    setDownloadTarget(null);
  };

  const zoomValue = useMemo(() => {
    if (previewZoom === "100") return 1;
    if (previewZoom === "125") return 1.2;
    return 0.92;
  }, [previewZoom]);

  return (
    <div className="space-y-8">
      <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
        <div className="rounded-3xl border border-neutral-800/70 bg-gradient-to-br from-neutral-900/80 via-neutral-900/40 to-neutral-800/50 p-6 shadow-[0_20px_80px_-45px_rgba(0,0,0,0.75)] backdrop-blur">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-[0.35em] text-neutral-400">Hayu Widyas Office Dashboard</p>
              <h2 className="text-3xl font-semibold text-white">Manual Paper Generator</h2>
              <p className="text-sm text-neutral-400">Generate A5 Manual Paper PDF for Hayu Widyas customers</p>
            </div>
            <Button variant="primary" onClick={() => setShowForm(true)}>
              Add New Manual Paper
            </Button>
          </div>
          <div className="mt-4 grid gap-3 text-sm text-neutral-300 sm:grid-cols-3">
            <div className="rounded-2xl border border-neutral-800/80 bg-neutral-900/50 px-4 py-3">
              <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">Active records</p>
              <p className="text-xl font-semibold text-white">{records.length}</p>
            </div>
            <div className="rounded-2xl border border-neutral-800/80 bg-neutral-900/50 px-4 py-3">
              <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">Latest customer</p>
              <p className="text-base font-semibold text-white">{records[0]?.customerName ?? "—"}</p>
            </div>
            <div className="rounded-2xl border border-neutral-800/80 bg-neutral-900/50 px-4 py-3">
              <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">Next action</p>
              <p className="text-base font-semibold text-white">Preview or export instantly</p>
            </div>
          </div>
        </div>
        <div className="rounded-3xl border border-neutral-800/70 bg-gradient-to-br from-emerald-400/10 via-emerald-300/5 to-amber-200/10 p-6 text-neutral-50 shadow-[0_20px_80px_-45px_rgba(0,0,0,0.65)]">
          <p className="text-xs uppercase tracking-[0.3em] text-emerald-100">User friendly</p>
          <h3 className="mt-2 text-2xl font-semibold text-white">Modern, responsive dashboard</h3>
          <p className="mt-2 text-sm text-emerald-50/80">
            Optimized for quick creation, preview, and PDF export on any device. Mobile navigation and cards keep the experience smooth for field teams.
          </p>
          <ul className="mt-4 space-y-2 text-sm text-emerald-50/90">
            <li>• Responsive layout with mobile-friendly navigation</li>
            <li>• One-click preview and export for every record</li>
            <li>• Branded A5 template ready for PDF output</li>
          </ul>
        </div>
      </div>

      <ManualPaperList
        records={records}
        onPreview={(record) => setPreviewRecord(record)}
        onDownload={handleDownload}
      />

      <Modal open={showForm} onClose={() => setShowForm(false)} title="Add New Manual Paper">
        <ManualPaperForm onSubmit={handleCreateRecord} onCancel={() => setShowForm(false)} />
      </Modal>

      <Modal open={Boolean(previewRecord)} onClose={() => setPreviewRecord(null)} title="Manual Paper Preview" widthClassName="max-w-4xl">
        {previewRecord ? (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-neutral-300">
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-[0.2em] text-neutral-500">Zoom</span>
                <div className="flex rounded-full border border-neutral-800 bg-neutral-900/80 p-1 shadow-subtle">
                  {["fit", "100", "125"].map((step) => (
                    <button
                      key={step}
                      type="button"
                      onClick={() => setPreviewZoom(step as typeof previewZoom)}
                      className={
                        "min-w-[68px] rounded-full px-3 py-1 text-xs font-semibold transition-all " +
                        (previewZoom === step
                          ? "bg-white text-neutral-900 shadow"
                          : "text-neutral-300 hover:text-white")
                      }
                    >
                      {step === "fit" ? "Fit to view" : `${step}%`}
                    </button>
                  ))}
                </div>
              </div>
              <p className="text-xs text-neutral-500">Scroll to inspect details without overlapping the close button.</p>
            </div>
            <div className="max-h-[70vh] overflow-auto rounded-2xl border border-neutral-800 bg-neutral-950/70 p-4">
              <div className="flex justify-center">
                <div
                  style={{ transform: `scale(${zoomValue})`, transformOrigin: "top center" }}
                  className="transition-transform duration-150 ease-out"
                >
                  <ManualPaperTemplate
                    customerName={previewRecord.customerName}
                    purchaseDate={previewRecord.purchaseDate}
                    purchaseChannel={previewRecord.purchaseChannel}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </Modal>

      <div className="pointer-events-none fixed -left-[9999px] top-0" aria-hidden>
        {downloadTarget ? (
          <div ref={hiddenRef}>
            <ManualPaperTemplate
              ref={captureTargetRef}
              customerName={downloadTarget.customerName}
              purchaseDate={downloadTarget.purchaseDate}
              purchaseChannel={downloadTarget.purchaseChannel}
            />
          </div>
        ) : (
          <div ref={hiddenRef} />
        )}
      </div>
    </div>
  );
}
