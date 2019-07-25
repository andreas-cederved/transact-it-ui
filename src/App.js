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
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6)
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
              transact-it
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
        <Box pt={9}>
          <Container maxWidth="xl">
            <Router routes={routes} />
            {/* Footer */}
            <footer className={classes.footer}>
              <Typography variant="h6" align="center" gutterBottom>
                About TransactIt
              </Typography>
              <Typography
                variant="subtitle1"
                align="center"
                color="textSecondary"
                component="p"
              >
                Free open source double entry bookkeeping system built on top of
                other excellent open source libraries such as asp.net core,
                react and material-ui.
              </Typography>
            </footer>
            {/* End footer */}
          </Container>
        </Box>
      </div>
    </React.Fragment>
  );
};
