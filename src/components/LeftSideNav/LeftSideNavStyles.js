export const listItemButtonStyles = (isActive) => ({
  backgroundColor: isActive ? "#2f575b" : "transparent",
  color: isActive ? "#fff" : "#000",
  "&:hover": {
    backgroundColor: isActive ? "#1A393D" : "transparent",
  },
  fontSize: {
    xs: "12px",
    sm: "14px",
    md: "16px",
  },
  padding: {
    xs: "8px",
    sm: "10px",
    md: "12px",
  },
});

export const linkStyles = {
  textDecoration: "none",
  color: "black",
  fontSize: {
    xs: "12px",
    sm: "14px",
    md: "16px",
  },
};

export const drawerPaperStyles = {
  height: {
    xs: "70vh",
    sm: "75vh",
    md: "80vh",
  },
  top: {
    xs: "5%",
    sm: "8%",
    md: "10%",
  },
  position: "fixed",
};

export const menuButtonStyles = {
  position: "absolute",
  color: "#2f575b",
  fontSize: {
    xs: "14px",
    sm: "16px",
    md: "18px",
  },
};
