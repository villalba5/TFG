var  nerdamer = require('nerdamer/nerdamer.core.js')
var algebra = require( 'nerdamer/Algebra.js')
var calc = require( 'nerdamer/Calculus.js')
var solve = require( 'nerdamer/Solve.js')

var x = nerdamer.solveEquations(['((x)*(x))+((y-8)*(y-8))=36', '((x)*(x))+((y)*(y))=64'])
y = x.toString().split(',');
console.log('x : ',y[1], ' y: ',y[3]);


