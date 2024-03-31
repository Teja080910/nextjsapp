import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import { allLinks, checkuser, userlink } from "@/constants/api";
import { cn } from "@/lib/utils";
import { faTelegram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faMailBulk, faQrcode, faSignal } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CopyIcon } from "@radix-ui/react-icons";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import QRCode from "qrcode.react";
import { useEffect, useState } from "react";
import styles from './Menu.module.css';
export const Cards = () => {
  const [data, setData] = useState([])
  const [qr, setQr] = useState(
    {
      display: false,
      value: ''
    }
  )
  const { data: session } = useSession();
  const [div,setDiv]=useState('id');
  const [div1,setDiv1]=useState('id1');
  // const [isOpen, setIsOpen] = useState(false);

  const shareViaWhatsApp = (content:any) => {
    const text = encodeURIComponent(content);
    window.open(`https://wa.me/?text=${text}`);
  };

  const shareViaTelegram = (content:any) => {
    const text = encodeURIComponent(content);
    window.open(`https://telegram.me/share/url?url=&text=${text}`);
  };

  const handleShareByEmail = (subject:any,body:any) => {
    const subjectEncoded = encodeURIComponent(subject);
    const bodyEncoded = encodeURIComponent(body);
    window.location.href = `mailto:?subject=${subjectEncoded}&body=${bodyEncoded}`;
};

  useEffect(() => {
    axios.post(`${checkuser}`, { mail: session?.user?.email })
      .then((res) => {
        // console.log(res.data.data.Acc_Id)
        if (res.data.data) {
          axios.post(`${userlink}`, { userid: res.data.data.Acc_Id })
            .then((res) => {
              setData(res.data)
            })
            .catch((e) => console.log(e))
        }
        else {
          axios.post(`${allLinks}`)
            .then((res) => {
              setData(res.data)
            })
            .catch((e) => console.log(e))
        }
      })
      .catch((e) => console.log(e))

  },[session])
  // console.log(div)
  useEffect(() => {
    const handleClickOutside = (event:any) => {
        if (!event.target.closest("#menu")) {
            const element = document.getElementById(div);
            const element1 = document.getElementById(`${div1}${div}`);
            if (element1) { element1.style.display = "none" }
            if (element)
            {
                element.style.display="none"
               
            } else {
                console.log("Element with ID", div,div1, "not found.");
            }
        }
        if(!event.target.closest("#qr"))
        {
          setQr(val=>({...val,display:false}))
        }
    };

    document.body.addEventListener('click', handleClickOutside);

    return () => {
        document.body.removeEventListener('click', handleClickOutside);
    };
}, [div,div1]);



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
              data.map((val, index) =>
              (
                
                <Card className="grid h-25" key={index}>

                  <CardHeader className="h-5">
                    <CardDescription className="flex justify-around items-center h-5">
                      <Link className=" text-blue-700 font-bold" href={val['shortCode']} target="_blank"><h2>{val["shortCode"]}</h2></Link>
                      <Button variant="outline" className="h-9 px-2 font-medium"><CopyIcon className="h-4 w-4" /></Button>
                      <Button variant="outline" id="qr" onClick={() => setQr(val1 => ({ ...val1, display: true, value: `${val["originalUrl"]}` }))}><FontAwesomeIcon icon={faQrcode} style={{ fontSize: "5px", width: "15px", color: "black" }} /></Button>
                      <Button variant="secondary" className=" bg-gray-300 h-8 text-gray-500">
                      <FontAwesomeIcon icon={faSignal} className="w-4" /> 3.6K clicks</Button>
                      <div className={styles.menu}>
                        {(
                          <div className={styles.menuItems} id={val['originalUrl']}>
                            <ul>
                              <li>
                                <button onMouseOver={() =>{ 
                                  const element = document.getElementById(`${val['shortCode']}${val['originalUrl']}`); if (element) { element.style.display = "block" } }}>Share</button>
                              </li>
                              <li>
                                {/* <Link href="/about">About</Link> */}
                              </li>
                              <li>
                                <button >Delete</button>
                              </li>
                            </ul>
                          </div>
                        )}
                        <button id="menu" className={styles.menuButton} 
                          onClick={() => { 
                            setDiv(val['originalUrl'])
                            setDiv1(val['shortCode'])
                            const element = document.getElementById(val['originalUrl']); if (element) { element.style.display = "block" } }}>
                          <span className={styles.icon}></span>
                          <span className={styles.icon}></span>
                          <span className={styles.icon}></span>
                        </button>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="h-5 overflow-hidden mt-3">
                    <Link href={val['originalUrl']} target="_blank">{val['originalUrl']}</Link>
                  </CardContent>
                  <div className={styles.share} id={`${val['shortCode']}${val['originalUrl']}`}>
                  <CardFooter className={cn("text-center mt-5 flex justify-around")} >
                      <button onClick={()=>
                        shareViaWhatsApp(val["originalUrl"])}><FontAwesomeIcon icon={faWhatsapp} style={{ fontSize: "5px", width: "25px", color: "green" }}/></button>
                      <button onClick={()=>
                        shareViaTelegram(val["originalUrl"])}><FontAwesomeIcon icon={faTelegram} style={{ fontSize: "5px", width: "25px", color: "blue" }}/></button>
                      <button onClick={()=>
                        handleShareByEmail("this is link",val["originalUrl"])}><FontAwesomeIcon icon={faMailBulk} style={{ fontSize: "5px", width: "25px", color: "blue" }}/></button>
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