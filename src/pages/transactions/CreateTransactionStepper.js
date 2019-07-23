import React, { useState, useEffect } from "react";
import {
  Button,
  CircularProgress,
  makeStyles,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography
} from "@material-ui/core";

import ReviewTransaction from "./ReviewTransaction";
import TransactionDetailsForm from "./TransactionDetailsForm";
import AccountingEntriesForm from "./AccountingEntriesForm";

const useStyles = makeStyles(theme => ({
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(1200 + theme.spacing(2) * 2)]: {
      width: 1200,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3)
    }
  },
  stepper: {
    padding: theme.spacing(3, 0, 5)
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end"
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1)
  }
}));

const steps = [
  "Transaction details",
  "Accounting entries",
  "Review transaction"
];

export default ({ params }) => {
  if (!params.length) return null;

  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [ledgerData, setData] = useState(null);
  const [transaction, setTransaction] = useState({
    date: "",
    description: "",
    entries: [
      {
        accountId: "",
        side: false,
        amount: ""
      },
      {
        accountId: "",
        side: true,
        amount: ""
      }
    ]
  });

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

  function mapAccounts(mainAccountGroups) {
    let result = mainAccountGroups
      .map(mag => {
        return mag.subAccountGroups.map(sag => {
          return sag.accounts;
        });
      })
      .flat(2);

    return result;
  }

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <TransactionDetailsForm
            date={transaction.date}
            description={transaction.description}
            handleChange={handleChange}
          />
        );
      case 1:
        return (
          <AccountingEntriesForm
            accounts={mapAccounts(ledgerData.mainAccountGroups)}
            entries={transaction.entries}
            handleChange={handleChange}
            handleRemoveEntry={handleRemoveEntry}
          />
        );
      case 2:
        return (
          <ReviewTransaction
            accounts={mapAccounts(ledgerData.mainAccountGroups)}
            date={transaction.date}
            description={transaction.description}
            entries={transaction.entries}
          />
        );
      default:
        throw new Error("Unknown step");
    }
  }

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleAddEntry = () => {
    let entries = [...transaction.entries].concat({
      accountId: "",
      side: false,
      amount: ""
    });
    setTransaction({ ...transaction, entries: entries });
  };

  const handleRemoveEntry = idx => {
    let entries = [...transaction.entries].filter((item, j) => idx !== j);
    setTransaction({ ...transaction, entries: entries });
  };

  const handleChange = (name, idx) => event => {
    if (["accountId", "side", "amount"].includes(name)) {
      let entries = [...transaction.entries];
      entries[idx][name] =
        name === "side" ? event.target.checked : event.target.value;
      setTransaction({ ...transaction, entries: entries });
    } else {
      setTransaction({ ...transaction, [name]: event.target.value });
    }
  };

  if (isLoading) {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <React.Fragment>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Register transaction
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #2001539. We have emailed your order
                  confirmation, and will send you an update when your order has
                  shipped.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                  {activeStep === 1 && (
                    <Button
                      variant="contained"
                      color="default"
                      onClick={handleAddEntry}
                      className={classes.button}
                    >
                      Add entry
                    </Button>
                  )}
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1
                      ? "Submit transaction"
                      : "Next"}
                  </Button>
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </main>
    </React.Fragment>
  );
};
