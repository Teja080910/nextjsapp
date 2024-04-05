import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader, DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { faGithub, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export const SignUp=({check=false,check1}:{check:boolean,check1:any})=>
{
    const{data:session}=useSession()
    const [isClient, setIsClient] = useState(true)
    useEffect(() => {
      setIsClient(true)
      console.log(check)
      if(check)
      {
        document.getElementById("signin")?.click();
        check1=false
      }
    },[])

    const handleSignUp = () =>
    {
      signIn("google")
    };
    return(
      isClient&&<Dialog>
      <DialogTrigger asChild>
      <section id={check1} className="w-full py-12 md:py-24 lg:py-32 border-t">
        <div className="container grid items-center gap-4 px-4 text-center md:px-6">
          <div className="mx-auto w-full max-w-sm space-y-2">
          {
            session?.user?<Button onClick={()=>signOut()} className="">Sign out<span></span></Button>
            :<Button id="signin" className=""><span>Sign In</span></Button>
          }
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Sign up to get notified when we launch.
              <Link className="underline underline-offset-2" href="#">
                Terms & Conditions
              </Link>
            </p>
          </div>
        </div>
      </section>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[425px]">
    
        <DialogHeader>
          <DialogTitle className="flex justify-center">Sign In</DialogTitle>
          <DialogDescription>
          <div  className="flex justify-around pt-5">
          <Button id="google" onClick={handleSignUp} className="bg-white-600 w-1/2 text-blue-500 text-2xl hover:text-white"><span><FontAwesomeIcon icon={faGoogle} /></span></Button>
          <Button onClick={()=>{}} className="bg-white-600 w-1/2 text-black text-2xl hover:text-white"><span><FontAwesomeIcon icon={faGithub} /></span></Button>
          </div>
          <div className="flex justify-around pt-5">
          <Button onClick={()=>{}} className="bg-white-600 w-2/3 text-black hover:text-white"><span>Sign up with Email</span></Button>
          </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
        
    )
}