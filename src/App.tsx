import "./assets/styles/global/App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { FinancingPage } from "./pages";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FinancingPage />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
};

export default App;
