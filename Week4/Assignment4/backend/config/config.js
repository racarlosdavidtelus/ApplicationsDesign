require('dotenv').config()

const credentials = {
    mysql: {   
        host     : process.env.MYSQL_HOST,
        user     : process.env.MYSQL_USER,
        password : process.env.MYSQL_PASSWORD,
        database : process.env.MYSQL_DATABASE    
    },
    mongo: {
        url: process.env.MONGO_URL,     
    },
    s3: {
        //apiVersion: '2006-03-01',
        region: 'us-east-2',
        accessKeyId: "AKIASXIU3COO4E5ZAF4M",
        secretAccessKey: "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"        
    }
}

module.exports = credentials;