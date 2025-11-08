import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTag } from "../api/tags";
import type { Tag } from "../types/models";

interface UseAddTagOptions {
  onTagAdded?: (newTag: Tag) => void;
}

export function useAddTag({ onTagAdded }: UseAddTagOptions) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTag,
    onSuccess: (newTag) => {
      queryClient.invalidateQueries({ queryKey: ["tags"] });
      onTagAdded?.(newTag);
    },
    onError: () => {
      console.error("Ошибка при добавлении тега");
    },
  });
}
