module.exports = class Basket {
  constructor(pricingRules) {
    this.pricingRules = pricingRules;
    this.items = [];
  }

  add(item) {
    this.items.push(item);
  }

  calculatePrice(acc, item) {
    return acc + item.price;
  }

  total() {
    return this.pricingRules
      ? this.pricingRules
          .reduce((acc, reducer) => reducer(acc), this.items)
          .reduce(this.calculatePrice, 0)
      : this.items.reduce(this.calculatePrice, 0);
  }
};
