import {useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Usersdata from '../Usersdata'
import DatabaseData from './DatabaseData'
import Navbar from './Navbar';
function Home() {
    const {users}=Usersdata()
    const {databasedata} = DatabaseData()
    const [allusers,setAllusers] = useState([{}])
    const [display,setDisplay] = useState(false)  
    const [addData,setAdddata] = useState({})
    const [showadd,setShowadd] = useState(true)
    

    // getting users
    useEffect(() => {
      let cancel

      axios.post("https://cointab-755u.onrender.com/users",addData,{
        cancelToken:new axios.CancelToken(c =>cancel=c)
      }).then((res) => {
        if(res.data.msg==="user already created"){
            setShowadd(false)
        }
      })
      .catch((e) => {
        if(axios.isCancel(e)) return 
        console.log(e)
      })
        

    },[addData])


// display all users when click on the all users
  const handleDisplay = () => {
    setInterval(()=>{
      console.log(databasedata)
      users.forEach((item) => {
          const data =databasedata.find((ele) => ele.id == item.id)
          if(data){
              item.add=true
              console.log(data)
          }
      })
      console.log(users)
       setAllusers(users)
       setDisplay(true)
    },1000)
    
  }

  // checking add or open
  const handleAdd = (x) => {
    console.log(x)
    const data =allusers.filter((item) => item.id===x)
    allusers.forEach((item) => {
        if(item.id===x){
            item.add=true
        }
    })
    setAdddata(data[0])
  }

  return (
    <div>
        <Navbar></Navbar>
       <button onClick={handleDisplay} className=" rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 mt-8">All Users</button>
        {display && <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  mt-10">
         
              
         {allusers?.map((item) => {
            return <div key={item?.id} className="group">
            <p className="mt-1 text-lg font-medium text-gray-900">Name:{item?.name}</p>
            <p className="mt-1 text-lg font-medium text-gray-900">Email:{item?.email}</p>
            <p className="mt-1 text-lg font-medium text-gray-900">Phone:{item?.phone}</p>
            <p className="mt-1 text-lg font-medium text-gray-900">Website:{item?.website}</p>
            <p className="mt-1 text-lg font-medium text-gray-900">City:{item?.address.city}</p>
            <p className="mt-1 text-lg font-medium text-gray-900">Company:{item?.company.name}</p>
            <div >
            {!item.add && <button onClick={ () => handleAdd(item.id)} className=" rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 mt-8">ADD</button>}
            <Link to={`/page?id=${item.id}&&name=${item.name}&&company=${item.company.name}`}>
            {item.add && <button className=" rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 mt-8">OPEN</button>}
            </Link>
            </div>
          </div>

         })}
          
        </div>}
    </div>
  )
}

export default Home
