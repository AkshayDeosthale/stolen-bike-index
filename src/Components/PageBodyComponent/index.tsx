import { CircularProgress, IconButton, Pagination } from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { ImFileEmpty } from "react-icons/im";
import { MdOutlineError } from "react-icons/md";
import { Bike } from "../../../types";
import {
  getStolenBikeCount,
  getStolenBikeDetails,
} from "../../Utility/FetchData";
import DetailDialogs from "./DetailDialog";
import FilterPopper from "./FilterPopper";

export interface Data {
  name: string;
  id: string;
  detail: Bike;
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
  data: Data[];
  setData: React.Dispatch<React.SetStateAction<Data[]>>;
  originaldata: Data[];
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
  const [page, setPage] = React.useState(1);
  const [tempRows, setTempRows] = React.useState<Data[]>([]);

  const handleChangePage = async (event: unknown, newPage: number) => {
    setPage(newPage);
    const temp: Data[] = [];
    const tempdata: Bike[] | undefined = await getStolenBikeDetails(newPage);
    tempdata?.forEach((bike: Bike) => {
      temp.push({ name: bike.title, id: bike.id.toString(), detail: bike });
    });
    setTempRows(temp);
  };

  //data fetching

  const getData = async () => {
    const tempdata: Bike[] | undefined = await getStolenBikeDetails(page);

    const temp: Data[] = [];
    tempdata?.map((bike: Bike) => {
      temp.push({ name: bike.title, id: bike.id.toString(), detail: bike });
    });
    setTempRows(temp);
  };

  React.useEffect(() => {
    getData();
    getStolenBikeCount();
  }, []);

  return (
    <>
      {false ? (
        <Box>
          <MdOutlineError fontSize="30px" />
          <Typography component="h2"> Oops we ran into an error!</Typography>
        </Box>
      ) : (
        <>
          {!tempRows ? (
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
                  originaldata={tempRows}
                />
                <TableContainer>
                  <Table aria-labelledby="tableTitle">
                    <EnhancedTableHead rowCount={tempRows.length} />
                    <TableBody>
                      {tempRows.map((row, index) => {
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
                    </TableBody>
                  </Table>
                </TableContainer>

                <Pagination
                  count={10}
                  page={page}
                  onChange={handleChangePage}
                />
              </Paper>
            </Box>
          ) : (
            tempRows.length === 0 && (
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
            )
          )}
        </>
      )}
    </>
  );
}
