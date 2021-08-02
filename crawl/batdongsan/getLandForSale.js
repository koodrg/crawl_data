const cheerio = require('cheerio');

const request = require('request-promise');

const fs = require('fs');

const getApartmentForSale = async () => {
    let data = []
    for( let i=1; i<= 603; i++ ) {
        request('https://bds123.vn/ban-dat-nen-du-an.html?page=' + i, async (error, response, html) => {
            if(!error && response.statusCode == 200) {
                const $ = cheerio.load(html); // load HTML
                await $('.section-content section.post-listing article.item').each((index, el) => { 
                    let url = 'https://bds123.vn' + $(el).find('figure.thumb a').attr('href').toString();
                    //console.log(url)
                    let category = 'Đất mặt bằng bán'

                    request(url, async  (error, response, html) => {
                        if(!error && response.statusCode == 200) {
                            const $ = cheerio.load(html); // load HTML
                            let imgList = []
                            await $('.swiper-wrapper .swiper-slide').find('img').each(async (index, el) =>{          
                                imgUrl = $(el).attr("src").toString();
                                imgList.push(imgUrl);
                            })      
                            //console.log(imgList)                  

                            await $('.leftCol article.the-post-detail').each(async (index, el) => { 
                                    let address =  $(el).find('p.post-address').text().split(', ')
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
                                    if(address.length == 2){
                                        district = address[0]
                                        city = address[1]
                                    }

                                    let full_address = address.join(", ")
                                    //console.log(ward, district, city, full_address)

                                    let apartment_name = $(el).find('h1.post-h1').text();

                                    let area  = $(el).find('.post-attributes .item.acreage span').text();
                                    let area_split = area.split(' ')
                                    let area_by_num = area_split[1]
                                    
                                    //let num_bedroom_split = $(el).find('.post-attributes .item.bedroom span').text().split(' ');
                                    let num_bedroom = 0
                                    //let num_wc_split = $(el).find('.post-attributes .item.bathroom span').text().split(' ');
                                    let num_wc = 0
                                    let legal = 'Không xác định'

                                    let price = $(el).find('.post-attributes .item.price span').text();
                                    let price_split = price.split(' ');
                                    //price = price_split.join(' ');
                                    let price_by_num = 0;


                                    if(price_split[1]== "tỷ" ){
                                        price_by_num = area_by_num * price_split[0] * 1000000000
                                    }

                                    
                                    if(price_split[1]== "triệu/m2" ){
                                        price_by_num = area_by_num * price_split[0] * 1000000
                                    }

                                    if(price_split[1]=='triệu'){
                                        price_by_num = price_split[0] * 1000000;
                                    }

                                    let info = []
                                    await $(el).find('.post-block .post-block-content .post-description p').each((index, value) => {
                                        info.push($(value).text())
                                    });
                                    let more_description = info.join('\n')

                                    let utilList = []

                                    //let direction= $(el).find('.post-attributes .item.direction span').text() || '';

                                    let direction ='';
                                    
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
                                    if(imgList.length !==0 || price_by_num != 0 ){
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
                                

                                fs.writeFileSync('landForSale_bds123_1.json', JSON.stringify(data, null, 10)); 

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

}

function isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!  
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
           !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
  }

getApartmentForSale()

module.exports =  getApartmentForSale; 
    




