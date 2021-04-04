/**
 * Created by Nicolas on 10/25/15.
 */
'use strict';

const winston = require.main.require('winston');

function formatMessage(msg) {
    return `[ns-embed] ${msg}`;
}

module.exports = {
    verbose: (msg) => winston.verbose(formatMessage(msg)),
    error: (msg) => winston.error(formatMessage(msg)),
    warn: (msg) => winston.warn(formatMessage(msg)),
};
