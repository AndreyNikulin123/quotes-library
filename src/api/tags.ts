import { type Tag, type CreateTagDTO } from "../types/models";

export const createTag = async (tagData: CreateTagDTO): Promise<Tag> => {
  const res = await fetch("/api/tags", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(tagData),
  });
  if (!res.ok) throw new Error(`Ошибка: ${res.status}`);
  return res.json();
};

export const getTags = async (): Promise<Tag[]> => {
  const res = await fetch("/api/tags");
  if (!res.ok) throw new Error(`Ошибка: ${res.status}`);
  return res.json();
};
