import React from "react";
import { Grid, TextField, Typography } from "@material-ui/core";

export default ({
  name,
  description,
  defaultTransactionAmount,
  defaultTransactionDescription,
  handleChange
}) => {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Template details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4} md={4}>
          <TextField
            required
            autoFocus
            id="name"
            label="Template name"
            type="text"
            value={name}
            onChange={handleChange("name")}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={8} md={8}>
          <TextField
            required
            id="description"
            label="Description"
            type="text"
            value={description}
            onChange={handleChange("description")}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <TextField
            id="defaultTransactionAmount"
            label="Default transaction amount"
            type="number"
            value={defaultTransactionAmount}
            onChange={handleChange("defaultTransactionAmount")}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={8} md={8}>
          <TextField
            id="defaultTransactionDescription"
            label="Default transaction description"
            type="text"
            value={defaultTransactionDescription}
            onChange={handleChange("defaultTransactionDescription")}
            fullWidth
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
