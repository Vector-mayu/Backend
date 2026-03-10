const redis = require("redis");

const redisClient = redis.createClient({
	username: 'default',
	password: 'VWEDKG0gCwxP4YyG582v9i52PEkk0LcH',
	socket: {
        host: 'redis-14959.c212.ap-south-1-1.ec2.cloud.redislabs.com',
        port: 14959
    }	
});

// Dont Connect here instead connect it in Index.js Main file

// const connectRedis = async()=>{
// 	await redisClient.connect();
// 	// console.log('Connected to Redis');
// }

// connectRedis();

module.exports = redisClient;