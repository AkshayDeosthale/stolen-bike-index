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
import Tooltip from "@mui/material/Tooltip";
import DetailDialogs from "./DetailDialog";
import { getStolenBikeDetails } from "../../Utility/FetchData";
import { useQuery } from "@tanstack/react-query";
import { ImFileEmpty } from "react-icons/im";
import { ApiTypes } from "../../../types";
import { CircularProgress, IconButton } from "@mui/material";
import FilterPopper from "./FilterPopper";
import { MdOutlineError } from "react-icons/md";

export interface Data {
  name: string;
  id: string;
  detail: any;
}

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
interface EnhancedTableToolbar {
  data: any;
  setData: React.Dispatch<React.SetStateAction<Data[]>>;
  originaldata: any;
}
function EnhancedTableToolbar({
  data,
  setData,
  originaldata,
}: EnhancedTableToolbar) {
  return (
    <Toolbar
      sx={{
        pl: { xs: 0, sm: 0 },
        pr: { xs: 0, sm: 0 },
      }}
    >
      <Typography sx={{ flex: "1 1 100%" }} id="tableTitle" component="div">
        Cases
      </Typography>
      <Tooltip title="Filter list">
        <FilterPopper
          data={data}
          setData={setData}
          originaldata={originaldata}
        />
      </Tooltip>
    </Toolbar>
  );
}

export default function PageBodyComponent() {
  const [page, setPage] = React.useState(0);
  const [tempRows, setTempRows] = React.useState<Data[]>([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tempRows.length) : 0;
  //data fetching

  const { isLoading, isError, data, error } = useQuery(["page", page], () =>
    getStolenBikeDetails()
  );

  const [len, setSen] = React.useState();
  React.useEffect(() => {
    if (data) {
      const {
        data: { bikes },
      } = data;
      setSen(bikes.length);

      bikes.map((bike: any) =>
        setTempRows((tempRows) => [
          ...tempRows,
          { name: bike.title, id: bike.id, detail: bike },
        ])
      );
    }
  }, [isLoading, data]);

  return (
    <>
      {isError ? (
        <Box>
          <MdOutlineError fontSize="30px" />
          <Typography component="h2"> Oops we ran into an error!</Typography>
        </Box>
      ) : (
        <>
          {isLoading ? (
            <Box>
              <CircularProgress color="secondary" size="10rem" />
            </Box>
          ) : tempRows.length ? (
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
                <EnhancedTableToolbar
                  data={tempRows}
                  setData={setTempRows}
                  originaldata={data?.data.bikes}
                />
                <TableContainer>
                  <Table aria-labelledby="tableTitle">
                    <EnhancedTableHead rowCount={tempRows.length} />
                    <TableBody>
                      {tempRows
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((row, index) => {
                          const labelId = `enhanced-table-checkbox-${index}`;

                          return (
                            <TableRow
                              hover
                              role="checkbox"
                              tabIndex={-1}
                              key={row.name}
                            >
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
                                  <DetailDialogs detail={row.detail} />
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
                  rowsPerPageOptions={[10]}
                  component="div"
                  count={Number(len)}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  sx={{ color: "azure" }}
                />
              </Paper>
            </Box>
          ) : (
            <Box>
              <IconButton
                onClick={() => {
                  location.reload();
                }}
                sx={{
                  marginBottom: 6,
                }}
              >
                <ImFileEmpty fontSize="30px" color="azure" />
              </IconButton>
              <Typography component="h2">
                No results found click above icon to refresh the search
              </Typography>
            </Box>
          )}
        </>
      )}
    </>
  );
}
