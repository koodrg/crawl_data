const { User } = require('../models');
const bcrypt = require("bcryptjs")

const MigrateUsers = () => {
    const { users } = require("../data/user.json");
    users.map(async (user) => {
        try{
            const hashedPassword = await bcrypt.hash(user.password +"",12);
            console.log(hashedPassword)
            const u = new User({
                username: user.username,
                name: user.name,
                password: hashedPassword,
                phoneNumber: user.phoneNumber,
                address: user.address,
                fullAddress: user.fullAddress
            });
            const saveUser = await u.save();
            console.log(saveUser);
        }
        catch (err) {
          console.log(err);
        }
    })
}

module.exports = MigrateUsers;
