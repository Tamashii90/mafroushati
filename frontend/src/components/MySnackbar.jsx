import React, { useState } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

export default function MySnackbar({ info, setInfo }) {
  const { message, severity } = info;
  const [open, setOpen] = useState(true); // true but won't get rendered if message is empty
  const handleClose = () => {
    // it looks awkward but I need to do it like this so I can
    // see the animation on close.
    setOpen(false);
    setTimeout(() => {
      setInfo(prev => ({ message: "", severity: prev.severity }));
    }, 100);
  };
  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={info.delay || 3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <MuiAlert elevation={6} variant="filled" severity={severity}>
          {message}
        </MuiAlert>
      </Snackbar>
    </div>
  );
}
