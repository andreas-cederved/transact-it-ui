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
import TemplateDetailsForm from "./TemplateDetailsForm";
import TemplateRulesForm from "./TemplateRulesForm";

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

const steps = ["Template details", "Template rules"];

export default ({ params }) => {
  if (!params.length) return null;

  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [ledgerData, setData] = useState(null);
  const [template, setTemplate] = useState({
    name: "",
    description: "",
    defaultTransactionAmount: "",
    defaultTransactionDescription: "",
    rules: []
  });

  useEffect(() => {
    let mounted = true;
    (async () => {
      const res1 = await fetch(
        `https://localhost:44304/api/ledgers/${params[0]}`
      );
      const res2 = await fetch(
        `https://localhost:44304/api/transactions/${params[1]}/template-rules`
      );
      const ledgerData = await res1.json();
      const generatedtemplateRules = await res2.json();
      const rules = generatedtemplateRules.map(x => {
        let rule = {
          accountId: x.accountId,
          multiplier: x.multiplier,
          side: x.side === 0 ? false : true
        };
        return rule;
      });
      if (mounted) {
        setData(ledgerData);
        setTemplate({ ...template, rules: rules });
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

  const handleChange = (name, idx) => event => {
    if (["accountId", "side", "multiplier"].includes(name)) {
      let rules = [...template.rules];
      rules[idx][name] =
        name === "side" ? event.target.checked : event.target.value;
      setTemplate({ ...template, rules: rules });
    } else {
      setTemplate({ ...template, [name]: event.target.value });
    }
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <TemplateDetailsForm {...template} handleChange={handleChange} />
        );
      case 1:
        return (
          <TemplateRulesForm
            accounts={mapAccounts(ledgerData.mainAccountGroups)}
            rules={template.rules}
            handleChange={handleChange}
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

  const handleSubmit = () => {
    (async () => {
      const res = await fetch(
        `https://localhost:44304/api/ledgers/${
          params[0]
        }/transaction-templates`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          mode: "cors",
          body: JSON.stringify({
            name: template.name,
            description: template.description,
            defaultTransactionAmount: Number(template.defaultTransactionAmount),
            defaultTransactionDescription:
              template.defaultTransactionDescription,
            transactionTemplateRules: template.rules.map(x => {
              let result = {
                accountId: Number(x.accountId),
                multiplier: Number(x.multiplier),
                side: x.side ? 1 : 0
              };
              return result;
            })
          })
        }
      );
      if (res.ok) {
        window.location.replace(`/Templates/${params[0]}`);
      }
    })();
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
            Create template
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {getStepContent(activeStep)}
            <div className={classes.buttons}>
              {activeStep !== 0 && (
                <Button onClick={handleBack} className={classes.button}>
                  Back
                </Button>
              )}
              {activeStep === steps.length - 1 ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                  className={classes.button}
                >
                  Submit template
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  className={classes.button}
                >
                  Next
                </Button>
              )}
            </div>
          </React.Fragment>
        </Paper>
      </main>
    </React.Fragment>
  );
};
