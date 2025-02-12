import { Json } from "@/types/json";

export const normalizeDocuments = (documents: Json): string[] => {
  if (Array.isArray(documents)) {
    return documents.map(doc => String(doc));
  }
  if (typeof documents === 'string') {
    return [documents];
  }
  return [];
};