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
    <section className={cn("rounded-2xl border border-neutral-800 bg-neutral-900/60 shadow-subtle", className)}>
      {(title || description || headerAction) && (
        <div className="flex items-start justify-between gap-4 border-b border-neutral-800 px-6 py-5">
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
