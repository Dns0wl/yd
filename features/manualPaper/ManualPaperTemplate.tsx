import { forwardRef } from "react";
import { format } from "date-fns";
import { PurchaseChannel } from "./types";

interface ManualPaperTemplateProps {
  customerName: string;
  purchaseDate: string; // ISO string
  purchaseChannel: PurchaseChannel;
  className?: string;
}

function formatDate(date: string) {
  return format(new Date(date), "dd MMMM yyyy");
}

/**
 * ManualPaperTemplate renders an A5-styled layout using only CSS and gradients.
 * The dimensions are fixed to keep aspect ratio consistent for PDF export.
 */
export const ManualPaperTemplate = forwardRef<HTMLDivElement, ManualPaperTemplateProps>(
  ({ customerName, purchaseDate, purchaseChannel, className }, ref) => {
    const formattedDate = formatDate(purchaseDate);

    return (
      <div className="flex w-full max-w-[560px] items-center justify-center bg-transparent px-2">
        <div
          ref={ref}
          className={
            "relative aspect-[525/742] w-full max-w-[525px] overflow-hidden rounded-2xl border border-neutral-300 bg-neutral-100 text-neutral-900 shadow-xl " +
            (className ?? "")
          }
          style={{
            backgroundImage:
              "repeating-linear-gradient(120deg, rgba(0,0,0,0.02) 0, rgba(0,0,0,0.02) 12px, transparent 12px, transparent 24px)," +
              "repeating-linear-gradient(35deg, rgba(0,0,0,0.018) 0, rgba(0,0,0,0.018) 10px, transparent 10px, transparent 26px)",
            backgroundColor: "#f6f6f6",
          }}
        >
          {/* Top brand block */}
          <div className="flex flex-col items-center px-10 pt-12 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-neutral-900 text-neutral-50 shadow-lg">
              <div className="relative h-10 w-8">
                <span className="absolute inset-y-0 left-0 w-2 rounded-sm bg-neutral-50"></span>
                <span className="absolute inset-y-0 right-0 w-2 rounded-sm bg-neutral-50"></span>
                <span className="absolute left-0 right-0 top-1/2 h-1 -translate-y-1/2 rounded-sm bg-neutral-50"></span>
              </div>
            </div>
            <p className="mt-3 text-lg font-semibold tracking-[0.3em] uppercase text-neutral-800">hayu widyas</p>
            <p className="mt-2 text-xs uppercase tracking-[0.2em] text-neutral-500">Thanks To</p>
            <div className="mt-4 w-full max-w-sm space-y-2 text-left text-sm">
              <p className="flex items-center justify-between text-neutral-700">
                <span className="font-semibold">Customer Name:</span>
                <span className="text-neutral-900">{customerName}</span>
              </p>
              <p className="flex items-center justify-between text-neutral-700">
                <span className="font-semibold">Purchase Date:</span>
                <span className="text-neutral-900">{formattedDate}</span>
              </p>
              <p className="flex items-center justify-between text-neutral-700">
                <span className="font-semibold">Purchase Channel:</span>
                <span className="text-neutral-900">{purchaseChannel}</span>
              </p>
            </div>
            <div className="mt-6 flex w-full max-w-sm items-center justify-center gap-4 text-neutral-400">
              <span className="flex-1 h-px bg-neutral-300"></span>
              <span className="flex h-6 w-6 items-center justify-center rounded-md border border-neutral-800 bg-neutral-900 text-xs font-bold text-neutral-50">
                H
              </span>
              <span className="flex-1 h-px bg-neutral-300"></span>
            </div>
          </div>

          {/* Middle dark band */}
          <div className="relative mt-10 flex h-[33%] min-h-[220px] items-center justify-center bg-neutral-800 px-8 text-center text-neutral-50">
            <div className="flex flex-col items-center">
              <div className="mb-3 h-10 w-8 rounded-b-[10px] rounded-t-[2px] border border-neutral-200 bg-neutral-900 shadow-inner" />
              <p className="text-base uppercase tracking-[0.3em]">Genuine Leather 100%</p>
            </div>
          </div>

          {/* Bottom section with curved footer */}
          <div className="relative flex flex-1 flex-col justify-end px-10 pb-10 pt-8">
            <div className="absolute bottom-0 right-0 h-40 w-2/3 rounded-tl-[90px] bg-neutral-800" style={{ clipPath: "ellipse(100% 80% at 100% 100%)" }} />
            <div className="relative z-10 ml-auto w-2/3 rounded-tl-[80px] bg-neutral-800/80 px-8 py-6 text-right text-neutral-100 shadow-lg">
              <p className="text-xs tracking-[0.2em] text-neutral-300">CUSTOMER SERVICE ON WHATSAPP</p>
              <p className="mt-2 text-lg font-semibold">+62 813 8370 8797</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

ManualPaperTemplate.displayName = "ManualPaperTemplate";
