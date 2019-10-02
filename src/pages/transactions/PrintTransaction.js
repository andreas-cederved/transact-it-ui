import React, { useState, useEffect } from "react";
import {
  CircularProgress,
  Container,
  Grid,
  makeStyles
} from "@material-ui/core";
import TransactionCard from "./TransactionCard";

const useStyles = makeStyles(theme => ({
  container: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  },
  cardGrid: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  }
}));

export default ({ params }) => {
  if (!params.length) return null;
  const classes = useStyles();
  const [isLoading, setLoading] = useState(true);
  const [transaction, setTransactionData] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const res = await fetch(
        `https://localhost:44304/api/transactions/${params[1]}`
      );
      const transaction = await res.json();
      if (mounted) {
        setTransactionData(transaction);
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

  const mapAccounts = accountingEntries => {
    let result = accountingEntries
      .map(ae => {
        return ae.account;
      })
      .flat();

    return result;
  };

  return (
    <Container className={classes.cardGrid} maxWidth="md">
      <Grid container spacing={2}>
        <TransactionCard
          key={transaction.id}
          accounts={mapAccounts(transaction.accountingEntries)}
          transaction={transaction}
          ledgerId={params[0]}
        />
      </Grid>
    </Container>
  );
};
