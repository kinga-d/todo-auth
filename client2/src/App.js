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
import { List, useMediaQuery } from "@mui/material";
import { DummyTodoList } from "./components/DummyTodoList";

function App() {
  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  const isMini = useMediaQuery("(min-width: 620px)");

  const [auth, setAuth] = useState(
    false || window.localStorage.getItem("auth") === "true"
  );
  const [userId, setUserId] = useState("");
  const [token, setToken] = useState("");
  const [userName, setUserName] = useState("");

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

  const logOut = () => {
    setUserName("");
    setUserId("");
    setToken("");
    setAuth(false);
    localStorage.clear();

    firebase.auth().signOut();
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged((userCred) => {
      if (userCred) {
        setAuth(true);
        window.localStorage.setItem("auth", "true");
        setUserId(userCred.uid);
        userCred.getIdToken().then((token) => {
          setToken(token);
          setUserName(userCred.displayName);
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

          {isNonMobile ? (
            <div className="text-[70px] font-nunito">uTodo</div>
          ) : (
            <div></div>
          )}
          <div className="">
            <button
              className="h-[77px] w-[145px] border border-black text-[32px]"
              onClick={!auth ? loginWithGoogle : logOut}
            >
              {!auth ? "Log in" : "Log out"}
            </button>
          </div>
        </div>
      </div>
      {!auth ? (
        <div className="flex flex-col justify-center items-center mt-[86px]">
          {isNonMobile ? (
            <div className="text-[36px]  border bg-white border-black w-[485px] h-[86px] blur-[1.5px] ">
              <p className="text-center leading-[80px]">
                minimaze distractions
              </p>
            </div>
          ) : (
            <div className="text-center  text-3xl  blur-[1.5px]">
              <p>minimaze distractions</p>
            </div>
          )}
          {isNonMobile ? (
            <div className="text-[48px]  border border-black w-[658px] h-[136px] mt-[-30px]">
              <p className="text-center leading-[130px]">
                focus on what's important
              </p>
            </div>
          ) : (
            <div className="text-5xl  mt-[10px] text-center ">
              <p>focus on what's important</p>
            </div>
          )}
        </div>
      ) : (
        <div className="text-5xl  mt-[60px] mb-[80px] text-center ">
          Hello, {userName} 👋
        </div>
      )}
      {!auth ? (
        <div className="text-center mt-[65px] italic text-[20px]">
          login to save
        </div>
      ) : (
        <div className="mt-[50px]  "></div>
      )}
      <div>
        {auth ? (
          <div>
            <NewTodoForm userId={userId} token={token} />
            <div className="flex flex-col justify-center items-center">
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
          <div>
            <DummyTodoList />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
