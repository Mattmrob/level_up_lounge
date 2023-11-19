// enforces good coding habits, such as utilizing all vars
"use strict";

const winston = require('winston');

const winOptions = 
    {
        level: 'info',
        format: winston.format.json(),
        defaultMeta: { service: 'user-service' },
        transports: [
            new winston.transports.File( 
                { filename: 'error.log', level: 0}),
            new winston.transports.File( 
                { filename: 'combined.log' }),
            ]
    }

const logger = winston.createLogger(winOptions);

// ------ debugging section to print verbose logs in console ------- //

logger.add(new winston.transports.Console(
    {
        format: winston.format.simple()
    }
));
