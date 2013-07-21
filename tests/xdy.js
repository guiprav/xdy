'use strict';

var assert = require('assert');
var vows = require('vows');
var s = require('sinon');

var xdy = require('../');

vows.describe('The xdy library').addBatch
({
	'has mixin functionality':
	{
		'that mixes methods in': function ()
		{
			var target = {};
			var mixin = {};

			mixin.mixin_method = s.spy();

			xdy.mixin(target, mixin, 'mixin_method');

			target.mixin_method();

			s.assert.calledOnce(mixin.mixin_method);
		},

		'that mixes properties in': function ()
		{
			var target = {};
			var mixin = {};

			mixin.mixin_property = 2;

			xdy.mixin(target, mixin, 'mixin_property');

			assert.deepEqual
			(
				target.mixin_property,
				mixin.mixin_property,
				'`target.mixin_property` should be equal to `mixin.mixin_property`.'
			);
		},

		'whose mixed in functions\' `this` points to the mixin object': function ()
		{
			var target = {};
			var mixin = {};

			mixin.mixin_method = function ()
			{
				assert.equal(this, mixin);
			};

			xdy.mixin(target, mixin, 'mixin_method');

			target.mixin_method();
		},

		'whose mixed in functions track mixin object monkey-patching': function ()
		{
			var target = {};
			var mixin = {};

			var original = s.spy();
			var patched = s.spy();

			mixin.mixin_function = original;

			xdy.mixin(target, mixin, 'mixin_function');

			mixin.mixin_function = patched;

			target.mixin_function();

			assert(patched.calledOnce, 'patched function should be called.');
			assert(original.notCalled, 'original function should not be called.');

			mixin.mixin_function = 'I am a crazy bastard.';

			assert.deepEqual
			(
				target.mixin_function,
				mixin.mixin_function
			);
		},

		'whose mixed in properties track mixin object changes': function ()
		{
			var target = {};
			var mixin = {};

			mixin.mixin_property = 1;

			xdy.mixin(target, mixin, 'mixin_property');

			mixin.mixin_property = 2;

			assert.deepEqual(target.mixin_property, mixin.mixin_property);
		}
	}
}).export(module);
