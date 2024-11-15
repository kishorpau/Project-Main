import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  TextField,
  Box,
  IconButton,
  TablePagination,
  Modal,
  Switch,
  Select,
  MenuItem,
  Chip,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Edit as EditIcon, Close as CloseIcon } from "@mui/icons-material";
import Grid from "@mui/material/Grid2";
import { TableVirtuoso } from "react-virtuoso";
import useFetch from "../../hooks/useFetch";
import { useForm } from "react-hook-form";
import OfficeFormModal from "../../components/OfficeFormModal/OfficeFormModal";
import { ADMIN_USER_LIST_URL } from "../../api/api";

const columns = [
  { width: 40, label: "ID", dataKey: "id" },
  { width: 100, label: "Full Name", dataKey: "FullName" },
  { width: 200, label: "Email", dataKey: "Email" },
  { width: 100, label: "Phone Number", dataKey: "PhoneNumber" },
  { width: 100, label: "Status", dataKey: "Status" },
  { width: 100, label: "Role", dataKey: "Role" },
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

function rowContent(_index, row, handleEdit) {
  return (
    <>
      {columns.map((column) => (
        <TableCell key={column.dataKey} align="left">
          {column.dataKey === "actions" ? (
            <Box>
              <IconButton onClick={() => handleEdit(row)}>
                <EditIcon />
              </IconButton>
            </Box>
          ) : column.dataKey === "Status" ? (
            <Chip
              label={row.Status ? "Active" : "Inactive"}
              color={row.Status ? "success" : "default"}
            />
          ) : column.dataKey === "Role" ? (
            row.Role
          ) : (
            row[column.dataKey] || "N/A"
          )}
        </TableCell>
      ))}
    </>
  );
}

export default function AdminUserListDummyData() {
  const { Office, id } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [editingData, setEditingData] = useState(null);
  const { register, handleSubmit, reset, setValue, watch } = useForm();
  const { data, loading, error, createData, updateData } =
    useFetch(ADMIN_USER_LIST_URL);

  useEffect(() => {
    setPage(0);
  }, [searchTerm]);

  const onSubmit = async (formData) => {
    const newData = {
      FullName: formData.FullName,
      PhoneNumber: formData.PhoneNumber,
      Email: formData.email,
      Status: formData.Status,
      Role: formData.Role,
    };

    try {
      if (editingData) {
        await updateData(editingData.id, newData);
      } else {
        await createData(newData);
      }
      reset();
      handleClose();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setEditingData(null);
    reset();
  };

  const handleEdit = (row) => {
    setEditingData(row);
    setOpen(true);
    setValue("FullName", row["FullName"] || "");
    setValue("PhoneNumber", row["PhoneNumber"] || "");
    setValue("email", row["Email"] || "");
    setValue("Status", row["Status"] || false);
    setValue("Role", row["Role"] || "");
  };

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) =>
    setRowsPerPage(parseInt(event.target.value, 10));

  return (
    <>
      <Box sx={{ height: 500, width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: "1%",
          }}
        >
          <Typography variant="h5" color="#2f575b">
            {Office} user list
          </Typography>
          <Box sx={{ display: "flex", gap: "2%" }}>
            <Button
              variant="contained"
              onClick={handleOpen}
              size="small"
              sx={{ backgroundColor: "#2f575b", width: "80%" }}
            >
              {editingData ? "Edit User" : "Add new User"}
            </Button>
            <TextField
              label="Search..."
              variant="outlined"
              fullWidth
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Box>
        </Box>
        <Paper style={{ height: 490, width: "100%" }}>
          <TableVirtuoso
            data={data}
            components={VirtuosoTableComponents}
            fixedHeaderContent={fixedHeaderContent}
            itemContent={(index, row) => rowContent(index, row, handleEdit)}
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
      </Box>

      <OfficeFormModal
        open={open}
        handleClose={handleClose}
        onSubmit={onSubmit}
        defaultValues={editingData}
      />
    </>
  );
}
