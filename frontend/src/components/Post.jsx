import React,{useEffect, useState} from 'react'
import { useLocation } from 'react-router-dom';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import Navbar from './Navbar'
import axios from 'axios';

function Post() {
    const [post,setPost]=useState([{}])
    const [showbulk,setShowbulk] = useState(true)
    const [exceldata,setExceldata] = useState([{}])
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');
    const name =searchParams.get('name')
    const company =searchParams.get('company')
   
    // getting post from api
    useEffect(()=>{
        let cancel
        axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${id}`,{
          cancelToken:new axios.CancelToken(c =>cancel=c)
        }).then((res)=>{
          console.log(res.data)
          const excel=res.data.map((item)=>{
            let obj={name,"title":item.title,"body":item.body,company}
            return obj
          })
          setExceldata(excel)
          setPost(res.data)
        }).catch((e)=>{
          if(axios.isCancel(e)) return 
          console.log(e)
        })
  
        return () => cancel()
  
      },[])


// getting data of specific user
      useEffect(()=>{
        let cancel
        axios.get(`https://cointab-755u.onrender.com/posts?userId=${id}`,{
          cancelToken:new axios.CancelToken(c =>cancel=c)
        }).then((res)=>{
          console.log(res.data.data)
        if(res.data.data.length){
            setShowbulk(false)
        }
        }).catch((e)=>{
          if(axios.isCancel(e)) return 
          console.log(e)
        })
  
        return () => cancel()
  
      },[])


      

 
// post all posts to database
    const handlePost =  async() =>{
         const data =await  axios.post("https://cointab-755u.onrender.com/posts",post)
        
        console.log(data)
        setShowbulk(false)
        
    }

    
// export to excel and download excel
    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(exceldata);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    
      
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    
        saveAs(blob, "data.xlsx");
    };

  return (
    <div>
        <Navbar></Navbar>
      <div>
      {showbulk && <button onClick={handlePost} className=" rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 mt-8">Bulk Add</button>}
      {!showbulk && <button onClick={exportToExcel} className=" rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 mt-8">Download in Excel</button>}
      </div>

      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  mt-10">
         
              
         {post?.map((item) => {
            return <div key={item?.id} className="group">
            <p className="mt-1 text-lg font-medium text-gray-900">Name:{name}</p>
            <p className="mt-1 text-lg font-medium text-gray-900">Title:{item?.title}</p>
            <p className="mt-1 text-lg font-medium text-gray-900">Body:{item?.body}</p>
            <p className="mt-1 text-lg font-medium text-gray-900">Company:{company}</p>
           
            
          </div>

         })}
          
        </div>

    </div>
  )
}

export default Post
