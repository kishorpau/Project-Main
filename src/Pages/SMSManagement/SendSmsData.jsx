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
import {
  Box,
  Button,
  Snackbar,
  IconButton,
  Modal,
  Checkbox,
} from "@mui/material";
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
  { width: 50, label: "Select", dataKey: "select" },
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

function fixedHeaderContent(selectAllChecked, handleSelectAll) {
  return (
    <TableRow sx={{ backgroundColor: "#024950" }}>
      <TableCell padding="checkbox">
        <Checkbox
          indeterminate={selectAllChecked === "partial"}
          checked={selectAllChecked === "all"}
          onChange={handleSelectAll}
        />
      </TableCell>
      {columns.slice(1).map((column) => (
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

function rowContent(
  _index,
  row,
  selectedUsers,
  handleSelect,
  handleDelete,
  handleEdit
) {
  return (
    <>
      <TableCell padding="checkbox">
        <Checkbox
          checked={selectedUsers.includes(row.id)}
          onChange={() => handleSelect(row.id)}
        />
      </TableCell>
      {columns.slice(1).map((column) => (
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

export default function CombinedTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState(mockData);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingData, setEditingData] = useState(null);
  const [smsModalOpen, setSmsModalOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [smsMessage, setSmsMessage] = useState("");
  const { register, handleSubmit, reset, setValue } = useForm();

  const handleDelete = (id) => {
    setData((prevData) => prevData.filter((item) => item.id !== id));
    setSelectedUsers((prevSelected) =>
      prevSelected.filter((userId) => userId !== id)
    );
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

  const handleSelect = (id) => {
    setSelectedUsers((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((userId) => userId !== id)
        : [...prevSelected, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === data.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(data.map((user) => user.id));
    }
  };

  const handleOpenSmsModal = () => {
    setSmsModalOpen(true);
  };

  const handleCloseSmsModal = () => {
    setSmsModalOpen(false);
  };

  const handleSendSMSMessage = () => {
    const selectedUserData = data.filter((user) =>
      selectedUsers.includes(user.id)
    );
    console.log("Sending SMS:", smsMessage, "to:", selectedUserData);
    setSmsModalOpen(false);
    setSnackbarOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingData(null);
  };

  const filteredData = data.filter(
    (row) =>
      row.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.phone.includes(searchTerm) ||
      row.alternativePhone.includes(searchTerm)
  );

  const selectAllChecked =
    selectedUsers.length === 0
      ? false
      : selectedUsers.length === data.length
      ? "all"
      : "partial";

  return (
    <Box sx={{ height: 500, width: "100%", mt: "2%" }}>
      <Box
        sx={{ display: "flex", justifyContent: "space-between", padding: "2%" }}
      >
        <Typography variant="h6">DATA Table</Typography>
        <Button
          variant="contained"
          onClick={handleOpenSmsModal}
          sx={{ backgroundColor: "#2f575b" }}
          disabled={selectedUsers.length === 0}
        >
          Send SMS
        </Button>
      </Box>

      <TextField
        label="Search by Full Name or Phone Number"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <Modal open={smsModalOpen} onClose={handleCloseSmsModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 1,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Send SMS to Selected Users
          </Typography>
          <TextField
            label="SMS Message"
            multiline
            rows={4}
            fullWidth
            value={smsMessage}
            onChange={(e) => setSmsMessage(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            onClick={handleSendSMSMessage}
            fullWidth
            sx={{ backgroundColor: "#2f575b" }}
          >
            Send SMS
          </Button>
        </Box>
      </Modal>

      <Paper style={{ height: 400, width: "100%" }}>
        <TableVirtuoso
          data={filteredData}
          components={VirtuosoTableComponents}
          fixedHeaderContent={() =>
            fixedHeaderContent(selectAllChecked, handleSelectAll)
          }
          itemContent={(_index, row) =>
            rowContent(
              _index,
              row,
              selectedUsers,
              handleSelect,
              handleDelete,
              handleEdit
            )
          }
        />
      </Paper>

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{ p: 3, backgroundColor: "white", margin: "auto", width: 400 }}
        >
          <Typography variant="h6">
            {editingData ? "Edit Data" : "Add New Data"}
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="Full Name"
              fullWidth
              margin="normal"
              {...register("fullName", { required: true })}
            />
            <TextField
              label="Phone Number"
              fullWidth
              margin="normal"
              {...register("phoneNumber", { required: true })}
            />
            <TextField
              label="Email"
              fullWidth
              margin="normal"
              {...register("email", { required: true })}
            />
            <TextField
              label="Alternative Phone"
              fullWidth
              margin="normal"
              {...register("altPhone")}
            />
            <TextField
              label="Designation"
              fullWidth
              margin="normal"
              {...register("designation", { required: true })}
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
              fullWidth
              type="submit"
              sx={{ backgroundColor: "#2f575b", mt: 2 }}
            >
              {editingData ? "Update" : "Submit"}
            </Button>
          </form>
        </Box>
      </Modal>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message="Action performed successfully"
      />
    </Box>
  );
}
