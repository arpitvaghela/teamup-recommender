import React, { useEffect,useState } from 'react'

import {TeamList} from './user'

const AllTeams =  () => {
    const [teams,setTeams] = useState([]);
    
    useEffect(() => {
        fetch(`http://localhost:5000/teams/`).then(r => {
            if (!r.ok){
                    setTeams([])
                    throw new Error("Not 200")
            }
            else{
                return r.json()
            }
        }).then(data => setTeams(data)).catch(e => console.log(e))
    },[])

    return (
    <div className="h-screen max-h-screen overflow-scroll px-8">
    
    <h1 className="mt-16 text-3xl font-bold pl-4">All Team</h1>
    <div className="flex flex-col items-start">
    {
        teams.map((e,i) =>{
            if (e.member.length && e.member.length > 0){
            return(<div className="inline-block m-4 p-4 border relative bg-gray-50" key={i}>
                <div className="absolute top-3 left-3 text-sm text-gray-700">#{i}</div>
                <TeamList users={e.member} />
            </div>)
            }
            return <></>
        })
    }
    </div>
    </div>
    )
}

export default AllTeams;