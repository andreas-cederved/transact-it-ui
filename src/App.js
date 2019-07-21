import React from "react";
import {
  AppBar,
  Box,
  Container,
  CssBaseline,
  Toolbar,
  Typography,
  Button,
  IconButton,
  makeStyles
} from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import "./App.css";
import Router from "./Router";
import routes from "./routes";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

export default () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <CssBaseline />
      <div className={classes.root}>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
            >
              <Menu />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              TransactIt
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
        <Box pt={9}>
          <Container maxWidth="lg">
            <Router routes={routes} />
          </Container>
        </Box>
      </div>
    </React.Fragment>
  );
};
