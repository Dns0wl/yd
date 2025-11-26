import type { ReactNode } from "react";
import { cn } from "./helpers";

interface CardProps {
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
  headerAction?: ReactNode;
}

export function Card({ title, description, children, className, headerAction }: CardProps) {
  return (
    <section
      className={cn(
        "rounded-2xl border border-neutral-800/80 bg-neutral-900/50 shadow-[0_20px_80px_-45px_rgba(0,0,0,0.75)] backdrop-blur",
        className
      )}
    >
      {(title || description || headerAction) && (
        <div className="flex flex-col gap-2 border-b border-neutral-800 px-6 py-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            {title ? <h2 className="text-lg font-semibold text-white">{title}</h2> : null}
            {description ? <p className="text-sm text-neutral-400">{description}</p> : null}
          </div>
          {headerAction}
        </div>
      )}
      <div className="px-6 py-5">{children}</div>
    </section>
  );
}
