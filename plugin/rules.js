/**
 * Created by Nicolas on 10/25/15.
 */
'use strict';

const database = require('./database');
const logger = require('./logger');
const { cache } = require('./nodebb');

const rulesList = [];

const Rules = {};

Rules.invalidate = async function () {

    const rules = await database.getRules();

    logger.verbose('Updating rules...');

    // Re-compile regular expressions
    rulesList.length = 0;

    for (let i = 0, len = rules.length; i < len; ++i) {
        const rule = rules[i];
        try {
            const ruleEntity = {
                match: new RegExp(rule.regex, "g"),
                replacement: rule.replacement
            };
            rulesList.push(ruleEntity);
        } catch (e) {
            console.error('Rule is skipped', e);
        }
    }

    cache.reset();

    logger.verbose(`Updating rule list, total rules: ${rulesList.length}`);
};

Rules.parse = async function (content) {

    if (!content) {
        return content;
    }

    for (let i = 0, len = rulesList.length; i < len; ++i) {
        const rule = rulesList[i];
        content = content.replace(rule.match, rule.replacement);
    }
    return content;
};

module.exports = Rules;
