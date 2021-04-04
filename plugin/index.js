'use strict';

const filters = require('./filters'),
    rules = require('./rules'),
    sockets = require('./sockets');


const Plugin = {};

// NodeBB list of Hooks: https://github.com/NodeBB/NodeBB/wiki/Hooks
Plugin.hooks = {
    filters: filters,
    statics: {
        load: async function (params) {
            const { router, middleware } = params;
            const pluginUri = '/admin/plugins/embed';
            const apiUri = '/api' + pluginUri;

            function renderAdmin(req, res) {
                res.render(
                    'admin/plugins/embed', {}
                );
            };

            router.get(pluginUri, middleware.admin.buildHeader, renderAdmin);
            router.get(apiUri, renderAdmin);

            sockets.init();
            await rules.invalidate();
            
            return;
        }
    }
};

module.exports = Plugin;