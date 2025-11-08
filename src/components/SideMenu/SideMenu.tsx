import { type JSX } from "react";
import AddIcon from "@mui/icons-material/Add";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
} from "@mui/material";

interface MenuItem {
  text: string;
  icon: JSX.Element;
  key: "form" | "list";
}

interface SideMenuProps {
  open: boolean;
  onClose: () => void;
  onSelect: (component: "form" | "list") => void;
}

const menuItems: MenuItem[] = [
  { text: "Добавить цитату", icon: <AddIcon />, key: "form" },
  { text: "Cписок цитат", icon: <FormatQuoteIcon />, key: "list" },
];

function SideMenu({ open, onClose, onSelect }: SideMenuProps) {
  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.key} disablePadding>
            <ListItemButton
              onClick={() => {
                onSelect(item.key);
                onClose();
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
export default SideMenu;
