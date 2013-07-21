'use strict';

var assert = require('assert');
var vows = require('vows');
var s = require('sinon');

var xdy = require('../');

vows.describe('The xdy library').addBatch
({
	'has mixin functionality':
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

		'that mixes methods in': function (t)
		{
			var target = new t.Target();
			var mixin = new t.Mixin();

			mixin.mixin_method = s.spy();

			xdy.mixin(target, mixin, 'mixin_method');

			target.mixin_method();

			s.assert.calledOnce(mixin.mixin_method);
		},

		'that mixes properties in': function (t)
		{
			var target = new t.Target();
			var mixin = new t.Mixin();

			mixin.mixin_property = 2;

			xdy.mixin(target, mixin, 'mixin_property');

			assert.deepEqual
			(
				target.mixin_property,
				mixin.mixin_property,
				'`target.mixin_property` should be equal to `mixin.mixin_property`.'
			);
		},

		'whose mixed in functions\' `this` points to the mixin object': function (t)
		{
			var target = new t.Target();
			var mixin = new t.Mixin();

			mixin.mixin_method = function ()
			{
				assert.equal(this, mixin);
			};

			xdy.mixin(target, mixin, 'mixin_method');

			target.mixin_method();
		},

		'whose mixed in functions track mixin object monkey-patches': function (t)
		{
			var target = new t.Target();
			var mixin = new t.Mixin();

			var original = s.spy();
			var patched = s.spy();

			mixin.mixin_method = original;

			xdy.mixin(target, mixin, 'mixin_method');

			mixin.mixin_method = patched;

			target.mixin_method();

			assert(patched.calledOnce, 'patched function should be called.');
			assert(original.notCalled, 'original function should not be called.');
		},

		'whose mixed in properties always reflect their mixin object value': function (t)
		{
			var target = new t.Target();
			var mixin = new t.Mixin();

			mixin.mixin_property = 2;

			xdy.mixin(target, mixin, 'mixin_property');

			mixin.mixin_property = 3;

			assert.deepEqual
			(
				target.mixin_property,
				mixin.mixin_property
			);
		}
	}
}).export(module);
