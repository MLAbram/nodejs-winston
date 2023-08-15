// https://github.com/winstonjs/winston
// https://www.npmjs.com/package/winston
// https://www.npmjs.com/package/winston-mongodb

// https://betterstack.com/community/guides/logging/how-to-install-setup-and-use-winston-and-morgan-to-log-node-js-applications/
// https://www.section.io/engineering-education/logging-with-winston/
// https://dev.to/jobizil/getting-started-with-winston-winston-a-beginner-s-guide-7j3

// https://www.youtube.com/watch?v=PdVlAi7nrRU
// https://github.com/Tariqu/winston_winston_example

// https://en.wikipedia.org/wiki/List_of_tz_database_time_zones


const { createLogger, transports, format } = require('winston')
const { combine, timestamp, json, printf } = format

require('dotenv').config()
require('winston-mongodb')
require('winston-daily-rotate-file')

const timezoned = () => {
    return new Date().toLocaleString('en-US', {
        timeZone: 'America/Chicago',
        hour12: false
    })
}

const winston = createLogger({
    // defaultMeta: {service: 'admin-service'},
    transports: [
        new transports.Console(),
        new transports.MongoDB({
            level: 'error',
            db: process.env.MONGODB,
            options: { 
                useNewUrlParser: true, 
                useUnifiedTopology: true 
            },
            collection: 'nodejs_winston',
            format: format.combine(format.timestamp(), format.json())
        }),
        new transports.DailyRotateFile({
            level: 'info',
            filename: 'logs/winston-info-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            maxFiles: '7d',
            format: format.combine(timestamp(), format.json())
        }),
        new transports.File({
            level: 'silly',
            filename: 'logs/winston-prettyPrint.log',
            format: format.combine(timestamp(), format.prettyPrint())
        }),
        new transports.File({
            level: 'error',
            filename: 'logs/winston-errors.log',
            // format: format.combine(timestamp(), format.json())
            format: format.combine(timestamp({format: timezoned}), format.prettyPrint())
        })
    ]
})

module.exports = winston