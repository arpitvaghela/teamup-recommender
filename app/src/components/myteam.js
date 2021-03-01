import React, { useEffect,useState } from 'react'

import {TeamList} from './user'

const MyTeam =  () => {
    const [members,setMemebers] = useState([]);
    
    useEffect(() => {
        fetch(`http://localhost:5000/teams/${window.localStorage.getItem("userid")}`).then(r => {
            if (!r.ok){
                    setMemebers([])
                    throw new Error("Not 200")
            }
            else{
                return r.json()
            }
        }).then(data => setMemebers(data.member)).catch(e => console.log(e))
    },[])

    return (
    <div className="h-screen max-h-screen overflow-scroll px-8">
    
    <h1 className="mt-16 text-3xl font-bold pl-4">My Team</h1>
    <TeamList users={members} />
    <div className="mx-6"><button className="py-2 px-4 rounded-lg bg-green-700 text-pink-50">Submit Team</button>
        </div>
    </div>
    )
}

export default MyTeam;