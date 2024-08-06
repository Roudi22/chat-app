"use server"

import { Message } from "@/db/dummy"
import { redis } from "@/lib/db"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { pusherServer } from "@/lib/pusher"
type sendMessageActionArgs = { 
    content: string, 
    messageType: "text" | "image" , 
    recieverId: string,
}
export async function sendMessageAction ({content, messageType, recieverId}: sendMessageActionArgs) {
    const {getUser} = getKindeServerSession()
    const user = await getUser()
    if (!user) {
        return {error: "User not found"}
    }
    const senderId = user.id
    const conversationId = `conversation:${[senderId, recieverId].sort().join(":")}`
    const conversationExists = await redis.exists(conversationId)
    if (!conversationExists) {
        await redis.hset(conversationId, {
            participant1: senderId,
            participant2: recieverId,
        })
        await redis.sadd(`user:${senderId}:conversations`, conversationId)
        await redis.sadd(`user:${recieverId}:conversations`, conversationId)
    }

    const messageId = `message:${Date.now()}:${Math.random().toString(36).slice(2,9)}`
    const timestamp = Date.now()
    await redis.hset(messageId, { senderId, content, messageType, timestamp })
    await redis.zadd(`${conversationId}:messages`, {score: timestamp, member: JSON.stringify(messageId) })
    const channelName = `${senderId}__${recieverId}`.split("__").sort().join("__")
    await pusherServer?.trigger(channelName, "newMessage", {
           message: { senderId, content, timestamp, messageType }
    })
    return {success: true}
}

export async function getMessagesAction (selectedUserId: string, currentUserId: string) {
    const conversationId = `conversation:${[selectedUserId, currentUserId].sort().join(":")}`;
	const messageIds = await redis.zrange(`${conversationId}:messages`, 0, -1);
    console.log("messageIds",messageIds)
	if (messageIds.length === 0) return [];

	const pipeline = redis.pipeline();
	messageIds.forEach((messageId) => pipeline.hgetall(messageId as string));
	const messages = (await pipeline.exec()) as Message[];
	return messages;
}