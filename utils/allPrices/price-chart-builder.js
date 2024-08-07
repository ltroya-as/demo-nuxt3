import * as pluralize from 'pluralize'
import {
  CHILDREN_NAMES,
  PAYABLE_ID,
  PERCENTAGE_ID,
  OPTION_NAMES,
  IS_SUSTAINABLE,
  KWH_ID,
} from '@/constants/all-prices/chart-builder'

const getChildrenName = (childrenName) => {
  const name =
    CHILDREN_NAMES[childrenName] ||
    childrenName
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase())
  return pluralize.singular(name)
}

const getIsSustainable = (option) => {
  return Object.hasOwn(option, 'isSustainable') ? option.isSustainable : false
}

const getOptionLabel = (option, isSustainable) => {
  const label = option.label
  if (!isSustainable) return OPTION_NAMES[label] || label
  return `${OPTION_NAMES[label] || label}${IS_SUSTAINABLE}`
}

const formatChildren = (level, parent) => {
  return level.map((child) => {
    let children = null
    const isSustainable = getIsSustainable(child)
    const unitOfMeasure = child.unitOfMeasures[0]?.label?.toLowerCase()
    const id = child.label.toLowerCase().replace(/ /g, '_')
    const formattedId = !isSustainable
      ? `${id}_${unitOfMeasure}`
      : `${id}_${unitOfMeasure}_sustainable`
    const name = isSustainable ? `${child.label}${IS_SUSTAINABLE}` : child.label

    if (child.nextLevel) {
      children = {
        options: formatChildren(child[child.nextLevel], formattedId),
        name: child.nextLevel,
        label: getChildrenName(child.nextLevel),
        id: child.nextLevel,
      }
    }

    return {
      id: formattedId,
      name,
      label: getOptionLabel(child, isSustainable),
      isSustainable,
      unitOfMeasure,
      unitOfMeasuresSymbol: child.unitOfMeasures[0]?.symbol,
      isSelected: false,
      isHidden: true,
      children,
      parent,
    }
  })
}

const getLevelOptions = (product) => {
  const levelOptions = product[product.nextLevel]

  if (levelOptions.length === 0) return null

  if (levelOptions.length > 1) {
    const options = formatChildren(levelOptions, product.id).map((option) => ({
      ...option,
      name: option.unitOfMeasuresSymbol,
    }))

    return {
      options,
      id: product.nextLevel,
      name: product.nextLevel,
      label: getChildrenName(product.nextLevel),
    }
  }

  const [firstOption] = levelOptions

  return {
    options: formatChildren(firstOption[firstOption.nextLevel], product.id),
    name: firstOption.nextLevel,
    label: getChildrenName(firstOption.nextLevel),
    id: firstOption.nextLevel,
  }
}

export const formatProduct = (product) => {
  let children = null

  if (product.nextLevel) {
    const {
      options: nextLevelOptions,
      name,
      label,
      id,
    } = getLevelOptions(product)

    const options = nextLevelOptions.map((opt) => ({
      ...opt,
      isHidden: false,
    }))

    children = {
      options,
      name,
      label,
      id,
    }
  }

  return {
    id: product.id,
    isSelected: false,
    name: product.label,
    authorized: product.authorized,
    children,
  }
}

export const formatCurrency = (currency) => ({
  id: currency.id,
  name: currency.iso,
  label: currency.iso,
  isSelected: false,
  readOnly: false,
})

const formatPayable = (unit) => ({
  id: PAYABLE_ID,
  name: unit.label,
  label: `${unit.label} (${unit.symbol})`,
  isSelected: false,
  symbol: unit.symbol,
  readOnly: false,
})

const formatKWH = (unit) => ({
  id: 'kwh',
  name: unit.label,
  label: `${unit.label} (${unit.symbol})`,
  isSelected: false,
  symbol: unit.symbol,
  readOnly: true,
})

export const formatUnit = (unit) => {
  if (unit.id === PERCENTAGE_ID) return formatPayable(unit)
  if (unit.id === KWH_ID) return formatKWH(unit)

  return {
    id: unit.id,
    name: unit.label,
    symbol: unit.symbol,
    label: `${unit.label} (${unit.symbol})`,
    isSelected: false,
    readOnly: false,
  }
}

export const changeHiddenChildrenOptions = (children, isHidden) => {
  if (!children) return null

  const options = children.options.map((option) => {
    const newOption = { ...option, isHidden }

    if (!option.children) return newOption

    const newChildren = changeHiddenChildrenOptions(
      option.children,
      !newOption.isSelected,
    )

    newOption.children = newChildren

    return newOption
  })

  return { ...children, options }
}

export const changeHiddenOptions = (oldOptions, newOptions) => {
  const result = oldOptions.map((option) => {
    const newOption = newOptions.find((item) => item.id === option.id)

    if (!newOption) return option
    if (!option.children) return newOption

    const newChildren = changeHiddenChildrenOptions(
      newOption?.children,
      !newOption.isSelected,
    )

    return { ...newOption, children: newChildren }
  })
  return result
}

export const getAllCombinationsByProduct = (product) => {
  if (!product) return []
  if (!product.config) return []

  const paths = []

  const findPaths = (node, path = []) => {
    if (node.children) {
      path.push(node.id)
      node.children.options.forEach((item) => {
        if (item.isSelected) {
          findPaths(item, path.slice())
        }
      })
    } else {
      const newPath = path.slice()
      newPath.push(node.id)
      paths.push(newPath.join('_'))
    }
  }

  findPaths({ ...product, children: product.config })

  return paths
}
