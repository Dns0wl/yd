"use client";

import { useMemo, useState } from "react";
import { ManualPaperRecord } from "./types";

interface ManualPaperStore {
  records: ManualPaperRecord[];
  addRecord: (record: ManualPaperRecord) => void;
}

export function useManualPaperStore(initial?: ManualPaperRecord[]): ManualPaperStore {
  const [records, setRecords] = useState<ManualPaperRecord[]>(initial ?? []);

  const addRecord = (record: ManualPaperRecord) => {
    setRecords((prev) => [record, ...prev]);
  };

  return useMemo(() => ({ records, addRecord }), [records]);
}
