export type BookCategory = {
  id: string;
  name: string;
};

export type Quote = {
  text?: string | string[];
  comments?: string[];
};

export type BookHighlight = {
  chapter: string;
  quotes: Quote[];
};

export type Book = {
  id: string;
  title: string;
  author: string;
  publisher: string;
  publishedYear: number;
  category: string;
  coverImage: string;
  highlights: BookHighlight[];
  lastUpdated?: string;
};
