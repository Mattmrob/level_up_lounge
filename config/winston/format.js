"use strict";

const { format, createLogger, transports } = require('winston');

const { combine, timestamp, level, printf } = format;

const CATEGORY = 'lul_formatting';

const customFormat = printf((
    { level, message, label, timestamp}
) =>
{
    return `${timestamp} || ${label} [${level}]: "${message}"}`;
});

module.exports =
{
    CATEGORY, format, customFormat
}
