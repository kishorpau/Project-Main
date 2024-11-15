import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Grid from "@mui/material/Grid2";
import {
  Paper,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import { TableVirtuoso } from "react-virtuoso";
import TextField from "@mui/material/TextField";
import { Box, IconButton, TablePagination, Modal } from "@mui/material";
import { Edit as EditIcon, Close as CloseIcon } from "@mui/icons-material";
import useFetch from "../../hooks/useFetch";
import { useForm } from "react-hook-form";
import { PROVINCE_DISTRICT_PALIKA_LIST as officedata } from "../../utils/constants/form/AddressData";
import { OFFICES_URL } from "../../api/api";

const columns = [
  { width: 40, label: "ID", dataKey: "id" },
  { width: 100, label: "Office Name", dataKey: "OfficeName" },
  { width: 140, label: "Province", dataKey: "Province" },
  { width: 100, label: "District", dataKey: "District" },
  { width: 250, label: "Municipality", dataKey: "Municipality" },
  { width: 200, label: "Address", dataKey: "Address" },
  { width: 200, label: "Email", dataKey: "Email" },
  { width: 100, label: "Contact No", dataKey: "ContactNo" },
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

function removeWhiteSpace(str) {
  return str.replace(/\s+/g, "");
}
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
          ) : column.dataKey === "OfficeName" ? (
            <Link
              to={`/User/${removeWhiteSpace(row["OfficeName"])}`}
              style={{ color: "#024950", textDecoration: "none" }}
            >
              {row[column.dataKey] || "N/A"}
            </Link>
          ) : (
            row[column.dataKey] || "N/A"
          )}
        </TableCell>
      ))}
    </>
  );
}

export default function DummyData() {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [editingData, setEditingData] = useState(null);
  const { register, handleSubmit, reset, setValue } = useForm();
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedMunicipality, setSelectedMunicipality] = useState("");
  const { data, loading, error, createData, updateData } =
    useFetch(OFFICES_URL);
  useEffect(() => {
    setPage(0);
  }, [searchTerm]);

  const provinces = officedata.map((item) => ({
    value: item.value,
    label: item.label,
  }));

  const districts = selectedProvince
    ? officedata.find((item) => item.value === selectedProvince)?.districts ||
      []
    : [];

  const municipalities = selectedDistrict
    ? districts.find((district) => district.value === selectedDistrict)
        ?.palikas || []
    : [];

  const onSubmit = async (formData) => {
    const newData = {
      OfficeName: formData.OfficeName,
      Province: selectedProvince,
      District: selectedDistrict,
      Municipality: selectedMunicipality,
      ContactNo: formData.contactNumber,
      Email: formData.email,
      Address: formData.Address,
    };

    try {
      if (editingData) {
        await updateData(editingData.id, newData);
      } else {
        await createData(newData);
      }
      reset();
      setSelectedProvince("");
      setSelectedDistrict("");
      setSelectedMunicipality("");
      handleClose();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const filteredRows = useMemo(() => {
    return data.filter((row) => {
      const officeName = row["OfficeName"]
        ? row["OfficeName"].toLowerCase()
        : "";
      const municipality = row["Municipality"] || "";
      return (
        officeName.includes(searchTerm.toLowerCase()) ||
        municipality.includes(searchTerm)
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
  const handleEdit = (row) => {
    setEditingData(row);
    setOpen(true);
    setValue("OfficeName", row["OfficeName"] || "");
    setValue("contactNumber", row["ContactNo"] || "");
    setValue("email", row["Email"] || "");
    setValue("Address", row["Address"] || "");
    setSelectedProvince(row["Province"] || "");
    setSelectedDistrict(row["District"] || "");
    setSelectedMunicipality(row["Municipality"] || "");
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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
            List of Offices
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
              {editingData ? "Edit Office" : "Add new Office"}
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

      <Modal open={open}>
        <Paper
          elevation={3}
          sx={{ p: 2, width: "100%", maxWidth: 700, margin: "auto" }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              padding: "2%",
            }}
          >
            <Typography variant="h5" sx={{ mb: 3, textAlign: "center" }}>
              Office Information Form
            </Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid size={6}>
                <TextField
                  label="Office Name"
                  variant="outlined"
                  fullWidth
                  {...register("OfficeName")}
                  required
                  margin="normal"
                />
              </Grid>
              <Grid size={6}>
                <FormControl fullWidth margin="normal">
                  <InputLabel id="province-label">Province</InputLabel>
                  <Select
                    labelId="province-label"
                    value={selectedProvince}
                    onChange={(e) => {
                      setSelectedProvince(e.target.value);
                      setSelectedDistrict("");
                      setSelectedMunicipality("");
                    }}
                    label="Province"
                    required
                  >
                    <MenuItem value="">
                      <em>Select Province</em>
                    </MenuItem>
                    {provinces.map((province) => (
                      <MenuItem key={province.value} value={province.value}>
                        {province.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={6}>
                <FormControl
                  fullWidth
                  margin="normal"
                  disabled={!selectedProvince}
                >
                  <InputLabel id="district-label">District</InputLabel>
                  <Select
                    labelId="district-label"
                    value={selectedDistrict}
                    onChange={(e) => {
                      setSelectedDistrict(e.target.value);
                      setSelectedMunicipality("");
                    }}
                    label="District"
                    required
                  >
                    <MenuItem value="">
                      <em>Select District</em>
                    </MenuItem>
                    {districts.map((district) => (
                      <MenuItem key={district.value} value={district.value}>
                        {district.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={6}>
                <FormControl
                  fullWidth
                  margin="normal"
                  disabled={!selectedDistrict}
                >
                  <InputLabel id="municipality-label">Municipality</InputLabel>
                  <Select
                    labelId="municipality-label"
                    value={selectedMunicipality}
                    onChange={(e) => {
                      setSelectedMunicipality(e.target.value);
                    }}
                    label="Municipality"
                    required
                  >
                    <MenuItem value="">
                      <em>Select Municipality</em>
                    </MenuItem>
                    {municipalities.map((municipality) => (
                      <MenuItem
                        key={municipality.value}
                        value={municipality.value}
                      >
                        {municipality.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={6}>
                <TextField
                  label="Address"
                  variant="outlined"
                  fullWidth
                  required
                  {...register("Address")}
                  margin="normal"
                />
              </Grid>
              <Grid size={6}>
                <TextField
                  label="Contact Number"
                  variant="outlined"
                  required
                  fullWidth
                  {...register("contactNumber")}
                  margin="normal"
                />
              </Grid>

              <Grid size={6}>
                <TextField
                  label="Email"
                  variant="outlined"
                  required
                  fullWidth
                  {...register("email")}
                  margin="normal"
                />
              </Grid>
            </Grid>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ backgroundColor: "#024950", maxWidth: 300 }}
              >
                {editingData ? "Update Office" : "Add Office"}
              </Button>
            </Box>
          </form>
        </Paper>
      </Modal>
    </>
  );
}
