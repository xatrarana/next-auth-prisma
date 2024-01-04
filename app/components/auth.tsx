'use client'
import { signIn, signOut } from "next-auth/react"


export const LoginButton = () => {
    return(
        <button className="dark:border text-black rounded-md dark:bg-yellow-400 px-6 py-2 m-2 dark:border-yellow-400" onClick={()=>signIn()}>sign in</button>
    )
}

export const LogoutButton = () => {
    return(
        <button className="dark:border text-black px-6 py-2 m-2 rounded-md dark:bg-yellow-400 dark:border-yellow-400" onClick={()=>signOut()}>sign out</button>
    )
}   