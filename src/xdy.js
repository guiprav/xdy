'use strict';

function mixin (target, object, property)
{
	if (object[property] === undefined)
	{
		if (deflate.enable_undefined_property_retrier)
		{
			Object.defineProperty
			(
				target, property,
				{
					get: function ()
					{
						if (object[property] === undefined)
						{
							return undefined;
						}

						mixin(target, object, property);

						return target[property];
					},

					set: function (value)
					{
						object[property] = value;

						mixin(target, object, property);

						return target[property];
					}
				}
			);
		}
		else
		{
			throw new ReferenceError('Property "' + property + '" is undefined.');
		}
	}

	if (typeof object[property] === 'function')
	{
		target[property] = object[property].bind(object);
	}
	else
	{
		Object.defineProperty
		(
			target, property,
			{
				get: function () { return object[property]; },
				set: function (value) { return object[property] = value; }
			}
		);
	}
}

function make_node (object)
{
	remove_node(object);

	var mixin_node = { __mixin_node: true };

	mixin_node.__proto__ = object.__proto__;
	object.__proto__ = mixin_node;

	return mixin_node;
}

function get_node (object)
{
	if (!object.__proto__.__mixin_node)
	{
		return null;
	}

	return object.__proto__;
}

function remove_node (object)
{
	if (object.__proto__.__mixin_node)
	{
		object.__proto__ = object.__proto__.__proto__;
	}
}

module.exports =
{
	mixin: mixin,
	make_node: make_node,
	get_node: get_node,
	remove_node: remove_node
};
