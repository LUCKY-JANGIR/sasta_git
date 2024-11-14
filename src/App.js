import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login"; // Combined login and register logic
import HomePage from "./pages/HomePage"; // Displays user profile
import Channel from "./pages/Channel"; // Assuming this is a separate feature page
import Register from "./pages/Register"; // Assuming this is a separate feature page
import Proflie from "./pages/Proflie";
import Createcommunity from "./pages/Createcommunity";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default route */}
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<HomePage />} />
        
        {/* Profile/Home */}
        <Route path="/community" element={<Channel />} />
        <Route path="/profile" element={<Proflie />} />
        <Route path="/createcommunity" element={<Createcommunity/>} />

        {/* Legacy routes (optional, if you want to keep them) */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
