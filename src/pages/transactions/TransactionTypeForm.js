import React from "react";
import {
  FormControl,
  Grid,
  Input,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  Typography
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  button: {
    marginTop: 17
  }
}));

export default ({ templates, templateId, handleChange }) => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Transaction type
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={12}>
          <FormControl fullWidth>
            <InputLabel htmlFor="select-template">
              Transaction template
            </InputLabel>
            <Select
              value={templateId}
              onChange={handleChange}
              input={<Input id="select-template" />}
            >
              <MenuItem value={0} key={0}>
                Manual (no template)
              </MenuItem>
              {templates.map(template => {
                return (
                  <MenuItem value={template.id} key={template.id}>
                    {template.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
