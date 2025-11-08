import { createTheme, type Theme } from "@mui/material/styles";

const theme: Theme = createTheme({
  typography: {
    fontFamily: 'Georgia, "Times New Roman", Times, serif',
  },
  palette: {
    primary: {
      main: "#b36b00", // основной цвет (например, тёплый янтарный)
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "& fieldset": {
            borderColor: "#ccc", // обычное состояние
          },
          "&:hover fieldset": {
            borderColor: "#999", // при наведении
          },
          "&.Mui-focused fieldset": {
            borderColor: "#b88b48", // при фокусе
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          "&.Mui-focused": {
            color: "#bfaa8c", // цвет label при фокусе
          },
        },
      },
    },
  },
});

export default theme;
