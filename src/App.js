import "./App.css";
import Home from "./screens/Home";
import Login from "./screens/Login";

// Because we are not able to use some functionaluty directly
import "../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css";

// Same we would install js
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";

// To make our app a single page application
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./screens/Signup";
import { CartProvider } from "./componenets/ContextReducer";

function App() {
  return (
    
    // Now this cartProvider has become global
    <CartProvider>
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/createuser" element={<Signup />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
