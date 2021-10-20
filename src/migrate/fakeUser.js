const faker = require("faker");
const fs = require('fs');

const fakeUsers = async () => {
    const data = [];
    for(let i = 0; i < 200; i++){
        let streetAddr = faker.address.streetAddress();
        let secondAddr = faker.address.secondaryAddress();
        let city = faker.address.city();
        let User = {
            name: faker.name.findName(),
            username: faker.internet.email(),
            password: 123456,
            phoneNumber: faker.phone.phoneNumberFormat(),
            address: {
                ward: streetAddr,
                district: secondAddr,
                city: city,
            },
            fullAddress: streetAddr +", "+ secondAddr +", " + city,
            avatarUrl: faker.image.imageUrl()
        };
        console.log(User);
        data.push(User);
    }
    fs.writeFileSync("../data/user.json", JSON.stringify(data, null, 10)); 
}

fakeUsers();

module.exports =  fakeUsers; 