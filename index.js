/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-quiz',
  init: function(app) {
    this.options = this.options || {};
    this.options.babel = this.options.babel || {};
    this.options.babel.optional = this.options.babel.optional || [];

    if (this.options.babel.optional.indexOf('es7.decorators') === -1) {
      this.options.babel.optional.push('es7.decorators');
    }
  },

  included: function(app, parentAddon) {
     // see: https://github.com/ember-cli/ember-cli/issues/3718
    if (typeof app.import !== 'function' && app.app) {
      this.app = app = app.app;
    }
    this._super.included(app);

    var target = (parentAddon || app);
    var options = target.options.emberQunit || {};

    if (!('includeQunitAssets' in options)) {
      options.includeQunitAssets = true;
    }

    if (options.includeQunitAssets) {
      target.import(target.bowerDirectory + "/qunit/qunit/qunit.js");
    }
  }
};
