import {  Route, Routes } from "react-router-dom";
import Home from "./Components/Home"
import SignUp from "./Components/SignUp"
import LogIn from "./Components/LogIn";
import SlotPage from "./Components/SlotPage/SlotPage";
import ProtectedRoute from "./Components/ProtectedRoute";

function App() {
  return (
    <Routes>
           <Route path="/" element={<Home />} />
           <Route path="/sign-up" element={<SignUp />} />     
           <Route path="/log-in" element={<LogIn />} />     
           <Route element={<ProtectedRoute />}>
        <Route path="/slot" element={<SlotPage />} />
      </Route>   
  </Routes>
  )
}

export default App
