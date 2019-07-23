import Ledgers from "./pages/ledgers/Ledgers";
import Accounts from "./pages/accounts/Accounts";
import Transactions from "./pages/transactions/Transactions";
import CreateTransactionStepper from "./pages/transactions/CreateTransactionStepper";

export default {
  "/": Ledgers,
  Ledgers,
  Accounts,
  Transactions,
  "create-transaction": CreateTransactionStepper
};
