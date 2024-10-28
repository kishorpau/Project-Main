import React, { useState, useEffect, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TextField,
  Checkbox,
  Box,
  Button,
  Modal,
  IconButton,
  TablePagination,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import { TableVirtuoso } from "react-virtuoso";
import { Close as CloseIcon } from "@mui/icons-material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { Edit as EditIcon } from "@mui/icons-material";
import { Sms as SmsIcon } from "@mui/icons-material";
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
];

const groupColumns = [
  { width: 50, label: "ID", dataKey: "id" },
  { width: 150, label: "Group Name", dataKey: "groupName" },
  { width: 300, label: "Group Members", dataKey: "groupMembers" },
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
  TableBody: React.forwardRef((props, ref) => (
    <TableBody {...props} ref={ref} />
  )),
  TableRow,
};

export default function FormGroupData() {
  const [searchTerm, setSearchTerm] = useState("");
  const [groupSearchTerm, setGroupSearchTerm] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [groupNameInput, setGroupNameInput] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [groups, setGroups] = useState([]);
  const [editingGroupId, setEditingGroupId] = useState(null);
  const [smsModalOpen, setSmsModalOpen] = useState(false);
  const [smsMessage, setSmsMessage] = useState("");
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { data } = useFetch("https://retoolapi.dev/hsSJ5B/data");

  useEffect(() => {
    setPage(0);
  }, [searchTerm]);

  const handleSelectUser = (user) => {
    setSelectedUsers((prev) =>
      prev.some((u) => u.id === user.id)
        ? prev.filter((u) => u.id !== user.id)
        : [...prev, user]
    );
  };

  const toggleSelectAll = () => {
    setSelectedUsers(
      selectedUsers.length === filteredRows.length ? [] : filteredRows
    );
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

  const allSelected =
    selectedUsers.length === filteredRows.length && selectedUsers.length > 0;

  const handleCloseGroupModal = () => {
    setOpenModal(false);
    setGroupNameInput("");
    setSelectedUsers([]);
  };

  const handleCreateGroup = () => {
    if (groupNameInput.trim() === "") {
      alert("Group name cannot be empty.");
      return;
    }

    const newGroup = {
      id: editingGroupId || groups.length + 1,
      groupName: groupNameInput,
      groupMembers: selectedUsers.map((user) => user["Column 2"]).join(", "),
    };

    setGroups((prevGroups) => {
      if (editingGroupId) {
        return prevGroups.map((group) =>
          group.id === editingGroupId ? newGroup : group
        );
      }
      return [...prevGroups, newGroup];
    });

    setGroupNameInput("");
    setSelectedUsers([]);
    setEditingGroupId(null);
    handleCloseGroupModal();
  };

  const handleEditGroup = (groupId) => {
    const groupToEdit = groups.find((group) => group.id === groupId);
    if (groupToEdit) {
      setGroupNameInput(groupToEdit.groupName);
      setSelectedUsers(
        data.filter((user) =>
          groupToEdit.groupMembers.includes(user["Column 2"])
        )
      );
      setEditingGroupId(groupId);
      setOpenModal(true);
    }
  };

  const handleDeleteGroup = (groupId) => {
    {
      setGroups((prevGroups) =>
        prevGroups.filter((group) => group.id !== groupId)
      );
    }
  };

  const handleOpenSmsModal = (groupId) => {
    const group = groups.find((group) => group.id === groupId);
    setSelectedGroup(group);
    setSmsModalOpen(true);
  };
  const handleCloseSmsModal = () => {
    setSmsModalOpen(false);
  };
  const handleSendSMSMessage = () => {
    selectedUsers.forEach((user) =>
      console.log(`Sending SMS to ${user["Column 2"]}: ${smsMessage}`)
    );
    setSmsModalOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredGroups = groups.filter((group) =>
    group.groupName.toLowerCase().includes(groupSearchTerm.toLowerCase())
  );

  return (
    <>
      <Box
        sx={{
          display: "flex",
          gap: "60%",
          paddingBottom: "1%",
        }}
      >
        <Typography variant="h6" sx={{ marginBottom: "1rem" }}>
          Created Groups
        </Typography>
        <Box sx={{ display: "flex", gap: "5%" }}>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#2f575b", height: "70%", width: "50%" }}
            onClick={() => setOpenModal(true)}
          >
            Create a Group
          </Button>
          <TextField
            label={` Search Group`}
            variant="outlined"
            value={groupSearchTerm}
            onChange={(e) => setGroupSearchTerm(e.target.value)}
            sx={{ marginBottom: "1rem" }}
          />
        </Box>
      </Box>

      <Modal open={openModal} onClose={handleCloseGroupModal}>
        <Paper sx={{ height: 500, width: "90%", margin: "auto" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              padding: "0.5rem 1rem",
              borderBottom: "1px solid gray",
            }}
          >
            <Typography variant="h6">Select Users for Group</Typography>
            <IconButton onClick={handleCloseGroupModal}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              padding: "0.5rem 1rem",
              alignItems: "center",
            }}
          >
            <TextField
              label="Search Users..."
              variant="outlined"
              width="80"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ marginBottom: "1%" }}
            />
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                padding: "1rem",
                gap: "1rem",
                borderRadius: "8px",
              }}
            >
              <TextField
                label="Group Name"
                variant="outlined"
                fullWidth
                value={groupNameInput}
                onChange={(e) => setGroupNameInput(e.target.value)}
              />
              <Button
                variant="contained"
                sx={{
                  width: "50%",
                  backgroundColor: "#024950",
                  "&:hover": {
                    backgroundColor: "#027e7e",
                  },
                }}
                onClick={handleCreateGroup}
                disabled={
                  selectedUsers.length === 0 || groupNameInput.trim() === ""
                }
              >
                Create Group
              </Button>
            </Box>
          </Box>
          <Box sx={{ height: "450px" }}>
            <TableVirtuoso
              data={paginatedData}
              components={VirtuosoTableComponents}
              fixedHeaderContent={() => (
                <TableRow sx={{ backgroundColor: "#024950" }}>
                  {columns.map((column) => (
                    <TableCell
                      key={column.dataKey}
                      align="left"
                      sx={{ width: column.width, color: "#fff" }}
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
              )}
              itemContent={(index, row) => (
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
                      ) : (
                        row[column.dataKey]
                      )}
                    </TableCell>
                  ))}
                </>
              )}
            />
            <Box sx={{ background: "white", borderRadius: "0px 0px 5px 5px" }}>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, 50]}
                component="div"
                count={filteredRows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                sx={{ overflow: "hidden" }}
              />
            </Box>
          </Box>
        </Paper>
      </Modal>

      <Paper sx={{ height: 400, width: "100%" }}>
        <TableVirtuoso
          data={filteredGroups}
          components={VirtuosoTableComponents}
          fixedHeaderContent={() => (
            <TableRow sx={{ backgroundColor: "#024950" }}>
              {groupColumns.map((column) => (
                <TableCell
                  key={column.dataKey}
                  align="left"
                  sx={{ width: column.width, color: "#fff" }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          )}
          itemContent={(index, row) => (
            <>
              {groupColumns.map((column) => (
                <TableCell key={column.dataKey} align="left">
                  {column.dataKey === "actions" ? (
                    <>
                      <IconButton onClick={() => handleEditGroup(row.id)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteGroup(row.id)}>
                        <DeleteIcon />
                      </IconButton>
                      <IconButton onClick={() => handleOpenSmsModal(row.id)}>
                        <SmsIcon />
                      </IconButton>
                    </>
                  ) : (
                    row[column.dataKey]
                  )}
                </TableCell>
              ))}
            </>
          )}
        />
      </Paper>
      <SendSMSModal
        smsModalOpen={smsModalOpen}
        smsMessage={smsMessage}
        handleCloseSmsModal={handleCloseSmsModal}
        handleSendSMSMessage={handleSendSMSMessage}
        setSmsMessage={setSmsMessage}
      />
    </>
  );
}
