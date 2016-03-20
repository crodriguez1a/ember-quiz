/*jshint node:true*/
module.exports = {
  description: 'Install bower dependencies',

	normalizeEntityName: function() {
		// this prevents an error when the entityName is
		// not specified (since that doesn't actually matter
		// to us
	},

	afterInstall: function() {
    return this.addBowerPackagesToProject([
      { name: 'qunit', target: '^1.22.0' }
    ]);
	}
};
