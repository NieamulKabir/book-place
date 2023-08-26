import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

import menu from "../assets/menu.svg";
import close from "../assets/close.svg";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { toast } from "react-hot-toast";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import { setUser } from "../redux/features/users/userSlice";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);

  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const handleSignOut = () => {
    signOut(auth).then(() => {
      dispatch(setUser(null));
      toast.success("successfully logged out");
    });
  };

  return (
    <nav className="w-full flex items-center py-3 fixed top-0 z-20 bg-gray-800 px-6 md:px-16 lg:px-24">
      <div className="w-full flex justify-between items-center max-w-screen mx-auto">
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <img
            className="w-16 h-16 object-contain "
            src="https://i.ibb.co/R0kXqbB/book-place-low-resolution-logo-white-on-transparent-background.png"
            alt="logo"
          />
        </Link>

        <ul className="list-none hidden sm:flex flex-row gap-8 text-white">
          <li
            className={`${
              active === "/home" ? "text-green-300" : "text-white"
            } hover:text-white text-[18px] font-medium cursor-pointer`}
            onClick={() => setActive("/home")}
          >
            <NavLink to="/home">
              <button className="">Home</button>
            </NavLink>
          </li>
          <li
            className={`${
              active === "/allBooks" ? "text-green-300" : "text-white"
            } hover:text-white text-[18px] font-medium cursor-pointer`}
            onClick={() => setActive("/allBooks")}
          >
            <NavLink to="/allBooks">
              <button className="">All-Books</button>
            </NavLink>
          </li>
          <li
            className={`${
              active === "/addBook" ? "text-green-300" : "text-white"
            } hover:text-white text-[18px] font-medium cursor-pointer`}
            onClick={() => setActive("/addBook")}
          >
            <NavLink to="/addBook">
              <button className="">
                
              <i className="fa-solid fa-plus"></i> Add-Book
                </button>
            </NavLink>
          </li>

          <li
            className={`${
              active === "/wishlist" ? "text-green-300" : "text-white"
            } hover:text-white text-[18px] font-medium cursor-pointer`}
            onClick={() => setActive("/wishlist")}
          >
            <NavLink to="/wishlist">
              <button className="">
                
              <i className="fa-solid fa-heart-circle-check"></i> 
                </button>
            </NavLink>
          </li>
          <li
            className={`${
              active === "/reading" ? "text-green-300" : "text-white"
            } hover:text-white text-[18px] font-medium cursor-pointer`}
            onClick={() => setActive("/reading")}
          >
            <NavLink to="/reading">
              <button className="">
                
              <i className="fa-solid fa-book-open"></i> 
                </button>
            </NavLink>
          </li>
          <li
            className={`${
              active === "/completeReading" ? "text-green-300" : "text-white"
            } hover:text-white text-[18px] font-medium cursor-pointer`}
            onClick={() => setActive("/completeReading")}
          >
            <NavLink to="/completeReading">
              <button className="">
                
              <i className="fa-solid fa-circle-check"></i>
                </button>
            </NavLink>
          </li>

          {/* login  */}

          {user.email ? (
            <button
              onClick={async () => {
                await handleSignOut();
              }}
            >
              <div className="">
                <Link
                  to="/login"
                  className="bg-green-500 w-36 px-4 py-[12px] font-semibold text-white rounded-xl"
                >
                  <span className="text-lg">Sign-Out</span>
                </Link>
              </div>
            </button>
          ) : (
            <li
              className={`${
                active === "/login" ? "text-green-300" : "text-white"
              } hover:text-white text-[18px] font-medium cursor-pointer`}
              onClick={() => setActive("/login")}
            >
              <NavLink to="/login">
                <button className="">Login</button>
              </NavLink>
            </li>
          )}

          {!user.email && (
            <li
              className={`${
                active === "/signUp" ? "text-green-300" : "text-white"
              } hover:text-white text-[18px] font-medium cursor-pointer`}
              onClick={() => setActive("/signUp")}
            >
              <NavLink to="/signUp">
                <button className="">SignUp</button>
              </NavLink>
            </li>
          )}
        </ul>

        <div className="sm:hidden flex flex-1 justify-end items-center">
          <img
            src={toggle ? close : menu}
            alt="menu"
            className="w-[28px] h-[28px] object-contain"
            onClick={() => setToggle(!toggle)}
          />
          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 bg-gray-500 absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}
          >
            <ul className="list-none flex justify-end items-start flex-col first-letter:gap-4">
            <li
            className={`${
              active === "/home" ? "text-green-300" : "text-white"
            } hover:text-white text-[18px] font-medium cursor-pointer`}
            onClick={() => setActive("/home")}
          >
            <NavLink to="/home">
              <button className="">Home</button>
            </NavLink>
          </li>
          <li
            className={`${
              active === "/allBooks" ? "text-green-300" : "text-white"
            } hover:text-white text-[18px] font-medium cursor-pointer`}
            onClick={() => setActive("/allBooks")}
          >
            <NavLink to="/allBooks">
              <button className="">All-Books</button>
            </NavLink>
          </li>
          <li
            className={`${
              active === "/addBook" ? "text-green-300" : "text-white"
            } hover:text-white text-[18px] font-medium cursor-pointer`}
            onClick={() => setActive("/addBook")}
          >
            <NavLink to="/addBook">
              <button className="">
                
              <i className="fa-solid fa-plus"></i> Add-Book
                </button>
            </NavLink>
          </li>

          <li
            className={`${
              active === "/wishlist" ? "text-green-300" : "text-white"
            } hover:text-white text-[18px] font-medium cursor-pointer`}
            onClick={() => setActive("/wishlist")}
          >
            <NavLink to="/wishlist">
              <button className="">
                
              <i className="fa-solid fa-heart-circle-check"></i> 
                </button>
            </NavLink>
          </li>
          <li
            className={`${
              active === "/reading" ? "text-green-300" : "text-white"
            } hover:text-white text-[18px] font-medium cursor-pointer`}
            onClick={() => setActive("/reading")}
          >
            <NavLink to="/reading">
              <button className="">
                
              <i className="fa-solid fa-book-open"></i> 
                </button>
            </NavLink>
          </li>
          <li
            className={`${
              active === "/completeReading" ? "text-green-300" : "text-white"
            } hover:text-white text-[18px] font-medium cursor-pointer`}
            onClick={() => setActive("/completeReading")}
          >
            <NavLink to="/completeReading">
              <button className="">
                
              <i className="fa-solid fa-circle-check"></i>
                </button>
            </NavLink>
          </li>

          {/* login  */}

          {user.email ? (
            <button
              onClick={async () => {
                await handleSignOut();
              }}
            >
              <div className="mt-3">
                <Link
                  to="/login"
                  className="bg-green-500 w-36 px-4 py-[12px] font-semibold text-white rounded-xl"
                >
                  <span className="text-lg">Sign-Out</span>
                </Link>
              </div>
            </button>
          ) : (
            <li
              className={`${
                active === "/login" ? "text-green-300" : "text-white"
              } hover:text-white text-[18px] font-medium cursor-pointer`}
              onClick={() => setActive("/login")}
            >
              <NavLink to="/login">
                <button className="">Login</button>
              </NavLink>
            </li>
          )}

          {!user.email && (
            <li
              className={`${
                active === "/signUp" ? "text-green-300" : "text-white"
              } hover:text-white text-[18px] font-medium cursor-pointer`}
              onClick={() => setActive("/signUp")}
            >
              <NavLink to="/signUp">
                <button className="">SignUp</button>
              </NavLink>
            </li>
          )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
