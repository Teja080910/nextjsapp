import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader, DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export const SignUp=({check=false}:{check:boolean})=>
{
    const{data:session}=useSession()
    const [set,setSet]=useState(check)
    const [isClient, setIsClient] = useState(false)
    function XIcon(props:any) {
      return (
        <svg
          {...props}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
      )
  }
    useEffect(() => {
      setIsClient(true)
    }, [])
    const handleSignUp = () =>
    {
      signIn("google")
    };
    return(
      isClient&&<Dialog open={set} >
      <DialogTrigger asChild >
      <section className="w-full py-12 md:py-24 lg:py-32 border-t">
        <div className="container grid items-center gap-4 px-4 text-center md:px-6">
          <div className="mx-auto w-full max-w-sm space-y-2">

          {
            session?.user?<Button onClick={()=>signOut()} className="">Sign out<span></span></Button>
            :<Button onClick={()=>setSet(true)} className=""><span>Sign In</span></Button>
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
          <DialogDescription className="flex justify-around pt-5">
          <div className="absolute top-1 right-1 bg-white ">
            <Button onClick={()=>setSet(false)} variant="ghost" >
              <XIcon className="w-4 h-4 indent-1 hover:border-black" />
            </Button>
          </div>
          <Button onClick={handleSignUp} className="bg-blue-600"><span>Sign in with Google</span></Button>
          <Button onClick={()=>setSet(true)} className="bg-green-600"><span>Sign up with Google</span></Button>
          </DialogDescription>
        </DialogHeader>
        <DialogClose className="flex justify-end">
        <Button onClick={()=>setSet(false)}>close</Button>
      </DialogClose>
      </DialogContent>
    </Dialog>
        
    )
}