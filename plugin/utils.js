function isInList(field, value, list) {

    for (let i = 0, len = list.length; i < len; ++i) {
        const listItem = list[i];

        if (listItem[field] === value) {
            return true;
        }
    }

    return false;
}

function payloadToRule(payload) {
    const rule = {};

    // TODO Validation?

    rule.name = payload.name;
    rule.displayName = payload.displayName;
    rule.regex = payload.regex;
    rule.replacement = payload.replacement;
    rule.icon = payload.icon || 'fa-cogs';

    return rule;
}

module.exports = { isInList, payloadToRule };