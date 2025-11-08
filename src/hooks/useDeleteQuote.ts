import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteQuote } from "../api/quotes";
import { type Quote } from "../types/models";

interface UseDeleteQuoteOptions {
  onSuccess?: (quote: Quote) => void;
  onError?: (error: Error) => void;
}

export function useDeleteQuote(options?: UseDeleteQuoteOptions) {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: deleteQuote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quotes"] });
    },
    onError: (error) => {
      console.error("Ошибка при удалении цитаты:", error);
      options?.onError?.(error);
    },
  });
}
