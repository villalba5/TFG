var  nerdamer = require('nerdamer/nerdamer.core.js')
var algebra = require( 'nerdamer/Algebra.js')
var calc = require( 'nerdamer/Calculus.js')
var solve = require( 'nerdamer/Solve.js')

var x = nerdamer.solveEquations(['(x-3)*(x-3)+(y-5)*(y-5)=9', '(2-x)*(2-x)+(3-y)*(3-y)=16'])
console.log(x.toString());