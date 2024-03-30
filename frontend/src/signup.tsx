import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import axios from "axios"
import { useState } from "react"
import { Alret } from "./alret"
export const Signup=()=>
{
    const [user,setUser]=useState(
        {
            gmail:"",
            password:"",
            cpassword:"",
            name:"",
            acid:""
        }
    )
    const [load,setLoad]=useState(false)
    const [alret,setAlert]=useState(
        {
            message:'',
            color:'',
            box:false,
        }
    )
    const Register=async()=>
    {
        setLoad(true)
        if(user.name&&user.cpassword&&user.gmail&&user.password)
        {
            if(user.password===user.cpassword)
            {
                await axios.post("http://localhost:8000/signup", { user })
                    .then((res) =>
                    {
                        if(res.data.message)
                        {
                            setLoad(false)
                            setAlert(val=>({...val,message:res.data.message,box:true,color:'bg-blue-300'}))
                            sessionStorage.x="true";
                        }
                        else
                        {
                            setLoad(false)
                            setAlert(val=>({...val,message:"Sign up successfully",box:true,color:'bg-green-300'}))
                            sessionStorage.x="true";
                        }                        
                    })
                    .catch((e) =>
                    {
                        setLoad(false)
                        console.log(e)
                    })
            }
            else
            {
                setLoad(false)
                setAlert(val=>({...val,message:"Passwords Miss Match",box:true,color:'bg-red-300'}))
                sessionStorage.x="true"
            }
        }
        else
        {
            setLoad(false)
            setAlert(val=>({...val,message:"Fill all fields",box:true,color:'bg-red-300'}))
            sessionStorage.x="true"
            // alert(alret.box)
        }
    }
    return(
        <>
        <Alret message={alret.message} classname={alret.color} classname1="left-0 flex justify-center w-full"/>
        <div className="grid justify-evenly items-center pt-32">
        {
            alret.box&&<Alret message={alret.message} classname={alret.color} classname1="left-0 flex justify-center w-full"/>
        }
        <Input placeholder="Enter Name" type="text" className=" border-slate-900" onChange={(e)=>setUser(val=>({...val,name:e.target.value}))}/>
        <Input placeholder="Enter mail" type="email" className="mt-10 border-slate-900" onChange={(e)=>setUser(val=>({...val,gmail:e.target.value}))}/>
        <Input placeholder="Password" type="password" className="mt-10 border-slate-900" onChange={(e)=>setUser(val=>({...val,password:e.target.value}))}/>
        <Input placeholder="Confirm Password" type="password" className="mt-10 border-slate-900" onChange={(e)=>setUser(val=>({...val,cpassword:e.target.value}))}/>
        <Button className="mt-10" onClick={Register}>{load?"Please wait":"Sign Up"}</Button>
        </div>
        </>
    )
}
