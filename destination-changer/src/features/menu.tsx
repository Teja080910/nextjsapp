import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

export const Menu = ({name,label,item1,item2,classname}:{name:any,label:string,item1:string,item2:string,classname:any}) =>{

    return(
        <DropdownMenu>
        <DropdownMenuTrigger className={cn(classname)}>{name}</DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuLabel>{label}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={()=>console.log("share")}>{item1}</DropdownMenuItem>
            <DropdownMenuItem onClick={()=>console.log("delete")}>{item2}</DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
    )

}