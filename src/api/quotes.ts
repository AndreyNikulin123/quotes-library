import type { CreateQuoteDTO, Quote } from "../types/models";

export const createQuote = async (
  quoteData: CreateQuoteDTO
): Promise<Quote> => {
  const res = await fetch("/api/quotes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(quoteData),
  });
  if (!res.ok) throw new Error(`Ошибка: ${res.status}`);
  return res.json();
};

export const deleteQuote = async (quoteId: string): Promise<void> => {
  const res = await fetch(`/api/quotes/${quoteId}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error(`Ошибка: ${res.status}`);
};

export const updateQuote = async (
  quoteId: string,
  quoteData: Partial<Quote>
) => {
  const res = await fetch(`/api/quotes/${quoteId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(quoteData),
  });
  if (!res.ok) throw new Error(`Ошибка: ${res.status}`);
  return res.json();
};

export const getQuotes = async () => {
  const res = await fetch("/api/quotes");
  if (!res.ok) throw new Error(`Ошибка: ${res.status}`);

  return res.json();
};

export const searchQuotes = async (query: string) => {
  const params = new URLSearchParams({
    q: query,
    page: "1",
    limit: "20",
  });
  const res = await fetch(`/api/quotes/search?${params.toString()}`);
  if (!res.ok) throw new Error(`Ошибка: ${res.status}`);
  return res.json();
};
