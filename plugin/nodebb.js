'use strict';


module.exports = {
    adminSockets: require.main.require('./src/socket.io/admin').plugins,
    cache: require.main.require('./src/posts/cache'),
    db: require.main.require('./src/database'),
    groups: require.main.require('./src/groups'),
    meta: require.main.require('./src/meta'),
    pluginSockets: require.main.require('./src/socket.io/plugins'),
    postTools: require.main.require('./src/posts/tools'),
    serverSockets: require.main.require('./src/socket.io').server.sockets,
    settings: require.main.require('./src/settings'),
    socketIndex: require.main.require('./src/socket.io/index'),
    topics: require.main.require('./src/topics'),
    user: require.main.require('./src/user'),

    utils: require.main.require('./public/src/utils'),
    helpers: require.main.require('./src/controllers/helpers'),

    /**
     * List is incomplete
     *
     * base_dir: '/path/to/NodeBB',
     * themes_path: '/path/to/NodeBB/node_modules',
     * views_dir: '/path/to/NodeBB/public/templates',
     * version: 'NodeBB Version',
     * url: 'http://localhost:4567',
     * core_templates_path: '/path/to/NodeBB/src/views',
     * base_templates_path: '/path/to/NodeBB/node_modules/nodebb-theme-vanilla/templates',
     * upload_path: '/public/uploads',
     * relative_path: '',
     * port: '4567',
     * upload_url: '/uploads/',
     * theme_templates_path: '/path/to/NodeBB/node_modules/nodebb-theme-lavender/templates',
     * theme_config: '/path/to/NodeBB/node_modules/nodebb-theme-lavender/theme.json',
     * NODE_ENV: 'development'
     */
    nconf: require.main.require('nconf'),
    passport: require.main.require('passport'),
    express: require.main.require('express')
};
