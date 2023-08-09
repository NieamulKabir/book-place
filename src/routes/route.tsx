import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import BookDetails from "../pages/Books/BookDetails/BookDetails";
import AllBooks from "../pages/Books/All-Books/AllBooks";
import Login from "../pages/Login/Login";
import SignUp from "../pages/Login/SignUp";
import AddBook from "../pages/Books/AddBook/AddBook";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/allBooks",
        element: <AllBooks />,
      },
      {
        path:"/addBook",
        element:<AddBook />
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signUp",
        element: <SignUp />,
      },
      {
        path: "/bookDetails/:id",
        element: <BookDetails />,
      },
    ],
  },
]);

export default routes;