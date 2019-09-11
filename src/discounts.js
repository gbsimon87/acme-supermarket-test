const { isOdd } = require("./utils");

module.exports = {
  buyOneGetOneFree(productCode) {
    return items => {
      const matchingEvenItems = items
        .filter(item => item.productCode === productCode)
        .filter((item, index) => !isOdd(index));

      const nonMatchingItems = items.filter(
        item => item.productCode !== productCode
      );

      return [...matchingEvenItems, ...nonMatchingItems];
    };
  },
  setPriceIfMinItems(productCode, minimumQuantity, newPrice) {
    return items => {
      const matchingProductItems = items.filter(
        item => item.productCode === productCode
      );
      if (matchingProductItems.length >= minimumQuantity) {
        // Remove products with different product codes
        items = items.filter(item => item.productCode !== productCode);

        // For all matching items, return that item with its new price
        const discountedItems = matchingProductItems.map(item => ({
          ...item,
          price: newPrice
        }));

        // Add discounted items to the non matching products items
        items = items.concat(discountedItems);
      }
      return items;
    };
  }
};
