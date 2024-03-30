import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { checkuser, shortenUrl } from "@/constants/api"
import axios from "axios"
import { useSession } from "next-auth/react"
import { useState } from "react"
import { toast } from "sonner"

export const ShortLink=()=>
{
    const [url, setUrl] = useState("")
    const [loading, setLoading] = useState(false)
    const {data:session}=useSession();
    const handleShorten = async () => {
        setLoading(true)
        // console.log("Shorten url", url)
        // console.log(session?.user?.email)
        axios.post(`${checkuser}`,{mail:session?.user?.email})
        .then((res)=>
        {
          if(res.data.message)
          {
            axios.post(`${shortenUrl}`,{userid:res.data.data.Acc_Id,url})
            .then((res)=>
            {
              if(res.data.message)
              {
                toast.success(res.data.message, {position: "top-right",closeButton: true,})
                setLoading(false)
              }
              else
              {
                toast.success("Shorten url created successfully!", {
                  position: "top-right",
                  closeButton: true,
                })
                setLoading(false)
              }
            })
            .catch((e)=>
            {
              setLoading(false)
              toast.error("Shorten url error!")
              console.log(e)
            })
          }
          else
          {
            setLoading(false)
            toast.error(res.data.errmsg)
          }
        })
        .catch((e)=>
        {
          console.log(e)
          toast.error("Network Error!")
          setLoading(false)
        })
        setUrl("")
      }
    return(
        <section className="w-full py-6 sm:py-12 md:py-24 lg:py-32 xl: p-t-42">
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
                    <Input className="max-w-lg flex-1" placeholder="Enter your link" type="url"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                    />
                    <Button disabled={loading} onClick={handleShorten}>Shorten</Button>
                  </div>
                </div>
              </div>
            </section>
    )
}