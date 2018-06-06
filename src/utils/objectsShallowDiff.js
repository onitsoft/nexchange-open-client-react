const hasOwnProperty = Object.prototype.hasOwnProperty;

const is = (x, y) => {
  // SameValue algorithm
  if (x === y) {
    // Steps 1-5, 7-10
    // Steps 6.b-6.e: +0 != -0
    return x !== 0 || 1 / x === 1 / y;
  } else {
    // Step 6.a: NaN == NaN
    return x !== x && y !== y;
  }
};

export default (objA, objB) => {
  const keysA = Object.keys(objA);
  const diff = [];

  for (var i = 0; i < keysA.length; i++) {
    if (
      !hasOwnProperty.call(objB, keysA[i]) ||
      !is(objA[keysA[i]], objB[keysA[i]])
    ) {
      diff.push(keysA[i]);
    }
  }

  return diff;
};
