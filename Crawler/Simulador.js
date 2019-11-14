const KabumCrawler = require('./kabum.js');

var tempoAntes = new Date().getTime();
KabumCrawler('Processador').then(r => {
    var tempoDepois = new Date().getTime();

    console.log('Parse levou ' + (tempoDepois -tempoAntes) + "ms") })
