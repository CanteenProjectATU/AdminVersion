import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';//import bootstrap to all pages
import Home from './FrontendComponents/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
import MenuPage from './FrontendComponents/Menus';
import Recipes from './FrontendComponents/Recipes';

import OpeningHours from './FrontendComponents/OpeningHours';
import FoodPantry from './FrontendComponents/FoodPantry';
import CreateMenuItem from './FrontendComponents/CreateMenuItem';
import CreateRecipe from './FrontendComponents/CreateRecipe';
import EditMenuItem from './FrontendComponents/EditMenuItem';
import Day from './FrontendComponents/Day';
import AddMenuItemToDay from './FrontendComponents/AddMenuItemToDay';
import LoginPage from './FrontendComponents/Login';
import ViewMenuItems from './FrontendComponents/ViewMenuItems';

function App() {
  return (
    <BrowserRouter>
      <div className="App" id="Top">
        {/* create a navigation bar at the top of the page for going between the pages */}
       
          <Navbar expand="lg" className='NavigationBar'>
            <Container fluid>
              <Navbar.Brand href="/Home">
                <img
                  src="/homeLogo.png"
                  width="30"
                  height="30"
                  className="d-inline-block align-top"
                  alt="home logo"
                />
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link href="/">Login</Nav.Link>
                  <Nav.Link href="/Home">Home</Nav.Link>
                  <Nav.Link href="/Menus">Menu</Nav.Link>
                  <Nav.Link href="/Recipes">Recipes</Nav.Link>
                  <Nav.Link href="/FoodPantry">Food Pantry</Nav.Link>
                  <Nav.Link href="/OpeningHours">Opening Hours</Nav.Link>
                  <Nav.Link href="/CreateMenuItem">Create a new item</Nav.Link>
                  <Nav.Link href="/CreateRecipe">Submit a new recipe</Nav.Link>
                  <Nav.Link href="/ViewItems">View Menu Items</Nav.Link>
                </Nav>
              </Navbar.Collapse>

            </Container>
          </Navbar>
        
        {/* Change the url  to the specific component*/}
        <Routes>
          <Route path='/' element={<LoginPage></LoginPage>}></Route>
          <Route path='/Home' element={<Home></Home>}></Route>
          <Route path='/Menus' element={<MenuPage></MenuPage>}></Route>
          <Route path='/Recipes' element={<Recipes></Recipes>}></Route>
          <Route path='/OpeningHours' element={<OpeningHours></OpeningHours>}></Route>
          <Route path='/FoodPantry' element={<FoodPantry></FoodPantry>}></Route>
          <Route path='/CreateMenuItem' element={<CreateMenuItem></CreateMenuItem>}></Route>
          <Route path='/CreateRecipe' element={<CreateRecipe></CreateRecipe>}></Route>
          <Route path='/ViewItems' element={<ViewMenuItems></ViewMenuItems>}></Route>
          <Route path='/EditMenuItem/:id' element={<EditMenuItem></EditMenuItem>}></Route>
          {/* this route is for the weekly menu days */}
          <Route path="/day/:day" element={<Day></Day>}></Route>
          <Route path='/day/:day/addItem' element={<AddMenuItemToDay></AddMenuItemToDay>}></Route>
          
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;
