import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

  
import './App.css';
import Login from './pages/Login';
import Home from './pages/Home';
import Header from './components/Header';
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
import W_OrderList from './pages/ManageUser/W_OrderList';
import K_OrderList from './pages/ManageUser/K_OrderList';
import C_OrderList from './pages/ManageUser/C_OrderList';
import D_ShopsList from './pages/ManageUser/D_ShopsList';
import Notification from './pages/Notification';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
      <Route exact path='/' element={<Welcome/>} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/home' element={<Protected Component= {Home}/>}/>
        {/* <Route exact path='/task_assign' element={<TaskAssign/>} /> */}
        <Route exact path='/catalog_create' element={<Protected Component= {CreateCatalog}/>} />
        <Route exact path='/catalog_menu' element={<Protected Component= {CatalogMenu}/>} />
        <Route exact path='/addcatalog_menu' element={<Protected Component= {CreateCatMenu}/>} />
        <Route exact path='/catalog_update/:category' element={<Protected Component= {CatalogUpdate}/>}/>
        <Route exact path='/workshops' element={<Protected Component= {Workshops}/>} />
        <Route exact path='/kariger' element={<Protected Component= {KarigerDetails}/>} />
        <Route exact path='/distributor'element={<Protected Component= {Distributor}/>} />
        <Route exact path='/customer' element={<Protected Component= {CustomerDetails}/>} />
        <Route exact path='/add_user' element={<Protected Component= {AddUser}/>} />
        <Route exact path='/manage_users'element={<Protected Component= {ManageUsers}/>} />
        <Route exact path='/review_orders' element={<Protected Component= {ReviewOrders}/>} />
        <Route exact path='/editorder/:id' element={<Protected Component= {EditOrders}/>}/>
        <Route exact path='/w_order/list/:id' element={<Protected Component= {W_OrderList}/>}/>
        <Route exact path='/k_order/list/:id'element={<Protected Component= {K_OrderList}/>}/>
        <Route exact path='/c_order/list/:id' element={<Protected Component= {C_OrderList}/>}/>
        <Route exact path='/d_shops/list/:id' element={<Protected Component= {D_ShopsList}/>}/>
        <Route exact path='/notification' element={<Protected Component= {Notification}/>} />
      </Routes>
    </Router>
  );
}

export default App;
