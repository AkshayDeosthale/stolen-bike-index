import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { RiFilter2Fill, RiMenuFill } from "react-icons/ri";

interface Data {
  name: string;
}

function createData(name: string): Data {
  return {
    name,
  };
}

const rows = [
  createData("Cupcake"),
  createData("Donut"),
  createData("Eclair"),
  createData("Frozen yoghurt"),
  createData("Gingerbread"),
  createData("Honeycomb"),
  createData("Ice cream sandwich"),
  createData("Jelly Bean"),
  createData("KitKat"),
  createData("Lollipop"),
  createData("Marshmallow"),
  createData("Nougat"),
  createData("Oreo"),
];

interface HeadCell {
  numeric: boolean;
  id: keyof Data;
  label: string;
}

const headCells: readonly HeadCell[] = [
  {
    id: "name",
    numeric: false,
    label: "Case Title",
  },
  {
    id: "name",
    numeric: true,
    label: "Details",
  },
];

interface EnhancedTableProps {
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { rowCount } = props;

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox" />

        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            sx={{
              color: "azure",
              paddingLeft: "0px",
            }}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function EnhancedTableToolbar() {
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}
    >
      <Typography
        sx={{ flex: "1 1 100%" }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        Cases
      </Typography>
      <Tooltip title="Filter list">
        <IconButton>
          <RiFilter2Fill color={"azure"} />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
}

export default function PageBodyComponent() {
  const [page, setPage] = React.useState(0);

  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper
        sx={{
          width: "100%",
          backgroundColor: "transparent",
          color: "azure",
          border: "none",
        }}
        elevation={0}
      >
        <EnhancedTableToolbar />
        <TableContainer>
          <Table aria-labelledby="tableTitle">
            <EnhancedTableHead rowCount={rows.length} />
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.name}
                    >
                      <TableCell padding="checkbox" />

                      <TableCell
                        id={labelId}
                        scope="row"
                        padding="none"
                        sx={{ color: "azure" }}
                      >
                        {row.name}
                      </TableCell>
                      <TableCell align="right" sx={{ color: "azure" }}>
                        <Tooltip title="Click for details">
                          <IconButton
                            sx={{
                              padding: 0,
                              color: "azure",
                            }}
                          >
                            <RiMenuFill />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{ color: "azure" }}
        />
      </Paper>
    </Box>
  );
}
