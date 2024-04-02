import { checkuser, clicklink, deletelink, shortenUrl, userlink } from "@/constants/api";
import axios from "axios";

export const deleteLink = async (shortcode: any) => {
    return axios.post(`${deletelink}/` + shortcode)
        .then((res) => {
            return res.data;
        })
        .catch((e) => {
            console.log(e);
            throw e;
        });
};

export const InsertLink = async (email: any, url: any) => {
    return axios.post(`${checkuser}`, { mail: email })
        .then((res) => {
            if (res.data.message) {
                return axios.post(`${shortenUrl}`, { userid: res.data.data.Acc_Id, url })
                    .then((res) => { return res.data })
                    .catch((e) => { throw e })
            }
            else {
                return res.data
            }
        })
        .catch((e) => {
            throw e
        })
}

export const AllData = async (mail: any) => {
    return axios.post(`${checkuser}`, { mail: mail })
        .then((res) => {
            if (res.data.data) {
                return axios.post(`${userlink}`, { userid: res.data.data.Acc_Id })
                    .then((res) => {
                        return res.data;
                    })
                    .catch((e) => console.log(e));
            }
        })
        .catch((e) => console.log(e));
};

export const Clicks=async(link:any)=>
{
    return axios.post(`${clicklink}`,{link})
    .then((res)=>{return res.data}).catch((e)=>{throw e})
}

