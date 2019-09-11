const Basket = require("../src/basket");
const { buyOneGetOneFree, setPriceIfMinItems } = require("../src/discounts");
const products = require("../src/products");

describe("Basket", () => {
  let pricingRules = [];

  describe("a basket without no pricing rules", () => {
    it("should add 1 fruit tea, 1 strawberry, 1 coffee", () => {
      const basket = new Basket(pricingRules);
      basket.add(products.FR1);
      basket.add(products.SR1);
      basket.add(products.CF1);
      const price = basket.total();
      expect(price).toEqual(19.34);
    });
  });

  describe("a basket with pricing rules", () => {
    beforeEach(() => {
      pricingRules = [
        buyOneGetOneFree("FR1"),
        setPriceIfMinItems("SR1", 3, 4.5)
      ];
    });

    it("should add 2 FR1s, 1 SR1, 1 CF1", () => {
      const basket = new Basket(pricingRules);
      basket.add(products.FR1);
      basket.add(products.FR1);
      basket.add(products.SR1);
      basket.add(products.CF1);
      const price = basket.total();
      expect(price).toEqual(19.34);
    });

    it("should add 2 FR1s", () => {
      const basket = new Basket(pricingRules);
      basket.add(products.FR1);
      basket.add(products.FR1);
      const price = basket.total();
      expect(price).toEqual(3.11);
    });

    it("should add 3 SR1s, 1 FR1", () => {
      const basket = new Basket(pricingRules);
      basket.add(products.SR1);
      basket.add(products.SR1);
      basket.add(products.SR1);
      basket.add(products.FR1);
      const price = basket.total();
      expect(price).toEqual(16.61);
    });
  });
});
