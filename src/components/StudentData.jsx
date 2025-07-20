import React, { useEffect, useState } from 'react'
import '../App.css'


const StdData=[
    {id:1,firstname:"Mayank",lastname:"Saini",age:22},
    {id:2,firstname:"Abhay",lastname:"Gorilla",age:22},
    {id:3,firstname:"Prashant",lastname:"Saini",age:22},
    {id:4,firstname:"Mohit",lastname:"Saini",age:22}
]
function StudentData() {
    const [data,setData]=useState([]);
    const [firstname,setFirstname]=useState("");
    const [lastname,setLastname]=useState("");
    const [age,setAge]=useState(0);
    const [id,setId]=useState(0);
    const [isupdate,setIsupdate]=useState(false);


    useEffect(()=>{
        setData(StdData)
    },[])

 const handledelete=(id)=>{
    if(id>0){
        if(window.confirm("Are You Sure?")){
        const dt=data.filter(item=> item.id !==id);
    setData(dt);}
    }
 }
 const handleedit=(id)=>{
    const dt=data.filter(item=> item.id === id);
    if(dt !== undefined){
        setIsupdate(true)
        setId(id);
        setFirstname(dt[0].firstname);
        setLastname(dt[0].lastname);
        setAge(dt[0].age);

    }
 }




const handlesave=(e)=>{
    let error=" "
    if(firstname === '')
       error+="First Name Required, ";
    if(lastname === '')
        error+="Last Name Required, ";
    if(!age || isNaN(age))
        error+="Age Required in numbers only.";
    
 
   if (error=== " "){

   e.preventDefault();
   const dt=[...data]
   const newobject={
    id:StdData.length+1,
    firstname:firstname,
    lastname:lastname,
    age:age
   }
   dt.push(newobject)
   setData(dt)
   handleclear()
}
else{
    alert(error)
}
}
const handleclear=()=>{
    setId(0);
    setFirstname("");
    setLastname("");
    setAge("");
    setIsupdate(false)
}

const handleupdate=()=>{
    const index=data.map((item)=>{
        return item.id
    }).indexOf(id)

    const dt =[...data];
    dt[index].firstname=firstname;
    dt[index].lastname=lastname ;
    dt[index].age=age;

    setData(dt);
    handleclear();
}


  return (
    <>

    <div style={{display:'flex', justifyContent:'center' , marginTop:"10px", marginBottom:"10px"}}>
        <div>
            <label >First Name :<input type="text" placeholder='first name' onChange={(e)=>setFirstname(e.target.value)} value={firstname}/></label>
        </div>
        <div>
            <label >Last Name :<input type="text" placeholder='last name' onChange={(e)=>setLastname(e.target.value)} value={lastname}/></label>
        </div>
        <div>
            <label >Age :<input type="text" placeholder=' age' onChange={(e)=>setAge(e.target.value)} value={age}/></label>
        </div>
        
        <div>
            {
                //  isupdate === false ? <button className='edit'onClick={()=>handlesave()}>Save</button> :<button className='delete' onClick={()=>handleupdate()}>Update</button>
                !isupdate ?<button className='edit'onClick={(e)=>handlesave(e)}>Save</button> :<button className='edit' onClick={()=>handleupdate()}>Update</button>
            }
        
        <button className='delete' onClick={()=>handleclear()}>Clear</button>
   
        </div>
    </div>
    <div>
        <table className='table table-hover' >
            <thead>
                <tr>
                    <td>S.No</td>
                    <td>STD ID</td>
                    <td>First Name</td>
                    <td>Last Name</td>
                    <td>Age</td>
                    <td>Action</td>
                </tr>
            </thead>
             <tbody>
                {
                    data.map((item,index)=>{
                        return(
                            <tr key={index}>
                            <td>{index+ 1}</td>
                            <td>{item.id}</td>
                            <td>{item.firstname}</td>
                            <td>{item.lastname}</td>
                            <td>{item.age}</td>
                            <td>
                            <button className='edit'onClick={()=>handleedit(item.id)}>Edit</button>
                            <button className='delete' onClick={()=>handledelete(item.id)}>Delete</button>
                            </td>
                            </tr>
                        )

                    })
                }
             </tbody>

        </table>
    </div>
    </>
  )
}

export default StudentData;