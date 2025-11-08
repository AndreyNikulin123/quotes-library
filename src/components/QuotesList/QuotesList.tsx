import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useQuotes } from "../../hooks/useQuotes";
import LoadingSpinner from "../../shared/ui/LoadingSpinner";
import QuoteCard from "../QuoteCard/QuoteCard";
import type { Quote } from "../../types/models";
import { useState, type FC } from "react";
import QuoteForm from "../QuoteForm/QuoteForm";

const QuotesList: FC = () => {
  const [editingQuote, setEditingQuote] = useState<Quote | null>(null);
  const { quotes, loading, error } = useQuotes();

  if (loading) return <LoadingSpinner />;

  if (error) {
    return (
      <Typography color="error" sx={{ p: 2 }}>
        Ошибка загрузки цитат{" "}
      </Typography>
    );
  }

  if (!quotes?.length) {
    return <Typography sx={{ p: 2 }}>Цитаты не найдены</Typography>;
  }

  return (
    <Box sx={{ p: 2, maxWidth: 800, mx: "auto" }}>
      {quotes.map((quote: Quote) => (
        <QuoteCard key={quote.id} quote={quote} onEdit={setEditingQuote} />
      ))}

      <Dialog open={!!editingQuote} onClose={() => setEditingQuote(null)}>
        <DialogTitle>Редактировать цитату</DialogTitle>
        <DialogContent>
          {editingQuote && (
            <QuoteForm
              initialData={editingQuote}
              onClose={() => setEditingQuote(null)}
            />
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};
export default QuotesList;
