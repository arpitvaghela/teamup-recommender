import React, { useEffect, useState } from "react";
import EditProfile from '../components/editprofile'

const homesvg =<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-full">
  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
</svg>

const teamsvg = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"className="h-full">
  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
</svg>
const profilesvg = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-full">
  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
</svg>
const myteamsvg = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-full">
  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
</svg>

const menu_options = [{name:"Dashboard",icon:homesvg},{name:"MyTeam",icon:myteamsvg},{name:"All Team",icon:teamsvg}, {name:"Edit Profile",icon:profilesvg}];
const dashboard = 0;
const myteam = 1;
const allteam = 2;
const editprofile =3;

const Drawer = ({ selected, setSelectedPage }) => {
  return (
    <div className="bg-indigo-700 justify-center w-1/6">
      <h1 className="text-purple-100 font-sans text-3xl text-center pt-10" >TeamUp</h1>
      <nav className="grid grid-flow-row justify-items-stretch pt-16 gap-6 px-2">
        {menu_options.map((e, i) => {
          return (
            <div
            key={i}
              onClick={() => setSelectedPage(i)}
              className={
                "text-blue-300 capitalize text-lg px-4 py-2 w-full rounded-md text-center cursor-pointer flex justify-center " +
                (selected === i ? "bg-indigo-900 text-white" : "")
              }
            >
              <span className="h-6 w-6 block mx-2">{menu_options[i].icon}</span>
              <span className="justify-self-start">{menu_options[i].name}</span>
            </div>
          );
        })}
      </nav>
    </div>
  );
};
const IndexPage = () => {
  const [selectedPage, setSelectedPage] = useState(dashboard);
  useEffect(() => {
    if (!window.localStorage.getItem("user")) {
      window.location.href = "/login";
    }
  });
  return (
    <div className="w-screen h-screen flex">
      <Drawer selected={selectedPage} setSelectedPage={setSelectedPage} />
      <div className="w-5/6">
      
      {selectedPage === dashboard ? (
        <>Dashboard</>
      ) : selectedPage === myteam ? (
        <>My team</>
      ) : selectedPage === allteam ? (
        <>All teams</>
      ) : selectedPage === editprofile ? (
        <EditProfile/>
      ) : (
        <></>
      )}

      </div>
    </div>
  );
};

export default IndexPage;
