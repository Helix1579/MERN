import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import About from './Pages/About';
import Profile from './Pages/Profile';
import Header from './Components/Header';
import PrivateRoute from './Components/PrivateRoute';
import CreateListing from './Pages/CreateListing';
import ShowListing from './Pages/ShowListing';
import UpdateListing from './Pages/UpdateListing';
import Listing from './Pages/Listing';
import Search from './Pages/Search';

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/sign-in' element={<SignIn />} />
                <Route path='/sign-up' element={<SignUp />} />
                <Route path='/about' element={<About />} />
                <Route path='/listing/:listingId' element={<Listing />} />
                <Route path='/search' element={<Search />} />
                <Route element={<PrivateRoute />}>
                    <Route path='/profile' element={<Profile />} />
                    <Route path='/createListing' element={<CreateListing />} />
                    <Route
                        path='/updateListing/:listingId'
                        element={<UpdateListing />}
                    />
                    <Route path='/userListing' element={<ShowListing />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
