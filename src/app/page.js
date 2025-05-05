'use client'

import { useState } from "react";
import LoginPage from "./auth/login/page";
import RegisterPage from "./auth/register/page";
import DashboardPage from "./dashboard/page";

export default function Home() {

  const [isRegistered, setIsRegistered] = useState(false)
  const [loggedInUser, setLoggedInUser] = useState(null)

  const handleSwitch = () => {
    setIsRegistered(prev => !prev)
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <h1 className="text-3xl font-bold">Welcome to Task Manager!</h1>
        {loggedInUser ? (
        <DashboardPage user={loggedInUser} onLogout={() => setLoggedInUser(null)}/>
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
            <LoginPage onLoginSuccess={(user) => setLoggedInUser(user)} />
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

    // <DashboardPage/>

  );
}
