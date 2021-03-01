import React, { useEffect, useState } from 'react'
import UserList from './user'
const Inbox = () => {
    const [inbox,setInbox] = useState([])
    const [refresh,setRefresh] = useState(0)
    useEffect(() => {
        console.log("updating")
        fetch(`http://localhost:5000/inbox/${window.sessionStorage.getItem("userid")}`).then(r => r.json()).then(data => setInbox(data))
    },[refresh])
    return(
         <div className=" h-screen overflow-scroll px-8">
    
    <h1 className="mt-16 text-3xl font-bold pl-4">Inbox</h1>
        <UserList users={inbox} inbox setRefresh={setRefresh} refresh={refresh}/>
    </div>
    )
}

export default Inbox;