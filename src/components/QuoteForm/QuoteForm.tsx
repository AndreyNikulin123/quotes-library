import { Box, Button, FormHelperText, TextField } from "@mui/material";
import TagSelector from "../TagSelector/TagSelector";
import { QuoteSchema } from "./quote.schema";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AddTagForm from "../AddTagForm/AddTagForm";
import useTags from "../../hooks/useTags";

function QuoteForm() {
  const { availableTags, loading, error, addTag } = useTags();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(QuoteSchema),
    defaultValues: {
      text: "",
      book_title: "",
      book_author: "",
      tag_id: "",
    },
  });

  function handleSubmitForm(data) {
    console.log(data);
  }

  return (
    <Box
      sx={{
        mt: "2rem",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxWidth: "800px",
        backgroundColor: "#faf5e8",
        m: "2rem auto",
        p: 5,
        borderRadius: 2,
        border: "1px solid lightgray",
      }}
      component="form"
      onSubmit={handleSubmit(handleSubmitForm)}
    >
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
              <FormHelperText error>{errors.tag_id?.message}</FormHelperText>
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
    </Box>
  );
}

export default QuoteForm;
