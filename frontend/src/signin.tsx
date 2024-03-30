import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import axios from "axios"
import { useState } from "react"
import { Signup } from "./signup"
import { Alret } from "./alret"

export const Login=()=>
{
    const [user,setUser]=useState(
        {
            gmail:"",
            password:"",
            show:false
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
    const Signin=async()=>
    {
        setLoad(true)
        if(user.gmail&&user.password)
        {
            await axios.post("http://localhost:8000/login", { user })
                .then((res) =>
                {
                    if(res.data.data)
                    {
                        setAlert(val=>({...val,message:"Login in sucessfully",box:true,color:'bg-blue-300'}))
                        sessionStorage.x="true";
                        sessionStorage.id=res.data.data;
                    }
                    else
                    {
                        setLoad(false)
                        setUser(val=>({...val,gmail:"",password:"",show:true}))
                    }
                })
                .catch((e) =>
                {
                    setLoad(false)
                    setAlert(val=>({...val,message:"Network error",box:true,color:'bg-red-300'}))
                    sessionStorage.x="true";
                })
        }
        else
        {
            setAlert(val=>({...val,message:"Fill all blanks",box:true,color:"bg-red-300"}))
            sessionStorage.x="true"
            setLoad(false)
        }
    }
    return(
        !user.show?<>
        <div className=" grid justify-evenly items-center pt-32">
        {
            alret.box&&<Alret message={alret.message} classname={alret.color} classname1="left-0 flex justify-center w-full"/>
        }
        <Input placeholder="Enter mail" type="email" className=" border-slate-900" onChange={(e)=>setUser(val=>({...val,gmail:e.target.value}))}/>
        <Input placeholder="Password" type="password" className="mt-10 border-slate-900" onChange={(e)=>setUser(val=>({...val,password:e.target.value}))}/>
        <Button className="mt-10" onClick={Signin}>{load?"Please wait...":"Sign In"}</Button>
        </div>
        </>:
        <>
        <Signup/>
        <div className=" flex justify-around">
        <label className="mt-10">Already exist account..?</label>
        <Button className="mt-10" onClick={()=>setUser(val=>({...val,show:false}))}>{"Sign In"}</Button>
        </div>

        
        </>
    )
}