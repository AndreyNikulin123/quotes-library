import {
  Chip,
  Card,
  Typography,
  CardContent,
  Box,
  IconButton,
} from "@mui/material";
import type { Quote } from "../../types/models";
import type { FC } from "react";
import { useDeleteQuote } from "../../hooks/useDeleteQuote";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";

interface QuoteCardProps {
  quote: Quote;
  onEdit?: (quote: Quote) => void;
}

const QuoteCard: FC<QuoteCardProps> = ({ quote, onEdit }) => {
  const { mutate: deleteQuote, isPending } = useDeleteQuote({
    onSuccess: () => {
      console.log("Цитата успешно удалена");
    },
    onError: (error) => {
      console.error("Ошибка при удалении цитаты:", error);
    },
  });

  const handleDelete = () => {
    deleteQuote(quote.id);
  };

  //
  return (
    <Card
      sx={{
        mb: 5,
        p: 2,
        maxWidth: 600,
        mx: "auto",
        boxShadow: 2,
        "&:hover": { boxShadow: 3 },
        position: "relative",
      }}
    >
      <CardContent>
        <Typography
          variant="body1"
          gutterBottom
          sx={{
            mb: 3,
            pr: 4,
          }}
        >
          {"«" + quote.text + "»"}
        </Typography>

        <IconButton
          onClick={handleDelete}
          disabled={isPending}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: "error.main",
            "&:hover": {
              color: "error.dark",
            },
          }}
          size="small"
        >
          <DeleteIcon fontSize="small" />
        </IconButton>

        <IconButton
          onClick={() => onEdit?.(quote)}
          sx={{
            position: "absolute",
            top: 8,
            right: 40,
            color: "#212020",
            "&:hover": {
              color: "#0f0f0f",
            },
          }}
          size="small"
        >
          <CreateIcon fontSize="small" />
        </IconButton>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mt: 2,
            pt: 1,
            borderTop: "1px solid",
            borderColor: "divider",
          }}
        >
          <Typography variant="subtitle2" color="textSecondary">
            {quote.book?.author}
            {quote.book?.title && (
              <Typography
                component="span"
                color="textSecondary"
                sx={{ fontStyle: "italic" }}
              >
                {` — ${quote.book?.title}`}
              </Typography>
            )}
          </Typography>

          <Chip
            label={quote?.tag.name}
            size="small"
            sx={{
              backgroundColor: quote.tag.color,
              color: "#1f1d1d",
              ml: 2,
              "&:hover": {
                opacity: 0.9,
              },
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};
export default QuoteCard;
