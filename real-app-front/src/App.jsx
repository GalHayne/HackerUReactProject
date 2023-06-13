import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import { Route, Routes } from "react-router-dom";

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
import ProtectedRoute from "./components/common/protectedRoute";
import CardsCreate from "./components/cardsCreate";
import CardsDelete from "./components/cardsDelete";
import CardsEdit from "./components/cardsEdit";

function App() {
  return (
    <div className="app d-flex flex-column min-vh-100">
      <ToastContainer />
      <header>
        <Navbar />
      </header>
      <main className="flex-fill container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route
            path="sign-up-biz"
            element={<SignUpBiz redirect="/my-cards" />}
          />
          <Route path="sign-up" element={<SignUp redirect="/sign-in" />} />
          <Route path="sign-in" element={<SignIn redirect="/" />} />
          <Route path="sign-out" element={<SignOut redirect="/" />} />
          <Route
            path="my-cards"
            element={
                <MyCards />
            }
          />

          <Route
            path="my-cards/delete/:id"
            element={
                <CardsDelete />
            }
          />

          <Route
            path="my-cards/edit/:id"
            element={
                <CardsEdit />
            }
          />
          <Route
            path="create-card"
            element={
  
                <CardsCreate />

            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
