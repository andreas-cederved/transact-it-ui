import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import CreateLedger from "./CreateLedger";
import Information from "./Information";
import LedgerCard from "./LedgerCard";

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2)
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6)
  },
  heroButtons: {
    marginTop: theme.spacing(4)
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8)
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6)
  }
}));

export default () => {
  const classes = useStyles();
  const [ledgers, setLedgers] = useState([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const res = await fetch("https://localhost:44304/api/ledgers");
      const ledgers = await res.json();
      if (mounted) setLedgers(ledgers);
    })();
    const cleanup = () => {
      mounted = false;
    };
    return cleanup;
  }, []);

  function handleCreateLedger() {
    (async () => {
      const res = await fetch("https://localhost:44304/api/ledgers");
      const ledgers = await res.json();
      setLedgers(ledgers);
    })();
  }

  return (
    <React.Fragment>
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
              Ledger collection
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              Choose the ledger you want to work with in the collection below.
              Or create a new one!
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <CreateLedger callback={handleCreateLedger} />
                </Grid>
                <Grid item>
                  <Information />
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {ledgers.map(ledger => (
              <LedgerCard key={ledger.id} ledger={ledger} />
            ))}
          </Grid>
        </Container>
      </main>
    </React.Fragment>
  );
};
