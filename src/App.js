import { BrowserRouter , Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Channel from './pages/Channel';
import Proflie from './pages/Proflie';


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Channel/>} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Proflie />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
