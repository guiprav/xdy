'use strict';

function mixin (target, mixin, member)
{
	Object.defineProperty
	(
		target, member,
		{
			get: function ()
			{
				if (typeof mixin[member] === 'function')
				{
					return function ()
					{
						return mixin[member].apply(mixin, arguments);
					};
				}
				else
				{
					return mixin[member];
				}
			}
		}
	);
}

module.exports = {
	mixin: mixin
};
