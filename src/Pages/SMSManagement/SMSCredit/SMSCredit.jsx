import React, { useState, useEffect, useMemo } from "react";
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
} from "@mui/material";
import { Edit as EditIcon, Close as CloseIcon } from "@mui/icons-material";
import { TableVirtuoso } from "react-virtuoso";
import useFetch from "../../../hooks/useFetch";
import { useForm, Controller } from "react-hook-form";
import dayjs from "dayjs";
import { getAdminUserListPages } from "../../SuperAdmin/AdminUserListPages";
import NavBar from "../../../components/NavBar/NavBar";
import LeftSideNav from "../../../components/LeftSideNav/LeftSideNav";
import { SMS_CREDIT_URL } from "../../../api/api";

const columns = [
  { width: 40, label: "ID", dataKey: "id" },
  { width: 250, label: "Date", dataKey: "Date" },
  { width: 150, label: "Credit", dataKey: "Credit" },
  { width: 150, label: "Actions", dataKey: "actions" },
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
          ) : (
            row[column.dataKey] || "N/A"
          )}
        </TableCell>
      ))}
    </>
  );
}

export default function SMSCredit() {
  const { Office, id } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [editingData, setEditingData] = useState(null);
  const { data, loading, error, createData, updateData } =
    useFetch(SMS_CREDIT_URL);
  const { control, handleSubmit, reset, setValue } = useForm();
  const navItems = getAdminUserListPages(Office);

  useEffect(() => {
    setPage(0);
  }, [searchTerm]);

  const onSubmit = async (formData) => {
    const newData = {
      Date: formData.Date,
      Credit: formData.Credit,
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
    setValue("Date", row["Date"] || dayjs().format("YYYY-MM-DD"));
    setValue("Credit", row["Credit"] || "");
  };

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredRows = useMemo(() => {
    return data.filter((row) => {
      return (
        row["Date"].includes(searchTerm) || row["Credit"].includes(searchTerm)
      );
    });
  }, [data, searchTerm]);

  const paginatedData = useMemo(() => {
    const start = page * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredRows.slice(start, end);
  }, [filteredRows, page, rowsPerPage]);

  return (
    <>
      <NavBar />
      <LeftSideNav navItems={navItems}>
        <Box sx={{ height: 500, width: "100%" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              padding: "1%",
            }}
          >
            <Typography variant="h5" color="#2f575b">
              {Office} SMS Credit Records
            </Typography>
            <Box sx={{ display: "flex", gap: "2%" }}>
              <Button
                variant="contained"
                onClick={handleOpen}
                size="small"
                sx={{ backgroundColor: "#2f575b", width: "80%" }}
              >
                {editingData ? "Edit SMS Credit" : "Add SMS Credit"}
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
              data={paginatedData}
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

        <Modal open={open} onClose={handleClose}>
          <Paper
            elevation={3}
            sx={{ p: 2, width: "100%", maxWidth: 400, margin: "auto" }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                padding: "2%",
              }}
            >
              <Typography variant="h5" sx={{ mb: 3, textAlign: "center" }}>
                {editingData ? "Edit SMS Credit" : "Add SMS Credit"}
              </Typography>
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Box>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box sx={{ mb: 2 }}>
                <Controller
                  name="Date"
                  control={control}
                  defaultValue={dayjs().format("YYYY-MM-DD")}
                  render={({ field }) => (
                    <TextField {...field} label="Date" type="date" fullWidth />
                  )}
                />
              </Box>
              <Box sx={{ mb: 2 }}>
                <Controller
                  name="Credit"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="SMS Credit"
                      type="number"
                      fullWidth
                      required
                    />
                  )}
                />
              </Box>
              <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ maxWidth: 200, backgroundColor: "#2f575b" }}
                >
                  {editingData ? "Update" : "Add"}
                </Button>
              </Box>
            </form>
          </Paper>
        </Modal>
      </LeftSideNav>
    </>
  );
}
