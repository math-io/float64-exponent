'use strict';

// MODULES //

var tape = require( 'tape' );
var pinf = require( 'const-pinf-float64' );
var ninf = require( 'const-ninf-float64' );
var round = require( 'math-round' );
var pow = require( 'math-power' );
var bits = require( 'math-float64-bits' );
var exponent = require( './../lib' );


// VARIABLES //

var BIAS = 1023;


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( typeof exponent === 'function', 'main export is a function' );
	t.end();
});

tape( 'the function returns a number', function test( t ) {
	t.equal( typeof exponent(3.14e240), 'number', 'returns a number' );
	t.end();
});

tape( 'the function returns an integer corresponding to the unbiased exponent of a double-precision floating-point number', function test( t ) {
	var expected;
	var actual;
	var sign;
	var frac;
	var exp;
	var x;
	var b;
	var i;

	for ( i = 0; i < 1e4; i++ ) {
		if ( Math.random() < 0.5 ) {
			sign = -1;
		} else {
			sign = 1;
		}
		frac = Math.random() * 10;
		exp = round( Math.random()*646 ) - 323;
		x = sign * frac * pow( 10, exp );

		b = bits( x );
		expected = parseInt( b.substring( 1, 12 ), 2 ) - BIAS;

		actual = exponent( x );
		t.equal( actual, expected, 'returns the unbiased exponent for ' + x );

	}
	t.end();
});

tape( 'the function returns the unbiased exponent for `+-0`', function test( t ) {
	t.equal( exponent( 0 ), -BIAS, 'returns -1023' );
	t.equal( exponent( -0 ), -BIAS, 'returns -1023' );
	t.end();
});

tape( 'the function returns the unbiased exponent for `+infinity`', function test( t ) {
	t.equal( exponent( pinf ), BIAS+1, 'returns 1024' );
	t.end();
});

tape( 'the function returns the unbiased exponent for `-infinity`', function test( t ) {
	t.equal( exponent( ninf ), BIAS+1, 'returns 1024' );
	t.end();
});

tape( 'the function returns the unbiased exponent for `NaN`', function test( t ) {
	t.equal( exponent( NaN ), BIAS+1, 'returns 1024' );
	t.end();
});

tape( 'the function returns the unbiased exponent for subnormals', function test( t ) {
	t.equal( exponent( 3.14e-320 ), -BIAS, 'returns -1023' );
	t.end();
});
