import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";
const prisma = new PrismaClient();
export async function main(){
    const hashedPassword = await hash("password",10)
    const user = await prisma.user.upsert({
        where:{
            email:" chhatraclas@gmail.com"
        },
        update:{},
        create:{
            name: "chhatra rana",
            email: "chhatraclas@gmail.com",
            username: "wolfie",
            hashedPassword,
            role:"ADMIN"
        }
    })
    console.log({user})
}

