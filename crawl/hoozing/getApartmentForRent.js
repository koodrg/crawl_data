const cheerio = require('cheerio');

const request = require('request-promise');

const fs = require('fs')

const {Categories, Utilities, RealEstate } = require('../../src/models/index')


const getApartmentForRent = async  () => {
    let data = []
    for( let i=1; i< 150; i++ ) {
        
        request('https://hoozing.com/cho-thue/can-ho-ho-chi-minh?view_mode=list&page=' + i, async (error, response, html) => {
        if(!error && response.statusCode == 200) {
            const $ = cheerio.load(html); // load HTML
            
            await $('.apartment-item').each((index, el) => { // lặp từng phần tử có class là job__list-item
                //let apartment = $(el).find('.caption .top-caption .title a').text(); // lấy tên job, được nằm trong thẻ a < .job__list-item-title
                let link = $(el).find('.figure-image .view-detail a').attr('href').toString();
                let url = 'https://hoozing.com' + link

                let category = 'Căn hộ cho thuê'
                //let square, num_bedroom, apartment_name
                let address =  $(el).find('.top-caption .address').text().split(', ')
                let ward = address[0]
                let district = address[1]
                let city = address[2]
                let full_address = address.join(", ")
                
                request(url, (error, response, html) => {
                    if(!error && response.statusCode == 200) {
                        const $ = cheerio.load(html); // load HTML
                        let imgList = []

                        $('.rented-image-slider').each((index, el) =>{
                            let img = $(el).find('.swiper-wrapper .img a.fancy').each((index, value) => {
                                imgList.push($(value).attr('href').toString())
                            })
                        })
                        
                        $('.rented-detail-page').each( (index, el) => { 
                            let apartment_name = $(el).find('.listing-name h1').text();
                            //let listImg = []
                            let area  = $(el).find('ul.list-unstyled li:first span').text();
                            let area_split = area.split(' ')
                            let area_by_num = area_split[0]
                            
                            let num_bedroom = $(el).find('ul.list-unstyled li:nth-child(2) span').text();
                            let direction, num_wc
                            
                            if(isNumeric(num_bedroom)){
                                direction = null
                                num_wc = $(el).find('ul.list-unstyled li:nth-child(3) span').text()
                            }
                            else {
                                direction = num_bedroom
                                num_bedroom = $(el).find('ul.list-unstyled li:nth-child(3) span').text();
                                num_wc = $(el).find('ul.list-unstyled li:nth-child(4) span').text();
                            }

                            let price = $(el).find('.project-utils .rented-price').text();
                            let price_split = price.split(' ');
                            let price_by_num =''

                            // if(price_split[1] ='tỷ') {
                            //     if(price_split[2]='') {
                            //         price_by_num = price_split[0]+'000000000'
                            //     }
                            //     else{
                            //         price_by_num = price_split[0]+price_split[1]+'000000'
                            //     }
                            // }

                            if(price_split[1]=='triệu'){
                                if(price_split.length==3){
                                    let s = price_split[2].split('');
                                    if(s.length==1)
                                        price_by_num = price_split[0]+price_split[2]+'00000'
                                    else if(s.length==2)
                                        price_by_num = price_split[0]+price_split[2]+'0000'
                                    else if(s.length==3)
                                        price_by_num = price_split[0]+price_split[2]+'000'
                                }
                                else {
                                    price_by_num = price_split[0]+'000000'
                                }
                            }


                            let info = []
                            $(el).find('.project-content-expand .content-container p').each((index, value) => {
                                info.push($(value).text())
                            });
                            let more_description = info.join('\n')

                            let utilList = []
                            $(el).find('.project-facility ul li').each((index, value) => {
                                utilList.push($(value).text())
                            })

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
                              utilList
                            })
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
                                utilList
                            })
                            
                        })

                        fs.writeFileSync('apartmentForRent.json', JSON.stringify(data, null , 12)); 
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
}

// function detectUtility(propsName) {
//     return new Promise(async (resolve, reject) => {
//       try {
//         const utility = await Utilities.findOne({ name: propsName });
//         resolve(utility);
//       } catch (err) {
//         console.log(err);
//         reject(err);
//       }
//     });
//   }

//   function detectCategory(propsName) {
//     return new Promise(async (resolve, reject) => {
//       try {
//         const category = await Categories.findOne({ name: propsName })._id;
//         resolve(category);
//       } catch (err) {
//         console.log(err);
//         reject(err);
//       }
//     });
//   }

//   const createUtilitiesList = async (listUtilityType) => {
//     const result = listUtilityType.map(async (type) => {
//       let obj = await detectUtility(type);
//       return obj._id;
//     });
//     return await Promise.all(result);
//   };

function isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!  
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
           !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
  }

getApartmentForRent()

module.exports =  getApartmentForRent; 
    




