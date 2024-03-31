// import User from "@/Model/User";
import { checkuser, signup } from "@/constants/api";
import axios from "axios";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { toast } from "sonner";
export const authOptions =
{
  
  providers: [
    GoogleProvider({
        clientId: process.env.NEXT_PUBLIC_GOOGLE_ID,
        clientSecret: process.env.NEXT_PUBLIC_GOOGLE_SECRET,

      }),
  ],

  callbacks:{
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token, user }) {
      session.accessToken = token.accessToken

      return session 
    },
    async signIn({user})
    {
      
      await axios.post(`${checkuser}`,{mail:user.email})
      .then(async(res)=>
      {
        if(res.data.message)
        {
          
          toast.success(res.data.message,{position:"top-right",closeButton:true})
        }
        else
        {
          await axios.post(`${signup}`,{user})
          .then((res)=>
          {
            if(res.data.message)
            {
              toast.success(res.data.message,{position:"top-right",closeButton:true})
            }
            else if(res.data.data)
            {
              console.log(res.data.data)
            }
            else
            {
              toast.error("Try again")
            }
          })
          .catch((e)=>console.log(e))
        }
      })
      .catch((e)=>console.log(e))
      return true
    }

  }

  
}

export default NextAuth(authOptions)