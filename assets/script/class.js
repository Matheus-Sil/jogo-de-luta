class Caracter {
    _life = 1;
    attack = 1;
    defense = 0;
    maxLife = 1;

    constructor(name) {
        this.name = name;
    }

    get life() {
        return this._life;
    }

    set life(newLife) {
        this._life = newLife < 0 ? 0 : newLife;
    }

}

class Guerreiro extends Caracter {
    constructor(name) {
        super("Guerreiro");
        this.life = 100;
        this.attack = 15;
        this.defense = 8;
        this.maxLife = this.life
    }
}

class Monstro extends Caracter {
    constructor(name) {
        super("Monstro");
        this.life = 150;
        this.attack = 7;
        this.defense = 6;
        this.maxLife = this.life
    }
}

class Stage {
    constructor(fighter1, fighter2, fighter1El, fighter2El, objectLog) {
        this.fighter1 = fighter1;
        this.fighter2 = fighter2;
        this.fighter1El = fighter1El;
        this.fighter2El = fighter2El;
        this.log = objectLog
    }

    start() {
        this.update();

        this.fighter1El.querySelector('.attack').addEventListener('click', () => this.doAttack(this.fighter1, this.fighter2));
        this.fighter2El.querySelector('.attack').addEventListener('click', () => this.doAttack(this.fighter2, this.fighter1));
    }

    update() {
        //fighter 1
        this.fighter1El.querySelector('.name').innerHTML = `${this.fighter1.name} - ${this.fighter1.life.toFixed(1)} HP`;
        let f1Pct = (this.fighter1.life / this.fighter1.maxLife) * 100;
        this.fighter1El.querySelector('.life').style.width = `${f1Pct}%`;

        //fighter2
        this.fighter2El.querySelector('.name').innerHTML = `${this.fighter2.name} - ${this.fighter2.life.toFixed(1)} HP`;
        let f2Pct = (this.fighter2.life / this.fighter2.maxLife) * 100;
        this.fighter2El.querySelector('.life').style.width = `${f2Pct}%`;
    }

    doAttack(atacante, atacado) {
        if (atacante.life <= 0 || atacado.life <= 0) {
            this.log.addMessage('Game Over!!');
            return;
        }

        let novoAtaque = (Math.random() * 2).toFixed(2);
        let novaDefesa = (Math.random() * 2).toFixed(2);

        let ataqueAtual = atacante.attack * novoAtaque; 
        let defesaAtual = atacante.defense * novaDefesa;

        if (ataqueAtual < defesaAtual) {
            this.log.addMessage(`O ${atacado.name} defendeu!`)
        } else {
            atacado.life -= ataqueAtual
            this.log.addMessage(`O ${atacante.name} tirou ${ataqueAtual.toFixed(1)} de vida do ${atacado.name}`)
        }

        this.update()
    }
}

class Log {
    list = [];

    constructor(listEl) {
        this.listEl = listEl;

    }

    addMessage(msg) {
        this.list.push(msg);
        this.render();
    }

    render() {
        this.listEl.innerHTML = '';

        for(let i in this.list) {
            this.listEl.innerHTML += `<li>${this.list[i]}</li>`
        }
    }
}