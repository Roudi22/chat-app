import {Redis} from "@upstash/redis"
const redisUrl = "https://first-monkey-53353.upstash.io"
const redisToken = "AdBpAAIjcDFhNjcwNWJlZWRmNzQ0ZmI3YWE3YTBmMDk2M2M2YjBjMHAxMA"

export const redis = new Redis({ 
    url: redisUrl,
    token: redisToken
})