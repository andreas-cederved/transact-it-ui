import React, { useState, useEffect } from "react";
import clsx from "clsx";
import {
  Button,
  Container,
  Grid,
  makeStyles,
  Paper,
  Typography
} from "@material-ui/core";
import LatestTransactions from "./LatestTransactions";

const useStyles = makeStyles(theme => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6)
  },
  heroButtons: {
    marginTop: theme.spacing(4)
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  },
  fixedHeight: {
    height: 240
  }
}));

export default ({ params }) => {
  if (!params.length) return null;
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [ledger, setLedgerData] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const res = await fetch(
        `https://localhost:44304/api/ledgers/${params[0]}`
      );
      const ledger = await res.json();
      if (mounted) setLedgerData(ledger);
    })();
    const cleanup = () => {
      mounted = false;
    };
    return cleanup;
  }, [params]);

  return (
    <>
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Transaction collection
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              View the latests transaction in the collection below. Or create a
              new one!
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    href={`/create-transaction/${params[0]}`}
                  >
                    CREATE TRANSACTION
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
      </main>
      <Grid container spacing={3}>
        {/* Recent Transactions */}
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <LatestTransactions />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};
