import PageNav from "../components/PageNav";
import styles from "./Pricing.module.css";

function Pricing() {
  return (
    <div className="container">
      <div className={styles.pricing}>
        <PageNav />
        <main className={styles.main}>
          <div className={styles.box}>
            <div className={styles.content}>
              <p className={styles.heading}>
                <span>Simple pricing.</span>
                <span>Just $9/month.</span>
              </p>
              <p className={styles.text}>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae
                vel labore mollitia iusto. Recusandae quos provident, laboriosam
                fugit voluptatem iste.
              </p>
            </div>
            <img src="/imgs/img-2.jpg" alt="" />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Pricing;
