"use server"

import { redis } from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function checkAuthStatus(){
    const {getUser} = getKindeServerSession()
    const user = await getUser()
    if (!user){
        return {status: 401, data: {error: "No user found"}}
    }

    // namespaces are really important in redis
    const userId = `user:${user.id}`
    const ExistingUser = await redis.hgetall(userId)
    //sign up case: if the user does not exist in the database and the user is visitong the platform for the first time
    if (!ExistingUser || Object.keys(ExistingUser).length === 0){
        const imgIsNull = user.picture?.includes("gravatar")
        const image = imgIsNull ? "" : user.picture
        await redis.hset(userId, {
            id: user.id,
            name: `${user.given_name} ${user.family_name}`,
            email: user.email,
            image: image,
            
        })
    }
    return {success: true}
}