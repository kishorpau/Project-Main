import React, { useState, useMemo, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TextField,
    TablePagination,
    Typography,
    Checkbox,
    Toolbar,
    IconButton,
    Tooltip,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { alpha } from '@mui/material/styles';
import useFetch from '../hooks/useFetch';

const Data = ({ select = false, setSelectedData }) => {
    const { data, loading, error, setData } = useFetch('https://jsonplaceholder.typicode.com/comments');
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [selected, setSelected] = useState([]);

    // Ensure data is an array before filtering
    const filteredData = useMemo(() => {
        if (!data || !Array.isArray(data)) return [];
        const lowercasedSearchTerm = searchTerm.toLowerCase();
        return data.filter(item =>
            item.name.toLowerCase().includes(lowercasedSearchTerm) ||
            item.email.toLowerCase().includes(lowercasedSearchTerm)
        );
    }, [data, searchTerm]);

    // Pagination logic
    const paginatedData = useMemo(() => {
        return filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    }, [filteredData, page, rowsPerPage]);

    // Handle page change
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // Handle rows per page change
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Handle select all click
    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = paginatedData.map((n) => n.id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    // Handle individual row selection
    const handleClick = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }

        setSelected(newSelected);
    };

    // Handle delete action
    const handleDelete = () => {
        const updatedData = data.filter(item => !selected.includes(item.id));
        setData(updatedData);
        setSelected([]);
    };

    // Check if an item is selected
    const isSelected = (id) => selected.indexOf(id) !== -1;

    // Pass selected data to parent component
    useEffect(() => {
        if (select && setSelectedData) {
            const selectedItems = data.filter(item => selected.includes(item.id));
            setSelectedData(selectedItems);
        }
    }, [selected, data, select, setSelectedData]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading data. Please try again later.</div>;

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden', margin: '20px', padding: '20px', backgroundColor: '#f9f9f9' }}>
            <Typography variant="h6" component="h2" gutterBottom>
                Comments Data
            </Typography>
            <TextField
                variant="outlined"
                label="Search by Name or Email"
                fullWidth
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{ marginBottom: '20px' }}
            />

            <Toolbar
                sx={{
                    pl: { sm: 2 },
                    pr: { xs: 1, sm: 1 },
                    ...(selected.length > 0 && {
                        bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                    }),
                }}
            >
                {selected.length > 0 ? (
                    <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div">
                        {selected.length} selected
                    </Typography>
                ) : (
                    <Typography sx={{ flex: '1 1 100%' }} variant="h6" component="div">
                        Comments
                    </Typography>
                )}
                {selected.length > 0 ? (
                    <Tooltip title="Delete">
                        <IconButton onClick={handleDelete}>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                ) : null}
            </Toolbar>

            <TableContainer>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell padding="checkbox">
                                <Checkbox
                                    color="primary"
                                    indeterminate={selected.length > 0 && selected.length < paginatedData.length}
                                    checked={paginatedData.length > 0 && selected.length === paginatedData.length}
                                    onChange={handleSelectAllClick}
                                    inputProps={{
                                        'aria-label': 'select all comments',
                                    }}
                                />
                            </TableCell>
                            <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#1976d2', color: '#fff' }}>ID</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#1976d2', color: '#fff' }}>Name</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#1976d2', color: '#fff' }}>Email</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#1976d2', color: '#fff' }}>Body</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedData.length > 0 ? (
                            paginatedData.map((item) => {
                                const isItemSelected = isSelected(item.id);
                                return (
                                    <TableRow
                                        hover
                                        onClick={(event) => handleClick(event, item.id)}
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={item.id}
                                        selected={isItemSelected}
                                        sx={{ cursor: 'pointer' }}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                color="primary"
                                                checked={isItemSelected}
                                                inputProps={{
                                                    'aria-labelledby': `enhanced-table-checkbox-${item.id}`,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>{item.id}</TableCell>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell>{item.email}</TableCell>
                                        <TableCell>{item.body}</TableCell>
                                    </TableRow>
                                );
                            })
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} align="center">
                                    No results found
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={filteredData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                sx={{ backgroundColor: '#e0e0e0' }}
            />
        </Paper>
    );
};

export default Data;
