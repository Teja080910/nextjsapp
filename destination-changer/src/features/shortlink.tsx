import { Button } from "@/components/ui/button"
import { Input, LinkIcon } from "@/components/ui/input"
import { InsertLink } from "@/quries/quries"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"
import { SignUp } from "./signup"

export const ShortLink = () => {
  const [url, setUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [check,setCheck]=useState(false)
  const { data: session } = useSession();
  const router=useRouter()
  const handleShorten = async () => {
    router.push("#signin")
    setCheck(session?false:true)
    session&&setLoading(true)
    session&&InsertLink(session?.user?.email, url)
      .then((res) => {
        if (res.message) {
          toast.success(res.message, { position: "top-right", closeButton: true })
          setLoading(false)
        }
        else if (res.errmsg) {
          toast.error(res.errmsg)
          setLoading(false)
        }
        else {
          toast.success("Shorten url created successfully!", { position: "top-right", closeButton: true, })
          setLoading(false)
        }
      })
      .catch((e) => {
        console.log(e)
        toast.error("Network Error!")
        setLoading(false)
      })
    setUrl("");
  }

  // console.log(check)
  return (
    <section className="w-full py-6 sm:py-12 md:py-24 lg:py-32 xl: p-t-42">
      <div className="hidden">
      {check&&<SignUp check={true} check1="#signin"/>}
      </div>
      <div className="container grid items-center gap-6 px-4 md:px-6">
        <div className="space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold  tracking-normal sm:text-4xl md:text-5xl lg:text-6xl/none">
              Shorten your link
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Enter your link below to shorten it.
            </p>
          </div>
          <div className="mx-auto w-full max-w-sm space-y-2">
            <div className="flex justify-center py-8">
              <div className="flex w-full max-w-md items-center space-x-4 rounded-md border px-4 py-2 hover:border-black">
                <LinkIcon className="text-gray-400" />
                <Input className=" w-52" placeholder="https://destination-changer.com/" type="text" value={url}
                  onChange={(e) => setUrl(e.target.value)} />
                <Button className=" bg-black text-white" disabled={loading} onClick={handleShorten}>Shorten</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}