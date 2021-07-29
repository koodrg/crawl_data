const mongoose = require('mongoose')
const RealEstate = require('./RealEstate')

const User = mongoose.Schema(
    {
        username:{
            type: String,
            required: true
        },
        name:{
            type: String,
            required: true
        },
        password:{
            type: String,
            required: true
        },
        // listRealEstateLiked: [{
        //     type: mongoose.SchemaTypes.ObjectId,
        //     ref: RealEstate,
        // }],

    },
    {
        timestamps: {
            createdAt: "created_date",
            updatedAt: "updated_date",
        },
    }
)

module.exports = mongoose.model('user', User)