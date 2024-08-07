export const existProperty = (obj, property) => {
  if (!obj) return false
  return Object.keys(obj).includes(property)
}

export const isObject = (obj) => {
  return typeof obj === 'object' && obj !== null && !Array.isArray(obj)
}
