"use client";

import { useRef, useState } from "react";
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

    const element = hiddenRef.current;
    if (!element) return;

    const canvas = await html2canvas(element, { scale: 2, backgroundColor: "#f6f6f6" });
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

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-1">
          <p className="text-sm uppercase tracking-[0.35em] text-neutral-400">Hayu Widyas Office Dashboard</p>
          <h2 className="text-3xl font-semibold text-white">Manual Paper Generator</h2>
          <p className="text-sm text-neutral-400">Generate A5 Manual Paper PDF for Hayu Widyas customers</p>
        </div>
        <Button variant="primary" onClick={() => setShowForm(true)}>
          Add New Manual Paper
        </Button>
      </div>

      <ManualPaperList
        records={records}
        onPreview={(record) => setPreviewRecord(record)}
        onDownload={handleDownload}
      />

      <Modal open={showForm} onClose={() => setShowForm(false)} title="Add New Manual Paper">
        <ManualPaperForm onSubmit={handleCreateRecord} onCancel={() => setShowForm(false)} />
      </Modal>

      <Modal open={Boolean(previewRecord)} onClose={() => setPreviewRecord(null)} title="Manual Paper Preview" widthClassName="max-w-3xl">
        {previewRecord ? (
          <div className="flex justify-center">
            <ManualPaperTemplate
              customerName={previewRecord.customerName}
              purchaseDate={previewRecord.purchaseDate}
              purchaseChannel={previewRecord.purchaseChannel}
            />
          </div>
        ) : null}
      </Modal>

      <div className="pointer-events-none fixed -left-[9999px] top-0" aria-hidden>
        {downloadTarget ? (
          <div ref={hiddenRef}>
            <ManualPaperTemplate
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
