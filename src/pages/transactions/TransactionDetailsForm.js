import React from "react";
import { Grid, TextField, Typography } from "@material-ui/core";

export default ({
  templateAmount,
  date,
  description,
  handleChange,
  handleTemplateAmountChange,
  showTemplateAmount
}) => {
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
        <Grid item xs={12} sm={6} md={6}>
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
        {showTemplateAmount && (
          <Grid item xs={12} sm={2} md={2}>
            <TextField
              required
              id="amount"
              name="amount"
              label="Amount"
              type="number"
              value={templateAmount}
              onChange={handleTemplateAmountChange}
              fullWidth
            />
          </Grid>
        )}
      </Grid>
    </React.Fragment>
  );
};
