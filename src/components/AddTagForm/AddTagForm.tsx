import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";

function AddTagForm({ onTagAdded }) {
  const [tagName, setTagname] = useState("");
  const [tagColor, setTagColor] = useState("#e3c571");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAddTag = async (e) => {
    e.preventDefault();
    setError("");
    if (!tagName.trim()) return;

    try {
      setLoading(true);
      const res = await fetch("/api/tags", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: tagName, color: tagColor }),
      });

      if (!res.ok) throw new Error(`Ошибка: ${res.status}`);
      const newTag = await res.json();

      onTagAdded(newTag);
      setTagname("");
    } catch (err) {
      setError("Не удалось добавить тег");
    } finally {
      setLoading(false);
    }
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
        type="submit"
        onClick={handleAddTag}
      >
        Добавить тег
      </Button>
    </Box>
  );
}

export default AddTagForm;
