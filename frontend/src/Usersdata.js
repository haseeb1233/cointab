import React,{useState,useEffect} from 'react'
import axios from 'axios'
// getting user from api
function Usersdata() {
    const [users,setUsers]=useState([{}])


    useEffect(()=>{
      let cancel
      axios.get("https://jsonplaceholder.typicode.com/users",{
        cancelToken:new axios.CancelToken(c =>cancel=c)
      }).then((res)=>{
       
        setUsers(res.data)
      }).catch((e)=>{
        if(axios.isCancel(e)) return 
        console.log(e)
      })

      return () => cancel()

    },[])
  
    return {users}
}

export default Usersdata
