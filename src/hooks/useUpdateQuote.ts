import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateQuote } from "../api/quotes";
import { type Quote } from "../types/models";

interface UseUpdateQuoteOptions {
  onSuccess?: (quote: Quote) => void;
  onError?: (error: Error) => void;
}

export function useUpdateQuote(options?: UseUpdateQuoteOptions) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      quoteId,
      quoteData,
    }: {
      quoteId: string;
      quoteData: Partial<Quote>;
    }) => updateQuote(quoteId, quoteData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quotes"] });
    },
    onError: (error) => {
      console.error("Ошибка при редактировании цитаты:", error);
      options?.onError?.(error);
    },
  });
}
