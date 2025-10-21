import { useEffect, useState } from "react";

function useTags() {
  const [availableTags, setAvailableTags] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchTags = async () => {
    try {
      const res = await fetch("/api/tags");
      if (!res.ok) throw new Error(`Ошибка HTTP! Статус: ${res.status}`);
      const data = await res.json();
      setAvailableTags(data);
    } catch (err) {
      console.error("Ошибка при загрузке тегов:", err);
      setError("Не удалось выбрать тег");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  const addTag = (newTag) => setAvailableTags((prev) => [...prev, newTag]);

  return { availableTags, loading, error, addTag };
}

export default useTags;
