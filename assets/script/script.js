let log = new Log(document.querySelector('.log'));

let guerreiro = new Guerreiro();
let monstro = new Monstro();

const stage = new Stage(
    guerreiro,
    monstro,
    document.querySelector('#guerreiro'),
    document.querySelector('#monstro'),
    log
)

stage.start();