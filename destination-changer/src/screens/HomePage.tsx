import NavBar from "@/features/NavBar";
// import StickyNav from "@/layout/StickyNav";
// import { useRef, useState } from "react";


export const Homepage = ({ meta }: { meta: any }) => {
    
    return (
        <div className="homepage relative">
            {meta}
           <NavBar />
        </div>
    );
};