import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import BookIcon from "@mui/icons-material/Book";
import MenuIcon from "@mui/icons-material/Menu";
interface HeaderProps {
  onMenuClick?: () => void;
}

function Header({ onMenuClick }: HeaderProps) {
  return (
    <AppBar sx={{ backgroundColor: "#bfae96" }}>
      <Toolbar sx={{ display: "flex", alignItems: "center" }}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={onMenuClick}
          sx={{
            mr: 2,
            color: "#5a4a3a",
            "&:hover": {
              backgroundColor: "rgba(90, 74, 58, 0.04)",
            },
          }}
        >
          <MenuIcon sx={{ fontSize: 30 }} />
        </IconButton>

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
