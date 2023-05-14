import readTodosRequest from "./api/readTodosRequest";
import ClipLoader from "react-spinners/ClipLoader";
import { TodoItem } from "./components/TodoItem";
import {
  useQueryClient,
  useMutation,
  QueryClient,
  useQuery,
} from "react-query";
import { NewTodoForm } from "./components/NewTodoForm";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { useState, useEffect } from "react";
import logo from "./logo.svg";

function App() {
  const [auth, setAuth] = useState(
    false || window.localStorage.getItem("auth") === "true"
  );
  const [userId, setUserId] = useState("");
  const [token, setToken] = useState("");

  const { isLoading, data: todos } = useQuery("todos", () =>
    readTodosRequest(token)
  );

  const loginWithGoogle = () => {
    firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((userCred) => {
        setAuth(true);
        window.localStorage.setItem("auth", "true");
      });
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged((userCred) => {
      if (userCred) {
        setAuth(true);
        window.localStorage.setItem("auth", "true");
        setUserId(userCred.uid);
        userCred.getIdToken().then((token) => {
          setToken(token);
        });
      } else {
        // User not logged in or has just logged out.
      }
    });
  }, []);

  return (
    <div>
      <div className="w-full bg-[#E7FF56] h-[175px] ">
        <div className="flex justify-between items-center h-[175px] px-[20%]">
          <div className="text-[70px]">
            <img width="120" src={logo} alt="logo" />
          </div>
          <div className="text-[70px] font-nunito">uTodo</div>
          <div className="">
            <button
              className="h-[77px] w-[145px] border border-black text-[32px]"
              onClick={loginWithGoogle}
            >
              Log in
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="text-[36px]  border border-black w-[485px] h-[86px] blur-[1.5px]">
          <p className="text-center leading-[80px]">minimaze distractions</p>
        </div>
        <div className="text-[48px]  border border-black w-[658px] h-[136px] ">
          <p className="text-center leading-[130px]">
            focus on what's important
          </p>
        </div>
      </div>
      <div className="text-center">login to save</div>
      <div>
        {auth ? (
          <div>
            <NewTodoForm userId={userId} token={token} />
            <div className="mt-6">
              {isLoading ? (
                <ClipLoader size={150} />
              ) : (
                todos?.map((todo) => (
                  <TodoItem todo={todo} key={todo._id} token={token} />
                ))
              )}
            </div>
          </div>
        ) : (
          <div>nothing to show</div>
        )}
      </div>
    </div>
  );
}

export default App;
