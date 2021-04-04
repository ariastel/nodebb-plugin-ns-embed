const database = require('./database'),
    logger = require('./logger'),
    rules = require('./rules'),
    Utils = require('./utils');

const Controller = {};

Controller.createRule = async function (payload) {
    await database.createRule(Utils.payloadToRule(payload));
    return await rules.invalidate();
};

Controller.deleteRule = async function (rule) {
    await database.deleteRule(rule.rid);
    return await rules.invalidate();
};

Controller.getAllRules = async function () {
    return await database.getRules();
};

Controller.installDefaultRules = async function (done) {
    const data = require('../data/default-rules');

    const rules = await database.getRules();

    // Filter rules to install
    const rulesToInstall = [];
    for (let i = 0, len = data.rules.length; i < len; ++i) {
        const defaultRule = data.rules[i];

        if (Utils.isInList('name', defaultRule.name, rules)) {
            logger.verbose(`Rule "${defaultRule.displayName}" is skipped. Reason: already installed`);
        } else {
            rulesToInstall.push(defaultRule);
        }
    }

    const installed = [];
    for (const ruleToInstall of rulesToInstall) {
        try {
            await database.createRule(Utils.payloadToRule(ruleToInstall));
            installed.push(defaultRule);
        } catch (error) {
            logger.error(`Rule "${defaultRule.displayName}" is errored. Reason: ${error}`);
        }
    }
    
    if (installed.length > 0) {
        await rules.invalidate();
    }

    return installed.map(rule => rule.displayName);
};

Controller.parseContent = async function (content) {
    return await rules.parse(content);
};

/**
 * Main parsing method.
 * Performs replacements on content field.
 *
 * @param {Object} payload {object} includes full post entity Payload.postData.content
 */
Controller.parsePost = async function (payload) {
    payload.postData.content = await Controller.parseContent(payload.postData.content);
    return payload;
};

Controller.saveRule = async function (rule) {
    await database.updateRule(rule.rid, Utils.payloadToRule(rule));
    const rule = await database.getRule(rule.rid);
    await rules.invalidate();
    return rule;
};

module.exports = Controller;