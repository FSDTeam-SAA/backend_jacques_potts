export interface Template {
  id: string;
  title: string;
  category: string;
  content: string;
  description: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface TemplateFormData {
  id?: string;
  title: string;
  category: string;
  content: string;
  description: string;
}