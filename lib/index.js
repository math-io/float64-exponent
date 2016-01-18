'use strict';

// MODULES //

var getHighWord = require( 'math-float64-get-high-word' );


// VARIABLES //

// Exponent mask: 01111111111100000000000000000000
var EXP_MASK = 0x7ff00000;
var BIAS = 1023;


// EXPONENT //

/**
* FUNCTION: exponent( x )
*	Returns an integer corresponding to the unbiased exponent of a double-precision floating-point number.
*
* @param {Number} x - input value
* @returns {Number} unbiased exponent
*/
function exponent( x ) {
	// Extract from the input value a higher order word (unsigned 32-bit integer) which contains the exponent:
	var high = getHighWord( x );

	// Apply a mask to isolate only the exponent bits and then shift off all bits which are part of the fraction:
	high = ( high & EXP_MASK ) >>> 20;

	// Remove the bias and return:
	return high - BIAS;
} // end FUNCTION exponent()


// EXPORTS //

module.exports = exponent;
