import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import { Route, Routes, useNavigate } from "react-router-dom";

import { ToastContainer } from "react-toastify";

import About from "./components/about";
import Footer from "./components/footer";
import Home from "./components/home";
import Navbar from "./components/navbar";
import SignIn from "./components/signin";
import SignUp from "./components/signup";
import SignOut from "./components/signout";
import SignUpBiz from "./components/signupBiz";
import MyCards from "./components/myCards";
import CardsCreate from "./components/cardsCreate";
import CardsDelete from "./components/cardsDelete";
import CardsEdit from "./components/cardsEdit";
import Users from "./components/users";
import ProtectedRoute from "./components/common/protectedRoute";
import UserDeatils from "./components/userDetails";
import useDarkContext from "./hooks/useDarkModa-context";
import SignupAdmin from "./components/signupAdmin";
import { useEffect } from "react";
import usersService from "./services/usersService";
import { useAuth } from "./context/auth.context";

function App() {
  const { theme } = useDarkContext();

  const navigate = useNavigate();

  const { user } = useAuth();

  useEffect(() => {

    try{

      const res = usersService.getMe(user?._id)
      res
      .catch(() => navigate("/sign-out"))
    }catch(err){
      navigate("/sign-out");
      console.log(err);
    }
    

  }, []);

  return (
    <div className="app d-flex flex-column min-vh-100" id={theme}>
      <ToastContainer position="bottom-right" />
      <header>
        <Navbar />
      </header>
      <main className="flex-fill container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route
            path="sign-up-admin"
            element={<SignupAdmin redirect="/sign-in" />}
          />
          <Route
            path="sign-up-biz"
            element={<SignUpBiz redirect="/sign-in" />}
          />
          <Route path="sign-up" element={<SignUp redirect="/sign-in" />} />
          <Route path="sign-in" element={<SignIn redirect="/" />} />
          <Route path="sign-out" element={<SignOut redirect="/" />} />
          <Route path="user-details" element={<UserDeatils redirect="/" />} />
          <Route
            path="my-cards"
            element={
              <ProtectedRoute>
                <MyCards />
              </ProtectedRoute>
            }
          />
          <Route
            path="users"
            element={
              <ProtectedRoute isAdmin>
                <Users />
              </ProtectedRoute>
            }
          />
          <Route
            path="my-cards/delete/:id"
            element={
              <ProtectedRoute isAdmin isBiz>
                <CardsDelete />
              </ProtectedRoute>
            }
          />
          <Route
            path="my-cards/edit/:id"
            element={
              <ProtectedRoute isAdmin isBiz>
                <CardsEdit />
              </ProtectedRoute>
            }
          />
          <Route
            path="create-card"
            element={
              <ProtectedRoute isAdmin isBiz>
                <CardsCreate />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
