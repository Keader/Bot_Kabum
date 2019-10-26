const  request = require('request');
const  cheerio = require('cheerio');

request('https://www.kabum.com.br/cgi-local/site/listagem/listagem.cgi?string=rtx+2070+super', { encoding: 'binary'} ,  function(err, res, body)
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

            //Todo: Need check parse all link pages, to check if has promotion or not.

        });
    }
});
