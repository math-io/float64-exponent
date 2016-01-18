'use strict';

var round = require( 'math-round' );
var pow = require( 'math-power' );
var exponent = require( './../lib' );

var frac;
var exp;
var x;
var e;
var i;

// Generate random numbers and extract their exponents...
for ( i = 0; i < 100; i++ ) {
	frac = Math.random() * 10;
	exp = round( Math.random()*646 ) - 323;
	x = frac * pow( 10, exp );
	e = exponent( x );
	console.log( 'x: %d. unbiased exponent: %d.', x, e );
}
