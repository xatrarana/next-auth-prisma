import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { LogoutButton } from "@/app/components/auth"

export default async function Dashboard(){
    const session = await getServerSession(authOptions)

    if(!session){
        redirect('/api/auth/signin ')
    }
    return (
        <>
        <h1>Dashboard</h1>
        <p>Protected route</p>
        <p>{session?.user?.name}</p>
        <p>{session?.user?.email}</p>
        <LogoutButton />
        </>
    )
}