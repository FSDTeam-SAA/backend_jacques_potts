import { purchaseTemplates } from './templates/purchaseTemplates';
import { confidentialityTemplates } from './templates/confidentialityTemplates';
import { leaseTemplates } from './templates/leaseTemplates';
import { inspectionTemplates } from './templates/inspectionTemplates';

export const initialTemplates = [
  ...purchaseTemplates,
  ...confidentialityTemplates,
  ...leaseTemplates,
  ...inspectionTemplates
];