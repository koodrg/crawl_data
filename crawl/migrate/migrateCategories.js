const { Categories } = require('../../src/models');

function MigrateCategory() {
  const { categories } = require("../RealEstateCategories.json");
  
  categories.map(async (category) => {
    const { cate_name, cate_type } = category;
    const cate = new Categories({
      cate_name,
      cate_type,
    });
    try {
      const saveCate = await cate.save();
      if (saveCate) console.log(saveCate);
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
}

module.exports = MigrateCategory;
