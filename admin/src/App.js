import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

  
import './App.css';
import Login from './pages/Login';
import Home from './pages/Home';
import Header from './components/Header';
import TaskAssign from './pages/TaskAssign';
import CatalogUpdate from './pages/Catalog/CatalogUpdate';
import Workshops from './pages/ManageUser/Workshops';
import KarigerDetails from './pages/ManageUser/KarigerDetails';
import CustomerDetails from './pages/ManageUser/CustomerDetails';
import ReviewOrders from './pages/ReviewOrders';
import EditOrders from './pages/EditOrders';
import ManageUsers from './pages/ManageUser/ManageUsers';
import AddUser from './pages/ManageUser/AddUser';
import Welcome from './pages/Welcome';
import {Protected} from './components/Protected';
import CreateCatalog from './pages/Catalog/CreateCatalog';
import Distributor from './pages/ManageUser/Distributor';
import CatalogMenu from './pages/Catalog/CatalogMenu';
import CreateCatMenu from './pages/Catalog/CreateCatMenu';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
      <Route exact path='/' element={<Welcome/>} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/home' element={<Protected Component= {Home}/>}/>
        <Route exact path='/task_assign' element={<TaskAssign/>} />
        <Route exact path='/catalog_create' element={<CreateCatalog />} />
        <Route exact path='/catalog_menu' element={<CatalogMenu />} />
        <Route exact path='/addcatalog_menu' element={<CreateCatMenu />} />
        <Route exact path='/catalog_update/:category' element={<CatalogUpdate />} />
        <Route exact path='/workshops' element={<Workshops />} />
        <Route exact path='/kariger' element={<KarigerDetails />} />
        <Route exact path='/distributor' element={<Distributor />} />
        <Route exact path='/customer' element={<CustomerDetails />} />
        <Route exact path='/add_user' element={<AddUser />} />
        <Route exact path='/manage_users' element={<ManageUsers />} />
        <Route exact path='/review_orders' element={<ReviewOrders />} />
        <Route exact path='/editorder/:id' element={<EditOrders/>}/>
      </Routes>
    </Router>
  );
}

export default App;
