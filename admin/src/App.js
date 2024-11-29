import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { AppContextProvider } from './context/AppContext';
import React, { useContext, Suspense } from 'react';
import SignIn from "./pages/SignIn";
import PrivateRoute from './components/PrivateRoute'
import ScrollToTop from './components/ScrollToTop';
import Loader from './components/Loader';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import IndexHome from './pages/Home';
import Error from './pages/Error';
import EmailTemplate from './pages/EmailTemplates';
import Content from './pages/Content';
import Notification from './pages/Notification';
import ViewNotification from './pages/ViewNotification';
import ViewEmailTemplate from './pages/ViewEmailTemplate';
import Profile from './pages/Profile';
import SchoolManager from './pages/SchoolManager';
import Parent from './pages/Parent';



window.Buffer = window.Buffer || require("buffer").Buffer;
function App() {

  return (
    <AuthProvider>
      <AppContextProvider>
        <Suspense fallback={<Loader />}>
          <BrowserRouter>
            <ScrollToTop />
            <ToastContainer closeOnClick={true} />
            <AppRoutes />
          </BrowserRouter>
        </Suspense>
      </AppContextProvider>
    </AuthProvider>
  );
}

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<SignIn />} />
      <Route path="/" element={<SignIn />} />
      <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>} >
        <Route exact path="/" element={<IndexHome />} />
        <Route exact path="/dashboard" element={<IndexHome />} />
        <Route exact path="/notification-manager" element={<Notification />} />
        <Route exact path="/content-manager" element={<Content />} />
        <Route exact path="/email-template-manager" element={<EmailTemplate />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/view-notification/:id" element={<ViewNotification />} />
        <Route exact path="/view-email-template/:id" element={<ViewEmailTemplate />} />
        <Route exact path="/SchoolManager" element={<SchoolManager />} />
        <Route exact path="/Parent" element={<Parent />} />
      </Route>
      <Route path="*" element={<Error />} />
    </Routes>
  )
}

const Layout = () => {
  return (<> <Outlet />  </>
  )
}


export default App;
