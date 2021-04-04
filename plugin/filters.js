'use strict';

const controller = require('./controller');

const Filters = {};

Filters.adminHeaderBuild = async function (header) {
    header.plugins.push({
        route: '/plugins/embed',
        icon: 'fa-share-alt',
        name: 'Embed'
    });
    return header;
};

Filters.parsePost = async function (payload) {
    return await controller.parsePost(payload);
};

Filters.parseRaw = async function (payload) {
    return await controller.parseContent(payload);
}

module.exports = Filters;