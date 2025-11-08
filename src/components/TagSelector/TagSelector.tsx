import { Box, Chip, FormControl, FormLabel } from "@mui/material";
import type { Tag } from "../../types/models";

interface TagSelectorProps {
  availableTags: Tag[];
  selectedTag: string;
  onChange: (tagId: string | null) => void;
}

function TagSelector({
  availableTags,
  selectedTag,
  onChange,
}: TagSelectorProps) {
  function handleTagClick(tag: Tag) {
    onChange(tag.id === selectedTag ? "" : tag.id);
  }

  return (
    <FormControl fullWidth variant="outlined">
      <FormLabel sx={{ mb: 1, mt: 2, textAlign: "left" }}>
        Добавленные теги
      </FormLabel>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 1,
          border: "1px solid rgba(0, 0, 0, 0.23)",
          borderRadius: "6px",
          padding: "8px 12px",
          minHeight: "56px",
          alignItems: "center",
          backgroundColor: "#faf5e8",
          "&:hover": {
            borderColor: "#5a4a3a",
          },
        }}
      >
        {availableTags.map((tag) => {
          const isSelected = tag.id === selectedTag;
          return (
            <Chip
              key={tag.id}
              label={tag.name}
              clickable
              component="button"
              type="button"
              variant={isSelected ? "filled" : "outlined"}
              sx={{
                bgcolor: isSelected ? "#d1b58b" : "#faf5e8",
                color: "#5a4a3a",
                border: "1px solid #968160",
                "&:hover": {
                  bgcolor: isSelected ? "#c9a66b" : "#e9dcc4",
                },
              }}
              onClick={() => handleTagClick(tag)}
            />
          );
        })}
      </Box>
    </FormControl>
  );
}
export default TagSelector;
