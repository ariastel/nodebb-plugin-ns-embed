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

// From PR - https://github.com/NicolasSiver/nodebb-plugin-ns-embed/pull/27/files
// Fix allowed attributes for some elements. NodeBB sanitizes them otherwise.
// See NodeBB's default sanitizer config at: https://github.com/NodeBB/NodeBB/blob/master/src/posts/parse.js
Filters.configSanitizer = async function (payload) {
    payload.allowedAttributes.iframe.push('allowfullscreen', 'frameborder', 'allow');
    return payload;
};

module.exports = Filters;