import logo from './logo.svg';
import './App.css';
import Home from './components/Home/Home';
import { Container } from 'react-bootstrap';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SingleCustomer from './components/singleCustomer/SingleCustomer';

function App() {
  return <>
  <div className='app'>
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<Home />}></Route>
        <Route path='/:id' element={<SingleCustomer />}></Route>
      </Routes>
    </BrowserRouter>
    </div>

  </>


}

export default App;
