'use client'

import { useState } from "react";
import LoginPage from "./auth/login/page";
import RegisterPage from "./auth/register/page";

export default function Home() {

  const [isRegistered, setIsRegistered] = useState(false)

  const handleSwitch = () => {
    setIsRegistered(prev => !prev)
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <h1>Welcome to Task Manager</h1>
        {!isRegistered ? (
        <>
          <RegisterPage onRegisterSuccess={() => setIsRegistered(true)} />
          <p>Already Registered?{'' }
          <button onClick={handleSwitch} className="text-blue-500 underline">
              Log in
            </button>
          </p>
        </>
      ) : (
        <>
          <LoginPage />
          <p>
            Don’t have an account?{' '}
            <button onClick={handleSwitch} className="text-blue-500 underline">
              Register
            </button>
          </p>
        </>
      )}
    </div>
  );
}
