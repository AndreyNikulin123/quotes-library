import { z } from "zod";

export const QuoteSchema = z.object({
  text: z.string().min(1, "Введите текст цитаты!"),
  book_author: z.string().min(1, "Введите автора цитаты!"),
  book_title: z.string().optional(),
  tag_id: z.string().uuid({ message: "Выберите тег!" }),
});
