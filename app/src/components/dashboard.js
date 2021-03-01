import React, { useEffect,useState } from 'react'

import UserList from './user'

const Dashboard =  () => {
    const [popularUsers,setPopularUsers] = useState([])
    const [recommendations,setRecommendations] = useState([])
    const [refresh,setRefresh] = useState(0)
    
    useEffect(() => {
        fetch(`http://localhost:5000/popular/${window.sessionStorage.getItem("userid")}`).then(r => r.json()).then(users => setPopularUsers(users) )
    },[refresh])
    useEffect(() => {
        fetch(`http://localhost:5000/recommendations/${window.sessionStorage.getItem("userid")}`).then(r => r.json()).then(data =>setRecommendations(data) )
    },[refresh])
    return (
    <div className="max-h-screen overflow-scroll px-8">
    
    <h1 className="mt-16 text-3xl font-bold pl-4">Recommendations</h1>
    <UserList users={recommendations} setRefresh={setRefresh} refresh={refresh}/>

    <h1 className="mt-16 text-3xl font-bold pl-4">Popular</h1>
    <UserList users={popularUsers} setRefresh={setRefresh} refresh={refresh}/>
    
    </div>
    )
}

export default Dashboard;