"use client";
import { User } from '@/interface/User';
import { baseUrl } from '@/utils/url';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

function useAuth() {
    const [user, setUser] = useState<User | null>(null)
    const [error, setError] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    const router = useRouter()
    async function getMe() {
        try {
            // setLoading(true)
            setError("")
            let res = await axios.get( baseUrl + "auth/me")
            setUser(res.data)
        } catch (error:any) {
            setError(error.message)
        }finally{
        setLoading(false)
        }
       
    }
    useEffect(  () => {
        getMe();
    },[])
    async function login(email:string, password:string){

        try {
            let res = await axios.post(baseUrl + "auth",{
                email,
                password
            },{
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (res.status === 200) {
                router.push("/dashboard")
                localStorage.setItem ("token",res.data.token)
            }
            console.log(res);
        } catch (error:any) {
            setError(error.message)
        }finally{
            setLoading(false)
        }
    }
    function logOut(){}



  return {login,logOut,user,error,loading};
}

export default useAuth