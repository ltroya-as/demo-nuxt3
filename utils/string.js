import kebabCase from 'lodash/kebabCase'
import camelCase from 'lodash/camelCase'

const capitalize = (str) =>
  str.charAt(0).toUpperCase() + str.substr(1).toLowerCase()

const titleCase = (str) =>
  str
    .split(' ')
    .map((w) => capitalize(w))
    .join(' ')

const trimEnd = (str, character) => {
  return str.substr(-1) === character ? str.substr(0, str.length - 1) : str
}

const getSlugFromUrl = (postUrl) => {
  postUrl = trimEnd(postUrl, '/')

  const pos = postUrl.lastIndexOf('/')
  const slug = postUrl.substr(pos)

  return /[a-z0-9-]+/.exec(slug)[0]
}

const camelAndPascalCase = (str) => {
  const strLower = camelCase(str)
  const strUpper = strLower.toUpperCase()
  const strArray = str.split('-').join(' ')
  const capitalizeWord = titleCase(strArray).replace(/\s+/g, '')
  const strKebabCase = kebabCase(str)

  return { strLower, strUpper, capitalizeWord, strKebabCase }
}

const snakeCaseToKebabCase = (str) => str.replace(/_/g, '-')

const escapeSpecialCharacter = (html) => {
  const specialCharacter = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;',
  }

  return html.replace(/[&<>"'/]/g, (match) => specialCharacter[match] || match)
}

export {
  capitalize,
  titleCase,
  trimEnd,
  getSlugFromUrl,
  camelAndPascalCase,
  snakeCaseToKebabCase,
  escapeSpecialCharacter,
}
