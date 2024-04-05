/**
 * v0 by Vercel.
 * @see https://v0.dev/t/eQNw4j3fukQ
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Toaster } from "@/components/ui/sonner"
import { Footer } from "./footer"
import { Header } from "./header"
import { ShortLink } from "./shortlink"
import { Cards } from "./shortlinkcards"
import { SignUp } from "./signup"

export default function NavBar()
{
    return (
      <>
        <Toaster />
        <div className="flex flex-col min-h-[100dvh]">
          <Header/>
          <main className="flex-1">
            <ShortLink/>
            <Cards/>
            <SignUp check={false} check1={false}/>
          </main>
         <Footer/>
        </div>
      </>
    )
  }
