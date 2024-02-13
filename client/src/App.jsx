import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home';
import SignIn from './Pages/SignIn';
import SignOut from './Pages/SignOut';
import About from './Pages/About';
import Profile from './Pages/Profile';
import Header from './Components/Header';

function App() {
  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignOut />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
