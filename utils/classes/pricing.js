/**
 * Product
 * @class
 */
class Product {
  /**
   * @param {string} ProductName
   * @param {number} ProductTypeId
   * @param {string} ProductTypeName
   */
  constructor(ProductName, ProductTypeId, ProductTypeName) {
    this.ProductName = ProductName
    this.ProductTypeId = ProductTypeId
    this.ProductTypeName = ProductTypeName
  }
}

/**
 * Series
 * @class
 */
class Series {
  /**
   * @param {string} SeriesDate
   * @param {number} PriceHigh
   * @param {number} PriceLow
   * @param {number} PriceMid
   */
  constructor(SeriesDate, PriceHigh, PriceLow, PriceMid) {
    this.SeriesDate = SeriesDate
    this.PriceHigh = PriceHigh
    this.PriceLow = PriceLow
    this.PriceMid = PriceMid
  }
}

class PayableSeries {
  /**
   * @param {string} SeriesDate
   * @param {number} PayableHigh
   * @param {number} PayableLow
   * @param {number} PayableMid
   */
  constructor(SeriesDate, PayableHigh, PayableLow, PayableMid) {
    this.SeriesDate = SeriesDate
    this.PayableHigh = PayableHigh
    this.PayableLow = PayableLow
    this.PayableMid = PayableMid
  }
}

/**
 * PriceSeries
 * @class
 */
class PriceSeries {
  /**
   * @param {string} DateEnd
   * @param {string} DateStart
   * @param {string} RegionName
   * @param {Product} Product
   * @param {string} Purity
   * @param {string} Size
   * @param {Series[]|PayableSeries[]} Series
   */
  constructor(DateEnd, DateStart, RegionName, Product, Purity, Size, Series) {
    this.DateEnd = DateEnd
    this.DateStart = DateStart
    this.RegionName = RegionName
    this.Product = Product
    this.Purity = Purity
    this.Size = Size
    this.Series = Series
  }
}

/**
 * Series
 * @class
 */
class PricesResponse {
  /**
   * @param {PriceSeries[]} Price
   * @param {PriceSeries[]} Payable
   */
  constructor(Price, Payable) {
    this.Price = Price
    this.Payable = Payable
  }
}

export { PricesResponse, PriceSeries, Product, Series, PayableSeries }
