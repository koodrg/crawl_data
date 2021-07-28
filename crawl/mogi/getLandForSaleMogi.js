const cheerio = require('cheerio');

const request = require('request-promise');

const fs = require('fs')

// const {Categories, Utilities, RealEstate } = require('../../src/models/index')


const getLandForSaleMogi = async () => {
    let data = []
    for( let i=1001; i<= 1133; i++ ) {
        request('https://mogi.vn/mua-dat?cp=' + i, async (error, response, html) => {
            if(!error && response.statusCode == 200) {
                const $ = cheerio.load(html); // load HTML
                await $('ul.props li').each((index, el) => { 
                    let url = $(el).find('.prop-info a.link-overlay').attr('href').toString();
                    let category = 'Đất mặt bằng bán'
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
                                    
                                    let num_bedroom = '0'
                                    let num_wc = '0';
                                    let legal = Math.floor(Math.random() * 2) == 1 ? "Sổ đỏ" : "Sổ hồng"

                                    let price = $(el).find('.price').text();
                                    let price_split = price.split(' ');
                                    let price_by_num = 0

                                    
                                    if(price_split[1]=='tỷ'){
                                        if(price_split.length == 4){
                                            // if(s.length==1)
                                            //     price_by_num = price_split[0]+price_split[2]+'00000000'
                                            // else if(s.length==2)
                                            //     price_by_num = price_split[0]+price_split[2]+'0000000'
                                            // else if(s.length==3)
                                            //     price_by_num = price_split[0]+price_split[2]+'000000'
                                            price_by_num =  price_split[0] + price_split[2] + '000000'
                                            
                                        }
                                        else {
                                            price_by_num = price_split[0]+'000000000'
                                        }
                                    }

                                    if(price_split[1]=='triệu'){
                                        price_by_num = price_split[0]+ '000000'
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
                                

                                fs.writeFileSync('landForSaleMogi_1.json', JSON.stringify(data, null, 10)); 

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
            }``
        })
    }
    //return listUrl

}

function isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!  
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
           !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
  }

  function isDate(s) {
    if(isNaN(s) && !isNaN(Date.parse(s)))
        return true;
    else return false;
}

  getLandForSaleMogi()

module.exports =  getLandForSaleMogi; 
    




