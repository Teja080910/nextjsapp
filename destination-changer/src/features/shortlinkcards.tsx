import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card"
import { allLinks, checkuser, userlink } from "@/constants/api"
import { faQrcode, faSignal } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { CopyIcon } from "@radix-ui/react-icons"
import axios from "axios"
import { useSession } from "next-auth/react"
import Link from "next/link"
import QRCode from "qrcode.react"
import { useEffect, useState } from "react"
export const Cards=()=>
{
    const [data,setData]=useState([])
    const [qr,setQr]=useState(
      {
        display:false,
        value:''
      }
    )
    const{data:session}=useSession();
    useEffect(()=>
    {
      axios.post(`${checkuser}`,{mail:session?.user?.email})
      .then((res)=>
      {
        if(res.data.message)
        {
          axios.post(`${userlink}`,{userid:res.data.data.Acc_Id})
          .then((res)=>
          {
            setData(res.data)
          })
          .catch((e)=>console.log(e))
        }
        else
        {
          axios.post(`${allLinks}`)
            .then((res) => {
              setData(res.data)
            })
            .catch((e) => console.log(e))
        }
      })
      .catch((e)=>console.log(e))
      
    },)
    return(
     <>
      {
        qr.display&&<div className="flex justify-center"> 
        <QRCode value={qr.value.startsWith('http://') || qr.value.startsWith('https://') ? qr.value : `http://${qr.value}`} />
      </div>
      }
        <section className=" py-12  lg:p-t-32 border-t">
       
              <div className=" text-center md:px-6">
                <div className="">
                  <h2 className="text-3xl font-bold tracking-normal md:text-4xl/tight mb-4">
                    Your shortened links
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                 {
                 data.map((val,index)=>
                  (
                    <Card className="grid h-20" key={index}>
                    <CardHeader className="h-5">
                      {/* <CardTitle>Card Title {index+1}</CardTitle> */}
                      <CardDescription className="flex justify-around items-center h-5">
                        <Link className=" text-blue-700 font-bold" href={val['shortCode']} target="_blank"><h2>{val["shortCode"]}</h2></Link>
                        <Button variant="outline" className="h-9 px-2 font-medium"><CopyIcon className="h-4 w-4" /></Button>
                        <Button variant="outline" onClick={()=>setQr(val1=>({...val1,display:true,value:`${val["originalUrl"]}`}))}><FontAwesomeIcon icon={faQrcode} style={{ fontSize: "5px",width:"15px", color: "black" }}/></Button>
                        <Button variant="secondary" className=" bg-gray-300 h-8 text-gray-500">
                          <FontAwesomeIcon icon={faSignal} className="w-4"/> 3.6K clicks</Button>
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="h-5 overflow-hidden">
                    <Link href={val['originalUrl']} target="_blank">{val['originalUrl']}</Link>
                    </CardContent>
                    <CardFooter className="text-center">
                      
                    </CardFooter>
                  </Card>
                  ))
                 }
                
                </div>
              </div>
            </section>
     </>
    )
}