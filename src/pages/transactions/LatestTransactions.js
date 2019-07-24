import React from "react";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  makeStyles,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const useStyles = makeStyles(theme => ({
  avatar: {
    backgroundColor: green[500]
  }
}));

export default ({ accounts, transaction }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  const getAccountDisplayName = accountId => {
    let account = accounts.find(acc => {
      return acc.id === accountId;
    });
    return `${account.number} ${account.name}`;
  };

  return (
    <Grid item xs={12} sm={12} md={12}>
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="Identifying code" className={classes.avatar}>
              {transaction.identifyingCode}
            </Avatar>
          }
          action={
            <>
              <IconButton
                aria-controls="options"
                aria-haspopup="true"
                onClick={handleClick}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="options"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Create template</MenuItem>
                <MenuItem onClick={handleClose}>Print</MenuItem>
              </Menu>
            </>
          }
          title={transaction.description}
          subheader={`${transaction.transactionDate.substring(
            0,
            10
          )} / ${transaction.createdDate.substring(0, 10)}`}
        />
        <CardContent className={classes.cardContent}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Account</TableCell>
                <TableCell align="right">Debet</TableCell>
                <TableCell align="right">Credit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transaction.accountingEntries.map(entry => (
                <TableRow key={entry.accountId}>
                  <TableCell>
                    {getAccountDisplayName(entry.accountId)}
                  </TableCell>
                  {entry.side === 1 ? (
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
        </CardContent>
      </Card>
    </Grid>
  );
};
