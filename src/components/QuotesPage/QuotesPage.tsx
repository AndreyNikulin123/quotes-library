import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import QuotesSearch from "../QuotesSearch/QuotesSearch";
import QuotesList from "../QuotesList/QuotesList";

const QuotesPage = () => {
  const [tab, setTab] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  return (
    <Box sx={{ p: 2, maxWidth: 900, mx: "auto" }}>
      <Tabs value={tab} onChange={handleChange} centered sx={{ mb: 3 }}>
        <Tab label="Все цитаты" />
        <Tab label="Поиск" />
      </Tabs>

      {tab === 0 && <QuotesList />}
      {tab === 1 && <QuotesSearch />}
    </Box>
  );
};
export default QuotesPage;
