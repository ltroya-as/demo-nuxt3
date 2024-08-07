const asyncSome = async (arr, predicate) => {
  for (const e of arr) {
    if (await predicate(e)) return true
  }
  return false
}

const arrayToPairs = (arr) => {
  const pairs = []
  for (let i = 0; i < arr.length; i += 2) {
    pairs.push([arr[i], arr[i + 1]])
  }

  return pairs
}

export { asyncSome, arrayToPairs }
