import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { Grid, makeStyles, Paper } from "@material-ui/core";
import LatestTransactions from "./LatestTransactions";
import Sales from "./Sales";

const useStyles = makeStyles(theme => ({
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
    <Grid container spacing={3}>
      {/* Chart */}
      <Grid item xs={12} md={8} lg={9}>
        <Paper className={fixedHeightPaper}></Paper>
      </Grid>
      {/* Recent Sales */}
      <Grid item xs={12} md={4} lg={3}>
        <Paper className={fixedHeightPaper}>
          <Sales />
        </Paper>
      </Grid>
      {/* Recent Transactions */}
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <LatestTransactions />
        </Paper>
      </Grid>
    </Grid>
  );
};
