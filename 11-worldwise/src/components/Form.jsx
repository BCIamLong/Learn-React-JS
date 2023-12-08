import styles from "./Form.module.css";

function Form() {
  return (
    <form className={styles.form}>
      <div className={styles.formItem}>
        <label htmlFor="city">City name</label>
        <input id="city" type="text" />
      </div>
      <div className={styles.formItem}>
        <label htmlFor="date">When did you go to NAME_CITY?</label>
        <input id="date" type="text" />
      </div>
      <div className={styles.formItem}>
        <label htmlFor="note">Notes about your trip to NAME_CITY</label>
        <textarea id="note"></textarea>
      </div>
      <div className={styles.btnGroup}>
        <button>Add</button>
        <button>&larr;Back</button>
      </div>
    </form>
  );
}

export default Form;
