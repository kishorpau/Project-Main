import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { TableVirtuoso } from "react-virtuoso";
import TextField from "@mui/material/TextField";
import { Box, Button, Snackbar, IconButton, Modal } from "@mui/material";
import { useForm } from "react-hook-form";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const mockData = [
  {
    id: 1,
    fullName: "John Doe",
    phone: "123-456-7890",
    email: "john@example.com",
    alternativePhone: "987-654-3210",
    designation: "Manager",
    photo: "https://via.placeholder.com/50",
  },
  {
    id: 2,
    fullName: "Jane Smith",
    phone: "234-567-8901",
    email: "jane@example.com",
    alternativePhone: "876-543-2109",
    designation: "Supervisor",
    photo: "https://via.placeholder.com/50",
  },
];

const columns = [
  { width: 50, label: "ID", dataKey: "id" },
  { width: 100, label: "Photo", dataKey: "photo" },
  { width: 150, label: "Full Name", dataKey: "fullName" },
  { width: 150, label: "Phone", dataKey: "phone" },
  { width: 200, label: "Email", dataKey: "email" },
  { width: 150, label: "Alt. Phone", dataKey: "alternativePhone" },
  { width: 150, label: "Designation", dataKey: "designation" },

  { width: 100, label: "Actions", dataKey: "actions" },
];

const VirtuosoTableComponents = {
  Scroller: React.forwardRef((props, ref) => (
    <TableContainer component={Paper} {...props} ref={ref} />
  )),
  Table: (props) => (
    <Table
      {...props}
      sx={{ borderCollapse: "separate", tableLayout: "fixed" }}
    />
  ),
  TableHead: React.forwardRef((props, ref) => (
    <TableHead {...props} ref={ref} />
  )),
  TableRow,
  TableBody: React.forwardRef((props, ref) => (
    <TableBody {...props} ref={ref} />
  )),
};

function fixedHeaderContent() {
  return (
    <TableRow sx={{ backgroundColor: "#024950" }}>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          align="left"
          sx={{ width: column.width, color: "#fff" }}
        >
          {column.label}
        </TableCell>
      ))}
    </TableRow>
  );
}

function rowContent(_index, row, handleDelete, handleEdit) {
  return (
    <>
      {columns.map((column) => (
        <TableCell key={column.dataKey} align="left">
          {column.dataKey === "photo" ? (
            <img
              src={row[column.dataKey]}
              alt={row.fullName}
              style={{ width: "50px", borderRadius: "50%" }}
            />
          ) : column.dataKey === "actions" ? (
            <Box>
              <IconButton onClick={() => handleEdit(row)}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => handleDelete(row.id)}>
                <DeleteIcon />
              </IconButton>
            </Box>
          ) : (
            row[column.dataKey]
          )}
        </TableCell>
      ))}
    </>
  );
}

export default function DummyData() {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState(mockData);
  const [open, setOpen] = useState(false);
  const [editingData, setEditingData] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const { register, handleSubmit, reset, setValue } = useForm();

  const handleDelete = (id) => {
    setData((prevData) => prevData.filter((item) => item.id !== id));
  };

  const handleEdit = (row) => {
    setEditingData(row);
    setOpen(true);
    setValue("fullName", row.fullName);
    setValue("phoneNumber", row.phone);
    setValue("email", row.email);
    setValue("altPhone", row.alternativePhone);
    setValue("designation", row.designation);
  };

  const onSubmit = (formData) => {
    const newData = {
      id: editingData ? editingData.id : data.length + 1,
      fullName: formData.fullName,
      phone: formData.phoneNumber,
      email: formData.email,
      alternativePhone: formData.altPhone || "N/A",
      designation: formData.designation,
      photo: formData.photo || "https://via.placeholder.com/50",
    };

    if (editingData) {
      setData((prevData) =>
        prevData.map((item) => (item.id === editingData.id ? newData : item))
      );
      setEditingData(null);
    } else {
      setData((prevData) => [...prevData, newData]);
    }

    reset();
    handleClose();
    setSnackbarOpen(true);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setValue("photo", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const filteredRows = data.filter(
    (row) =>
      row.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.phone.includes(searchTerm) ||
      row.alternativePhone.includes(searchTerm)
  );

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setEditingData(null);
  };
  const handleSnackbarClose = () => setSnackbarOpen(false);

  return (
    <Box sx={{ height: 500, width: "100%", mt: "2%" }}>
      <Box
        sx={{ display: "flex", justifyContent: "space-between", padding: "2%" }}
      >
        <Typography variant="h6">DATA Table</Typography>
        <Button
          variant="contained"
          onClick={handleOpen}
          sx={{ backgroundColor: "#2f575b" }}
        >
          {editingData ? "Edit Person" : "Add new person"}
        </Button>
      </Box>

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{ p: 3, backgroundColor: "white", margin: "auto", width: 400 }}
        >
          <Typography variant="h5">User Information Form</Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="Full Name"
              variant="outlined"
              fullWidth
              {...register("fullName")}
              required
              margin="normal"
            />

            <TextField
              label="Phone Number"
              variant="outlined"
              fullWidth
              {...register("phoneNumber")}
              required
              type="tel"
              margin="normal"
            />

            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              {...register("email")}
              required
              type="email"
              margin="normal"
            />

            <TextField
              label="Alternative Phone"
              variant="outlined"
              fullWidth
              {...register("altPhone")}
              type="tel"
              margin="normal"
            />

            <TextField
              label="Designation"
              variant="outlined"
              fullWidth
              {...register("designation")}
              required
              margin="normal"
            />

            <Button variant="outlined" component="label" fullWidth>
              Upload Photo
              <input
                type="file"
                onChange={handleFileChange}
                accept="image/*"
                hidden
              />
            </Button>

            <Button
              variant="contained"
              type="submit"
              sx={{ mt: 2, backgroundColor: "#2f575b" }}
              fullWidth
            >
              {editingData ? "Save Changes" : "Submit"}
            </Button>
          </form>
        </Box>
      </Modal>

      <TextField
        label="Search by Full Name or Phone Number"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <TableVirtuoso
        data={filteredRows}
        components={VirtuosoTableComponents}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={(_index, row) =>
          rowContent(_index, row, handleDelete, handleEdit)
        }
      />

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message="Operation successful!"
      />
    </Box>
  );
}
