import React from "react";
import { Grid, makeStyles, TextField, Typography } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  button: {
    marginTop: 17
  }
}));

export default ({ date, description, handleChange }) => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Transaction details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4} md={4}>
          <TextField
            required
            autoFocus
            id="date"
            label="Transaction date"
            type="date"
            InputLabelProps={{
              shrink: true
            }}
            value={date}
            onChange={handleChange("date")}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={8} md={8}>
          <TextField
            required
            id="description"
            name="description"
            label="Description"
            type="text"
            value={description}
            onChange={handleChange("description")}
            fullWidth
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
