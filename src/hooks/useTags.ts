import { getTags } from "../api/tags";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { Tag } from "../types/models";

function useTags() {
  const queryClient = useQueryClient();

  const {
    data = [] as Tag[],
    isLoading,
    isError,
  } = useQuery<Tag[]>({
    queryKey: ["tags"],
    queryFn: getTags,
    staleTime: 1000 * 60,
  });

  const addTag = (newTag: Tag) => {
    queryClient.setQueryData<Tag[]>(["tags"], (old = []) => [...old, newTag]);
  };

  return { availableTags: data, loading: isLoading, error: isError, addTag };
}

export default useTags;
