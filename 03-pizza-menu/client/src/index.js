// * so we will create the first file in src where development related the most
// * so it should be called index.js because the webpack module bundler in this project expects the entry point to be called index.js

import React, { StrictMode, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

// *App is main component
// *component named convention: pascal case name NameNam
function App() {
  // const x = 0;
  return (
    <div className="container">
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}

function Header() {
  const style = {};

  return (
    <header className="header">
      <h1 style={style}>Fast deliver pizza on the world</h1>
    </header>
  );
}

function Menu() {
  const [pizzas, setPizzas] = useState();
  const getPizzas = async function () {
    const res = await fetch("http://127.0.0.1:3001/api/v1/pizza");
    const data = await res.json();
    setPizzas(data.pizza);
  };
  useEffect(() => {
    getPizzas();
  }, []);

  if (pizzas?.length < 0) return <p>We're closing, please come later</p>;

  return (
    <main className="menu">
      <h2>Pizza menu here</h2>
      {pizzas?.length > 0 ? (
        <>
          <p>
            pizza, dish of Italian origin consisting of a flattened disk of
            bread dough topped with some combination of olive oil, oregano,
            tomato, olives, mozzarella or other cheese, and many other
            ingredients, baked quickly—usually
          </p>
          <ul className="pizzas">
            {pizzas.map((pizza) => (
              <Pizza pizzaObj={pizza} key={pizza._id} />
            ))}
          </ul>
        </>
      ) : (
        <p>We're closing, please come later</p>
      )}
      {/* {pizzas?.length > 0 && (
        <ul className="pizzas">
          {pizzas.map((pizza) => (
            <Pizza pizzaObj={pizza} key={pizza._id} />
          ))}
        </ul>
      )} */}
      {/* <Pizza
        name="Tomato pizza"
        price={20}
        pizzaImg="pizzas/funghi.jpg"
        ingredients="Bread with italian olive oil and rosemary"
      />
      <Pizza
        vip={true}
        price={30}
        name="Honey pizza"
        ingredients="Bread with honey and rosemary"
        pizzaImg="pizzas/funghi.jpg"
      /> */}
    </main>
  );
}

function Footer() {
  const hours = new Date().getHours();
  const openHour = 12;
  const closeHour = 22;
  const isOpen = hours >= openHour && hours < closeHour;
  return (
    <footer className="footer ">
      {(isOpen && <Order />) || (
        <div className="ma-bt-sm">
          <p>Pizza store close</p>
        </div>
      )}
      <p className="copyright ">
        Our website contact, Pizza copyright in {new Date().getFullYear()}
      </p>
    </footer>
  );
  // return React.createElement("h3", null, "Hello");
}

function Order() {
  return (
    <div className="ma-bt-sm">
      <p>Pizza store is opening</p>
      <br></br>
      <button className="btn">Order now</button>
    </div>
  );
}

function Pizza({ pizzaObj }) {
  return (
    <li className={`pizza${pizzaObj.soldOut ? " sold-out" : ""}`}>
      <img src={`/${pizzaObj.photoName}`} alt={pizzaObj.name} />
      <div>
        <h3>{pizzaObj.name}</h3>
        <p>{pizzaObj.ingredients}</p>
        <span>{pizzaObj.soldOut ? "Sold out" : pizzaObj.price}</span>
      </div>
    </li>
  );
}

// *This is way we render the root or basically render the our app in the DOM in react version 18
// * get HTML div container #root
const container = document.getElementById("root");

// * convert to react root by use ReactDOM
const root = ReactDOM.createRoot(container);

// * render component JSX to HTML to inside this root block container with strict mode
// ! instead render directly the App component as the root component root.render(<App />)
//* we can run it inside the StrictMode component
// * and StrictMode not really a big deal the things it does that's during development it will render our components twice in order to find certain bug and also react will check if we're using outdated parts of react API
// * so strict mode not groundbreaking but it's still good ideal to always activate it when we develop react application
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

// * Before version 18 react

// React.render(<App />, document.getElementById("root"));
// and ReactDOM from 'react-dom';
