const styles = {
  mainContainer: {
    display: "flex",
    flexDirection: "row",
    flexGrow: 1,
    width: "100%", // Ensure it occupies full width
    maxWidth: "100vw", // Prevent overflow beyond viewport width
  },
  contentArea: {
    flex: 1, // Allow it to grow and fill the available space
    padding: 2,
    display: "flex",
    flexDirection: "column", // Stack the cost card on top of the charts
    overflow: "auto", // Handle overflow if content is too large
  },
  cardContainer: {
    flex: "1 1 300px", // Allow cards to grow and fill space, set a minimum width
    display: "flex", // Center cards
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 3, // Add some space between rows
  },
  card: {
    flex: 1,
    bgcolor: "#f5f5f5",
    boxShadow: 3,
    borderRadius: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 1,
  },
  chartContainer: {
    display: "flex",
    marginTop: "2%",
    flexDirection: "column",
    gap: 3,
    justifyContent: "flex-start",
  },
};

export default styles;
