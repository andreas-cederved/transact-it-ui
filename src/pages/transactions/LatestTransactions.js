import React from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "./Title";

// Generate Order Data
function createData(
  id,
  identifyingCode,
  transactionDate,
  createdDate,
  descprition,
  accountingEntries
) {
  return {
    id,
    identifyingCode,
    transactionDate,
    createdDate,
    descprition,
    accountingEntries
  };
}

const rows = [
  createData(
    1,
    1,
    "2019-06-07",
    "2019-07-14",
    "Bet. faktura Tele2 mobiltelefoni för Andreas kort period i maj månad",
    [
      {
        side: 1,
        amount: 48,
        account: {
          id: 3,
          number: 1931,
          name: "Företagskonto med BG"
        }
      },
      {
        side: 0,
        amount: 48,
        account: {
          id: 6,
          number: 2440,
          name: "Leverantörsskulder"
        }
      }
    ]
  )
];

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3)
  }
}));

export default () => {
  const classes = useStyles();

  function sideAmount(entry) {
    if (entry.side === 0) {
      return (
        <>
          <TableCell align="right">{entry.amount}</TableCell>
          <TableCell align="right"></TableCell>
        </>
      );
    }

    return (
      <>
        <TableCell align="right"></TableCell>
        <TableCell align="right">{entry.amount}</TableCell>
      </>
    );
  }

  return (
    <React.Fragment>
      <Title>Recent Transactions</Title>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Identifying Code</TableCell>
            <TableCell>Transaction Date</TableCell>
            <TableCell>Description</TableCell>
            <TableCell></TableCell>
            {/* <TableCell>Account</TableCell>
            <TableCell align="right">Debit</TableCell>
            <TableCell align="right">Credit</TableCell> */}
            {/* <TableCell align="right">Sale Amount</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>
              <TableCell>{row.identifyingCode}</TableCell>
              <TableCell>{row.transactionDate}</TableCell>
              <TableCell>{row.descprition}</TableCell>
              <TableCell>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Account</TableCell>
                      <TableCell align="right">Debit</TableCell>
                      <TableCell align="right">Credit</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.accountingEntries.map(entry => (
                      <TableRow>
                        <TableCell>
                          {entry.account.number} {entry.account.name}
                        </TableCell>
                        {sideAmount(entry)}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="javascript:;">
          See more transactions
        </Link>
      </div>
    </React.Fragment>
  );
};
