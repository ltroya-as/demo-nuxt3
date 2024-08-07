import { LEVEL_KEY_MAP, FILTER_KEY_MAP, LABEL_MAP } from '~/constants/chart'

const cartesian = (...a) =>
  // returns an array of arrays representing the Cartesian product of the given arrays. See https://en.wikipedia.org/wiki/Cartesian_product
  // >>> cartesian([1,2,3], ["x","y"])
  //   Array(6) [
  //     0: Array(2) [1, "x"]
  //     1: Array(2) [1, "y"]
  //     2: Array(2) [2, "x"]
  //     3: Array(2) [2, "y"]
  //     4: Array(2) [3, "x"]
  //     5: Array(2) [3, "y"]
  a.reduce((a, b) => a.flatMap((d) => b.map((e) => [d, e].flat())))

const getFiltersNameArray = (filterObject) => {
  // convert the filter objet to an array of arrays
  // For example:
  // >>> const selectedFilters = {
  //       "category": [{"name": "Flake"}, {"name": "Spherical Uncoated"}],
  //       "grade": [{"name": "+100 mesh"}, {"name": "+50 mesh"}],
  //       "purity": [],
  //       "shipping route": []
  //     }
  // >>> getFiltersNameArray(selectedFilters)
  //   [
  //     ["Flake", "Spherical Uncoated"],
  //     ["+100 mesh","+50 mesh"],
  //     [""],
  //     [""]
  // ]
  const filtersNameArray = []
  // We iterate for each property of the options object (category, grade, purity and shipping route)
  // If the property have no options selected, we should add an empty array like this [""]
  // We need this to represent an empty property and so the cartesian product can calculate properly
  Object.values(filterObject).forEach((value) => {
    if (value.length) {
      filtersNameArray.push(value.map((e) => e.name))
    } else {
      filtersNameArray.push([''])
    }
  })

  return filtersNameArray
}

const getAllFiltersCombinations = (selectedFilters) => {
  // Returns all possible filter combinations
  // For example:
  // >>> const selectedFilters = {
  //       "category": [{"name": "Flake"}, {"name": "Spherical Uncoated"}],
  //       "grade": [{"name": "+100 mesh"}, {"name": "+50 mesh"}],
  //       "purity": [],
  //       "shipping route": []
  //      }
  // >>> getAllFiltersCombinations(selectedFilters) will return 4 possible combinations
  // [
  //   ["Flake", "+100 mesh","",""],
  //   ["Flake","+50 mesh","",""],
  //   ["Spherical Uncoated","+100 mesh","",""],
  //   ["Spherical Uncoated","+50 mesh","",""]
  // ]

  // cartesian requires an array so we need to convert the selected filters object into an array of the filters names
  // The array will have the selected filters for each property in this order: category, grade, purity and shipping_route.
  const filtersNameArray = getFiltersNameArray(selectedFilters)
  return cartesian(...filtersNameArray)
}

const getAllFiltersCombinationsServicePro = (selectedFilters) => {
  const filtersNameArray = getFiltersNameArrayServicePro(selectedFilters)
  return cartesian(...filtersNameArray)
}

const getFiltersNameArrayServicePro = (filterObject) => {
  const filtersNameArray = []
  Object.values(filterObject).forEach((value) => {
    if (value.length) {
      filtersNameArray.push(value.map((e) => e.data.name))
    } else {
      filtersNameArray.push([''])
    }
  })

  return filtersNameArray
}

const isProductAllowed = (product, filters) => {
  // Check is the product has all the selected filters
  const productFeatures = [
    product.TypeName,
    product.Size,
    product.Purity,
    product.RegionName,
  ]
  const myFilterArray = filters.filter(Boolean)
  return myFilterArray.every((e) => {
    return productFeatures.includes(e)
  })
}

const isProductAllowedServicePro = (seriesRow, filters) => {
  // Check is the product has all the selected filters
  const productFeatures = [
    ...[seriesRow.category?.name ?? null],
    ...[seriesRow.grade?.name ?? null],
    ...[seriesRow.purity?.name ?? null],
    ...[seriesRow.shippingRoute?.name ?? null],
    ...[seriesRow.feedstock?.name ?? null],
    ...[seriesRow.product?.name ?? null],
  ]
  const myFilterArray = filters.filter(Boolean)
  return myFilterArray.every((e) => {
    return productFeatures.includes(e)
  })
}

const getAllowedProducts = (availableProducts, selectedFilters) => {
  // allow all products by default

  // get possible filter combinations with the selected filters
  const possibleFilterCombinations = getAllFiltersCombinations(selectedFilters)

  return availableProducts.filter((product) => {
    let allow = false

    // for each combination, check if all of it filters are contained in the current product
    // if the product accepts at least one of the possible combinations, the product is allowed
    let i = 0
    while (i < possibleFilterCombinations.length) {
      const filters = possibleFilterCombinations[i]
      if (isProductAllowed(product, filters)) {
        allow = true
        break
      }
      i += 1
    }

    return allow
  })
}

export const getAllowedProductsServicePro = (
  availableProducts,
  selectedFilters,
) => {
  const possibleFilterCombinations =
    getAllFiltersCombinationsServicePro(selectedFilters)
  return availableProducts.filter((product) => {
    let allow = false
    let i = 0

    while (i < possibleFilterCombinations.length) {
      const filters = possibleFilterCombinations[i]
      const isAllowed = isProductAllowedServicePro(product, filters)
      if (isAllowed) {
        allow = true
        break
      }
      i += 1
    }

    return allow
  })
}

const getLevelOptions = (options, level) => {
  const selected = {}
  let currentLvl = 1
  Object.entries(options).forEach(([key, value]) => {
    selected[key] = value
    if (currentLvl >= level) selected[key] = []
    currentLvl += 1
  })
  return selected
}

const getAllowedOptions = (allowedProducts) => {
  const productEnabledOptions = allowedProducts.flatMap((p) => [
    p.TypeName,
    p?.Size,
    p?.Purity,
    p.RegionName,
  ])

  // productEnabledOptions has duplicated values, that's why we use Set() to get unique options only
  return [...new Set(productEnabledOptions)]
}

export const getAllowedOptionsServicePro = (allowedProducts) => {
  const productEnabledOptions = allowedProducts.flatMap((_item) => [
    _item.category?.name,
    _item.grade?.name,
    _item.purity?.name,
    _item.shippingRoute?.name,
    _item.feedstock?.name,
    _item.product?.name,
  ])
  return [...new Set(productEnabledOptions)]
}

/**
 * Decimal adjustment of a number.
 *
 * @param {number}  value The value
 * @param {Integer} decimalDigits Number of decimals to display.
 * @param {String}  type  The type of adjustment: round, ceil and floor.
 */
const decimalFormatter = (value, decimalDigits = 0, type = 'round') => {
  if (typeof decimalDigits === 'undefined' || decimalDigits === 0) {
    return Math[type](value)
  }
  value = +value
  decimalDigits = +(decimalDigits * -1)

  if (isNaN(value) || typeof decimalDigits !== 'number') {
    return NaN
  }

  value = value.toString().split('e')
  value = Math[type](
    +(value[0] + 'e' + (value[1] ? +value[1] - decimalDigits : -decimalDigits)),
  )

  value = value.toString().split('e')
  return +(
    value[0] +
    'e' +
    (value[1] ? +value[1] + decimalDigits : decimalDigits)
  )
}

// get the brother options for options select
const getBrotherOptions = (options) => {
  const selected = []
  Object.entries(options).forEach(([_key, value]) => {
    value.forEach((option) => {
      if (option.brother_ids) {
        selected.push(...option.brother_ids)
      }
    })
  })
  return selected
}

const createDynamicFilter = (
  object,
  level,
  parentLevel,
  parentID,
  filters = {},
) => {
  if (!filters[level]) {
    const key = FILTER_KEY_MAP[level]
    filters[level] = {
      name: level,
      label: key,
      level: parentLevel ? filters[parentLevel].level + 1 : 1,
      checked: false,
      options: [],
    }
  }

  if (object[level]) {
    object[level].forEach((subObject) => {
      let label = subObject.alias || subObject.label
      label =
        typeof LABEL_MAP[label] === 'function'
          ? LABEL_MAP[label](subObject)
          : LABEL_MAP[label] || label

      const optionExist = filters[level].options.find(
        (item) => item.data.name === subObject.label,
      )
      if (optionExist && parentID) {
        optionExist.parent_ids.push(parentID)
      } else {
        filters[level].options.push({
          data: {
            name: subObject.label,
            label,
            isSustainable: subObject.isSustainable,
          },
          checked: false,
          disabled: false,
          parent: parentLevel,
          parent_ids: parentID ? [parentID] : null,
        })
      }

      const nextLevel = subObject.nextLevel
      if (nextLevel) {
        createDynamicFilter(subObject, nextLevel, level, subObject.id, filters)
      }
    })
  }

  return filters
}

const generateCombinations = (node, path = {}, results = []) => {
  if (!node.nextLevel) {
    results.push({ ...path })
    return results
  }

  const nextLevelKey = node.nextLevel
  const levelKey = LEVEL_KEY_MAP[nextLevelKey]

  if (!levelKey) {
    return results
  }

  const nextLevelItems = node[nextLevelKey]

  for (const item of nextLevelItems) {
    const newPath = { ...path, [levelKey]: { name: item.label } }

    generateCombinations(item, newPath, results)
  }

  return results
}

const checkAllPredefinedOptions = (obj, targetNames) => {
  const targetNamesSet = new Set(targetNames)
  Object.values(obj).forEach((entry) => {
    if (entry.options) {
      entry.options.forEach((option) => {
        if (targetNamesSet.has(option.data.label)) {
          option.checked = true
        }
      })
    }
  })
}

const sortOptionsAlphabetically = (obj) => {
  const sortByName = (a, b) => a.data.label.localeCompare(b.data.label)

  Object.values(obj).forEach((entry) => {
    if (entry.options) {
      entry.options.sort(sortByName)
    }
  })

  return obj
}

export {
  decimalFormatter,
  cartesian,
  getAllFiltersCombinations,
  isProductAllowed,
  getAllowedProducts,
  getLevelOptions,
  getAllowedOptions,
  getBrotherOptions,
  createDynamicFilter,
  generateCombinations,
  checkAllPredefinedOptions,
  sortOptionsAlphabetically,
}
