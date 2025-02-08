import {  Route, Routes } from "react-router-dom";
import Home from "./Components/Home"
import SignUp from "./Components/SignUp"

function App() {
  return (
    <Routes>
           <Route path="/" element={<Home />} />
           <Route path="/sign-up" element={<SignUp />} />     
  </Routes>
  )
}

export default App
