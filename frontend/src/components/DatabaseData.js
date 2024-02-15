import React,{useState,useEffect} from 'react'
import axios from 'axios'
// getting user from database
function DatabaseData() {
    const [databasedata,setDatabaseData]=useState([{}])


    useEffect(()=>{
      let cancel
      axios.get("https://cointab-755u.onrender.com/users",{
        cancelToken:new axios.CancelToken(c =>cancel=c)
      }).then((res)=>{
    
        setDatabaseData(res.data.data)
      }).catch((e)=>{
        if(axios.isCancel(e)) return 
        console.log(e)
      })

      return () => cancel()

    },[])
  
    return {databasedata}
}

export default DatabaseData
