import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import { RiCloseLine, RiMenuFill } from "react-icons/ri";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { DialogDetailTitle } from "./PageBodyStyles";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(2),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <RiCloseLine />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

export default function DetailDialogs() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton
        sx={{
          padding: 0,
          color: "azure",
        }}
        onClick={handleClickOpen}
      >
        <RiMenuFill />
      </IconButton>

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Case Details
        </BootstrapDialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          <Box sx={{ width: { xs: "100%", md: "40%" } }}>
            <Typography>Picture</Typography>
          </Box>
          <Box sx={{ width: { xs: "100%", md: "60%" } }}>
            <DialogDetailTitle>Case Title</DialogDetailTitle>
            <DialogDetailTitle>Case description</DialogDetailTitle>
            <DialogDetailTitle>Case Date</DialogDetailTitle>
            <DialogDetailTitle>Case Location</DialogDetailTitle>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
