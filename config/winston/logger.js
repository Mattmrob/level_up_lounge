"use strict";

const {format, createLogger, transports } = require('winston');

const winOptions = 
    {
        level: 'info',
        format: format.json(),
        defaultMeta: { service: 'user-service' },
        transports: [
            new transports.File( 
                { filename: 'error.log', level: 0}),
            new transports.File( 
                { filename: 'combined.log' }),
            ]
    }

const logger = createLogger(winOptions);

// ------ debugging section to print verbose logs in console ------ //

// logger.add(new transports.Console(
//     {
//         format: format.simple()
//     }
// ));

// ------ end debugging                                      ------ // 

module.exports = logger;
