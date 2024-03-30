import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import logo from "public/destination. (576 x 576 px).svg"
export const Header=()=>
{
  const params=useSearchParams();
  const pageparam=new URLSearchParams(params)
  pageparam.set("user","teja");
  const {replace}=useRouter();
    const{data:session}=useSession();
    const Sent=()=>
    {
      replace(`/sample/page?${pageparam.toString()}`)
    }
    return(
        <header className="px-4 lg:px-6 h-14 flex items-center">
            <Link className="flex items-center justify-center" href="#">
            <Image src={logo} alt="Destination Changer" width={160} height={160} />
              <span className="sr-only">Destination Changer</span>
            </Link>
            <nav className="ml-auto flex gap-4 sm:gap-6">
              <Link className="text-sm font-medium hover:underline underline-offset-4" onClick={Sent}  href=" ">
                Features
              </Link>
              <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
                Pricing
              </Link>
              <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
                About
              </Link>
              <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
                Contact
              </Link>
              <Avatar style={{
                height: "24px",
                width: "24px",
                fontSize: "14px",
              }}>
                <AvatarImage src={session?.user?.image?session?.user?.image:"https://github.com/shadcn.png"} alt="@username" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </nav>
          </header>
    )
}