import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({}));

export default ({ accounts, date, description, entries }) => {
  const classes = useStyles();

  const getAccountDisplayName = accountId => {
    let account = accounts.find(acc => {
      return acc.id === accountId;
    });
    return `${account.number} ${account.name}`;
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Transaction summary
      </Typography>
      <Typography gutterBottom>
        Created date: {new Date().toISOString().substring(0, 10)}
      </Typography>
      <Typography gutterBottom>Transaction date: {date}</Typography>
      <Typography gutterBottom>Description: {description}</Typography>
      <Typography gutterBottom>Accounting entries:</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Account</TableCell>
            <TableCell align="right">Debet</TableCell>
            <TableCell align="right">Credit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {entries.map(entry => (
            <TableRow key={entry.accountId}>
              <TableCell>{getAccountDisplayName(entry.accountId)}</TableCell>
              {entry.side ? (
                <>
                  <TableCell align="right"></TableCell>
                  <TableCell align="right">{entry.amount}</TableCell>
                </>
              ) : (
                <>
                  <TableCell align="right">{entry.amount}</TableCell>
                  <TableCell align="right"></TableCell>
                </>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
};
