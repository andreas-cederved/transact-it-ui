import React, { useState, useEffect } from "react";
import {
  CircularProgress,
  Container,
  Grid,
  makeStyles,
  Typography
} from "@material-ui/core";

import AccountCard from "./AccountCard";
import CreateMainAccountGroup from "./CreateMainAccountGroup";

const useStyles = makeStyles(theme => ({
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
  }
}));

export default ({ params }) => {
  if (!params.length) return null;
  const [ledgerData, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const classes = useStyles();

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    let mounted = true;
    (async () => {
      const res = await fetch(
        `https://localhost:44304/api/ledgers/${params[0]}`
      );
      const ledgerData = await res.json();
      if (mounted) {
        setData(ledgerData);
        setLoading(false);
      }
    })();
    const cleanup = () => {
      mounted = false;
    };
    return cleanup;
  }, [params]);

  if (isLoading) {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  }

  function handleRefreshAccounts() {
    (async () => {
      const res = await fetch(
        `https://localhost:44304/api/ledgers/${params[0]}`
      );
      const ledgerData = await res.json();
      setData(ledgerData);
    })();
  }

  return (
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
            Account collection
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            paragraph
          >
            Choose the account you want to work with in the collection below. Or
            create a new one!
          </Typography>
          <div className={classes.heroButtons}>
            <Grid container spacing={2} justify="center">
              <Grid item>
                <CreateMainAccountGroup
                  callback={handleRefreshAccounts}
                  ledgerId={ledgerData.id}
                />
              </Grid>
            </Grid>
          </div>
        </Container>
      </div>
      <Container className={classes.cardGrid} maxWidth="md">
        <Grid container spacing={4}>
          {ledgerData.mainAccountGroups.map(grp => (
            <AccountCard
              key={grp.id}
              mainAccountGroup={grp}
              callback={handleRefreshAccounts}
            />
          ))}
        </Grid>
      </Container>
    </main>
  );
};
