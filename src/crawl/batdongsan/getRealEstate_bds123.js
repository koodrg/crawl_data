const cheerio = require('cheerio');

const request = require('request-promise');

const fs = require('fs');

const listParams = [
    // {
    //     url = 'https://bds123.vn/ban-can-ho-chung-cu-ho-chi-minh.html?page=',
    //     startPage = 1,
    //     endPage = 576,
    //     category = 'Căn hộ bán',
    //     savePath = '../../data/apartmentForSale_bds.json'
    // },
    // {
    //     pathUrl : 'https://bds123.vn/ban-nha-ho-chi-minh.html?page=',
    //     startPage : 1001,
    //     endPage : 1500,
    //     category : 'Nhà phố bán',
    //     savePath : '../../data/RealEstateHCM/hometownForSale_bds.json'
    // },
    {
        pathUrl : 'https://bds123.vn/cho-thue-can-ho-chung-cu-ho-chi-minh.html?page=',
        startPage : 1,
        endPage : 790,
        category : 'Căn hộ cho thuê',
        savePath : '../../data/RealEstateHCM/apartmentForRent_bds.json'
    },
    // {
    //     pathUrl : 'https://bds123.vn/cho-thue-nha-ho-chi-minh.html?page=',
    //     startPage : 1,
    //     endPage : 518,
    //     category : 'Nhà phố cho thuê',
    //     savePath : '../../data/RealEstateHCM/hometownForRent_bds.json'
    // },
]

const getRealEstate = async () => {
    listParams.forEach(element => {
        let data = []
        for( let i = element.startPage; i <= element.endPage; i++ ) {
            request( element.pathUrl + i, async (error, response, html) => {
                if(!error && response.statusCode == 200) {
                    const $ = cheerio.load(html); // load HTML
                    await $('.section-content .post-listing article.item').each((index, el) => { 
                        let url = 'https://bds123.vn' + $(el).find('figure.thumb a').attr('href').toString();
                        //console.log(url)
                        let category = element.category

                        request(url, async  (error, response, html) => {
                            if(!error && response.statusCode == 200) {
                                const $ = cheerio.load(html); // load HTML
                                let imgList = []
                                await $('.swiper-wrapper .swiper-slide').find('img').each(async (index, el) =>{          
                                    imgUrl = $(el).attr('src').toString();
                                    imgList.push(imgUrl);
                                })                   

                                await $('article.the-post').each(async (index, el) => { 
                                        let address =  $(el).find('.post-address').text().split(', ')
                                        console.log(address)
                                        let ward, district, city
                                        if(address.length == 5) {
                                            ward = address[2]
                                            district = address[3]   
                                            city = address[4]
                                        }
                                        if(address.length == 4){
                                            ward = address[1]
                                            district = address[2]
                                            city = address[3]
                                        }
                                        if(address.length == 3){
                                            ward = address[0]
                                            district = address[1]
                                            city = address[2]
                                        }

                                        let full_address = address.join(", ")

                                        let apartment_name = $(el).find('h1.page-h1').text();

                                        let area  = $(el).find('.post-features span.post-acreage').text();
                                        let area_split = area.split(' ')
                                        let area_by_num = area_split[1]
                                        console.log(area_by_num);
                                        let num_bedroom_split = $(el).find('.post-features span.item.post-bedroom').text().split(' ');
                                        let num_bedroom = num_bedroom_split[1]
                                        let num_wc_split = $(el).find('.post-features span.item.post-bathroom').text().split(' ');
                                        let num_wc = num_wc_split[1]
                                        let legal = 'Không xác định'    

                                        let price = $(el).find('.post-features span.item.post-price').text();
                                        let price_split = price.split(' ');
                                        //price = price_split.join(' ');
                                        let price_by_num = 0;

                                        if(price_split[2]== "triệu/m2" ){
                                            price_by_num = area_by_num * price_split[1] * 1000000
                                        }
            
                                        if(price_split[2]=='tỷ'){
                                            price_by_num= price_split[1] * 1000000000;
                                        }

                                        if(price_split[2]=='triệu'){
                                            price_by_num = price_split[1] * 1000000;
                                        }

                                        if(price_split[2]=='triệu/tháng'){
                                            price_by_num = price_split[1] * 1000000;
                                        }

                                        let info = []
                                        await $(el).find('.post-block.post-block-detail p').each((index, value) => {
                                            info.push($(value).text())
                                        });
                                        let more_description = info.join('\n')

                                        let utilList = []

                                        let direction = $(el).find('.post-features span.item.post-direction').text();
                                        
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
                    })
                }
                else {
                    console.log(error);
                }
            })
        }
        //return listUrl

        });
    
}

function isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!  
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
           !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
  }

  getRealEstate()

module.exports =  getRealEstate; 
    




