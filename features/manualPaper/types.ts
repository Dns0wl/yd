export type PurchaseChannel = "Customer Service" | "Marketplace" | "Website";

export interface ManualPaperRecord {
  id: string;
  customerName: string;
  purchaseDate: string; // ISO string
  purchaseChannel: PurchaseChannel;
  createdAt: string; // ISO string
}
