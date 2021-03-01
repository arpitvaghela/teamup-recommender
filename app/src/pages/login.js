import { Link } from 'gatsby';
import React, { useState } from 'react'


const login_call = (auth) => {
    if (auth.email ==="" || auth.password === "")
        return;

    fetch("http://localhost:5000/login",{
        method:"POST",
        headers: {
        'Content-Type': 'application/json'
        },
        body:JSON.stringify(auth)
    }).then((r) => r.json()).then(data => {
        window.sessionStorage.setItem("userid",data.id)
        window.location.href="/"
    })
}

const Login = () => {

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    return (
<div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
  <div className="max-w-md w-full space-y-8">
    <div>
      <img className="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow"/>
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Sign in to your account
      </h2>
      
    </div>
    <div className="mt-8 space-y-6">
      <input type="hidden" name="remember" value="true"/>
      <div className="rounded-md shadow-sm -space-y-px">
        <div>
          <label htmlFor="email-address" className="sr-only">Email address</label>
          <input id="email-address" name="email" type="email" autoComplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address"
          value={email}
          onChange={(e)=> setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password" className="sr-only">Password</label>
          <input id="password" name="password" type="password" autoComplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password"
          value={password}
          onChange={(e)=> setPassword(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-end justify-end">

        <div className="text-sm">
          <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
            Forgot your password?
          </a>
        </div>
      </div>

      <div className="grid grid-flow-col gap-4">
        <button className="justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => login_call({email,password})}
        >
          Sign in
        </button>
        <Link 
        className="justify-center text-center py-2 px-4 border border-indigo-600 text-sm font-medium rounded-md text-indigo-600 hover:bg-indigo-50               focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        to="/signup"
        >
          SignUp
        </Link>
      </div>
    </div>
  </div>
</div>

)}

export default Login;
