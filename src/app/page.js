'use client'

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUsers } from "./store/userSlice";

import LoginPage from "./auth/login/page";
import RegisterPage from "./auth/register/page";
import DashboardPage from "./dashboard/page";

export default function Home() {

  const [isRegistered, setIsRegistered] = useState(false)
  // const [loggedInUser, setLoggedInUser] = useState(null)
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed.name && parsed.email && parsed.token) {
        dispatch(setUsers(parsed));
      }
    }
  }, [dispatch]);

  const handleSwitch = () => setIsRegistered((prev) => !prev);

  const isLoggedIn = Boolean(user && user.token);


  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-3xl font-bold">Welcome to Task Manager!</h1>
      
      {isLoggedIn ? (
        <DashboardPage user={user} />
      ) : (
        !isRegistered ? (
          <>
            <RegisterPage onRegisterSuccess={() => setIsRegistered(true)} />
            <p>
              Already Registered?{' '}
              <button onClick={handleSwitch} className="text-blue-500 underline">
                Log in
              </button>
            </p>
          </>
        ) : (
          <>
            <LoginPage onLoginSuccess={(userData) => dispatch(setUsers(userData))} />
            <p>
              Don’t have an account?{' '}
              <button onClick={handleSwitch} className="text-blue-500 underline">
                Register
              </button>
            </p>
          </>
        )
      )}
    </div>
  );
}
