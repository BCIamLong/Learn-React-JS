import { BrowserRouter, Routes, Route } from "react-router-dom";
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

function App() {
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
        <Route path="app" element={<AppLayout />}>
          {/* declare nested route here */}
          <Route index element={<Cities />} />
          <Route path="cities" element={<Cities />} />
          <Route path="countries" element={<Countries />} />
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
