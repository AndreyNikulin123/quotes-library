import { Box, Button, FormHelperText, TextField } from "@mui/material";
import TagSelector from "../TagSelector/TagSelector";
import { QuoteSchema } from "./quote.schema";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AddTagForm from "../AddTagForm/AddTagForm";
import useTags from "../../hooks/useTags";
import { useAddQuote } from "../../hooks/useAddQuote";
import type { Quote } from "../../types/models";
import { useUpdateQuote } from "../../hooks/useUpdateQuote";
import { useEffect } from "react";

interface QuoteFormInputs {
  text: string;
  book_title?: string;
  book_author: string;
  tag_id: string;
}

interface QuoteFormProps {
  initialData?: Quote;
  onClose?: () => void;
}

function QuoteForm({ initialData, onClose }: QuoteFormProps) {
  const { availableTags, error, addTag } = useTags();

  const { mutate: addQuote } = useAddQuote();
  const { mutate: updateQuote } = useUpdateQuote();

  const isEditMode = !!initialData;

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    reset,
  } = useForm<QuoteFormInputs>({
    mode: "onChange",
    resolver: zodResolver(QuoteSchema),
    defaultValues: {
      text: initialData?.text || "",
      book_title: initialData?.book?.title || "",
      book_author: initialData?.book?.author || "",
      tag_id: initialData?.tag?.id || "",
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        text: initialData?.text || "",
        book_title: initialData?.book?.title || "",
        book_author: initialData?.book?.author || "",
        tag_id: initialData?.tag?.id || "",
      });
    }
  }, [initialData, reset]);

  function handleSubmitForm(data: QuoteFormInputs) {
    console.log("📤 Отправляем в updateQuote:", data);
    if (initialData) {
      updateQuote(
        { quoteId: initialData.id, quoteData: data },
        {
          onSuccess: () => {
            onClose?.();
          },
          onError: () => {
            console.error("Ошибка при обновлении цитаты");
          },
        }
      );
    } else {
      addQuote(data, {
        onSuccess: () => {
          reset();
          alert("Цитата успешно добавлена!");
        },
        onError: () => {
          console.error("Ошибка при добавлении цитаты");
        },
      });
    }
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(handleSubmitForm)}
      sx={{
        mt: "2rem",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxWidth: "800px",
        backgroundColor: isEditMode ? "transparent" : "#faf5e8",
        m: isEditMode ? 0 : "2rem auto",
        p: isEditMode ? 2 : 5,
        borderRadius: 2,
        border: isEditMode ? "none" : "1px solid lightgray",
      }}
    >
      {isEditMode ? (
        <>
          <TextField
            type="text"
            label="Текст цитаты"
            {...register("text")}
            error={!!errors.text}
            helperText={errors.text?.message}
            variant="outlined"
            multiline
            rows={4}
            sx={{ mb: 2 }}
          />

          <Controller
            name="tag_id"
            control={control}
            render={({ field }) => (
              <TagSelector
                availableTags={availableTags}
                selectedTag={field.value}
                onChange={field.onChange}
              />
            )}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 2, backgroundColor: "#d1b58b", color: "#5a4a3a" }}
            disabled={!isValid}
          >
            {isEditMode ? "Сохранить изменения" : null}
          </Button>
        </>
      ) : (
        <>
          <TextField
            type="text"
            label="Текст цитаты"
            {...register("text")}
            error={!!errors.text}
            helperText={errors.text?.message}
            variant="outlined"
            multiline
            rows={4}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Автор"
            {...register("book_author")}
            error={!!errors.book_author}
            helperText={errors.book_author?.message}
            variant="outlined"
          />
          <TextField
            label="Название книги"
            {...register("book_title")}
            error={!!errors.book_title}
            helperText={errors.book_title?.message}
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <AddTagForm
            onTagAdded={(newTag) => {
              addTag(newTag); // добавляем тег в список
              setValue("tag_id", newTag.id); // выбираем новый тег в форме
            }}
          />
          <Controller
            name="tag_id"
            control={control}
            render={({ field }) => (
              <>
                <TagSelector
                  availableTags={availableTags}
                  selectedTag={field.value}
                  onChange={field.onChange}
                />
                {errors.tag_id && (
                  <FormHelperText error>
                    {errors.tag_id?.message}
                  </FormHelperText>
                )}
                {error && <FormHelperText error>{error}</FormHelperText>}
              </>
            )}
          />

          <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
            <Button
              variant="contained"
              size="large"
              sx={{ mt: 2, backgroundColor: "#d1b58b", color: "#5a4a3a" }}
              type="submit"
              disabled={!isValid}
            >
              Добавить цитату
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
}

export default QuoteForm;
