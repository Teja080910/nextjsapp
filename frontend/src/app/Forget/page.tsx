import ButtonNavigate from "../components/button";
export default function Register()
{
    return(
        <div>
            <div className="grid justify-around items-center bg-slate-800 h-96 mt-32 w-1/2 ml-96">
                <input type="text" className="w-96 h-10 text-center" placeholder="Enter name"/>
                <input type="password" className="w-96 h-10 text-center" placeholder="Enter password"/>
                <input type="password" className="w-96 h-10 text-center" placeholder="Enter Conform password"/>
                <div className="flex justify-around">
                <ButtonNavigate destination="Login"/>
                <ButtonNavigate destination="Register"/>
                </div>
            </div>
        </div>
    )
}