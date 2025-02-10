import {  Route, Routes ,Navigate  } from "react-router-dom";
import Home from "./Components/LandingPage/Home"
import SignUp from "./Components/SignUp"
import LogIn from "./Components/LogIn";
import SlotPage from "./Components/SlotPage/SlotPage";
import ProtectedRoute from "./Components/ProtectedRoute";

function App() {
  const token = localStorage.getItem("token");
  return (
    <Routes>
           <Route path="/" element={token ? <Navigate to="/slot" /> : <Home />} />
           <Route path="/sign-up" element={token ? <Navigate to="/slot" /> : <SignUp />} />
           <Route path="/log-in" element={token ? <Navigate to="/slot" /> : <LogIn />} />
           <Route element={<ProtectedRoute />}>
             <Route path="/slot" element={<SlotPage />} />
           </Route>
           <Route path="*" element={<Navigate to="/" />} />   
  </Routes>
  )
}

export default App
