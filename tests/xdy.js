'use strict';

var assert = require('assert');
var vows = require('vows');
var s = require('sinon');

var xdy = require('../');

vows.describe('xdy').addBatch
({
	'mixin functionality':
	{
		topic: function ()
		{
			function Target () {}

			function Mixin () {}

			Mixin.prototype.mixin_method = function () {};

			return {
				Target: Target,
				Mixin: Mixin
			};
		},

		'can mix methods in': function (t)
		{
			var target = new t.Target();
			var mixin = new t.Mixin();

			xdy.mixin(target, mixin, 'mixin_method');

			assert.equal
			(
				target.mixin_method,
				t.Mixin.prototype.mixin_method,
				'target.mixin_method should be set to Mixin.mixin_method.'
			);
		}
	}
}).export(module);
