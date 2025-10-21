import { AppBar, Toolbar, Typography } from "@mui/material";
import BookIcon from "@mui/icons-material/Book";

function Header() {
  return (
    <AppBar sx={{ backgroundColor: "#bfae96" }}>
      <Toolbar sx={{ display: "flex", alignItems: "center" }}>
        <BookIcon sx={{ fontSize: 50, mr: "2" }}></BookIcon>
        <Typography
          sx={{
            fontSize: "2.5rem",
            color: "#5a4a3a",
            m: "auto",
            fontWeight: 400,
            flexGrow: 1,
            textAlign: "center",
            letterSpacing: "1px",
          }}
        >
          Библиотека цитат
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
