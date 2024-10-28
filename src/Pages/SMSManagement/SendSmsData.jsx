import React, { useState, useEffect, useMemo } from "react";
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
import { Close as CloseIcon } from "@mui/icons-material";
import { TablePagination } from "@mui/material";
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
import useFetch from "../../hooks/useFetch";
import SendSMSModal from "../../components/SendSMSModal/SendSMSModal";

const columns = [
  { width: 50, label: "Select", dataKey: "select" },
  { width: 50, label: "ID", dataKey: "id" },
  { width: 100, label: "Photo", dataKey: "Column 1" },
  { width: 150, label: "Full Name", dataKey: "Column 2" },
  { width: 150, label: "Phone", dataKey: "Column 3" },
  { width: 200, label: "Email", dataKey: "Column 4" },
  { width: 150, label: "Alt. Phone", dataKey: "Column 5" },
  { width: 150, label: "Designation", dataKey: "Column 6" },
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

function fixedHeaderContent({ allSelected, toggleSelectAll }) {
  return (
    <TableRow sx={{ backgroundColor: "#024950" }}>
      {columns.map((column, index) => (
        <TableCell
          key={column.dataKey}
          align="left"
          sx={{
            width: column.width,
            color: "#fff",
            minHeight: "30px",
            padding: "0.75%",
          }}
        >
          {column.label}
          {column.dataKey === "select" && (
            <Checkbox
              checked={allSelected}
              onChange={toggleSelectAll}
              color="default"
            />
          )}
        </TableCell>
      ))}
    </TableRow>
  );
}

function rowContent(index, row, handleDelete, handleEdit, handleSelectUser) {
  return (
    <>
      {columns.map((column) => (
        <TableCell key={column.dataKey} align="left">
          {column.dataKey === "select" ? (
            <Checkbox
              checked={row.selected || false}
              onChange={() => handleSelectUser(row)}
              color="default"
            />
          ) : column.dataKey === "Column 1" ? (
            <img
              src={row["Column 1"]}
              alt={row["Column 2"]}
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

export default function SendSmsData() {
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [smsModalOpen, setSmsModalOpen] = useState(false);
  const [smsMessage, setSmsMessage] = useState("");
  const [editingData, setEditingData] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { register, handleSubmit, reset, setValue } = useForm();

  useEffect(() => {
    setPage(0);
  }, [searchTerm]);

  const { data, loading, error, createData, updateData, deleteData } = useFetch(
    "https://retoolapi.dev/hsSJ5B/data"
  );

  const handleDelete = (id) => {
    deleteData(id);
  };

  const handleEdit = (row) => {
    setEditingData(row);
    setOpen(true);
    setValue("fullName", row["Column 2"]);
    setValue("phoneNumber", row["Column 3"]);
    setValue("email", row["Column 4"]);
    setValue("altPhone", row["Column 5"]);
    setValue("designation", row["Column 6"]);
  };

  const onSubmit = async (formData) => {
    const newData = {
      "Column 2": formData.fullName,
      "Column 3": formData.phoneNumber,
      "Column 4": formData.email,
      "Column 5": formData.altPhone || "N/A",
      "Column 6": formData.designation,
      "Column 1":
        uploadedImage || formData.photo || "https://via.placeholder.com/50",
    };

    if (editingData) {
      await updateData(editingData.id, newData);
    } else {
      await createData(newData);
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
        setUploadedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectUser = (user) => {
    setSelectedUsers((prev) => {
      if (prev.some((u) => u.id === user.id)) {
        return prev.filter((u) => u.id !== user.id);
      }
      return [...prev, user];
    });
  };

  const toggleSelectAll = () => {
    setSelectedUsers(allSelected ? [] : [...filteredRows]);
  };

  const filteredRows = useMemo(() => {
    return data
      .map((row) => ({
        ...row,
        selected: selectedUsers.some((u) => u.id === row.id),
      }))
      .filter((row) => {
        const fullName = row["Column 2"] ? row["Column 2"].toLowerCase() : "";
        const phone = row["Column 3"] || "";
        const alternativePhone = row["Column 5"] || "";
        return (
          fullName.includes(searchTerm.toLowerCase()) ||
          phone.includes(searchTerm) ||
          alternativePhone.includes(searchTerm)
        );
      });
  }, [data, searchTerm, selectedUsers]);

  const paginatedData = useMemo(() => {
    const start = page * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredRows.slice(start, end);
  }, [filteredRows, page, rowsPerPage]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setEditingData(null);
  };
  const handleSnackbarClose = () => setSnackbarOpen(false);

  const handleOpenSmsModal = () => setSmsModalOpen(true);
  const handleCloseSmsModal = () => setSmsModalOpen(false);

  const handleSendSMSMessage = () => {
    selectedUsers.forEach((user) =>
      console.log(`Sending SMS to ${user["Column 2"]}: ${smsMessage}`)
    );
    setSmsModalOpen(false);
    setSnackbarOpen(true);
  };

  const allSelected =
    selectedUsers.length === filteredRows.length && selectedUsers.length > 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ height: 500, width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          gap: "40%",
        }}
      >
        <Typography variant="h5" color="#2f575b">
          List of Persons
        </Typography>
        <Box sx={{ display: "flex", gap: "2%" }}>
          <Button
            variant="contained"
            onClick={handleOpen}
            sx={{
              backgroundColor: "#2f575b",
              height: "70%",
              width: "50%",
              marginTop: "1%",
            }}
          >
            {editingData ? "Edit Person" : "Add new person"}
          </Button>
          <Button
            variant="contained"
            onClick={handleOpenSmsModal}
            sx={{
              backgroundColor: "#2f575b",
              height: "70%",
              width: "50%",
              marginTop: "1%",
            }}
          >
            Send SMS to Selected
          </Button>
          <TextField
            label="Search..."
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              height: "70%",
              width: "100%",
              marginBottom: "1%",
            }}
          />
        </Box>
      </Box>

      <Modal open={open}>
        <Box
          sx={{
            p: 3,
            backgroundColor: "white",
            margin: "auto",
            width: 400,
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6">
              {editingData ? "Edit User" : "Add User"}
            </Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
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
              margin="normal"
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              {...register("email")}
              required
              margin="normal"
            />
            <TextField
              label="Alternative Phone"
              variant="outlined"
              fullWidth
              {...register("altPhone")}
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
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <Button
              type="submit"
              variant="contained"
              sx={{ backgroundColor: "#024950", marginTop: "10px" }}
            >
              {editingData ? "Update User" : "Add User"}
            </Button>
          </form>
        </Box>
      </Modal>

      <Paper style={{ height: 500, width: "100%" }}>
        <TableVirtuoso
          data={paginatedData}
          components={VirtuosoTableComponents}
          fixedHeaderContent={() =>
            fixedHeaderContent({ allSelected, toggleSelectAll })
          }
          itemContent={(index, row) =>
            rowContent(index, row, handleDelete, handleEdit, handleSelectUser)
          }
        />
        <TablePagination
          component="div"
          count={filteredRows.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message="Action successful!"
      />

      <SendSMSModal
        smsModalOpen={smsModalOpen}
        smsMessage={smsMessage}
        handleCloseSmsModal={handleCloseSmsModal}
        handleSendSMSMessage={handleSendSMSMessage}
        setSmsMessage={setSmsMessage}
      />
    </Box>
  );
}
