const axios = require('axios');
const cheerio = require('cheerio');
const iconv = require('iconv-lite');

const url = 'https://www.kabum.com.br/cgi-local/site/listagem/listagem.cgi?ordem=5&limite=100&pagina=1&string=';

// Convert response of Axios to ISO-8859-1
axios.interceptors.response.use((response) => {
    const content = response.headers["content-type"];
    if (content.includes("charset=ISO-8859-1"))
        response.data = iconv.decode(response.data, 'ISO-8859-1');
    return response;
});

// Get a list of products with specific name
module.exports = async function GetProducts(productName) {
    const body = await axios.get(url + productName, { responseType: 'arraybuffer' })

    const $ = cheerio.load(body.data)
    const offers = $('.listagem-box')

    for (let i = 0; i < offers.length; i++){
        // Search by Title and Link
        const titleBlock = $(offers[i]).find('.H-titulo a')
        const title = titleBlock.text()
        const link = titleBlock.attr('href')

        // Check if has promotion
        if (await CheckIfHasPromotion(link))
            console.log('[PROMOÇÃO] '+ title + ' : ' + link + '\n')
        else
            console.log(title + ' : ' + link + '\n')

        // Search Price (with 15% discount)
        const priceFull = $(offers[i]).find('.listagem-preco').text()
        console.log('Preço: ' + priceFull + '\n')

        // Check if is available.
        const image = $(offers[i]).find('.listagem-bots').find('img').attr('src')
        const available = !image.includes('comprar_off')
        console.log(available ? 'Produto está disponível !\n' : 'Produto está Indisponível ! \n')
    }

    return body.data
}

async function CheckIfHasPromotion(url) {
    const body = await axios.get(url, { responseType: 'arraybuffer' })
    const $ = cheerio.load(body.data)
    // Check if product has countdown
    const countdown = $('.box_comprar-cm').find('.contTEXTO').text()
    return countdown ? true : false
}