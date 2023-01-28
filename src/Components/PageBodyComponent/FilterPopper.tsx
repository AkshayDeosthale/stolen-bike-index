import { ClickAwayListener, IconButton, Paper, TextField } from "@mui/material";
import Fade from "@mui/material/Fade";
import Popper, { PopperPlacementType } from "@mui/material/Popper";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import dayjs, { Dayjs } from "dayjs";
import * as React from "react";
import { RiFilter2Fill } from "react-icons/ri";
import { Data } from ".";
import { FilterOptionContainer } from "./PageBodyStyles";

interface EnhancedTableToolbar {
  data: any;
  setData: React.Dispatch<React.SetStateAction<Data[]>>;
  originaldata: any;
}

export default function FilterPopper({
  data,
  setData,
  originaldata,
}: EnhancedTableToolbar) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState<PopperPlacementType>();
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [value, setValue] = React.useState<Dayjs | null>(dayjs("2022-04-07"));

  const handleClick =
    (newPlacement: PopperPlacementType) =>
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
      setOpen((prev) => placement !== newPlacement || !prev);
      setPlacement(newPlacement);
    };

  React.useEffect(() => {
    if (searchQuery !== "") {
      let temp = data;
      temp = temp.filter((t: any) =>
        t.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

      setData(temp);
    } else {
      originaldata.map((bike: any) =>
        setData((data) => [
          ...data,
          { name: bike.title, id: bike.id, detail: bike },
        ])
      );
    }
  }, [searchQuery]);

  const dateFilter = () => {
    const tempData = `${value?.get("year")}/${value?.get("month")}/${value?.get(
      "date"
    )}`;
    const dateInNumber = new Date(tempData);
    let temp = data;
    temp = temp.filter(
      (t: any) => t.detail.date_stolen === dateInNumber.getTime()
    );

    setData(temp);
  };

  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <div>
        <IconButton onClick={handleClick("bottom-end")}>
          <RiFilter2Fill color={"azure"} />
        </IconButton>
        <Popper
          open={open}
          anchorEl={anchorEl}
          placement={placement}
          transition
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Paper>
                <FilterOptionContainer>
                  {/* date picker */}
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <MobileDatePicker
                      label="Filter with date"
                      value={value}
                      onChange={(newValue) => {
                        setValue(newValue);
                      }}
                      onAccept={dateFilter}
                      renderInput={(params) => (
                        <TextField fullWidth {...params} />
                      )}
                    />
                  </LocalizationProvider>
                </FilterOptionContainer>
                <FilterOptionContainer>
                  <TextField
                    id="standard-basic"
                    label="Search Name"
                    variant="standard"
                    fullWidth
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                    }}
                    value={searchQuery}
                  />
                </FilterOptionContainer>
              </Paper>
            </Fade>
          )}
        </Popper>
      </div>
    </ClickAwayListener>
  );
}
