export function stringIdAndParseObject(arr) {
  const parsedArr = arr.map((product) => {
    return { ...product.toObject(), _id: String(product._id) };
  });
  return parsedArr;
}

export function stringId(arr) {
  const parsedArr = arr.map((product) => {
    return { ...product, _id: String(product._id) };
  });
  return parsedArr;
}
