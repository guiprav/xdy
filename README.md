xdy [![Build Status](https://travis-ci.org/n2liquid/xdy.png?branch=master)](https://travis-ci.org/n2liquid/xdy)
===

Dynamically setup / remove prototype chain mixins.

xdy creates objects that hook up target prototype chains to store mixed-in interfaces. This way, a clear separation between the target object's members and what was mixed in is kept, allowing the mixin to be easily removed later.

Mixed in functions and properties are actually helper functions that call the mixin functions or get the mixin property. This means that they will always reflect the mixin object, even as it's changing (or being monkey-patched).

How to use
----------

Read [the test suite](tests/xdy.js).
