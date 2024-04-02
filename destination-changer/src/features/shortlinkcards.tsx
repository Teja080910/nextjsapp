import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { AllData, Clicks, deleteLink } from "@/quries/quries";
import { faTelegram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faMailBulk, faSignal } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CopyIcon } from "@radix-ui/react-icons";
import { useSession } from "next-auth/react";
import Link from "next/link";
import QRCode from "qrcode.react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { QrCodeBox } from "./alert/dialogbox";
export const Cards = () => {
  const [data, setData] = useState([])
  const [qr, setQr] = useState(
    {
      display: false,
      value: ''
    }
  )
  const { data: session } = useSession();
  const [div, setDiv] = useState('id');
  const [div1, setDiv1] = useState('id1');
  // const [isOpen, setIsOpen] = useState(false);

  const shareViaWhatsApp = (content: any) => {
    const text = encodeURIComponent(content);
    window.open(`https://wa.me/?text=${text}`);
  };

  const shareViaTelegram = (content: any) => {
    const text = encodeURIComponent(content);
    window.open(`https://telegram.me/share/url?url=&text=${text}`);
  };

  const handleShareByEmail = (subject: any, body: any) => {
    const subjectEncoded = encodeURIComponent(subject);
    const bodyEncoded = encodeURIComponent(body);
    window.location.href = `mailto:?subject=${subjectEncoded}&body=${bodyEncoded}`;
  };

  const CopyLink = (value: any) => {
    navigator.clipboard.writeText(value)
      .then(() => {
        toast.success("Copied to clipboard!", { position: 'top-left', closeButton: true })
      })
      .catch((e: any) => {
        toast.error(`error ${e}`)
      })

  }
  const DeleteLink = (shortcode: any) => {
    deleteLink(shortcode).then((res) => {
      if (res) {
        toast.success("delete link", { position: "top-right", closeButton: true })
      }
      else {
        toast.error("try again")
      }
    }).catch((e) => console.log(e))
  }

  const Clicklink = (link: any) => {
    Clicks(link).then(() => {}).catch((e) => console.log(e))
  }

  useEffect(() => {
    AllData(session?.user?.email).then((res) => setData(res)).catch((e) => console.log(e))
  }, [data])
  // console.log(div)
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (!event.target.closest("#menu")) {
        const element1 = document.getElementById(`${div1}${div}`);
        if (element1) { element1.style.display = "none" }
        else {
          console.log("Element with ID", div, div1, "not found.");
        }
      }
      if (!event.target.closest("#qr")) {
        setQr(val => ({ ...val, display: false }))
      }
    };

    document.body.addEventListener('click', handleClickOutside);

    return () => {
      document.body.removeEventListener('click', handleClickOutside);
    };
  }, [div]);



  return (
    <>
      {
        qr.display && <div className="flex justify-center">
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
              data?.map((val, index) =>
              (
                  <Card className="grid h-25" key={index}>
                    <CardHeader className="h-5">
                      <CardDescription className="flex justify-around items-center h-5">
                        <Link className=" text-blue-700 font-bold" href={val['shortCode']} onClick={() => {Clicklink(val['originalUrl'])}} target="_blank"><h2>{val["shortCode"]}</h2></Link>
                        <Button variant="outline" className="h-9 px-2 font-medium" onClick={() => CopyLink(val['originalUrl'])}><CopyIcon className="h-4 w-4" /></Button>
                        {/* <Button variant="outline" id="qr" onClick={() => setQr(val1 => ({ ...val1, display: true, value: `${val["originalUrl"]}` }))}><FontAwesomeIcon icon={faQrcode} style={{ fontSize: "5px", width: "15px", color: "black" }} /></Button> */}
                        <QrCodeBox val={val['originalUrl']} />
                        <Button variant="secondary" disabled className=" bg-gray-300 h-8 text-gray-500" >
                          <FontAwesomeIcon icon={faSignal} className="w-4" /> <p className=" m-1 text-blue-600">{val['NoClicks']}</p> clicks</Button>
                        <div id="menu">
                          <DropdownMenu>
                            <DropdownMenuTrigger className=" text-2xl">︙</DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuLabel>More</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem id="menu"
                                onClick={() => {
                                  setDiv(val['originalUrl'])
                                  setDiv1(val['shortCode'])
                                  const element = document.getElementById(`${val['shortCode']}${val['originalUrl']}`); if (element) { element.style.display = "block" }
                                }}
                              >Share</DropdownMenuItem>
                              <DropdownMenuItem onClick={() => DeleteLink(val['shortCode'])}>Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="h-5 overflow-hidden mt-3">
                      <Link href={val['originalUrl']} onClick={() => {Clicklink(val['originalUrl'])}} target="_blank">{val['originalUrl']}</Link>
                    </CardContent>
                    <div className="hidden" id={`${val['shortCode']}${val['originalUrl']}`}>
                      <CardFooter className={cn("text-center mt-5 flex justify-around")} >
                        <button onClick={() =>
                          shareViaWhatsApp(val["originalUrl"])}><FontAwesomeIcon icon={faWhatsapp} style={{ fontSize: "5px", width: "25px", color: "green" }} /></button>
                        <button onClick={() =>
                          shareViaTelegram(val["originalUrl"])}><FontAwesomeIcon icon={faTelegram} style={{ fontSize: "5px", width: "25px", color: "blue" }} /></button>
                        <button onClick={() =>
                          handleShareByEmail("this is link", val["originalUrl"])}><FontAwesomeIcon icon={faMailBulk} style={{ fontSize: "5px", width: "25px", color: "blue" }} /></button>
                      </CardFooter>
                    </div>
                  </Card>
              ))
            }

          </div>
        </div>
      </section>
    </>
  )
}