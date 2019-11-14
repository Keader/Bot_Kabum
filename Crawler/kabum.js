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

    const $ = cheerio.load(body.data);

    $('.listagem-box').each(function()
    {
        // Search by Title and Link stuffs
        const titleBlock = $(this).find('.H-titulo a');
        const title = titleBlock.text();
        const link = titleBlock.attr('href');
        console.log(title + ' : ' + link + '\n');

        // Search Price (with 15% discount)
        const priceFull = $(this).find('.listagem-preco').text();
        console.log('Preço: ' + priceFull + '\n');

        // Check if is available.
        const image = $(this).find('.listagem-bots').find('img').attr('src');
        const available = !image.includes('comprar_off');
        console.log(available ? 'Produto está disponível !\n' : 'Produto está Indisponível ! \n');

        //Todo: Need parse all links, to check if has promotion or not.

    });

    return body.data
}

/*
request(url, { encoding: 'binary'} ,  function(err, res, body)
{
    if (err)
        console.log('Error: ' + err);
    else
    {

        const $ = cheerio.load(body);
        $('.listagem-box').each(function()
        {
            // Search by Title and Link stuffs
            const titleBlock = $(this).find('.H-titulo a');
            const title = titleBlock.text();
            const link = titleBlock.attr('href');
            console.log(title + ' : ' + link + '\n');

            // Search Price (with 15% discount)
            const priceFull = $(this).find('.listagem-preco').text();
            console.log('Preço: ' + priceFull + '\n');

            // Check if is available.
            const image = $(this).find('.listagem-bots').find('img').attr('src');
            const available = !image.includes('comprar_off');
            console.log(available ? 'Produto está disponível !\n' : 'Produto está Indisponível ! \n');

            //Todo: Need parse all links, to check if has promotion or not.

        });
    }
});
*/