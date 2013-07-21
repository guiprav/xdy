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
		target[member] = mixin[member];
	}
}

module.exports = {
	mixin: mixin
};
