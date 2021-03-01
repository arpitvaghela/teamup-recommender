import React, { useEffect, useState } from "react";

const pursuing_degrees = ["", "BTech ICT", "MTech ICT"];

const years = [1, 2, 3, 4];

const update_user_call = (user) => {
    if( !user.firstname || !user.lastname || !user.degree || !user.year)return;
    console.log(user)
    fetch(`http://localhost:5000/users/${window.sessionStorage.getItem("userid")}`,{
        method:"PUT",
        headers: {
        'Content-Type': 'application/json'
        },
        body:JSON.stringify(user)
    })
}
const EditProfile = () => {
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [degree, setDegree] = useState("");
  const [year, setYear] = useState("");
  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");

  useEffect(() => {
    let userid = window.sessionStorage.getItem("userid");

    if (!userid || userid === "undefined") {
      window.location.href = "/login";
      return;
    }

    fetch(`http://localhost:5000/users/${userid}`, {
      method: "GET",
    })
      .then((r) => r.json())
      .then((data) => {
        console.log(data);
        setEmail(data.email);
        setFirstname(data.firstname);
        setLastname(data.lastname);
        setYear(data.year);
        setDegree(data.degree);
        setGithub(data.github);
        setLinkedin(data.linkedin);
      });
  }, []);

  return (
    <div className="w-full flex justify-center bg-gray-50">
      <div className="min-h-screen flex justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Edit Profile
            </h2>
          </div>
          <div className="mt-8 space-y-6">
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md grid grid-cols-4 gap-4">
              <label htmlFor="firstname">First name</label>
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

              <label htmlFor="lastname">Last name</label>
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

              <label htmlFor="email-address">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                required
                disabled
                className="col-span-3 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="degree">Pursuing Degree</label>
              <select
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                className="col-span-3 justify-self-start"
                required
              >
                {pursuing_degrees.map((e, i) => (
                  <option value={e} key={i}>
                    {e}
                  </option>
                ))}
              </select>

              <label htmlFor="year">Year</label>
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="col-span-3 justify-self-start"
                required
              >
                {years.map((e, i) => (
                  <option value={e} key={i}>
                    {e}
                  </option>
                ))}
              </select>
              <label htmlFor="lastname">
                Github Url
              </label>
              <input
                id="lastname"
                name="lastname"
                type="text"
                required
                className="col-span-3 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="github"
                value={github}
                onChange={(e) => setGithub(e.target.value)}
              />
              <label htmlFor="lastname">
                Linkedin Url
              </label>
              <input
                id="lastname"
                name="lastname"
                type="text"
                required
                className="col-span-3 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="linkedin"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
              />
            </div>

            <div className="flex items-end justify-end"></div>

            <div className="flex justify-center">
              <button className="justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-4/6"
                onClick={() => update_user_call({firstname,lastname,degree,year,github,linkedin})}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EditProfile;
