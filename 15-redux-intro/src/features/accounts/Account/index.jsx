import styles from "./Account.module.css";
import Form from "../../../components/Form";

function Account() {
  return (
    <div className={styles.account}>
      <h2>👋 Welcome</h2>
      <h3>Your account operations</h3>
      <Form>
        <div>
          <label htmlFor="deposit">Deposit</label>
          <input id="deposit" type="text" />
          <select name="currency" id="currency">
            <option value="usd">USD Dollar</option>
            <option value=""></option>
            <option value=""></option>
          </select>
          <button>Deposit</button>
        </div>
        <div>
          <label htmlFor="withdraw">Withdraw</label>
          <input id="withdraw" type="text" />
          <button>Withdraw</button>
        </div>
        <div>
          <label htmlFor="requestLoan">Request Loan</label>
          <input id="requestLoan" type="text" placeholder="Loan amount" />
          <input id="loanPurpose" type="text" placeholder="Loan purpose" />
          <button>Withdraw</button>
        </div>
        <div>
          <label>Pay back $X</label>
          <button>Pay Loan</button>
        </div>
      </Form>
    </div>
  );
}

export default Account;
