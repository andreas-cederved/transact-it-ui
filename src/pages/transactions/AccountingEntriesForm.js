import React from "react";
import {
  Button,
  FormControl,
  Grid,
  Input,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  button: {
    marginTop: 17
  }
}));

export default ({ accounts, entries, handleChange, handleRemoveEntry }) => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Accounting entries
      </Typography>
      <Grid container spacing={3}>
        {entries.map((entry, idx) => {
          let amountId = `amount-${idx}`;
          let accountId = `account-${idx}`;
          let removeId = `remove-${idx}`;
          return (
            <React.Fragment key={idx}>
              <Grid item xs={12} sm={6} md={6}>
                <FormControl fullWidth>
                  <InputLabel htmlFor={accountId}>Account</InputLabel>
                  <Select
                    value={entries[idx].accountId}
                    onChange={handleChange("accountId", idx)}
                    input={<Input id={accountId} />}
                  >
                    {accounts.map(account => {
                      return (
                        <MenuItem value={account.id} key={account.id}>
                          {account.number} {account.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <TextField
                  required
                  id={amountId}
                  name={amountId}
                  label="Amount"
                  type="number"
                  value={entries[idx].amount}
                  onChange={handleChange("amount", idx)}
                  fullWidth
                />
                <Typography component="div">
                  <Grid
                    component="label"
                    container
                    alignItems="center"
                    spacing={1}
                  >
                    <Grid item>Debit</Grid>
                    <Grid item>
                      <Switch
                        checked={entries[idx].side}
                        color="primary"
                        onChange={handleChange("side", idx)}
                        value="checkers"
                      />
                    </Grid>
                    <Grid item>Credit</Grid>
                  </Grid>
                </Typography>
              </Grid>
              <Grid item xs={12} sm={2} md={2}>
                <Button
                  id={removeId}
                  size="small"
                  variant="contained"
                  color="default"
                  className={classes.button}
                  onClick={() => handleRemoveEntry(idx)}
                >
                  Remove entry
                </Button>
              </Grid>
            </React.Fragment>
          );
        })}
      </Grid>
    </React.Fragment>
  );
};
