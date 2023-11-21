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
    return `${timestamp} || ${label} [${level}]: "${message}"}`;
});

module.exports =
{
    CATEGORY, format, customFormat
}
