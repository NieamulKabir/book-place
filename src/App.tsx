import { Toaster } from "react-hot-toast";
import MainLayOut from "./layout/MainLayOut";
import { useAppDispatch } from "./redux/hook";
import { useEffect } from "react";
import { setLoading, setUser } from "./redux/features/users/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setLoading(true));

    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser(user.email!));
        dispatch(setLoading(false));
      } else {
        dispatch(setLoading(false));
      }
    });
  }, [dispatch]);
  return (
    <div className="bg-[#282c34] min-h-screen">
        <Toaster />
      <MainLayOut />
    </div>
  );
}

export default App;
