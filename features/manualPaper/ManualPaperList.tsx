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

function Pill({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-neutral-800 bg-neutral-900/70 px-3 py-1 text-xs text-neutral-200">
      <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" aria-hidden />
      {children}
    </span>
  );
}

export function ManualPaperList({ records, onPreview, onDownload }: ManualPaperListProps) {
  return (
    <Card
      title="Generated Manual Papers"
      description="Preview and download generated records. Newest appear first."
      headerAction={<Pill>{records.length ? `${records.length} active` : "No records"}</Pill>}
    >
      {records.length === 0 ? (
        <p className="text-sm text-neutral-400">No records yet. Create one to get started.</p>
      ) : (
        <div className="space-y-4">
          <div className="hidden overflow-hidden rounded-2xl border border-neutral-800 md:block">
            <table className="min-w-full divide-y divide-neutral-800">
              <thead className="bg-neutral-900/80 text-left text-xs uppercase tracking-wide text-neutral-400">
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
                    <td className="px-5 py-4">
                      <span className="inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900/70 px-3 py-1 text-xs text-neutral-200">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" aria-hidden />
                        {record.purchaseChannel}
                      </span>
                    </td>
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

          <div className="grid gap-3 md:hidden">
            {records.map((record) => (
              <div
                key={record.id}
                className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-4 shadow-subtle backdrop-blur"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm uppercase tracking-[0.25em] text-neutral-500">{formatDisplayDate(record.purchaseDate)}</p>
                    <p className="mt-1 text-lg font-semibold text-white">{record.customerName}</p>
                    <p className="text-xs text-neutral-400">{record.purchaseChannel}</p>
                  </div>
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-800 text-xs font-semibold text-neutral-200">
                    A5
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-neutral-400">
                  <span className="rounded-full bg-neutral-800/70 px-3 py-1">Created {formatDisplayDate(record.createdAt)}</span>
                  <span className="rounded-full bg-neutral-800/70 px-3 py-1">PDF ready</span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Button variant="secondary" size="sm" className="flex-1" onClick={() => onPreview(record)}>
                    Preview
                  </Button>
                  <Button variant="primary" size="sm" className="flex-1" onClick={() => onDownload(record)}>
                    Download PDF
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}
