import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  Input,
  makeStyles,
  MenuItem,
  Select,
  TextField
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    minWidth: 180
  }
}));

export default ({ subAccountGroups, callback }) => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    open: false,
    subAccountGroupId: "",
    number: 0,
    name: ""
  });

  function handleSubmit(event) {
    event.preventDefault();
    (async () => {
      const res = await fetch(
        `https://localhost:44304/api/sub-account-groups/${state.subAccountGroupId}/accounts`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          mode: "cors",
          body: JSON.stringify({
            number: Number(state.number),
            name: state.name
          })
        }
      );
      if (res.ok) {
        setState({ ...state, name: "", open: false });
        callback();
      }
    })();
  }

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.value });
  };

  function handleClickOpen() {
    setState({ ...state, open: true });
  }

  function handleClose() {
    setState({ ...state, open: false });
  }

  return (
    <div>
      <Button color="primary" onClick={handleClickOpen}>
        CREATE ACCOUNT
      </Button>
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={state.open}
        onClose={handleClose}
      >
        <DialogTitle>Create account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create a new account, please select its parent sub account group
            and enter its number and name here.
          </DialogContentText>
          <form className={classes.container}>
            <FormControl className={classes.formControl} margin="dense">
              <InputLabel htmlFor="sub-account-group-id">Subaccount</InputLabel>
              <Select
                value={state.subAccountGroupId}
                onChange={handleChange("subAccountGroupId")}
                input={<Input id="sub-account-group-id" />}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {subAccountGroups.map(subAccountGroup => {
                  return (
                    <MenuItem value={subAccountGroup.id}>
                      {subAccountGroup.number}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <TextField
              margin="dense"
              id="number"
              label="Number"
              type="number"
              value={state.number}
              onChange={handleChange("number")}
              fullWidth
            />
            <TextField
              margin="dense"
              id="name"
              label="Name"
              type="text"
              value={state.name}
              onChange={handleChange("name")}
              fullWidth
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
