import { cn } from "@/lib/utils"
export const Alret=({message,classname,classname1}:{message:string,classname:any,classname1:any})=>
{
    return(
        sessionStorage.x==="true"&&<>
        <div className={cn("flex justify-center fixed w-full top-52 z-10",classname1)}>
        <div className={cn("bg-slate-300  w-1/2 h-20  border-8",classname)}>
        <div className="flex justify-end">
        <button className=" bg-red-700 h-5 w-5 rounded-sm text-white text-center" onClick={()=>{sessionStorage.x="false"}}>X</button>
        </div>
        <div className=" h-10 flex justify-center items-center text-xl">{message}</div>
        </div>
        </div>
        </>
    )
}