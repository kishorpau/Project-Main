export const listItemButtonStyles = (isActive) => ({
  backgroundColor: isActive ? "#2f575b" : "transparent",
  color: isActive ? "#fff" : "#000",
  "&:hover": {
    backgroundColor: isActive ? "#1A393D" : "transparent",
  },
});

export const linkStyles = {
  textDecoration: "none",
  color: "black",
};

export const drawerPaperStyles = {
  height: "80vh",
  top: "10vh",
  position: "fixed",
};

export const menuButtonStyles = {
  color: "#2f575b",
};
