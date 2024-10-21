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
} from '@mui/material';
import useFetch from '../hooks/useFetch';

const Data = ({ selection = false }) => {
    const { data, loading, error } = useFetch('https://jsonplaceholder.typicode.com/comments');
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [selectedRows, setSelectedRows] = useState([]);

    // Memoize filtered data
    const filteredData = useMemo(() => {
        if (!Array.isArray(data)) return [];
        const lowercasedSearchTerm = searchTerm.toLowerCase();
        return data.filter(item =>
            item.name.toLowerCase().includes(lowercasedSearchTerm) ||
            item.email.toLowerCase().includes(lowercasedSearchTerm)
        );
    }, [data, searchTerm]);

    // Limit the number of displayed items to 10,000
    const limitedDataCount = Math.min(filteredData.length, 10000);

    // Memoize paginated data based on filtered data
    const paginatedData = useMemo(() => {
        return filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    }, [filteredData, page, rowsPerPage]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // Reset to first page on rows per page change
    };

    const handleRowSelect = (item) => {
        setSelectedRows((prev) => {
            if (prev.includes(item.id)) {
                return prev.filter(id => id !== item.id); // Deselect if already selected
            } else {
                return [...prev, item.id]; // Select if not selected
            }
        });
    };

    // Reset page to 0 whenever filtered data changes or when rows per page changes
    useEffect(() => {
        const totalPages = Math.ceil(limitedDataCount / rowsPerPage);
        if (page >= totalPages) {
            setPage(totalPages > 0 ? totalPages - 1 : 0); // Set to the last valid page index or reset to 0
        }
    }, [filteredData, rowsPerPage, page]); // Trigger effect when filtered data, rows per page, or page changes

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
            <TableContainer>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            {selection && <TableCell />}
                            <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#1976d2', color: '#fff' }}>ID</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#1976d2', color: '#fff' }}>Name</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#1976d2', color: '#fff' }}>Email</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#1976d2', color: '#fff' }}>Body</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedData.length > 0 ? (
                            paginatedData.map((item) => (
                                <TableRow
                                    key={item.id}
                                    sx={{
                                        '&:nth-of-type(odd)': { backgroundColor: '#f2f2f2' },
                                        cursor: selection ? 'pointer' : 'default',
                                    }}
                                    onClick={() => selection && handleRowSelect(item)}
                                >
                                    {selection && (
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                checked={selectedRows.includes(item.id)}
                                                onChange={() => handleRowSelect(item)}
                                            />
                                        </TableCell>
                                    )}
                                    <TableCell>{item.id}</TableCell>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.email}</TableCell>
                                    <TableCell>{item.body}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={selection ? 5 : 4} align="center">
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
                count={limitedDataCount}
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
