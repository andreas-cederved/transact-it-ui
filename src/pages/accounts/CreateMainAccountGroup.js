import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField
} from "@material-ui/core";

export default ({ callback, ledgerId }) => {
  const [open, setOpen] = useState(false);
  const [number, setNumber] = useState(0);
  const [name, setName] = useState("");

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleChangeName(event) {
    setName(event.target.value);
  }

  function handleChangeNumber(event) {
    setNumber(parseInt(event.target.value));
  }

  function handleSubmit(event) {
    event.preventDefault();
    (async () => {
      const res = await fetch(
        `https://localhost:44304/api/ledgers/${ledgerId}/main-account-groups`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          mode: "cors",
          body: JSON.stringify({
            number: number,
            name: name
          })
        }
      );
      if (res.ok) {
        handleClose();
        setName("");
        setNumber(null);
        callback();
      }
    })();
  }

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        CREATE MAIN ACCOUNT GROUP
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <form id="new-main-account-group-form" onSubmit={handleSubmit}>
          <DialogTitle id="form-dialog-title">
            Create main account group
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              To create a new main account group, please enter its number and
              name here.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="number"
              label="Number"
              type="number"
              value={number}
              onChange={handleChangeNumber}
              fullWidth
            />
            <TextField
              margin="dense"
              id="name"
              label="Name"
              type="text"
              value={name}
              onChange={handleChangeName}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button
              color="primary"
              type="submit"
              form="new-main-account-group-form"
            >
              Create
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};
