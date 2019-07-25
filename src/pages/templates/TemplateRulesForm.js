import React from "react";
import {
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

export default ({ accounts, rules, handleChange }) => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Template rules
      </Typography>
      <Grid container spacing={3}>
        {rules.map((rule, idx) => {
          let accountId = `account-${idx}`;
          let multiplierId = `multiplier-${idx}`;
          return (
            <React.Fragment key={idx}>
              <Grid item xs={12} sm={6} md={6}>
                <FormControl fullWidth>
                  <InputLabel htmlFor={accountId}>Account</InputLabel>
                  <Select
                    value={rules[idx].accountId}
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
                  id={multiplierId}
                  name={multiplierId}
                  label="Multiplier"
                  type="number"
                  value={rules[idx].multiplier}
                  onChange={handleChange("multiplier", idx)}
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
                        checked={rules[idx].side}
                        color="primary"
                        onChange={handleChange("side", idx)}
                        value="checkers"
                      />
                    </Grid>
                    <Grid item>Credit</Grid>
                  </Grid>
                </Typography>
              </Grid>
            </React.Fragment>
          );
        })}
      </Grid>
    </React.Fragment>
  );
};
