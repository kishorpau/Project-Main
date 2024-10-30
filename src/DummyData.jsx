import React, { useState, useCallback, useEffect, useMemo } from "react";
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
import { useForm, Controller } from "react-hook-form";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { read, utils, writeFileXLSX } from "xlsx";
import { Sms } from "@mui/icons-material";
import useFetch from "./hooks/useFetch";
import { Close as CloseIcon } from "@mui/icons-material";
import { TablePagination, Chip, Switch } from "@mui/material";
import SendSMSModal from "./components/SendSMSModal/SendSMSModal";
import DeleteModal from "./components/DeleteModal/DeleteModal";
import {
  emailRequired,
  emailInvalid,
  phoneRequired,
  phoneInvalid,
  DesignationRequired,
} from "../src/utils/constants/form/index";
const columns = [
  { width: 40, label: "ID", dataKey: "id" },
  { width: 100, label: "Photo", dataKey: "Column 1" },
  { width: 100, label: "Status", dataKey: "Status" },
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

function rowContent(_index, row, handleDelete, handleEdit, handleOpenSmsModal) {
  return (
    <>
      {columns.map((column) => (
        <TableCell key={column.dataKey} align="left">
          {column.dataKey === "Column 1" ? (
            <img
              src={row["Column 1"]}
              alt={row["Column 2"]}
              style={{ width: "50px", borderRadius: "50%" }}
            />
          ) : column.dataKey === "actions" ? (
            <Box
              sx={{
                minWidth: "100px",
                display: "flex",
                justifyContent: "space-evenly",
              }}
            >
              <IconButton onClick={() => handleEdit(row)}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => handleOpenSmsModal(row)}>
                <Sms />
              </IconButton>
              <IconButton onClick={() => handleDelete(row.id)}>
                <DeleteIcon />
              </IconButton>
            </Box>
          ) : column.dataKey === "Status" ? (
            <Chip
              label={row.Status ? "Active" : "Inactive"}
              color={row.Status ? "success" : "default"}
              sx={{
                backgroundColor: row.Status ? "success.main" : "#f44336",
                color: "white",
              }}
            />
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
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [smsModalOpen, setSmsModalOpen] = useState(false);
  const [smsMessage, setSmsMessage] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [editingData, setEditingData] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const { register, handleSubmit, reset, setValue, control } = useForm();

  useEffect(() => {
    setPage(0);
  }, [searchTerm]);

  const { data, createData, updateData, deleteData } = useFetch(
    "https://retoolapi.dev/hsSJ5B/data"
  );

  const handleDelete = (id) => {
    setUserIdToDelete(id);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    deleteData(userIdToDelete);
    setDeleteModalOpen(false);
  };

  const cancelDelete = () => {
    setDeleteModalOpen(false);
    setUserIdToDelete(null);
  };

  const handleEdit = (row) => {
    setEditingData(row);
    setOpen(true);
    setValue("fullName", row["Column 2"]);
    setValue("phoneNumber", row["Column 3"]);
    setValue("email", row["Column 4"]);
    setValue("altPhone", row["Column 5"]);
    setValue("designation", row["Column 6"]);
    setValue("Status", row["Status"]);
    setValue("photo", row["Column 1"]);
  };

  const onSubmit = async (formData) => {
    const newData = {
      "Column 2": formData.fullName,
      "Column 3": formData.phoneNumber,
      "Column 4": formData.email,
      "Column 5": formData.altPhone || "N/A",
      "Column 6": formData.designation,
      Status: formData.Status,
      "Column 1": formData.photo || "https://via.placeholder.com/50",
    };

    try {
      if (editingData) {
        await updateData(editingData.id, newData);
      } else {
        await createData(newData);
      }

      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      reset();
      handleClose();
    }
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

  const filteredRows = useMemo(() => {
    return data.filter((row) => {
      const fullName = row["Column 2"] ? row["Column 2"].toLowerCase() : "";
      const phone = row["Column 3"] || "";
      const alternativePhone = row["Column 5"] || "";
      return (
        fullName.includes(searchTerm.toLowerCase()) ||
        phone.includes(searchTerm) ||
        alternativePhone.includes(searchTerm)
      );
    });
  }, [data, searchTerm]);
  const paginatedData = useMemo(() => {
    const start = page * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredRows.slice(start, end);
  }, [filteredRows, page, rowsPerPage]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setEditingData(null);
    reset();
  };
  const handleSnackbarClose = () => setSnackbarOpen(false);
  const handleOpenSmsModal = (user) => {
    setSelectedUser(user);
    setSmsModalOpen(true);
  };

  const handleCloseSmsModal = () => {
    setSmsModalOpen(false);
  };

  const handleSendSMSMessage = () => {
    setSmsModalOpen(false);
    setSnackbarOpen(true);
  };

  const exportFile = useCallback(() => {
    const ws = utils.json_to_sheet(data);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Data");
    writeFileXLSX(wb, "DummyData.xlsx");
  }, [data]);

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
          justifyContent: "space-between",
          padding: "1%",
        }}
      >
        <Typography variant="h5" color="#2f575b">
          List of Persons
        </Typography>
        <Box sx={{ display: "flex", gap: "2%" }}>
          <Button
            variant="contained"
            onClick={handleOpen}
            size="small"
            sx={{
              backgroundColor: "#2f575b",
              width: "80%",
            }}
          >
            {editingData ? "Edit Person" : "Add new person"}
          </Button>
          <Button
            variant="contained"
            onClick={exportFile}
            size="small"
            sx={{
              backgroundColor: "#2f575b",
              width: "80%",
            }}
          >
            Export Data
          </Button>
          <TextField
            label="Search..."
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ height: "70%", width: "100%" }}
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
              {...register("phoneNumber", {
                required: phoneRequired,
              })}
              margin="normal"
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              {...register("email", {
                required: emailRequired,
              })}
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
              {...register("designation", { required: DesignationRequired })}
              required
              margin="normal"
            />
            <Box>
              <Typography variant="h6">Status</Typography>
              <Controller
                name="Status"
                control={control}
                defaultValue={
                  editingData && editingData.Status !== undefined
                    ? editingData.Status
                    : false
                }
                render={({ field }) => (
                  <Switch
                    {...field}
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                    color="primary"
                  />
                )}
              />
            </Box>
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

      <Paper style={{ height: 490, width: "100%" }}>
        <TableVirtuoso
          data={paginatedData}
          components={VirtuosoTableComponents}
          fixedHeaderContent={fixedHeaderContent}
          itemContent={(index, row) =>
            rowContent(index, row, handleDelete, handleEdit, handleOpenSmsModal)
          }
        />
        <TablePagination
          component="div"
          count={data.length}
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
      <DeleteModal
        open={deleteModalOpen}
        handleClose={cancelDelete}
        handleConfirm={confirmDelete}
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
