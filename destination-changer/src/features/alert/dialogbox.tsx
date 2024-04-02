import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { faQrcode } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import QRCode from "qrcode.react"


export const QrCodeBox = (val:any) => {
    return(
        <Dialog>
        <DialogTrigger><FontAwesomeIcon icon={faQrcode} className="w-10 h-6 text-m"/></DialogTrigger>
        <DialogContent className=" w-1/6 h-1/3">
            <DialogHeader>
                <DialogTitle className="flex justify-center">{val.val}</DialogTitle>
                <DialogDescription className="flex justify-center pt-10">
                <QRCode value={val.val.startsWith('http://') || val.val.startsWith('https://') ? val : `http://${val.val}`} />
                </DialogDescription>
            </DialogHeader>
        </DialogContent> 
    </Dialog>
    )
}