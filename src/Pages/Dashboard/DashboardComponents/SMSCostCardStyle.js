const styles = {
  card: {
    flex: 0.1,
    height: 150,
    color: "#fff",
    background: "linear-gradient(135deg, #025050, #028282)",
    boxShadow: 3,
    borderRadius: 1,
    transition: "transform 0.2s ease-in-out",
    "&:hover": {
      transform: "scale(1.02)",
      boxShadow: "0 6px 16px rgba(0, 0, 0, 0.15)",
    },
    minWidth: "25%",
    marginX: "2%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  body: {
    fontSize: 18,
  },
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    gap: 1,
    flexWrap: "wrap",
  },
};

export default styles;
