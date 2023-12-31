"use strict";

const {format, createLogger, transports } = require('winston');
const { customFormat } = require('./format');
require('winston-daily-rotate-file');


// ------ file rotation ------------------------------------------- //

const fileRotateTransport = new transports.DailyRotateFile(
    {
        filename: 'logs/rotate-%DATE%.log',
        datePattern: 'YYYY-MM-DD',
        // set this to number of days to retain: currently 1 week
        maxFiles: '7d',
        // IF CHANGED => CHANGE COMMENT
    }
);

// ------ end file rotation --------------------------------------- //
const winOptions = 
    {
        level: 'info',
        format: customFormat,
        defaultMeta: { service: 'user-service' },
        transports: [
            new transports.File( 
                { filename: 'logs/error.log', level: 'error'}),
            new transports.File( 
                { filename: 'logs/combined.log' }),
            new transports.Console(
                { format: customFormat }
            )
            ]
    }

// const logger = createLogger(winOptions);


// // ------ debugging section to print verbose logs in console ------ //

// logger.add(new transports.Console(
//     {
//         format: format.simple()
//     }
// ));

// // ------ end debugging ------------------------------------------- // 

module.exports = createLogger(winOptions), fileRotateTransport;
