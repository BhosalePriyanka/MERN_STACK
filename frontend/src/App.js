import{BrowserRouter as Router,Routes,Route,Navigate} from 'react-router-dom'
import Home from '../src/pages/Home'
import Navigation from './components/Navigation';
import { Provider, useSelector } from 'react-redux';
import {Store} from './Redux/Store';
import Signup from './pages/Signup';
import Login from './pages/Login';



function App() {
  const user = useSelector(state=>state.auth)


  return (
    <div className="App">
      	

      <Router>
        <Navigation/>
        <Routes>
          <Route exact path = '/home' element={ <Home/> }/>
          <Route exact path = '/signup' element={  <Signup/>   } />
          <Route exact path = '*' element={ <Login/> } />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
