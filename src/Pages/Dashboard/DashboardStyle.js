// styles.js
const styles = {
  mainContainer: {
    display: "flex",
    flexDirection: "row",
    flexGrow: 1,
  },
  sidebar: {
    width: {
      xs: "100%",
      sm: "25%",
      md: "20%",
    },
    display: "flex",
    flexDirection: "column",
  },
  contentArea: {
    width: {
      xs: "100%",
      sm: "75%",
      md: "80%",
    },
    padding: 2,
  },
  cardContainer: {
    flex: "1 1 100%",
    minWidth: "300px",
  },
  card: {
    flex: 1,
    bgcolor: "#f5f5f5",
    boxShadow: 3,
    borderRadius: 2,
    marginBottom: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 1,
  },
  chartContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: 3,
  },
};

export default styles;
