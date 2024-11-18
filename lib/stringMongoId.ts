// @ts-expect-error idk
export function stringIdAndParseObject(arr) {
  // @ts-expect-error idk
  const parsedArr = arr.map((product) => {
    return { ...product.toObject(), _id: String(product._id) };
  });
  return parsedArr;
}

// @ts-expect-error idk
export function stringId(arr) {
  // @ts-expect-error idk
  const parsedArr = arr.map((product) => {
    return { ...product, _id: String(product._id) };
  });
  return parsedArr;
}
