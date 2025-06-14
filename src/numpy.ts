type DType = 'bool' | 'int8' | 'int16' | 'int32' | 'int64' | 'uint8' | 'uint16' | 'uint32' | 'uint64' | 'float16' | 'float32' | 'float64' | 'complex64' | 'complex128' | 'string' | 'object';

interface NdArray<T = any> {
  readonly dtype: DType;
  readonly shape: number[];
  readonly ndim: number;
  readonly size: number;
  [key: number]: T | NdArray<T>; 
  /**
   * Reshapes the array without changing its data.
   * @param newShape - The new shape of the array.
   * @returns A new view of the array with the new shape.
   */
  reshape: (...newShape: number[]) => NdArray<T>;
  /**
   * Returns a copy of the array collapsed into one dimension.
   * @returns A new 1-D array.
   */
  flatten: () => NdArray<T>;
  /**
   * Transposes the array.
   * @returns A new view of the array with axes transposed.
   */
  T: NdArray<T>;
  /**
   * Converts the array to a JavaScript Array.
   * @returns A JavaScript Array representation of the NdArray.
   */
  tolist: () => T[] | T[][];
}

type ArrayLike<T> = T[] | T[][] | T[][][] | NdArray<T>; 

type Axis = number | number[] | null; 

interface Numpy {
  /**
   * Creates a new array object.
   * @param object - An array-like object or a number.
   * @param dtype - The desired data type of the array.
   * @returns A new array object.
   */
  array: <T>(object: ArrayLike<T>, dtype?: DType) => NdArray<T>;

  /**
   * Creates a new zero-filled array.
   * @param shape - The shape of the array. Can be a number or a tuple of numbers.
   * @param dtype - The data type of the array elements.
   * @returns A new zero-filled array.
   */
  zeros: (shape: number | number[], dtype?: DType) => NdArray<number>;

  /**
   * Creates a new ones-filled array.
   * @param shape - The shape of the array. Can be a number or a tuple of numbers.
   * @param dtype - The data type of the array elements.
   * @returns A new ones-filled array.
   */
  ones: (shape: number | number[], dtype?: DType) => NdArray<number>;

  /**
   * Creates a new empty array. Its content is not guaranteed to be zeros.
   * @param shape - The shape of the array. Can be a number or a tuple of numbers.
   * @param dtype - The data type of the array elements.
   * @returns A new empty array.
   */
  empty: (shape: number | number[], dtype?: DType) => NdArray<any>; // 'any' porque el contenido es indeterminado

  /**
   * Creates a new array with evenly spaced values within a given interval.
   * @param start - The starting value of the sequence.
   * @param stop - The end value of the sequence (exclusive).
   * @param step - The spacing between values in the sequence.
   * @param dtype - The data type of the array elements.
   * @returns A new array with evenly spaced values.
   */
  arange: (start: number, stop?: number, step?: number, dtype?: DType) => NdArray<number>;

  /**
   * Creates an array of specified shape and fills it with random floats in the half-open interval [0.0, 1.0).
   * @param shape - The shape of the array. Can be a number or a tuple of numbers.
   * @returns A new array filled with random values.
   */
  random: {
    rand: (d0: number, ...dn: number[]) => NdArray<number>;
    randn: (d0: number, ...dn: number[]) => NdArray<number>;
    randint: (low: number, high?: number, size?: number | number[], dtype?: DType) => NdArray<number>;
    random: (size?: number | number[]) => NdArray<number>;
    normal: (loc?: number, scale?: number, size?: number | number[]) => NdArray<number>;
    uniform: (low?: number, high?: number, size?: number | number[]) => NdArray<number>;
  };

  /**
   * Computes the sum of array elements over a given axis.
   * @param array - The input array.
   * @param axis - The axis along which to compute the sum. If not specified, the sum is computed over all elements.
   * @returns The sum of the array elements.
   */
  sum: (array: ArrayLike<number>, axis?: Axis) => number | NdArray<number>;

  /**
   * Computes the mean of array elements over a given axis.
   * @param array - The input array.
   * @param axis - The axis along which to compute the mean. If not specified, the mean is computed over all elements.
   * @returns The mean of the array elements.
   */
  mean: (array: ArrayLike<number>, axis?: Axis) => number | NdArray<number>;

  /**
   * Computes the standard deviation of array elements over a given axis.
   * @param array - The input array.
   * @param axis - The axis along which to compute the standard deviation. If not specified, the standard deviation is computed over all elements.
   * @returns The standard deviation of the array elements.
   */
  std: (array: ArrayLike<number>, axis?: Axis) => number | NdArray<number>;

  /**
   * Computes the variance of array elements over a given axis.
   * @param array - The input array.
   * @param axis - The axis along which to compute the variance. If not specified, the variance is computed over all elements.
   * @returns The variance of the array elements.
   */
  var: (array: ArrayLike<number>, axis?: Axis) => number | NdArray<number>;

  /**
   * Computes the maximum value of array elements over a given axis.
   * @param array - The input array.
   * @param axis - The axis along which to compute the maximum value. If not specified, the maximum is computed over all elements.
   * @returns The maximum value of the array elements.
   */
  max: (array: ArrayLike<number>, axis?: Axis) => number | NdArray<number>;

  /**
   * Computes the minimum value of array elements over a given axis.
   * @param array - The input array.
   * @param axis - The axis along which to compute the minimum value. If not specified, the minimum is computed over all elements.
   * @returns The minimum value of the array elements.
   */
  min: (array: ArrayLike<number>, axis?: Axis) => number | NdArray<number>;

  /**
   * Computes the dot product of two arrays.
   * @param a - The first input array.
   * @param b - The second input array.
   * @returns The dot product of the two arrays.
   */
  dot: (a: ArrayLike<number>, b: ArrayLike<number>) => number | NdArray<number>;

  /**
   * Computes the element-wise addition of two arrays.
   * @param a - The first input array.
   * @param b - The second input array.
   * @return A new array containing the element-wise sum of the two arrays.
   */
  add: (a: ArrayLike<number>, b: ArrayLike<number>) => NdArray<number>;

  /**
   * Computes the element-wise subtraction of two arrays.
   * @param a - The first input array.
   * @param b - The second input array.
   * @return A new array containing the element-wise difference of the two arrays.
   */
  subtract: (a: ArrayLike<number>, b: ArrayLike<number>) => NdArray<number>;

  /**
   * Computes the element-wise multiplication of two arrays.
   * @param a - The first input array.
   * @param b - The second input array.
   * @return A new array containing the element-wise product of the two arrays.
   */
  multiply: (a: ArrayLike<number>, b: ArrayLike<number>) => NdArray<number>;

  /**
   * Computes the element-wise division of two arrays.
   * @param a - The first input array.
   * @param b - The second input array.
   * @return A new array containing the element-wise quotient of the two arrays.
   */
  divide: (a: ArrayLike<number>, b: ArrayLike<number>) => NdArray<number>;

  /**
   * Computes the element-wise power of an array.
   * @param a - The base array.
   * @param b - The exponent array or a scalar value.
   * @return A new array containing the element-wise power of the base array raised to the exponent array or scalar.
   */
  power: (a: ArrayLike<number>, b: ArrayLike<number> | number) => NdArray<number>;

  /**
   * Computes the element-wise square root of an array.
   * @param a - The input array.
   * @return A new array containing the element-wise square root of the input array.
   */
  sqrt: (a: ArrayLike<number>) => NdArray<number>;

  /**
   * Computes the element-wise natural logarithm of an array.
   * @param a - The input array.
   * @return A new array containing the element-wise natural logarithm of the input array.
   */
  log: (a: ArrayLike<number>) => NdArray<number>;

  /**
   * Returns the absolute value of each element in the input array.
   * @param x - The input array.
   * @returns An array containing the absolute value of each element.
   */
  abs: (x: ArrayLike<number>) => NdArray<number>;

  /**
   * Rounds the array to the nearest integer.
   * @param a - The input array.
   * @returns An array with elements rounded to the nearest integer.
   */
  round: (a: ArrayLike<number>) => NdArray<number>;

  /**
   * Returns the floor of the input array, element-wise.
   * @param x - The input array.
   * @returns An array with elements rounded down to the nearest integer.
   */
  floor: (x: ArrayLike<number>) => NdArray<number>;

  /**
   * Returns the ceiling of the input array, element-wise.
   * @param x - The input array.
   * @returns An array with elements rounded up to the nearest integer.
   */
  ceil: (x: ArrayLike<number>) => NdArray<number>;

  /**
   * Returns the element-wise sine of the input array.
   * @param x - The input array.
   * @returns An array containing the sine of each element.
   */
  sin: (x: ArrayLike<number>) => NdArray<number>;

  /**
   * Returns the element-wise cosine of the input array.
   * @param x - The input array.
   * @returns An array containing the cosine of each element.
   */
  cos: (x: ArrayLike<number>) => NdArray<number>;

  /**
   * Returns the element-wise tangent of the input array.
   * @param x - The input array.
   * @returns An array containing the tangent of each element.
   */
  tan: (x: ArrayLike<number>) => NdArray<number>;

  /**
   * Computes the element-wise exponential of an array.
   * @param x - The input array.
   * @returns A new array containing the element-wise exponential of the input array.
   */
  exp: (x: ArrayLike<number>) => NdArray<number>;

  /**
   * Returns a new array with axes transposed.
   * For a 1-D array, this returns an un-changed view of the original array.
   * For a 2-D array, this is the standard matrix transpose.
   * For an n-D array, if axes are given, they describe how the axes are permuted.
   * If axes are not provided, then `a.T` is returned.
   * @param a - The input array.
   * @param axes - Optional. The axes to permute. By default, the axes are reversed.
   * @returns A new view of the array with its axes permuted.
   */
  transpose: <T>(a: ArrayLike<T>, axes?: number[]) => NdArray<T>;

  /**
   * Concatenate arrays along an existing axis.
   * @param arrays - The arrays to concatenate.
   * @param axis - The axis along which to concatenate the arrays. If null, arrays are flattened before concatenation.
   * @returns The concatenated array.
   */
  concatenate: <T>(arrays: ArrayLike<T>[], axis?: Axis) => NdArray<T>;

  /**
   * Split an array into multiple sub-arrays.
   * @param ary - The array to be divided.
   * @param indices_or_sections - If an integer, N sections will be created. If a 1-D array of sorted integers, the entries indicate where along axis the array is split.
   * @param axis - The axis along which to split.
   * @returns A list of sub-arrays.
   */
  split: <T>(ary: NdArray<T>, indices_or_sections: number | number[], axis?: number) => NdArray<T>[];

  /**
   * Sorts the elements of an array along a given axis.
   * @param a - The array to be sorted.
   * @param axis - Axis along which to sort. If null, the array is flattened before sorting.
   * @param kind - The sorting algorithm. 'quicksort', 'mergesort', 'heapsort', 'stable'.
   * @returns A sorted copy of the array.
   */
  sort: <T>(a: ArrayLike<T>, axis?: Axis, kind?: 'quicksort' | 'mergesort' | 'heapsort' | 'stable') => NdArray<T>;

  /**
   * Returns the indices that would sort an array.
   * @param a - The array to be sorted.
   * @param axis - Axis along which to sort. If null, the flattened array is used.
   * @param kind - The sorting algorithm.
   * @returns An array of indices that sort the array.
   */
  argsort: <T>(a: ArrayLike<T>, axis?: Axis, kind?: 'quicksort' | 'mergesort' | 'heapsort' | 'stable') => NdArray<number>;

  /**
   * Return the indices of the maximum values along an axis.
   * @param a - Input array.
   * @param axis - Axis along which to operate. By default, flattened input is used.
   * @returns An array of indices into the array.
   */
  argmax: (a: ArrayLike<number>, axis?: Axis) => number | NdArray<number>;

  /**
   * Return the indices of the minimum values along an axis.
   * @param a - Input array.
   * @param axis - Axis along which to operate. By default, flattened input is used.
   * @returns An array of indices into the array.
   */
  argmin: (a: ArrayLike<number>, axis?: Axis) => number | NdArray<number>;
}

declare const np: Numpy;

export default np;