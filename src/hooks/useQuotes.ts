import { useQuery } from "@tanstack/react-query";
import { getQuotes } from "../api/quotes";

export function useQuotes() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["quotes"],
    queryFn: getQuotes,
    staleTime: 1000 * 60,
  });
  const quotes = data?.quotes || [];
  return { quotes, loading: isLoading, error: isError };
}
