import { Button } from "@/components/ui/button"
import { signIn, signOut, useSession } from "next-auth/react"
import Link from "next/link"

export const SignUp=()=>
{
    const{data:session}=useSession()
    const handleSignUp = () =>
    {
      signIn("google")
    };
    return(
        <section className="w-full py-12 md:py-24 lg:py-32 border-t">
              <div className="container grid items-center gap-4 px-4 text-center md:px-6">
                <div className="space-y-3">
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                    Experience the workflow the best frontend teams love.
                  </h2>
                  <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                    Let your team focus on shipping features instead of managing infrastructure with automated CI/CD.
                  </p>
                </div>
                <div className="mx-auto w-full max-w-sm space-y-2">

                {
                  session?.user?<Button onClick={()=>signOut()} className="">Sign out<span></span></Button>
                  :<Button onClick={handleSignUp} className=""><span>Sign Up with Google</span></Button>
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
    )
}