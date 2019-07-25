import React, { useState, useEffect } from "react";
import {
  Button,
  CircularProgress,
  Container,
  Grid,
  makeStyles,
  Typography
} from "@material-ui/core";
import TransactionCard from "./TransactionCard";

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
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8)
  }
}));

export default ({ params }) => {
  if (!params.length) return null;
  const classes = useStyles();
  const [isLoading, setLoading] = useState(true);
  const [ledger, setLedgerData] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const res = await fetch(
        `https://localhost:44304/api/ledgers/${params[0]}`
      );
      const ledger = await res.json();
      if (mounted) {
        setLedgerData(ledger);
        setLoading(false);
      }
    })();
    const cleanup = () => {
      mounted = false;
    };
    return cleanup;
  }, [params]);

  const mapAccounts = mainAccountGroups => {
    let result = mainAccountGroups
      .map(mag => {
        return mag.subAccountGroups.map(sag => {
          return sag.accounts;
        });
      })
      .flat(2);

    return result;
  };

  const compareIdentifyingCode = (a, b) => {
    if (a.identifyingCode < b.identifyingCode) return 1;
    if (b.identifyingCode < a.identifyingCode) return -1;
    return 0;
  };

  if (isLoading) {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  }

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
      <Container className={classes.cardGrid} maxWidth="md">
        <Grid container spacing={4}>
          {ledger.transactions.sort(compareIdentifyingCode).map(transaction => {
            return (
              <TransactionCard
                key={transaction.id}
                accounts={mapAccounts(ledger.mainAccountGroups)}
                transaction={transaction}
                ledgerId={ledger.id}
              />
            );
          })}
        </Grid>
      </Container>
    </>
  );
};
