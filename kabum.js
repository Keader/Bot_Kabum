var  request = require('request');
var  cheerio = require('cheerio');
var fs = require('fs');

request('https://www.kabum.com.br/cgi-local/site/listagem/listagem.cgi?string=rtx+2070+super', { encoding: 'binary'} ,  function(err, res, body)
{
    if (err)
        console.log('Error: ' + err);
    else
    {

        const $ = cheerio.load(body);
        var box = $('.H-titulo a');
        box.each(function()
        {
           var titulo = $(this).text();
           var link = $(this).attr('href');
           console.log(titulo + ' ' + link);
        });
    }
});
