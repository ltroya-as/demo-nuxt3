export const random = () => {
  const typedArray = new Uint8Array(1)
  const randomValue = crypto.getRandomValues(typedArray)[0]
  return randomValue / Math.pow(2, 8)
}
