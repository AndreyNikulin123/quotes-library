import { Box, Chip } from "@mui/material";
import type { Tag } from "../../types/models";

interface TagFilterProps {
  tags: Tag[];
  selectedTagId?: string | undefined;
  onSelect: (tagId?: string | undefined) => void;
}

function TagFilter({ tags, selectedTagId, onSelect }: TagFilterProps) {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 1,
        flexWrap: "wrap",
        mb: 2,
      }}
    >
      <Chip
        label="Все"
        onClick={() => onSelect(undefined)}
        color={!selectedTagId ? "primary" : "default"}
      />
      {tags.map((tag) => (
        <Chip
          key={tag.id}
          label={tag.name}
          onClick={() =>
            onSelect(tag.id === selectedTagId ? undefined : tag.id)
          }
          sx={{
            backgroundColor: tag.id === selectedTagId ? tag.color : "#f5f5f5",
            color: tag.id === selectedTagId ? "#fff" : "#333",
            border: `1px solid ${tag.color}`,
          }}
        />
      ))}
    </Box>
  );
}

export default TagFilter;
