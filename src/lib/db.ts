import {Redis} from "@upstash/redis"
const redisUrl = "https://unbiased-airedale-28467.upstash.io"
const redisToken = "AW8zAAIjcDFiODMyZjI1OTZmNGM0ZjgyYjNiYzU5ZGI1MmQxYWI5ZHAxMA"

export const redis = new Redis({ 
    url: redisUrl,
    token: redisToken
})