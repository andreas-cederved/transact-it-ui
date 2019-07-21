import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  Grid,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from "@material-ui/core";
import CreateSubAccountGroup from "./CreateSubAccountGroup";
import CreateAccount from "./CreateAccount";

const useStyles = makeStyles(theme => ({
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  cardContent: {
    flexGrow: 1
  },
  table: {
    minWidth: 300
  },
  noBorder: {
    borderBottom: "none"
  }
}));

export default ({ mainAccountGroup, callback }) => {
  const classes = useStyles();

  function subAccountBalanceCalculate(subAccountGroup) {
    var totalBalance = 0;
    subAccountGroup.accounts.forEach(account => {
      account.accountingEntries.forEach(entry => {
        if (entry.side === 0) {
          totalBalance = totalBalance + entry.amount;
        } else {
          totalBalance = totalBalance - entry.amount;
        }
      });
    });
    return `${totalBalance.toFixed(2)}`;
  }

  return (
    <Grid item xs={12} sm={12} md={12}>
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h5" component="h2">
            {mainAccountGroup.number} {mainAccountGroup.name}
          </Typography>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Sub account</TableCell>
                <TableCell>Account</TableCell>
                <TableCell align="right">Balance</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mainAccountGroup.subAccountGroups.map(subAccountGroup => {
                return (
                  <>
                    <TableRow key={subAccountGroup.number}>
                      <TableCell className={classes.noBorder}>
                        {subAccountGroup.number} {subAccountGroup.name}
                      </TableCell>
                      <TableCell className={classes.noBorder}></TableCell>
                      <TableCell className={classes.noBorder} align="right">
                        {subAccountBalanceCalculate(subAccountGroup)}
                      </TableCell>
                    </TableRow>
                    {subAccountGroup.accounts.map((account, i, arr) => {
                      // last one
                      if (arr.length - 1 === i) {
                        return (
                          <TableRow key={account.number}>
                            <TableCell></TableCell>
                            <TableCell>
                              {account.number} {account.name}
                            </TableCell>
                            <TableCell></TableCell>
                          </TableRow>
                        );
                      }
                      return (
                        <TableRow key={account.number}>
                          <TableCell className={classes.noBorder}></TableCell>
                          <TableCell className={classes.noBorder}>
                            {account.number} {account.name}
                          </TableCell>
                          <TableCell className={classes.noBorder}></TableCell>
                        </TableRow>
                      );
                    })}
                  </>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
        <CardActions>
          <CreateSubAccountGroup
            mainAccountGroupId={mainAccountGroup.id}
            callback={callback}
          />
          <CreateAccount
            subAccountGroups={mainAccountGroup.subAccountGroups}
            callback={callback}
          />
        </CardActions>
      </Card>
    </Grid>
  );
};
