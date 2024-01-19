// import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import styles from "./Balance.module.css";
import { connect } from "react-redux";

Balance.propTypes = {
  balance: PropTypes.any,
};

// * now instead use useSelector to access to the store we can use the old way to do that which is use the connect function from Redux
// * so before react hooks introduced this is a way we use to access to Redux store

function Balance({ balance }) {
  // const balance = useSelector((store) => store.account.balance);
  return (
    <div className={styles.balance}>
      <p>${balance.toFixed(2)}</p>
    </div>
  );
}

// * now we will create the function mapStateToProps and what this does as the name said we will map state from the Redux store to the props of this component so Balance
function mapStateToProps(state) {
  return {
    balance: state.account.balance,
  };
}

// * and now we can pass in the mapStateToProps to the connect function
// * so connect function what it does is basically return a new function and then take this argument Balance to create new component so return a new component which can access to the state from store via props

export default connect(mapStateToProps)(Balance);
