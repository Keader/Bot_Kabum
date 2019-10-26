var  request = require('request');
var  cheerio = require('cheerio');
var fs = require('fs');
var utf8 = require('utf8');

request('https://www.kabum.com.br/cgi-local/site/listagem/listagem.cgi?string=rtx+2070+super', function(err, res, body)
{
    if (err)
        console.log('Error: ' + err);
    else
    {

        const $ = cheerio.load(body, { decodeEntities: false });
        $('.box_page').each(function()
        {
           var titulo = $(this).find('.H-titulo a').text().trim();

            fs.appendFile('kabum.txt', titulo + '\r\n','utf8', (err) => {
                if (err) throw err;
                console.log('The "data to append" was appended to file!');
            });
        });
    }
});
