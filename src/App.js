import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DashBoard from "./layouts/DashBoard";
import { useDispatch, useSelector } from "react-redux";
import { getProfileFetch } from "./slices/authSlice";
import NotFound from "./pages/NotFound";
import Detail from "./pages/Detail";
import Product from "./pages/Product";
import DashboardAdmin from "./pages/DashboardAdmin";
import { FloatButton } from "antd";
import Order from "./pages/Order";
import About from "./pages/About";
import { useMediaQuery } from "react-responsive";
import NoteMobile from "./pages/NoteMobile";

const App = () => {
  const dispatch = useDispatch();
  const { currentUser, isAuthenticated } = useSelector((state) => state.auth);
  const isDesktop = useMediaQuery({ minWidth: 1224 });
  useEffect(() => {
    dispatch(getProfileFetch());
  }, [dispatch]);
  if (isDesktop) {
    return (
      <>
        <div>
          <ToastContainer
            limit={1}
            autoClose={1000}
            newestOnTop={false}
            closeOnClick={false}
            pauseOnFocusLoss={false}
            pauseOnHover={false}
          />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<DashBoard />}>
                <Route path="/" element={<Home />} />
                <Route path="/product" element={<Product />}></Route>
                <Route path="/product/:id" element={<Detail />}></Route>
                <Route path="/about" element={<About />}></Route>
                {currentUser?.role?.name === "ADMIN" && (
                  <Route path="/admin" element={<DashboardAdmin />}></Route>
                )}
                {isAuthenticated && (
                  <Route path="/order" element={<Order />}></Route>
                )}
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
          <FloatButton.BackTop />
        </div>
      </>
    );
  } else {
    return <NoteMobile></NoteMobile>;
  }
};

export default App;
