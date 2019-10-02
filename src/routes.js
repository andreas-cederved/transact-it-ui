import Ledgers from "./pages/ledgers/Ledgers";
import Accounts from "./pages/accounts/Accounts";
import Transactions from "./pages/transactions/Transactions";
import CreateTransactionStepper from "./pages/transactions/CreateTransactionStepper";
import CreateTemplateStepper from "./pages/templates/CreateTemplateStepper";
import PrintTransaction from "./pages/transactions/PrintTransaction";

export default {
  "/": Ledgers,
  Ledgers,
  Accounts,
  Transactions,
  "create-transaction": CreateTransactionStepper,
  "create-template": CreateTemplateStepper,
  "print-transaction": PrintTransaction
};
