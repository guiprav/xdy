'use strict';

function mixin (target, mixin, member)
{
	target[member] = mixin[member];
}

module.exports = {
	mixin: mixin
};
