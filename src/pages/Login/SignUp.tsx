import { NavLink, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useCreateNewUserMutation } from "../../redux/features/users/userApi";
import { useAppDispatch } from "../../redux/hook";
import { toast } from "react-hot-toast/headless";
import { createUser } from "../../redux/features/users/userSlice";

interface IFormSignUpInput {
  userName: string;
  email: string;
  password: string;
}

const SignUp = () => {
  const navigate = useNavigate();
  const [createNewUser] = useCreateNewUserMutation();

  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormSignUpInput>();

  

  const onSubmit: SubmitHandler<IFormSignUpInput> = (data) => {
    dispatch(createUser({ email: data.email, password: data.password }));
    const options = {
      userName: data.userName,
      email: data.email,
      password: data.password,
    };

    createNewUser(options);
    console.log(createNewUser);

    navigate("/");
    setTimeout(() => {
      toast.success("Successfully Signed Up.");
    }, 1000);
  };
  return (
    <div>
      <h2 className="text-3xl py-10 font-bold text-violet-500">
        Please Register
      </h2>

      <div className="md:flex md:px-6 justify-center items-center mx-auto">
        <div className="md:w-1/2 mx-auto md:mx-0 pb-2">
          <img
            className="w-4/5 mx-auto rounded-2xl"
            src="https://img.freepik.com/free-vector/sign-up-concept-illustration_114360-7865.jpg?w=2000"
            alt=""
          />
        </div>
        <div className="w-5/6 md:w-1/2 lg:w-1/3 mx-auto md:mx-0 pt-16 pb-10 bg-green-100 rounded-box">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control w-5/6 md:w-2/3 mx-auto  ">
              <label className="label">
                <span className="label-text text-black font-semibold">
                  <span>
                    <i className="fa-solid fa-person"></i>
                  </span>{" "}
                  Your Name
                </span>
              </label>
              <input
                type="text"
                placeholder="Type your Name"
                className="input text-gray-900 text-lg"
                {...register("userName", {
                  required: true,
                })}
              />
              {errors.userName && errors.userName.type === "required" && (
                <small className="text-red-600"> This field is required</small>
              )}
              <label className="label">
                <span className="label-text text-black font-semibold">
                  {" "}
                  <span>
                    <i className="fa-solid fa-envelope"></i>
                  </span>
                  Email
                </span>
              </label>
              <input
                {...register("email", {
                  required: true,

                  pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/i,
                })}
                placeholder="Type your email"
                className="input text-gray-900 text-lg"
              />
              {errors.email &&
                (errors.email.type === "pattern" ? (
                  <small className="text-red-600">
                    Please enter an valid email
                  </small>
                ) : (
                  <small className="text-red-600">
                    {" "}
                    This field is required
                  </small>
                ))}
              <label className="label">
                <span className="label-text text-black font-semibold">
                  <span>
                    <i className="fa-sharp fa-solid fa-key"></i>{" "}
                  </span>
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
                  <small className="text-red-600">
                    your password should have 7 to 15 charecter,one digit, one
                    special character( ! @ # $ % ^ & *)
                  </small>
                ) : (
                  <small className="text-red-600">
                    {" "}
                    This field is required
                  </small>
                ))}
              <br />
              <div className="flex justify-center">
                {" "}
                <button className="bg-green-600 text-white border border-green-600 mt-8 mb-3 w-[200px] py-2 rounded-xl m-1 flex justify-center items-center">
                  <span className="mx-2"> Sign Up</span>{" "}
                </button>
              </div>
              {/* <div>
                <input
                  //   onClick={() => setAgree(!agree)}
                  type="checkbox"
                  name="terms"
                  id="terms"
                />
                <label
                  //   className={`pl-2 ${agree ? "" : "text-red-600"}`}
                  htmlFor="terms"
                >
                  Accept Repair House Terms and Conditions
                </label>

                <input
                  //   disabled={!agree}
                  type="submit"
                  value="REGISTER"
                  className=" btn w-full mt-2 border-0 bg-violet-500 hover:bg-violet-700 text-white"
                />
              </div> */}

              <div className="text-red-500 pb-5">{/* {error} */}</div>
              <h2>
                Have an Account?{" "}
                <NavLink
                  to="/login"
                  className="text-green-500 font-bold underline"
                >
                  Click to Login
                </NavLink>
              </h2>
              <br />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
