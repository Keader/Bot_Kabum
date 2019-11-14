const axios = require('axios');
const cheerio = require('cheerio');
const iconv = require('iconv-lite');

const url = 'https://www.kabum.com.br/cgi-local/site/listagem/listagem.cgi?ordem=5&limite=100&pagina=1&string=';

axios.interceptors.response.use((response) => {
    const content = response.headers["content-type"];
    if (content.includes("charset=ISO-8859-1"))
        response.data = iconv.decode(response.data, 'ISO-8859-1');
    return response;
});

module.exports = async function GetProducts(productName) {
    const body = await axios.get(url + productName, { responseType: 'arraybuffer' })

    const $ = cheerio.load(body.data)

    $('.listagem-box').each(function()
    {
        // Search by Title and Link
        const titleBlock = $(this).find('.H-titulo a')
        const title = titleBlock.text()
        const link = titleBlock.attr('href')
        console.log(title + ' : ' + link + '\n')

        // Search Price (with 15% discount)
        const priceFull = $(this).find('.listagem-preco').text()
        console.log('Preço: ' + priceFull + '\n')

        // Check if is available.
        const image = $(this).find('.listagem-bots').find('img').attr('src')
        const available = !image.includes('comprar_off')
        console.log(available ? 'Produto está disponível !\n' : 'Produto está Indisponível ! \n')

        let promotion = CheckIfHasPromotion(link)
        if (promotion)
            console.log('Produto em promoção !' + '\n')

    });
    return body.data
}

function CheckIfHasPromotion(url) {

    axios.get(url, { responseType: 'arraybuffer' }).then(body => {
        const $ = cheerio.load(body.data)
        // Check if product has countdown
        const countdown = $('.box_comprar-cm').find('.contTEXTO').text()
        return countdown != '' ? true : false
    }).catch(exception => { return false })
}