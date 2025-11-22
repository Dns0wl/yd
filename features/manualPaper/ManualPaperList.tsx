"use client";

import { format } from "date-fns";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ManualPaperRecord } from "./types";

interface ManualPaperListProps {
  records: ManualPaperRecord[];
  onPreview: (record: ManualPaperRecord) => void;
  onDownload: (record: ManualPaperRecord) => void;
}

function formatDisplayDate(date: string) {
  return format(new Date(date), "dd MMM yyyy");
}

export function ManualPaperList({ records, onPreview, onDownload }: ManualPaperListProps) {
  return (
    <Card
      title="Generated Manual Papers"
      description="Preview and download generated records. Newest appear first."
    >
      {records.length === 0 ? (
        <p className="text-sm text-neutral-400">No records yet. Create one to get started.</p>
      ) : (
        <div className="overflow-hidden rounded-xl border border-neutral-800">
          <table className="min-w-full divide-y divide-neutral-800">
            <thead className="bg-neutral-900/80 text-left text-sm uppercase tracking-wide text-neutral-400">
              <tr>
                <th className="px-5 py-4 font-medium">Customer Name</th>
                <th className="px-5 py-4 font-medium">Purchase Date</th>
                <th className="px-5 py-4 font-medium">Purchase Channel</th>
                <th className="px-5 py-4 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-900 bg-neutral-950/30 text-sm">
              {records.map((record) => (
                <tr key={record.id} className="hover:bg-neutral-900/60">
                  <td className="px-5 py-4 font-semibold text-white">{record.customerName}</td>
                  <td className="px-5 py-4 text-neutral-300">{formatDisplayDate(record.purchaseDate)}</td>
                  <td className="px-5 py-4 text-neutral-300">{record.purchaseChannel}</td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <Button variant="secondary" size="sm" onClick={() => onPreview(record)}>
                        Preview
                      </Button>
                      <Button variant="primary" size="sm" onClick={() => onDownload(record)}>
                        Download PDF
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}
