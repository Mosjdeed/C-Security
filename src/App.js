import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePageOne from "./pages/HomePageOne";
import HomePageTwo from "./pages/HomePageTwo";
import './styles/main.css';
import AddUserPage from "./pages/AddUserPage";
import AssignRolePage from "./pages/AssignRolePage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import PortfolioPage from "./pages/PortfolioPage";
import RoleAccessPage from "./pages/RoleAccessPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import UsersListPage from "./pages/UsersListPage";
import ViewProfilePage from "./pages/ViewProfilePage";
import RouteScrollToTop from "./helper/RouteScrollToTop";
import ChatPage from "./pages/ChatPage";


function App() {
  return (
    <BrowserRouter>
      <RouteScrollToTop />
      <Routes>
        <Route exact path='/' element={<HomePageOne />} />
        <Route exact path='/index-2' element={<HomePageTwo />} />

        {/* SL */}
        <Route exact path='/add-user' element={<AddUserPage />} />
        <Route exact path='/assign-role' element={<AssignRolePage />} />
        {/* <Route exact path='/email' element={<EmailPage />} /> */}
        <Route exact path='/forgot-password' element={<ForgotPasswordPage />} />


        <Route exact path='/portfolio' element={<PortfolioPage />} />
        <Route exact path='/role-access' element={<RoleAccessPage />} />
        <Route exact path='/sign-in' element={<SignInPage />} />
        <Route exact path='/sign-up' element={<SignUpPage />} />
        <Route exact path='/users-list' element={<UsersListPage />} />
        <Route exact path='/view-profile' element={<ViewProfilePage />} />
        <Route exact path='/chat' element={<ChatPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
