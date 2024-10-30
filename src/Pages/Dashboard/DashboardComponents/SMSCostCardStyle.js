const styles = {
  card: {
    flex: 1,
    height: 150,
    bgcolor: "#f5f5f5",
    background: "linear-gradient( 135deg, #92FFC0 10%, #002661 100%)",
    boxShadow: 3,
    borderRadius: 2,
    transition: "transform 0.2s ease-in-out",
    "&:hover": {
      transform: "scale(1.02)",
      boxShadow: "0 6px 16px rgba(0, 0, 0, 0.15)",
    },
    minWidth: "30%",
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
    justifyContent: "space-between",
    gap: 2,
    flexWrap: "wrap",
  },
};

export default styles;
