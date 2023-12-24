import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import { useEffect, useState } from "react";

import { CitiesProvider } from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/authContext";
import ProtectedRoute from "./pages/ProtectedRoute";

// import Product from "./pages/Product";
// import Pricing from "./pages/Pricing";
// import Homepage from "./pages/Homepage";
// import PageNotFound from "./pages/PageNotFound";
// import AppLayout from "./pages/AppLayout";
// import Login from "./pages/Login";

import Cities from "./components/Cities";
import Countries from "./components/Countries";
import Form from "./components/Form";
import CityDetail from "./components/CityDetail";
import SpinnerFullPage from "./components/SpinnerFullPage";
import "./App.css";
// import { getCities } from "./services/apiCities";
// import { CitiesProvider } from "./contexts/CitiesContext";

const Homepage = lazy(() => import("./pages/Homepage"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Product = lazy(() => import("./pages/Product"));
const Login = lazy(() => import("./pages/Login"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

function App() {
  // const [cities, setCities] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);

  //filter for all country in city duplicate
  //1,how can we filter duplicate cities with country
  // const countries = cities.map((ct) => ({ country: ct.country }));

  // useEffect(() => {
  //   const fetchCities = async () => {
  //     try {
  //       setIsLoading(true);
  //       const citiesData = await getCities();
  //       // console.log(citiesData);
  //       setCities(citiesData);
  //     } catch (err) {
  //       alert(err.message);
  //     }
  //     setIsLoading(false);
  //   };
  //   fetchCities();
  // }, []);
  return (
    // <div className="container">
    //   <h1>Hello Routers!</h1>

    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              {/* <Route path="/" element={<Homepage />} /> */}
              <Route index element={<Homepage />} />
              <Route path="product" element={<Product />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="login" element={<Login />} />
              <Route
                path="app"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                  // <AppLayout isLoading={isLoading} />
                }
              >
                {/* declare nested route here */}
                {/* <Route index element={<Cities cities={cities} />} /> */}
                <Route index element={<Navigate replace to="cities" />} />
                <Route path="cities" element={<Cities />} />
                <Route path="cities/:id" element={<CityDetail />} />
                <Route path="countries" element={<Countries />} />
                {/* <Route path="cities" element={<Cities cities={cities} />} />
          <Route path="cities/:id" element={<CityDetail cities={cities} />} />
          <Route path="countries" element={<Countries cities={cities} />} /> */}
                <Route path="form" element={<Form />} />
                {/* <Route path="form" element={<p>Form</p>} /> */}
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>

    // </div>
  );
}

export default App;
