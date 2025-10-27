export interface Chapter {
  title: string;
  content: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  source: 'gemini' | 'user';
  // Gemini-specific properties
  coverImagePrompt?: string;
  category?: string;
  summary?: string;
  chapters?: Chapter[];
  // User-specific properties
  pdfData?: string;
}
