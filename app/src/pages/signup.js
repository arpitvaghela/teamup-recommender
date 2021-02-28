import React, { useState } from "react";

const pursuing_degrees = ["","BTech ICT","MTech ICT"]

const years = [1,2,3,4]
const create_user_call = (user) => {
    if(!user.email || !user.password || !user.firstname || !user.lastname || !user.degree || !user.year)return;
    console.log(user)
    fetch("http://localhost:5000/users",{
        method:"POST",
        headers: {
        'Content-Type': 'application/json'
        },
        body:JSON.stringify(user)
    }).then((r) => r.json()).then(data => {
        window.localStorage.setItem("userid",data.id)
        window.location.href="/"
    })
}
const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname,setFirstname] = useState("");
  const [lastname,setLastname] = useState("");
  const [degree,setDegree] = useState("")
  const [year,setYear] = useState("")
  return (
    <div className="min-h-screen flex justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create A New Account
          </h2>
        </div>
        <div className="mt-8 space-y-6">
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md grid grid-cols-4 gap-4">
        <label htmlFor="firstname">
                First name
              </label>
              <input
                id="firstname"
                name="firstname"
                type="text"
                required
                className="col-span-3 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Firstname"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />

            <label htmlFor="lastname">
                Last name
              </label>
              <input
                id="lastname"
                name="lastname"
                type="text"
                required
                className="col-span-3 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Firstname"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />


              <label htmlFor="email-address" >
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                required
                className="col-span-3 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="password">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="col-span-3 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="degree">
                  Pursuing Degree
            </label>
            <select value={degree} onChange={(e) => setDegree(e.target.value)} className="col-span-3 justify-self-start" required>
                {pursuing_degrees.map((e,i) => (
                    <option value={e} key={i}>{e}</option>
                ))}
            </select>

            <label htmlFor="year">
                  Year
            </label>
            <select value={year} onChange={(e) => setYear(e.target.value)} className="col-span-3 justify-self-start" required>
                {years.map((e,i) => (
                    <option value={e} key={i}>{e}</option>
                ))}
            </select>

          </div>

          <div className="flex items-end justify-end">
          </div>

          <div className="flex justify-center">
            <button className="justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-4/6"
                onClick ={() => create_user_call({email,password,firstname,lastname,degree,year})}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
