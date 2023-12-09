import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Homepage from "./pages/Homepage";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import "./App.css";
import Login from "./pages/Login";
import Cities from "./components/Cities";
import Countries from "./components/Countries";
import Form from "./components/Form";
import { getCities } from "./services/apiCities";

function App() {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //filter for all country in city duplicate
  //1,how can we filter duplicate cities with country
  // const countries = cities.map((ct) => ({ country: ct.country }));

  useEffect(() => {
    const fetchCities = async () => {
      try {
        setIsLoading(true);
        const citiesData = await getCities();
        // console.log(citiesData);
        setCities(citiesData);
      } catch (err) {
        alert(err.message);
      }
      setIsLoading(false);
    };
    fetchCities();
  }, []);
  return (
    // <div className="container">
    //   <h1>Hello Routers!</h1>
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Homepage />} /> */}
        <Route index element={<Homepage />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="login" element={<Login />} />
        <Route path="app" element={<AppLayout isLoading={isLoading} />}>
          {/* declare nested route here */}
          <Route index element={<Cities cities={cities} />} />
          <Route path="cities" element={<Cities cities={cities} />} />
          <Route path="countries" element={<Countries cities={cities} />} />
          <Route path="form" element={<Form />} />
          {/* <Route path="form" element={<p>Form</p>} /> */}
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
    // </div>
  );
}

export default App;
