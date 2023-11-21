"use strict";

const { format, createLogger, transports } = require('winston');

const { combine, label, printf } = format;

const CATEGORY = 'lul_formatting';

const customFormat = printf((
    { level, message, label }) =>
{
    let timestamp = new Date()
    // .getTime()
    .toUTCString();
    return `{'timestamp': '${timestamp}',
'label': '${label}',
'level': '${level}',
'message': '${message}'}`;
});

module.exports =
{
    CATEGORY, format, customFormat
}
