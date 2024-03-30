'use client'
import { useRouter } from 'next/navigation';
const ButtonNavigate = ({ destination }: { destination: string }) => {
    const router = useRouter();
    return (
        <button className=" bg-blue-950 text-white h-10 w-32" onClick={()=>router.push(destination)}>{destination}</button>
    );
};
export default ButtonNavigate;
