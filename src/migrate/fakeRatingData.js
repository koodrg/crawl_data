const {Rating, User, RealEstate} = require('../models')


const fakeDataRating = async () => {
    try{
        const users = await User.find({});
        //console.log(users)
        users.forEach(async (user) => {
            try{
                const listRE = await RealEstate.aggregate([{$sample: {size: 100}}]);
                listRE.forEach(async (r) => {
                    try{
                        userId = user._id;
                        realEstateId = r._id;
                        if(userId && realEstateId){
                            let rand = between(1,5);
                            const rating = new Rating({
                                userId,
                                realEstateId,
                                rating: rand
                            });
                            const savedRating = await rating.save();
                            console.log(savedRating);
                        }
                    }
                    catch(err){
                        console.log(err);
                    }
                })
                
            }
            catch(err){
                console.log(err);
            }
        })
    }
    catch(err){
        console.log(err)
    }
}

function between(min, max) {  
    return Math.floor(
      Math.random() * (max - min) + min + 1
    )
  }
  

module.exports = fakeDataRating;
