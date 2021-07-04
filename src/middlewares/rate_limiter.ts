import rateLimiter from 'express-rate-limit'


//a simple rate limiter that has a 
//maximum of 50 requests per hour

export const  limiter = rateLimiter({
   max: 50,
   windowMs: 60 * 60 * 1000,
   message:"Too many requests are coming from this IP address, try again in an hour"
})