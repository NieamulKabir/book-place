import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import login from "../../assets/login.json";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { loginUser } from "../../redux/features/users/userSlice";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

interface IFormLoginInput {
  email: string;
  password: string;
}
const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.path || "/";
  // hook from
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormLoginInput>();

  // user from redux store
  const { user, isLoading, isError } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<IFormLoginInput> = (data: IFormLoginInput) => {
    dispatch(loginUser({ email: data.email, password: data.password }));
  };

  useEffect(() => {
    if (user.email && !isLoading) {
      navigate(from);
      setTimeout(() => {
        toast.success("Successfully Logged ");
      }, 2000);
    }
    if (isError) {
      toast.error("Something went wrong");
    }
  }, [from, isError, isLoading, navigate, user.email]);

  return (
    <div className="pt-28">
      <h2 className="text-center text-2xl md:text-5xl pt-10 font-bold text-green-500">
        Please Login
      </h2>
      <div className="md:flex  md:px-6 w-11/12 justify-center items-center mx-auto">
        <div className="mx-auto md:mx-0 md:w-[45%] lg:w-1/2">
          <div>
            <Lottie animationData={login} />
          </div>
        </div>
        <div className="w-5/6 md:w-[55%] lg:w-1/3 py-16 mx-auto md:mx-0 bg-green-100 rounded-box ">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control w-5/6 md:w-2/3 mx-auto ">
              <label className="label">
                <span className="label-text text-black font-semibold">
                  <span>
                    <i className="fa-solid fa-envelope"></i>
                  </span>{" "}
                  Email
                </span>
              </label>
              <input
                {...register("email", {
                  required: true,

                  pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/i,
                })}
                type="email"
                placeholder="Type your email"
                className="input text-gray-900 text-lg"
              />
              {errors.email &&
                (errors.email.type === "pattern" ? (
                  <small className="text-red-500">
                    Please enter an valid email
                  </small>
                ) : (
                  <small className="text-red-500">
                    {" "}
                    This field is required
                  </small>
                ))}
              <label className="label">
                <span className="label-text  text-black font-semibold">
                  <span>
                    <i className="fa-sharp fa-solid fa-key"></i>{" "}
                  </span>{" "}
                  Password
                </span>
              </label>
              <input
                {...register("password", {
                  required: true,
                  pattern:
                    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/i,
                })}
                type="password"
                placeholder="Type your password"
                className="input text-gray-900 text-lg"
              />
              {errors.password &&
                (errors.password.type === "pattern" ? (
                  <small className="text-red-500">
                    Password should have 7 to 15 character, 1 digit, 1 special
                    character( ! @ # $ % ^ & *)
                  </small>
                ) : (
                  <small className="text-red-500">
                    {" "}
                    This field is required
                  </small>
                ))}
              <br />
              <input
                type="submit"
                value="LOGIN"
                className=" btn bg-green-500 hover:bg-violet-700 text-white border-none "
              />

              <h2>
                <span className="text-black font-semibold">Need Account?</span>{" "}
                <NavLink
                  className="text-green-600 font-semibold underline"
                  to="/signUp"
                >
                  Create Account
                </NavLink>
              </h2>
              <br />

              <p>
                Forget Password?{" "}
                <button
                  className="btn btn-link text-green-500 pe-auto text-decoration-none"
                  //   onClick={resetPassword}
                >
                  Reset Password
                </button>{" "}
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
