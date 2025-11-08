import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createQuote } from "../api/quotes";
import { type CreateQuoteDTO, type Quote } from "../types/models";

interface UseAddQuoteOptions {
  onSuccess?: (quote: Quote) => void;
  onError?: (error: Error) => void;
}

export function useAddQuote(options?: UseAddQuoteOptions) {
  const queryClient = useQueryClient();

  return useMutation<Quote, Error, CreateQuoteDTO>({
    mutationFn: (quoteData: CreateQuoteDTO) => createQuote(quoteData),
    onSuccess: (newQuote) => {
      queryClient.invalidateQueries({ queryKey: ["quotes"] });
      options?.onSuccess?.(newQuote);
    },
    onError: (error: Error) => {
      console.error("Ошибка при добавлении цитаты");
      options?.onError?.(error);
    },
  });
}
