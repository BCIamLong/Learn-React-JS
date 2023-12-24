import PageNav from "../components/PageNav";
import styles from "./Product.module.css";

function Product() {
  return (
    <div className="container">
      <div className={styles.product}>
        <PageNav />
        <main className={styles.main}>
          <div className={styles.box}>
            <img src="/imgs/img-1.jpg" alt="" />

            <div className={styles.content}>
              <p className={styles.heading}>About WorldWide.</p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo
                est dicta illum vero culpa cum quaerat architecto sapiente eius
                non soluta, molestiae nihil laborum, placeat debitis, laboriosam
                at fuga perspiciatis?
              </p>
              <br />
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Corporis doloribus libero sunt expedita ratione iusto, magni, id
                sapiente sequi officiis et.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Product;
