import React, { useState } from 'react';
import { useProductContext } from '../../contexts/product-context/ProductContext';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel,
  Toolbar, Typography, Paper, Checkbox, IconButton, TextField, Select, MenuItem,
  FormControl, InputLabel, TablePagination, Avatar
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function ProductsTable() {
  const { AllProducts, AllCategories, loading, error } = useProductContext();

  // State for search, sorting, filtering, and pagination
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Handle sorting logic
  const handleSort = (property) => {
    const isAscending = sortBy === property && sortOrder === 'asc';
    setSortBy(property);
    setSortOrder(isAscending ? 'desc' : 'asc');
  };

  // Filter, search, and sort products
  const filteredProducts = AllProducts
    .filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (categoryFilter ? product.category?.title === categoryFilter : true)
    )
    .sort((a, b) => {
      if (sortOrder === 'asc') {
        return a[sortBy] > b[sortBy] ? 1 : -1;
      }
      return a[sortBy] < b[sortBy] ? 1 : -1;
    });

  // Pagination handling
  const paginatedProducts = filteredProducts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <div className="w-full">
      <Paper className="w-full mb-2 bg-bgColor">
        {/* Toolbar with Search & Filter */}
        <Toolbar className="flex flex-wrap gap-4 p-4">
          <TextField
            label="Search Products"
            variant="outlined"
            size="small"
            className="mr-2 w-52"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FormControl className="w-40">
            <InputLabel>Filter by Category</InputLabel>
            <Select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              size="small"
            >
              <MenuItem value="">All Categories</MenuItem>
              {AllCategories.map(category => (
                <MenuItem key={category.id} value={category.title}>{category.title}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Toolbar>

        {/* Display Loading/Error Messages */}
        {loading ? (
          <Typography className="p-2 text-appColor">Loading products...</Typography>
        ) : error ? (
          <Typography className="p-2 text-dangerColor">{error}</Typography>
        ) : (
          <TableContainer>
            <Table className="min-w-full">
              <TableHead className=" text-appColor">
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox className="text-appColor [&.Mui-checked]:text-appColor" />
                  </TableCell>
                  <TableCell className="text-white">Image</TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === 'name'}
                      direction={sortOrder}
                      className="text-white"
                      onClick={() => handleSort('name')}
                    >
                      Name
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === 'price'}
                      direction={sortOrder}
                      className="text-white"
                      onClick={() => handleSort('price')}
                    >
                      Price
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === 'stock'}
                      direction={sortOrder}
                      className="text-white"
                      onClick={() => handleSort('stock')}
                    >
                      Stock
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === 'category'}
                      direction={sortOrder}
                      className="text-white"
                      onClick={() => handleSort('category')}
                    >
                      Category
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedProducts.map((product) => (
                  <TableRow key={product.id} hover className="hover:bg-gray-100">
                    <TableCell padding="checkbox">
                      <Checkbox
                        className="text-appColor [&.Mui-checked]:text-appColor"
                      />
                    </TableCell>
                    <TableCell>
                      <Avatar
                        src={product.image_url}
                        alt={product.name}
                        className="w-12 h-12 rounded-lg"
                      />
                    </TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>${product.price}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>{product.category?.title || 'N/A'}</TableCell>
                    <TableCell>
                      <IconButton className="">
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* Pagination Controls */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 20]}
          component="div"
          count={filteredProducts.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(event, newPage) => setPage(newPage)}
          onRowsPerPageChange={(event) => {
            setRowsPerPage(parseInt(event.target.value, 10));
            setPage(0);
          }}
        />
      </Paper>
    </div>
  );
}

export default ProductsTable;
