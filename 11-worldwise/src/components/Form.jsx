// import { useNavigate } from "react-router-dom";
import Button from "./Button";
import styles from "./Form.module.css";
import BackButton from "./BackButton";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

function Form() {
  // const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  // console.log(searchParams);

  useEffect(() => {
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");
  }, [searchParams]);

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
        {/* <button>Add</button> */}
        {/* <button>&larr;Back</button> */}
        {/* <Button type="add">Add</Button> */}
        <Button type="primary">Add</Button>
        <BackButton />
        {/* <Button
          type="back"
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
        >
          &larr;Back
        </Button> */}
      </div>
    </form>
  );
}

export default Form;
