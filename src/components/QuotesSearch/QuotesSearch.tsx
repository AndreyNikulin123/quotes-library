import { useState } from "react";
import { useQuotesSearch } from "../../hooks/useQuotesSearch";
import { Box, TextField, Typography } from "@mui/material";
import LoadingSpinner from "../../shared/ui/LoadingSpinner";
import QuoteCard from "../QuoteCard/QuoteCard";
import type { Quote } from "../../types/models";

const QuotesSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { quotes, loading, error } = useQuotesSearch(searchTerm);

  return (
    <Box sx={{ p: 2, maxWidth: 800, mx: "auto" }}>
      <TextField
        label="Поиск цитат"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 3 }}
      />

      {loading && <LoadingSpinner />}

      {error && (
        <Typography color="error">Ошибка при загрузке цитат</Typography>
      )}

      {!loading && !error && quotes.length === 0 && searchTerm && (
        <Typography>Ничего не найдено</Typography>
      )}

      {quotes.map((quote: Quote) => (
        <QuoteCard key={quote.id} quote={quote} />
      ))}
    </Box>
  );
};

export default QuotesSearch;
