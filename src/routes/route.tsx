import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import AllBooks from "../pages/Books/All-Books/AllBooks";
import Login from "../pages/Login/Login";
import SignUp from "../pages/Login/SignUp";
import AddBook from "../pages/Books/AddBook/AddBook";
import BookDetail from "../pages/Books/BookDetails/BookDetail";
import EditBook from "../pages/Books/EditBook/EditBook";
import PrivateRoute from "./PrivateRoute";
import WishList from "../pages/List/WishList";
import ReadingList from "../pages/List/ReadingList";
import CompleteList from "../pages/List/CompleteList";

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
        path: "/bookDetails/:id",
        element: (
          <PrivateRoute>
            <BookDetail />
          </PrivateRoute>
        ),
      },
      {
        path: "/addBook",
        element: (
          <PrivateRoute>
            <AddBook />
          </PrivateRoute>
        ),
      },
      {
        path: "/editBook/:id",
        element: (
          <PrivateRoute>
            <EditBook />
          </PrivateRoute>
        ),
      },
      {
        path: "/wishList",
        element: (
          <PrivateRoute>
            <WishList />
          </PrivateRoute>
        ),
      },
      {
        path: "/reading",
        element: (
          <PrivateRoute>
            <ReadingList />
          </PrivateRoute>
        ),
      },
      {
        path: "/completeReading",
        element: (
          <PrivateRoute>
            <CompleteList />
          </PrivateRoute>
        ),
      },
     
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signUp",
        element: <SignUp />,
      },
    ],
  },
]);

export default routes;
