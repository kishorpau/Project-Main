const styles = {
  mainContainer: {
    display: "flex",
    flexDirection: "row",
    flexGrow: 1,
    width: "100%",
    maxWidth: "100vw",
    bgcolor: "#f4f6f8",
  },
  chartContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    gap: 3,
    width: "100%",
  },
  contentArea: {
    flex: 1,
    padding: 3,
    display: "flex",
    flexDirection: "column",
    gap: 4,
    overflow: "auto",
  },
  chartGrid: {
    paddingTop: 2,
  },
  card: {
    padding: 2,
    bgcolor: "background.paper",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    borderRadius: 2,
    transition: "transform 0.2s ease-in-out",
    "&:hover": {
      transform: "scale(1.02)",
      boxShadow: "0 6px 16px rgba(0, 0, 0, 0.15)",
    },
  },
  title: {
    fontSize: 18,
    fontWeight: 600,
    color: "#333",
    marginBottom: 2,
  },
};

export default styles;
