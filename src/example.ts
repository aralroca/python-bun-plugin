import np from 'python:numpy';

console.log('First', np.arange(10).toString());

// Multiply two arrays
const a = np.array([1, 2, 3]); 
const b = np.array([4, 5, 6]);
const c = np.multiply(a, b);
console.log('Second', c.toString());