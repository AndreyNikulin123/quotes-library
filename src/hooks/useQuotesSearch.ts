import { useQuery } from "@tanstack/react-query";
import { searchQuotes } from "../api/quotes";

export function useQuotesSearch(searchTerm: string) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["quotesSearch", searchTerm],
    queryFn: () => searchQuotes(searchTerm),
    enabled: !!searchTerm,
  });
  return {
    quotes: data?.quotes || [],
    loading: isLoading,
    error: isError,
  };
}
