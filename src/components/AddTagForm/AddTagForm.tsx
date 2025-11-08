import { Box, Button, TextField } from "@mui/material";
import { useState, type MouseEvent } from "react";
import { useAddTag } from "../../hooks/useAddTag";
import type { Tag } from "../../types/models";

interface AddTagFormProps {
  onTagAdded: (newTag: Tag) => void;
}

function AddTagForm({ onTagAdded }: AddTagFormProps) {
  const [tagName, setTagname] = useState("");
  const [tagColor, setTagColor] = useState("#e3c571");
  const [error, setError] = useState("");

  const { mutate: addTag, isPending } = useAddTag({ onTagAdded });

  const handleAddTag = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!tagName.trim()) {
      setError("Введите название тега!");
      return;
    }

    setError("");
    addTag({ name: tagName, color: tagColor });
    setTagname("");
  };

  return (
    <Box sx={{ display: "flex", alignItems: "baseline", gap: 5, mt: 2 }}>
      <TextField
        size="small"
        label="Название тега"
        value={tagName}
        onChange={(e) => setTagname(e.target.value)}
        error={!!error}
        helperText={error}
      />

      <TextField
        type="color"
        label="Выбор цвета"
        value={tagColor}
        onChange={(e) => setTagColor(e.target.value)}
        sx={{
          width: 100,
          height: 40,
          border: "none",
          background: "transparent",
          cursor: "pointer",
        }}
      />

      <Button
        variant="contained"
        sx={{ mt: 2, backgroundColor: "#d1b58b", color: "#5a4a3a" }}
        size="small"
        onClick={handleAddTag}
        disabled={isPending}
      >
        {isPending ? "Добавление..." : "Добавить тег"}
      </Button>
    </Box>
  );
}

export default AddTagForm;
