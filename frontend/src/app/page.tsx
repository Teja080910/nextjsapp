import Link from 'next/link';
export default function Home()
{
  return (
    <>
    <div className='flex justify-around border-slate-900 bg-slate-500 mx-96 mt-56 h-28 items-center'>
    <Link href='/Login' className=' text-center p-2 text-white bg-blue-700 h-10 w-32'>Login</Link>
    <Link href='/Register' className='text-center text-white p-2 bg-green-700 h-10 w-32'>Register</Link>
    </div>
    </>
  );
}
