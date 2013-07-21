'use strict';

function mixin (target, mixin, member)
{
	if (typeof mixin[member] === 'function')
	{
		target[member] = function ()
		{
			return mixin[member].apply(mixin, arguments);
		};
	}
	else
	{
		Object.defineProperty
		(
			target, member,
			{
				get: function () { return mixin[member]; }
			}
		);
	}
}

module.exports = {
	mixin: mixin
};
