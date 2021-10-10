const {Categories, Utilities, RealEstate } = require('../models')

const MigrateRealEstatebds123 = async () => {
  
  data.map(async (apartmentDetail) => {
    let utilitiesList = apartmentDetail.utilList;
    let category = await findCategory(apartmentDetail.category);
    let listUtilities = await createUtilitiesList(utilitiesList);

    let newRealEstate = {
      _id: null,
      id_category: category,
      name: apartmentDetail.apartment_name,
      area: apartmentDetail.area,
      area_by_num: apartmentDetail.area_by_num,
      direction: apartmentDetail.direction,
      num_bedroom: apartmentDetail.num_bedroom,
      num_wc: apartmentDetail.num_wc,
      full_address: apartmentDetail.full_address,
      detail_address: apartmentDetail.detail_address,
      price: apartmentDetail.price,
      price_by_num: apartmentDetail.price_by_num,
      more_description: apartmentDetail.more_description,
      imgList: apartmentDetail.imgList,
      utilsList: listUtilities,
      isConfirmed: true,
      postedBy: null,
      legal:apartmentDetail.legal
    }; 
  
    let realEstate = new RealEstate(newRealEstate)

    //console.log(newRealEstate)
      try {
        const saveRealEstate = await realEstate.save();
        if (saveRealEstate) console.log(saveRealEstate);
      } catch (error) {
        console.log(error);
      }
    })
}


const MigrateApartmentForSale = async () => {
  const { data } = require("../crawl/hoozing/apartmentForSale.json");
  
  data.map(async (apartmentDetail) => {
    let utilitiesList = apartmentDetail.utilList;
    let category = await findCategory(apartmentDetail.category);
    let listUtilities = await createUtilitiesList(utilitiesList);

    let newRealEstate = {
      _id: null,
      id_category: category,
      name: apartmentDetail.apartment_name,
      area: apartmentDetail.area,
      area_by_num: apartmentDetail.area_by_num,
      direction: apartmentDetail.direction,
      num_bedroom: apartmentDetail.num_bedroom,
      num_wc: apartmentDetail.num_wc,
      full_address: apartmentDetail.full_address,
      detail_address: apartmentDetail.detail_address,
      price: apartmentDetail.price,
      price_by_num: apartmentDetail.price_by_num,
      more_description: apartmentDetail.more_description,
      imgList: apartmentDetail.imgList,
      utilsList: listUtilities,
      isConfirmed: true,
      postedBy: null,
      legal:apartmentDetail.legal
    }; 
  
    let realEstate = new RealEstate(newRealEstate)

    //console.log(newRealEstate)
      try {
        const saveRealEstate = await realEstate.save();
        if (saveRealEstate) console.log(saveRealEstate);
      } catch (error) {
        console.log(error);
      }
    })

    //console.log(listUtilities)

}

const MigrateApartmentForRent = async () => {
  const { data } = require("../crawl/hoozing/apartmentForRent.json");
  const category = await findCategory("Căn hộ cho thuê")
  
  data.map(async (apartmentDetail) => {
    let utilitiesList = apartmentDetail.utilList

    let listUtilities = await createUtilitiesList(utilitiesList)


    let newRealEstate = {
      _id: null,
      id_category: category,
      name: apartmentDetail.apartment_name,
      area: apartmentDetail.area,
      area_by_num: apartmentDetail.area_by_num,
      direction: apartmentDetail.direction,
      num_bedroom: apartmentDetail.num_bedroom,
      num_wc: apartmentDetail.num_wc,
      full_address: apartmentDetail.full_address,
      detail_address: apartmentDetail.detail_address,
      price: apartmentDetail.price,
      price_by_num: apartmentDetail.price_by_num,
      more_description: apartmentDetail.more_description,
      imgList: apartmentDetail.imgList,
      utilsList: listUtilities,
      isConfirmed: true,
      postedBy: null,
      legal:apartmentDetail.legal
    }; 
  
    let realEstate = new RealEstate(newRealEstate)

    //console.log(newRealEstate)
      try {
        const saveRealEstate = await realEstate.save();
        if (saveRealEstate) console.log(saveRealEstate);
      } catch (error) {
        console.log(error);
      }
    })

    //console.log(listUtilities)

}

const MigrateHometownForRent = async () => {
  const { data } = require("../crawl/hoozing/hometownForRent.json");
  const category = await findCategory("Nhà phố cho thuê")
  
  data.map(async (apartmentDetail) => {
    let utilitiesList = apartmentDetail.utilList

    let listUtilities = await createUtilitiesList(utilitiesList)


    let newRealEstate = {
      _id: null,
      id_category: category,
      name: apartmentDetail.apartment_name,
      area: apartmentDetail.area,
      area_by_num: apartmentDetail.area_by_num,
      direction: apartmentDetail.direction,
      num_bedroom: apartmentDetail.num_bedroom,
      num_wc: apartmentDetail.num_wc,
      full_address: apartmentDetail.full_address,
      detail_address: apartmentDetail.detail_address,
      price: apartmentDetail.price,
      price_by_num: apartmentDetail.price_by_num,
      more_description: apartmentDetail.more_description,
      imgList: apartmentDetail.imgList,
      utilsList: listUtilities,
      isConfirmed: true,
      postedBy: null,
      legal:apartmentDetail.legal
    }; 
  
    let realEstate = new RealEstate(newRealEstate)

    //console.log(newRealEstate)
      try {
        const saveRealEstate = await realEstate.save();
        if (saveRealEstate) console.log(saveRealEstate);
      } catch (error) {
        console.log(error);
      }
    })
    //console.log(listUtilities)
}

const MigrateHometownForSale = async () => {
  const { data } = require("../crawl/hoozing/hometownForSale.json");
  const category = await findCategory("Nhà phố bán")
  
  data.map(async (apartmentDetail) => {
    let utilitiesList = apartmentDetail.utilList

    let listUtilities = await createUtilitiesList(utilitiesList)


    let newRealEstate = {
      _id: null,
      id_category: category,
      name: apartmentDetail.apartment_name,
      area: apartmentDetail.area,
      area_by_num: apartmentDetail.area_by_num,
      direction: apartmentDetail.direction,
      num_bedroom: apartmentDetail.num_bedroom,
      num_wc: apartmentDetail.num_wc,
      full_address: apartmentDetail.full_address,
      detail_address: apartmentDetail.detail_address,
      price: apartmentDetail.price,
      price_by_num: apartmentDetail.price_by_num,
      more_description: apartmentDetail.more_description,
      imgList: apartmentDetail.imgList,
      utilsList: listUtilities,
      isConfirmed: true,
      postedBy: null,
      legal:apartmentDetail.legal
    }; 
  
    let realEstate = new RealEstate(newRealEstate)

    //console.log(newRealEstate)
      try {
        const saveRealEstate = await realEstate.save();
        if (saveRealEstate) console.log(saveRealEstate);
      } catch (error) {
        console.log(error);
      }
    })
    //console.log(listUtilities)
}

const MigrateHometownForSaleMogi = async () => {
  const { data } = require("../crawl/mogi/homeForSaleMogi.json");
  //const category = await findCategory("Nhà phố bán")
  
  data.map(async (apartmentDetail) => {
    let utilitiesList = apartmentDetail.utilList
    let category =  await findCategory(apartmentDetail.category)
    let listUtilities = await createUtilitiesList(utilitiesList)


    let newRealEstate = {
      _id: null,
      id_category: category,
      name: apartmentDetail.apartment_name,
      area: apartmentDetail.area,
      area_by_num: apartmentDetail.area_by_num,
      direction: apartmentDetail.direction,
      num_bedroom: apartmentDetail.num_bedroom,
      num_wc: apartmentDetail.num_wc,
      full_address: apartmentDetail.full_address,
      detail_address: apartmentDetail.detail_address,
      price: apartmentDetail.price,
      price_by_num: apartmentDetail.price_by_num,
      more_description: apartmentDetail.more_description,
      imgList: apartmentDetail.imgList,
      utilsList: listUtilities,
      isConfirmed: true,
      postedBy: null,
      legal:apartmentDetail.legal
    }; 
  
    let realEstate = new RealEstate(newRealEstate)

    //console.log(newRealEstate)
      try {
        const saveRealEstate = await realEstate.save();
        if (saveRealEstate) console.log(saveRealEstate);
      } catch (error) {
        console.log(error);
      }
    })
    //console.log(listUtilities)
}

const MigrateHometownForRentMogi = async () => {
  const { data } = require("../crawl/mogi/homeForRentMogi.json");
  //const category = await findCategory("Nhà phố bán")
  
  data.map(async (apartmentDetail) => {
    let utilitiesList = apartmentDetail.utilList
    let category =  await findCategory(apartmentDetail.category)
    let listUtilities = await createUtilitiesList(utilitiesList)


    let newRealEstate = {
      _id: null,
      id_category: category,
      name: apartmentDetail.apartment_name,
      area: apartmentDetail.area,
      area_by_num: apartmentDetail.area_by_num,
      direction: apartmentDetail.direction,
      num_bedroom: apartmentDetail.num_bedroom,
      num_wc: apartmentDetail.num_wc,
      full_address: apartmentDetail.full_address,
      detail_address: apartmentDetail.detail_address,
      price: apartmentDetail.price,
      price_by_num: apartmentDetail.price_by_num,
      more_description: apartmentDetail.more_description,
      imgList: apartmentDetail.imgList,
      utilsList: listUtilities,
      isConfirmed: true,
      postedBy: null,
      legal:apartmentDetail.legal
    }; 
  
    let realEstate = new RealEstate(newRealEstate)

    //console.log(newRealEstate)
      try {
        const saveRealEstate = await realEstate.save();
        if (saveRealEstate) console.log(saveRealEstate);
      } catch (error) {
        console.log(error);
      }
    })
    //console.log(listUtilities)
}

const MigrateApartmentForRentMogi = async () => {
  const { data } = require("../crawl/mogi/apartmentForRentMogi.json");
  //const category = await findCategory("Nhà phố bán")
  
  data.map(async (apartmentDetail) => {
    let utilitiesList = apartmentDetail.utilList
    let category =  await findCategory(apartmentDetail.category)
    let listUtilities = await createUtilitiesList(utilitiesList)


    let newRealEstate = {
      _id: null,
      id_category: category,
      name: apartmentDetail.apartment_name,
      area: apartmentDetail.area,
      area_by_num: apartmentDetail.area_by_num,
      direction: apartmentDetail.direction,
      num_bedroom: apartmentDetail.num_bedroom,
      num_wc: apartmentDetail.num_wc,
      full_address: apartmentDetail.full_address,
      detail_address: apartmentDetail.detail_address,
      price: apartmentDetail.price,
      price_by_num: apartmentDetail.price_by_num,
      more_description: apartmentDetail.more_description,
      imgList: apartmentDetail.imgList,
      utilsList: listUtilities,
      isConfirmed: true,
      postedBy: null,
      legal:apartmentDetail.legal
    }; 
  
    let realEstate = new RealEstate(newRealEstate)

    //console.log(newRealEstate)
      try {
        const saveRealEstate = await realEstate.save();
        if (saveRealEstate) console.log(saveRealEstate);
      } catch (error) {
        console.log(error);
      }
    })
    //console.log(listUtilities)
}


const MigrateApartmentForSaleMogi= async () => {
  const { data } = require("../crawl/mogi/apartmentForSaleMogi.json");
  //const category = await findCategory("Nhà phố bán")
  
  data.map(async (apartmentDetail) => {
    let utilitiesList = apartmentDetail.utilList
    let category =  await findCategory(apartmentDetail.category)
    let listUtilities = await createUtilitiesList(utilitiesList)


    let newRealEstate = {
      _id: null,
      id_category: category,
      name: apartmentDetail.apartment_name,
      area: apartmentDetail.area,
      area_by_num: apartmentDetail.area_by_num,
      direction: apartmentDetail.direction,
      num_bedroom: apartmentDetail.num_bedroom,
      num_wc: apartmentDetail.num_wc,
      full_address: apartmentDetail.full_address,
      detail_address: apartmentDetail.detail_address,
      price: apartmentDetail.price,
      price_by_num: apartmentDetail.price_by_num,
      more_description: apartmentDetail.more_description,
      imgList: apartmentDetail.imgList,
      utilsList: listUtilities,
      isConfirmed: true,
      postedBy: null,
      legal:apartmentDetail.legal
    }; 

  
    let realEstate = new RealEstate(newRealEstate)

    //console.log(newRealEstate)
      try {
        const saveRealEstate = await realEstate.save();
        if (saveRealEstate) console.log(saveRealEstate);
      } catch (error) {
        console.log(error);
      }
    })
    //console.log(listUtilities)
}

const MigrateLandForSaleMogi = async () => {
  const { data } = require("../crawl/mogi/landForSaleMogi.json");
  //const category = await findCategory("Nhà phố bán")
  
  data.map(async (apartmentDetail) => {
    let utilitiesList = apartmentDetail.utilList
    let category =  await findCategory(apartmentDetail.category)
    let listUtilities = await createUtilitiesList(utilitiesList)


    let newRealEstate = {
      _id: null,
      id_category: category,
      name: apartmentDetail.apartment_name,
      area: apartmentDetail.area,
      area_by_num: apartmentDetail.area_by_num,
      direction: apartmentDetail.direction,
      num_bedroom: apartmentDetail.num_bedroom,
      num_wc: apartmentDetail.num_wc,
      full_address: apartmentDetail.full_address,
      detail_address: apartmentDetail.detail_address,
      price: apartmentDetail.price,
      price_by_num: apartmentDetail.price_by_num,
      more_description: apartmentDetail.more_description,
      imgList: apartmentDetail.imgList,
      utilsList: listUtilities,
      isConfirmed: true,
      postedBy: null,
      legal:apartmentDetail.legal
    }; 
  
    let realEstate = new RealEstate(newRealEstate)

    //console.log(newRealEstate)
      try {
        const saveRealEstate = await realEstate.save();
        if (saveRealEstate) console.log(saveRealEstate);
      } catch (error) {
        console.log(error);
      }
    })
    //console.log(listUtilities)
}

const MigrateLandForRentMogi = async () => {
  const { data } = require("../crawl/mogi/landForRentMogi.json");
  
  
  data.map(async (apartmentDetail) => {
    let utilitiesList = apartmentDetail.utilList
    const category = await findCategory(apartmentDetail.category)
    let listUtilities = await createUtilitiesList(utilitiesList)

    let newRealEstate = {
      _id: null,
      id_category: category,
      name: apartmentDetail.apartment_name,
      area: apartmentDetail.area,
      area_by_num: apartmentDetail.area_by_num,
      direction: apartmentDetail.direction,
      num_bedroom: apartmentDetail.num_bedroom,
      num_wc: apartmentDetail.num_wc,
      full_address: apartmentDetail.full_address,
      detail_address: apartmentDetail.detail_address,
      price: apartmentDetail.price,
      price_by_num: apartmentDetail.price_by_num,
      more_description: apartmentDetail.more_description,
      imgList: apartmentDetail.imgList,
      utilsList: listUtilities,
      isConfirmed: true,
      postedBy: null,
      legal:apartmentDetail.legal
    }; 
  
    let realEstate = new RealEstate(newRealEstate)

    //console.log(newRealEstate)
      try {
        const saveRealEstate = await realEstate.save();
        if (saveRealEstate) console.log(saveRealEstate);
      } catch (error) {
        console.log(error);
      }
    })
    //console.log(listUtilities)
}


const MigrateHometownForSaleBDS = async () => {
  const { data } = require("../batdongsan/homeForSale_bds123.json");
  //const category = await findCategory("Nhà phố bán")
  
  data.map(async (apartmentDetail) => {
    let utilitiesList = apartmentDetail.utilList
    let category =  await findCategory(apartmentDetail.category)
    let listUtilities = await createUtilitiesList(utilitiesList)


    let newRealEstate = {
      _id: null,
      id_category: category,
      name: apartmentDetail.apartment_name,
      area: apartmentDetail.area,
      area_by_num: apartmentDetail.area_by_num,
      direction: apartmentDetail.direction,
      num_bedroom: apartmentDetail.num_bedroom,
      num_wc: apartmentDetail.num_wc,
      full_address: apartmentDetail.full_address,
      detail_address: apartmentDetail.detail_address,
      price: apartmentDetail.price,
      price_by_num: apartmentDetail.price_by_num,
      more_description: apartmentDetail.more_description,
      imgList: apartmentDetail.imgList,
      utilsList: listUtilities,
      isConfirmed: true,
      postedBy: null,
      legal:apartmentDetail.legal
    }; 
  
    let realEstate = new RealEstate(newRealEstate)

    //console.log(newRealEstate)
      try {
        const saveRealEstate = await realEstate.save();
        if (saveRealEstate) console.log(saveRealEstate);
      } catch (error) {
        console.log(error);
      }
    })
    //console.log(listUtilities)
}

const MigrateHometownForRentBDS = async () => {
  const { data } = require("../batdongsan/homeForRent_bds123.json");
  //const category = await findCategory("Nhà phố bán")
  
  data.map(async (apartmentDetail) => {
    let utilitiesList = apartmentDetail.utilList
    let category =  await findCategory(apartmentDetail.category)
    let listUtilities = await createUtilitiesList(utilitiesList)


    let newRealEstate = {
      _id: null,
      id_category: category,
      name: apartmentDetail.apartment_name,
      area: apartmentDetail.area,
      area_by_num: apartmentDetail.area_by_num,
      direction: apartmentDetail.direction,
      num_bedroom: apartmentDetail.num_bedroom,
      num_wc: apartmentDetail.num_wc,
      full_address: apartmentDetail.full_address,
      detail_address: apartmentDetail.detail_address,
      price: apartmentDetail.price,
      price_by_num: apartmentDetail.price_by_num,
      more_description: apartmentDetail.more_description,
      imgList: apartmentDetail.imgList,
      utilsList: listUtilities,
      isConfirmed: true,
      postedBy: null,
      legal:apartmentDetail.legal
    }; 
  
    let realEstate = new RealEstate(newRealEstate)

    //console.log(newRealEstate)
      try {
        const saveRealEstate = await realEstate.save();
        if (saveRealEstate) console.log(saveRealEstate);
      } catch (error) {
        console.log(error);
      }
    })
    //console.log(listUtilities)
}

const MigrateApartmentForRentBDS = async () => {
  const { data } = require("../batdongsan/apartmentForRent_bds123.json");
  //const category = await findCategory("Nhà phố bán")
  
  data.map(async (apartmentDetail) => {
    let utilitiesList = apartmentDetail.utilList
    let category =  await findCategory(apartmentDetail.category)
    let listUtilities = await createUtilitiesList(utilitiesList)


    let newRealEstate = {
      _id: null,
      id_category: category,
      name: apartmentDetail.apartment_name,
      area: apartmentDetail.area,
      area_by_num: apartmentDetail.area_by_num,
      direction: apartmentDetail.direction,
      num_bedroom: apartmentDetail.num_bedroom,
      num_wc: apartmentDetail.num_wc,
      full_address: apartmentDetail.full_address,
      detail_address: apartmentDetail.detail_address,
      price: apartmentDetail.price,
      price_by_num: apartmentDetail.price_by_num,
      more_description: apartmentDetail.more_description,
      imgList: apartmentDetail.imgList,
      utilsList: listUtilities,
      isConfirmed: true,
      postedBy: null,
      legal:apartmentDetail.legal
    }; 
  
    let realEstate = new RealEstate(newRealEstate)

    //console.log(newRealEstate)
      try {
        const saveRealEstate = await realEstate.save();
        if (saveRealEstate) console.log(saveRealEstate);
      } catch (error) {
        console.log(error);
      }
    })
    //console.log(listUtilities)
}


const MigrateApartmentForSaleBDS = async () => {
  const { data } = require("../batdongsan/apartmentForSale_bds123.json");
  //const category = await findCategory("Nhà phố bán")
  
  data.map(async (apartmentDetail) => {
    let utilitiesList = apartmentDetail.utilList
    let category =  await findCategory(apartmentDetail.category)
    let listUtilities = await createUtilitiesList(utilitiesList)


    let newRealEstate = {
      _id: null,
      id_category: category,
      name: apartmentDetail.apartment_name,
      area: apartmentDetail.area,
      area_by_num: apartmentDetail.area_by_num,
      direction: apartmentDetail.direction,
      num_bedroom: apartmentDetail.num_bedroom,
      num_wc: apartmentDetail.num_wc,
      full_address: apartmentDetail.full_address,
      detail_address: apartmentDetail.detail_address,
      price: apartmentDetail.price,
      price_by_num: apartmentDetail.price_by_num,
      more_description: apartmentDetail.more_description,
      imgList: apartmentDetail.imgList,
      utilsList: listUtilities,
      isConfirmed: true,
      postedBy: null,
      legal:apartmentDetail.legal
    }; 

  
    let realEstate = new RealEstate(newRealEstate)

    //console.log(newRealEstate)
      try {
        const saveRealEstate = await realEstate.save();
        if (saveRealEstate) console.log(saveRealEstate);
      } catch (error) {
        console.log(error);
      }
    })
    //console.log(listUtilities)
}

const MigrateLandForSaleBDS = async () => {
  const { data } = require("../batdongsan/landForSale_bds123.json");
  //const category = await findCategory("Nhà phố bán")
  
  data.map(async (apartmentDetail) => {
    let utilitiesList = apartmentDetail.utilList
    let category =  await findCategory(apartmentDetail.category)
    let listUtilities = await createUtilitiesList(utilitiesList)


    let newRealEstate = {
      _id: null,
      id_category: category,
      name: apartmentDetail.apartment_name,
      area: apartmentDetail.area,
      area_by_num: apartmentDetail.area_by_num,
      direction: apartmentDetail.direction,
      num_bedroom: apartmentDetail.num_bedroom,
      num_wc: apartmentDetail.num_wc,
      full_address: apartmentDetail.full_address,
      detail_address: apartmentDetail.detail_address,
      price: apartmentDetail.price,
      price_by_num: apartmentDetail.price_by_num,
      more_description: apartmentDetail.more_description,
      imgList: apartmentDetail.imgList,
      utilsList: listUtilities,
      isConfirmed: true,
      postedBy: null,
      legal:apartmentDetail.legal
    }; 
  
    let realEstate = new RealEstate(newRealEstate)

    //console.log(newRealEstate)
      try {
        const saveRealEstate = await realEstate.save();
        if (saveRealEstate) console.log(saveRealEstate);
      } catch (error) {
        console.log(error);
      }
    })
    //console.log(listUtilities)
}

const MigrateLandForRentBDS = async () => {
  const { data } = require("../batdongsan/landForRent_bds123.json");
  
  
  data.map(async (apartmentDetail) => {
    let utilitiesList = apartmentDetail.utilList
    const category = await findCategory(apartmentDetail.category)
    let listUtilities = await createUtilitiesList(utilitiesList)

    let newRealEstate = {
      _id: null,
      id_category: category,
      name: apartmentDetail.apartment_name,
      area: apartmentDetail.area,
      area_by_num: apartmentDetail.area_by_num,
      direction: apartmentDetail.direction,
      num_bedroom: apartmentDetail.num_bedroom,
      num_wc: apartmentDetail.num_wc,
      full_address: apartmentDetail.full_address,
      detail_address: apartmentDetail.detail_address,
      price: apartmentDetail.price,
      price_by_num: apartmentDetail.price_by_num,
      more_description: apartmentDetail.more_description,
      imgList: apartmentDetail.imgList,
      utilsList: listUtilities,
      isConfirmed: true,
      postedBy: null,
      legal:apartmentDetail.legal
    }; 
  
    let realEstate = new RealEstate(newRealEstate)

    //console.log(newRealEstate)
      try {
        const saveRealEstate = await realEstate.save();
        if (saveRealEstate) console.log(saveRealEstate);
      } catch (error) {
        console.log(error);
      }
    })
    //console.log(listUtilities)
}

const findCategory = async (cateName) => {
  try {
    const category = await Categories.findOne({ cate_name: cateName });
    return category._id
  } catch(err){
    console.log(err)
  }
}

const detectUtility = async (utilName) => {
      try {
        const utility = await Utilities.findOne({ name: utilName });
        return utility._id
      } catch (err) {
        console.log(err);
      }
}

const createUtilitiesList = async (listUtilitiesName) => {
    const result = listUtilitiesName.map(async (name) => {
      const obj = await detectUtility(name)
      return obj._id;
    });
    return await Promise.all(result);
    //return result
  };

function MigrateRealEstate(){
    // MigrateApartmentForSale()
    // MigrateApartmentForRent()
    // MigrateHometownForRent()
    // MigrateHometownForSale()
    // MigrateApartmentForRentMogi()
    // MigrateApartmentForSaleMogi()
    // MigrateLandForSaleMogi()
    // MigrateLandForRentMogi()
    // MigrateHometownForRentMogi()
    // MigrateHometownForSaleMogi()
    MigrateApartmentForRentBDS()
    MigrateApartmentForSaleBDS()
    MigrateLandForSaleBDS()
    MigrateLandForRentBDS()
    MigrateHometownForRentBDS()
    MigrateHometownForSaleBDS()
}


//MigrateRealEstate()

module.exports = MigrateRealEstate