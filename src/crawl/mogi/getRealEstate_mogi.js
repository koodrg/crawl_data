const cheerio = require('cheerio');

const request = require('request-promise');

const fs = require('fs')

const listParams = [
    // {
    //     pathUrl : 'https://mogi.vn/ho-chi-minh/mua-can-ho?cp=',
    //     startPage : 1,
    //     endPage : 737,
    //     category : 'Căn hộ bán',
    //     savePath : '../../data/RealEstateHCM/apartmentForSale_mogi.json'
    // },
    // {
    //     pathUrl : 'https://mogi.vn/ho-chi-minh/mua-nha?cp=',
    //     startPage : 1,
    //     endPage : 500,
    //     category : 'Nhà phố bán',
    //     savePath : '../../data/RealEstateHCM/hometownForSale_mogi.json'
    // },
    // {
    //     pathUrl : 'https://mogi.vn/ho-chi-minh/thue-can-ho-chung-cu?cp=',
    //     startPage : 1,
    //     endPage : 1000,
    //     category : 'Căn hộ cho thuê',
    //     savePath : '../../data/RealEstateHCM/apartmentForRent_mogi.json'
    // },
    {
        pathUrl : 'https://mogi.vn/ho-chi-minh/thue-nha',
        startPage : 1,
        endPage : 1000,
        category : 'Nhà phố cho thuê',
        savePath : '../../data/RealEstateHCM/hometownForRent_mogi.json'
    },
]


const getApartmentForSaleMogi = async () => {
    listParams.forEach(element => {
        let data = []
        for( let i = element.startPage; i <= element.endPage; i++ ) {
            request(element.pathUrl + i, async (error, response, html) => {
                if(!error && response.statusCode == 200) {
                    const $ = cheerio.load(html); // load HTML
                    await $('.property-listing ul.props li').each((index, el) => { 
                        let url = $(el).find('.prop-info a.link-overlay').attr('href');
                        if(url){
                            let category = element.category
                            //console.log(url)
                            request(url, async (error, response, html) => {
                                if(!error && response.statusCode == 200) {
                                    const $ = cheerio.load(html); // load HTML
                                    let imgList = []
                                    await $('img').each(async (index, el) =>{          
                                        if($(el).data().src.toString()) 
                                            imgUrl = $(el).data().src.toString();
                                        else imgUrl = $(el).attr("src").toString();
        
                                        const imgUrlSplit = imgUrl.split(':');
                                        
                                        if(imgUrlSplit[0] == "https") {
                                            imgList.push(imgUrl)
                                        }
                                        
                                    })                        
                                    
                                    await $('.main-info').each(async (index, el) => { 
                                            let address =  $(el).find('.address').text().split(', ')
                                            let ward = address[1]
                                            let district = address[2]
                                            let city = address[3]
                                            let full_address = address.join(", ")
        
                                            let apartment_name = $(el).find('.title h1').text();
                                            //let listImg = []
                                            let area  = $(el).find('.info-attrs div.info-attr:nth-child(1) span:nth-child(2)').text();
                                            let area_split = area.split(' ')
                                            let area_by_num = area_split[0]
                                            
                                            let num_bedroom = $(el).find('.info-attrs div.info-attr:nth-child(2) span:nth-child(2)').text();
                                            let num_wc = $(el).find('.info-attrs div.info-attr:nth-child(3) span:nth-child(2)').text();
                                            let legal = $(el).find('.info-attrs div.info-attr:nth-child(4) span:nth-child(2)').text();
        
                                            let price = $(el).find('.price').text();
                                            let price_split = price.split(' ');
                                            let price_by_num = 0
        
                                            
                                            if(price_split[1]=='tỷ'){
                                                if(price_split.length == 4) {
                                                    if(price_split[2].length == 2)
                                                        price_by_num = price_split[0] + '0' + price_split[2] + '000000'
                                                    if(price_split[2].length == 3)
                                                        price_by_num =  price_split[0] + price_split[2] + '000000'
                                                }
                                                else {
                                                    price_by_num = price_split[0]+'000000000'
                                                }
                                            }
                                        
                                            
                                            if(price_split[0].length == 2 || price_split[1].length ==1){
                                                if(category == "Căn hộ bán"){
                                                    category = "Căn hộ cho thuê"
                                                }
                                                if(category == "Nhà phố bán"){
                                                    category = "Nhà phố cho thuê"
                                                }
                                            }
                                            
                                            if(price_split[1]=='triệu'){
                                                if(price_split.length == 4) {
                                                    if(price_split[2].length == 2)
                                                        price_by_num = price_split[0] + '0' + price_split[2] + '000'
                                                    if(price_split[2].length == 3)
                                                        price_by_num =  price_split[0] + price_split[2] + '000'
                                                }
                                                else {
                                                price_by_num = price_split[0]+ '000000'
                                                }
                                            }
                                            

                                            if(price_split[1]=='triệu'){
                                                if(price_split.length == 4) {
                                                    price_by_num =  price_split[0] + price_split[2] + '000'
                                                }
                                                else {
                                                price_by_num = price_split[0]+ '000000'
                                                }
                                            }
        
                                            let info = []
                                            await $(el).find('.info-content-body').each((index, value) => {
                                                info.push($(value).text())
                                            });
                                            let more_description = info.join('\n')
        
                                            let utilList = []
        
                                            let direction=''
        
                                            console.log({
                                                category,
                                                apartment_name, 
                                                area,
                                                area_by_num, 
                                                direction, 
                                                num_bedroom, 
                                                num_wc, 
                                                full_address,
                                                detail_address:{
                                                    ward: ward, 
                                                    district: district,
                                                    city: city,
                                                },
                                                price, 
                                                price_by_num,
                                                more_description, 
                                                imgList, 
                                                utilList,
                                                legal
                                            })
                                            if(imgList.length !==0){
                                                data.push({
                                                    category,
                                                    apartment_name, 
                                                    area,
                                                    area_by_num, 
                                                    direction, 
                                                    num_bedroom, 
                                                    num_wc, 
                                                    full_address,
                                                    detail_address:{
                                                        ward: ward, 
                                                        district: district,
                                                        city: city,
                    
                                                    },
                                                    price, 
                                                    price_by_num,
                                                    more_description, 
                                                    imgList, 
                                                    utilList,
                                                    legal
                                                })
                                            }
                                        
        
                                        fs.writeFileSync(element.savePath, JSON.stringify(data, null, 10)); 
        
                                    })
        
                                    
                                }
                                else {
                                    console.log(error);
                                }
                            })
                        }
                    })
                }
                else {
                    console.log(error);
                }
            })
        }
    });
}

function isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!  
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
           !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
  }

getApartmentForSaleMogi()

module.exports =  getApartmentForSaleMogi; 
    




