export interface Tag {
  id: string;
  name: string;
  color: string;
}

export interface Book {
  author: string;
  title: string;
}

export interface Quote {
  id: string;
  text: string;
  tag: Tag;
  book?: Book;
}

export interface CreateQuoteDTO {
  text: string;
  tag_id: string;
  book_author: string;
  book_title?: string;
}

export interface DeleteQuoteDTO {
  id: string;
}

export type CreateTagDTO = Omit<Tag, "id">;
