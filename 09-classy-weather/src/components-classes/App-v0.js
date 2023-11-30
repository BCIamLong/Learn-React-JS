import "./App.css";

function App() {
  return (
    <div classNameName="container">
      <div className="weather-box">
        <h1 className="heading-primary">classNamey Weather</h1>
        <input className="search" type="text" />
        <div className="weather-list">
          <h2 className="heading-secondary">Weather for Vietnam 🚩</h2>
          <ul className="list">
            <li className="item">
              <p className="icon">☁</p>
              <p>Today</p>
              <p>9'-18'</p>
            </li>
            <li className="item">
              <p className="icon">🌤</p>
              <p>Today</p>
              <p>9'-18'</p>
            </li>
            <li className="item">
              <p className="icon">🌧</p>
              <p>Today</p>
              <p>9'-18'</p>
            </li>
            <li className="item">
              <p className="icon">🌥</p>
              <p>Today</p>
              <p>9'-18'</p>
            </li>
            <li className="item">
              <p className="icon">🌩</p>
              <p>Today</p>
              <p>9'-18'</p>
            </li>
            <li className="item">
              <p className="icon">⛈</p>
              <p>Today</p>
              <p>9'-18'</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
