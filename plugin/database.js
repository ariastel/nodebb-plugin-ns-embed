/**
 * Created by Nicolas on 10/23/15.
 */
'use strict';

const { db } = require('./nodebb');
const constants = require('./constants');

const Database = {};

Database.createRule = async function (data) {
    const id = await db.incrObjectField('global', constants.COUNTER);

    const createTime = Date.now();
    const additionalData = {
        rid: id,
        createtime: createTime
    };
    const ruleData = Object.assign(data, additionalData);

    await Promise.all([
        db.sortedSetAdd(constants.NAMESPACE + ':rule', createTime, id),
        db.setObject(constants.NAMESPACE + ':rule:' + id, ruleData)
    ])

    return ruleData;
};

Database.deleteRule = async function (id) {
    await Promise.all([
        db.delete(constants.NAMESPACE + ':rule:' + id),
        db.sortedSetRemove(constants.NAMESPACE + ':rule', id)
    ])
};

Database.getRule = async function (id) {
    return await db.getObject(constants.NAMESPACE + ':rule:' + id);
};

Database.getRules = async function () {
    const ids = db.getSortedSetRange(constants.NAMESPACE + ':rule', 0, -1);
    if (!ids.length) {
        return ids;
    }
            
    return await db.getObjects(ids.map(id => constants.NAMESPACE + ':rule:' + id));
};

Database.updateRule = async function (id, data) {
    return await db.setObject(constants.NAMESPACE + ':rule:' + id, data);
};

module.exports = Database;