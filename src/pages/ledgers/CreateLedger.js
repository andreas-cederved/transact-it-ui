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

export default ({ callback }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleChangeName(event) {
    setName(event.target.value);
  }

  function handleChangeDescription(event) {
    setDescription(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    (async () => {
      const res = await fetch("https://localhost:44304/api/ledgers", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        mode: "cors",
        body: JSON.stringify({
          name: name,
          description: description
        })
      });
      if (res.ok) {
        handleClose();
        setName("");
        setDescription("");
        callback();
      }
    })();
  }

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        CREATE LEDGER
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <form id="new-ledger-form" onSubmit={handleSubmit}>
          <DialogTitle id="form-dialog-title">Create ledger</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To create a new ledger, please enter its name and description
              here.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              type="text"
              value={name}
              onChange={handleChangeName}
              fullWidth
            />
            <TextField
              margin="dense"
              id="description"
              label="Description"
              type="text"
              value={description}
              onChange={handleChangeDescription}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button color="primary" type="submit" form="new-ledger-form">
              Create
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};
