const { Utilities } = require('../../src/models');

function MigrateUtils() {
  const {data} = require("../Utilities.json");
  
  data.map(async (utility) => {
    const { name, type } = utility;
    const util = new Utilities({
      name,
      type,
    });
    try {
      const saveUtil = await util.save();
      if (saveUtil) console.log(saveUtil);
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
}

module.exports = MigrateUtils;
