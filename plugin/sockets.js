'use strict';

const constants = require('./constants');
const controller = require('./controller');
const { adminSockets, serverSockets } = require('./nodebb');

const emitNamespace = 'admin.plugins.' + constants.SOCKET_NAMESPACE + '.';

const Sockets = {};

Sockets.init = function () {
    adminSockets[constants.SOCKET_NAMESPACE] = {};

    // Acknowledgements
    adminSockets[constants.SOCKET_NAMESPACE].defaultRulesInstall = Sockets.defaultRulesInstall;
    adminSockets[constants.SOCKET_NAMESPACE].embedRulesGet = Sockets.embedRulesGet;
    adminSockets[constants.SOCKET_NAMESPACE].ruleCreate = Sockets.ruleCreate;
    adminSockets[constants.SOCKET_NAMESPACE].ruleDelete = Sockets.ruleDelete;
    adminSockets[constants.SOCKET_NAMESPACE].ruleSave = Sockets.ruleSave;
};

Sockets.defaultRulesInstall = async function () {
    return await controller.installDefaultRules();
};

Sockets.embedRulesGet = async function () {
    return await controller.getAllRules();
};

Sockets.emit = async function (eventName, payload) {
    return await serverSockets.emit(emitNamespace + eventName, payload);
};

Sockets.ruleCreate = async function (_, payload) {
    return await controller.createRule(payload);
};

Sockets.ruleDelete = async function (_, payload) {
    return await controller.deleteRule(payload);
};

Sockets.ruleSave = async function (_, payload) {
    return await controller.saveRule(payload);
};

module.exports = Sockets;