import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage"; // Combined login and register logic
import HomePage from "./pages/HomePage"; // Displays user profile
import Channel from "./pages/Channel"; // Assuming this is a separate feature page
import Register from "./pages/Register"; // Assuming this is a separate feature page
import Proflie from "./pages/Proflie";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default route */}
        <Route path="/" element={<AuthPage />} />
        <Route path="/home" element={<HomePage />} />
        
        {/* Authentication */}
        <Route path="/auth" element={<AuthPage />} />

        {/* Profile/Home */}
        <Route path="/channel" element={<Channel />} />
        <Route path="/profile" element={<Proflie />} />

        {/* Legacy routes (optional, if you want to keep them) */}
        <Route path="/login" element={<AuthPage />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
