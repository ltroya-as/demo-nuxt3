import uniqWith from 'lodash/uniqWith'
import { changeHiddenChildrenOptions } from '~/utils/allPrices/price-chart-builder'
import {
  IS_SUSTAINABLE,
  KWH_TYPE,
  PAYABLE_TYPE,
  PRODUCTS_WITH_SUSTAINABLE,
} from '~/constants/all-prices/chart-builder'

const getCanSelectedAll = (config, selectedUnits) => {
  if (!config) return

  const currentConfigUnits = config.options
    .map(({ unitOfMeasure }) => unitOfMeasure)
    .flat()
  const allUnits = new Set([...currentConfigUnits, ...selectedUnits])

  const canSelectAll = allUnits.size <= 2

  return { ...config, canSelectAll }
}

export const validUnitsByProductConfig = (config, selectedUnits) => {
  const getConfigWithDisableOptions = (config) => {
    if (!config) return

    const options = config.options.map((opt) => {
      const isDisabled = new Set([opt.unitOfMeasure, ...selectedUnits]).size > 2

      if (!opt.children) return { ...opt, isDisabled }

      const children = getConfigWithDisableOptions(opt.children)

      return { ...opt, isDisabled, children }
    })

    return { ...config, options }
  }

  const newConfig = getConfigWithDisableOptions(config)

  return getCanSelectedAll(newConfig, selectedUnits)
}

export const isValidConfig = (config) => {
  if (!config) return false

  const validateOptions = (options) => {
    const validOptions = options
      .filter((item) => item.isSelected)
      .map((option) => {
        if (!option.children) return true
        const validChildren = validateOptions(option.children.options)
        return validChildren
      })

    return validOptions.length > 0 && validOptions.some((item) => item)
  }

  return validateOptions(config.options)
}

const getParamsByConfigWithSustainable = (config) => {
  const params = {}

  const flattenParams = (level) => {
    if (!level) return
    params[level.id] = params[level.id] || []

    level.options
      .filter((option) => option.isSelected)
      .forEach((option) => {
        let paramsArray = []

        if (level.id === 'categories') {
          const name = option.name.replace(IS_SUSTAINABLE, '')

          const newElement = option.isSustainable
            ? { name, isSustainable: option.isSustainable }
            : { name }

          paramsArray = uniqWith(
            [...params[level.id], newElement],
            (element, prev) =>
              element.name === prev.name &&
              element.isSustainable === prev.isSustainable,
          )
        } else {
          paramsArray = [...new Set([...params[level.id], option.name])]
        }

        params[level.id] = paramsArray
        if (option.children) {
          flattenParams(option.children)
        }
      })
  }

  flattenParams(config)

  return params
}

const getParamsByConfig = (config) => {
  const params = {}

  const flattenParams = (level) => {
    if (!level) return
    params[level.id] = params[level.id] || []

    level.options
      .filter((option) => option.isSelected)
      .forEach((option) => {
        const paramsArray = [...params[level.id], option.name]
        params[level.id] = [...new Set(paramsArray)]
        if (option.children) {
          flattenParams(option.children)
        }
      })
  }

  flattenParams(config)

  return params
}

export const formatBuilderProduct = ({ name, id, config }) => {
  const getParams = PRODUCTS_WITH_SUSTAINABLE.includes(id)
    ? getParamsByConfigWithSustainable
    : getParamsByConfig

  return {
    id,
    product: name,
    params: getParams(config),
  }
}

const getUnitsByProductConfig = (config) => {
  if (!config) return []

  const types = []

  const getSelectedTypes = (config) => {
    if (!config) return

    return config.options
      .filter((option) => option.isSelected)
      .map((opt) => {
        types.push(opt.unitOfMeasure)
        return getSelectedTypes(opt.children)
      })
  }

  getSelectedTypes(config)

  return [...new Set(types)]
}

export const getSelectedUnits = (products) => {
  const units = []

  products.forEach((product) => {
    const unitOfMeasures = getUnitsByProductConfig(product.config)
    units.push(...unitOfMeasures)
  })

  return [...new Set(units)]
}

const loadProductConfig = (currentConfig, params, parent = null) => {
  if (!currentConfig) return

  if (!params) return currentConfig

  let param = params[currentConfig.id]

  if (!param) return currentConfig

  param = param.map((item) => {
    if (typeof item === 'object') {
      return item.isSustainable ? `${item.name}${IS_SUSTAINABLE}` : item.name
    }
    return item
  })

  const options = currentConfig.options.map((option) => {
    const isSelected = param.includes(option.name) && option.parent === parent

    if (option.children) {
      const selectedParent = isSelected ? option.id : null
      const children = loadProductConfig(
        option.children,
        params,
        selectedParent,
      )
      const newChildren = changeHiddenChildrenOptions(children, !isSelected)
      return { ...option, isSelected, children: newChildren }
    }

    return { ...option, isSelected }
  })

  return { ...currentConfig, options }
}

export const loadProductsByBuilder = (products, builderProducts) => {
  return products
    .filter((product) => builderProducts.map((p) => p.id).includes(product.id))
    .map((product) => {
      const params = builderProducts.find((p) => p.id === product.id)?.params
      const config = loadProductConfig(product.children, params, product.id)

      return {
        key: crypto.randomUUID(),
        id: product.id,
        name: product.name,
        completed: true,
        config,
        valid: true,
      }
    })
}

export const getUnitsWithPayable = ({ units, selectedUnits }) => {
  const hasPayable = selectedUnits.includes(PAYABLE_TYPE.id)
  const unitsWithoutPayable = units.filter(
    (unit) => unit.id !== PAYABLE_TYPE.id,
  )

  if (!hasPayable) return unitsWithoutPayable

  const newUnit = { ...PAYABLE_TYPE, isSelected: true, readOnly: true }

  return [newUnit, ...unitsWithoutPayable]
}

export const getUnitsWithKWH = ({ units, selectedUnits }) => {
  const hasKWH = selectedUnits.includes(KWH_TYPE.id)
  const unitsWithoutKWH = units.filter((unit) => unit.id !== KWH_TYPE.id)

  if (!hasKWH) return unitsWithoutKWH

  const newUnit = { ...KWH_TYPE, isSelected: true, readOnly: true }

  return [newUnit, ...unitsWithoutKWH]
}

export const getCatalogWithBlockedProducts = (product, selectedUnits) => {
  if (!product?.children?.options?.length) return product
  if (!selectedUnits.length) return product

  const childrenOptions = product.children.options
  let isDisabled = false
  let unitOfMeasures = childrenOptions.map((option) => option.unitOfMeasure)
  unitOfMeasures = [...new Set(unitOfMeasures)]

  if (selectedUnits.length <= 1) return { ...product, isDisabled }

  isDisabled =
    selectedUnits.filter((unit) => unitOfMeasures.includes(unit)).length === 0
  return { ...product, isDisabled }
}
