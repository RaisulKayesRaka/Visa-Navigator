import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import Home from "./pages/Home.jsx";
import AllVisas from "./pages/AllVisas.jsx";
import AddVisa from "./pages/AddVisa.jsx";
import MyAddedVisas from "./pages/MyAddedVisas.jsx";
import MyVisaApplications from "./pages/MyVisaApplications.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import { HelmetProvider } from "react-helmet-async";
import AuthProvider from "./provider/AuthProvider.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import VisaProvider from "./provider/VisaProvider.jsx";
import VisaDetails from "./pages/VisaDetails.jsx";
import { ThemeProvider } from "./provider/ThemeProvider.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/all-visas",
        element: <AllVisas />,
      },
      {
        path: "/add-visa",
        element: (
          <PrivateRoute>
            <AddVisa />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-added-visas",
        element: (
          <PrivateRoute>
            <MyAddedVisas />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-visa-applications",
        element: (
          <PrivateRoute>
            <MyVisaApplications />
          </PrivateRoute>
        ),
      },
      {
        path: "/visa-details/:id",
        element: (
          <PrivateRoute>
            <VisaDetails />
          </PrivateRoute>
        ),
        loader: ({ params }) => {
          return fetch(
            `https://visa-navigator-server-chi.vercel.app/visas/${params.id}`,
          );
        },
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <ThemeProvider>
        <AuthProvider>
          <VisaProvider>
            <RouterProvider router={router} />
          </VisaProvider>
        </AuthProvider>
      </ThemeProvider>
    </HelmetProvider>
  </StrictMode>,
);
