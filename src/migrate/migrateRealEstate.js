const {Categories, Utilities, RealEstate } = require('../models')

const paths = [
  "../data/RealEstateHCM/apartmentForRent_bds.json",
  "../data/RealEstateHCM/apartmentForRent_mogi.json",
  "../data/RealEstateHCM/apartmentForSale_bds.json",
  "../data/RealEstateHCM/apartmentForSale_mogi.json",
  "../data/RealEstateHCM/hometownForRent_bds.json",
  "../data/RealEstateHCM/hometownForRent_mogi.json",
  "../data/RealEstateHCM/hometownForSale_bds.json",
  "../data/RealEstateHCM/hometownForSale_mogi.json"
]

const MigrateRealEstates = async () => {
  paths.forEach(path => {
    var data = require(path);
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
        try {
          const saveRealEstate = await realEstate.save();
          if (saveRealEstate) console.log(saveRealEstate);
        } catch (error) {
          console.log(error);
        }
      })
  }); 
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

module.exports = MigrateRealEstates