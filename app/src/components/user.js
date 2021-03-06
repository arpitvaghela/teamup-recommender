import { Link } from "gatsby";
import React from "react";

const user_sample = {
  id: 4,
  firstname: "Dhruvil",
  lastname: "Dave",
  email: "dd@gmail.com",
  photo_url: null,
  github: null,
  linkedin: null,
  groups: [],
  degree: "BTech ICT",
  year: 2,
};

const mail_svg = (
  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <title>Gmail</title>
    <path fill="#EA4335" d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
  </svg>
);
const github_svg = (
  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <title>GitHub</title>
    <path fill="#181717" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);
const linkedin_svg = (
  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <title>LinkedIn</title>
    <path fill="#0A66C2" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);
const interaction_call = (sender_id,receiver_id)=>{
    fetch(`http://localhost:5000/interactions/${sender_id}/${receiver_id}`).catch(e => console.log(e))
}
const UserCard = ({e,inbox,setRefresh,refresh}) => {
    return (
<div className=" m-4 rounded-lg border  border-indigo-400 ">
          <div className="bg-indigo-300 h-48"></div>
          <div className="mx-4 mb-4">
            <div className="flex justify-between mt-4">
              <h1 className="font-sans mr-2">{`${e.firstname} ${e.lastname}`}</h1>
              <button className="bg-indigo-600 text-gray-100 px-6 py-1 text-sm rounded-lg" onClick={() => {
                  console.log(window.sessionStorage.userid,e.id);
                  interaction_call(window.sessionStorage.getItem("userid"),e.id);
                  setRefresh(refresh+1);
            }}>
                {inbox?"Accept":"Team up"}
              </button>
            </div>
            <div className="flex justify-between ">
              <div className="text-xs text-gray-600 font-bold">
                {user_sample.degree} / {user_sample.year} year
              </div>
              {/* <span className="text-xs text-gray-600 text-right">{user_sample.year} year</span> */}

            </div>
              <div className="grid grid-cols-3 justify-center pt-2 mt-2 border-t">
                <a className={"flex justify-center "+(!e.email?"inactive-link":"cursor-pointer")} href={`mailto:${e.email}`} >
                  <div className="h-6 w-6 ">{mail_svg}</div>
                </a>
                <a className={"flex justify-center cursor-pointer "+(!e.github?"inactive-link":"")} href={e.github}>
                  <div className="h-6 w-6">{github_svg}</div>
                </a>
                <a className={"flex justify-center cursor-pointer "+(!e.linkedin?"inactive-link":"")} href={e.linkedin}>
                  <div className="h-6 w-6">{linkedin_svg}</div>
                </a>
              </div>
          </div>
        </div>
    )
}
const UserCardTeam = ({e}) => {
    return (
<div className=" m-4 rounded-lg border  border-indigo-400 w-64">
          <div className="bg-indigo-300 h-48"></div>
          <div className="mx-4 mb-4">
            <div className="flex justify-between mt-4">
              <h1 className="font-sans mr-2">{`${e.firstname} ${e.lastname}`}</h1>
            </div>
            <div className="flex justify-between ">
              <div className="text-xs text-gray-600 font-bold">
                {user_sample.degree} / {user_sample.year} year
              </div>
              {/* <span className="text-xs text-gray-600 text-right">{user_sample.year} year</span> */}

            </div>
              <div className="grid grid-cols-3 justify-center pt-2 mt-2 border-t">
                <a className={"flex justify-center "+(!e.email?"inactive-link":"cursor-pointer")} href={`mailto:${e.email}`} >
                  <div className="h-6 w-6 ">{mail_svg}</div>
                </a>
                <a className={"flex justify-center cursor-pointer "+(!e.github?"inactive-link":"")} href={e.github}>
                  <div className="h-6 w-6">{github_svg}</div>
                </a>
                <a className={"flex justify-center cursor-pointer "+(!e.linkedin?"inactive-link":"")} href={e.linkedin}>
                  <div className="h-6 w-6">{linkedin_svg}</div>
                </a>
              </div>
          </div>
        </div>
    )
}

const UserList = ({ users,inbox,setRefresh,refresh }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 justify-center items-center">
      {users.map((e, i) => (
          <UserCard e={e} key={i} inbox={inbox} setRefresh={setRefresh} refresh={refresh}/>
      ))}
    </div>
  );
};

export const TeamList = ({users}) => {
    return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center">
      {users.map((e, i) => (
          <UserCardTeam e={e} key={i} />
      ))}
    </div>
  );
}

export default UserList;
