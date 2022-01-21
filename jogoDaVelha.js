//Boolean que diz se a partida foi iniciada
let iniciouPartida = false;
//Vetor de booleans que diz se a n-ésima posição do vetor 'casas' tem alguma peça
let temPeca = [false, false, false, false, false, false, false, false, false];
// Char que guarda o caractere do jogador atual ('X' ou 'O')
let jogAtual;
// Int que guarda a quantidade de casas ocupadas.
let casasOcupadas = 0;
//Vetor de buttons contendo as 9 casas do tabuleiro
let casas = document.getElementsByName("botaoCasa");

//Verifica se uma casa está ocupada
function casaEstahOcupada(indiceCasa) {
    return (casas[indiceCasa].textContent !== "." && temPeca[indiceCasa]);
}

//Configura a tela para o início de jogo
function iniciarPartida(jogClicado) {
    //Reseta os vetores 'casas' e 'temPeca'
    casas.forEach((casa, indice) => {
        casa.style.color = "gray";
        casa.textContent = ".";
        temPeca[indice] = false;
    })

    iniciouPartida = true;
    jogAtual = jogClicado;

    //Mostra labels
    document.getElementById("labelJogAtual").textContent = "Vez do jogador " + jogAtual;
    document.getElementById("labelJogVencedor").textContent = "";

    //Esconde botões e label
    document.getElementById("labelEscPrimJog").style.display = "none";
    document.getElementById("botaoJogO").style.display = "none";
    document.getElementById("botaoJogX").style.display = "none";
}

//Verifica se a partida terminou
function partidaTerminou() {
    //Possibilidade de completar uma linha
    for (let i = 0; i <= 6; i += 3) {
        if
            (
            casas[i].textContent === jogAtual &&
            casas[i + 1].textContent === jogAtual &&
            casas[i + 2].textContent === jogAtual
        ) {
            return true;
        }
    }
    //Possibilidade de completar uma coluna
    for (let i = 0; i <= 2; i++) {
        if
            (
            casas[i].textContent === jogAtual &&
            casas[i + 3].textContent === jogAtual &&
            casas[i + 6].textContent === jogAtual
        ) {
            return true;
        }
    }
    //Possibilidade de completar diagonais
    if
        (
        casas[0].textContent === jogAtual &&
        casas[4].textContent === jogAtual &&
        casas[8].textContent === jogAtual
    ) {
        return true;
    }
    if
        (
        casas[2].textContent === jogAtual &&
        casas[4].textContent === jogAtual &&
        casas[6].textContent === jogAtual
    ) {
        return true;
    }

    //Verifica se houve empate
    if (casasOcupadas === 9) {
        return true;
    }

    return false;
}

//Mostra a mensagem de parabéns ao ganhador ou mensagem de empate
function premiarGanhador() {
    if (casasOcupadas === 9) {
        document.getElementById("labelJogVencedor").textContent = "Empate :/";
    }
    else {
        document.getElementById("labelJogVencedor").textContent = "Parabéns " + jogAtual + ", você é o vencedor!!!";
    }
}

//Reseta os elementos da tela, preparando-a para um novo jogo
function resetarTela() {
    iniciouPartida = false;
    casasOcupadas = 0;

    //Esconde label
    document.getElementById("labelJogAtual").textContent = "";

    //Mostra labels
    document.getElementById("labelEscPrimJog").style.display = 'inline';
    document.getElementById("labelEscPrimJog").textContent = "Escolha o 1º a jogar";

    //Esconde botões
    document.getElementById("botaoJogO").style.display = 'inline';
    document.getElementById("botaoJogX").style.display = 'inline';
}

//Define função de ação clicar em botões
document.getElementById("botaoJogO").onclick = function () {
    iniciarPartida('O');
}
document.getElementById("botaoJogX").onclick = function () {
    iniciarPartida('X');
}

casas.forEach((casa, indice) => {
    //Define função de ação ao passar mouse em casa
    casa.onmouseover = () => {
        if (!iniciouPartida || casaEstahOcupada(indice)) {
            return;
        }

        casa.textContent = jogAtual;
        casa.style.color = "black";
    }
    //Define função de ação de tirar mouse de casa
    casa.onmouseout = () => {
        if (!iniciouPartida || casaEstahOcupada(indice)) {
            return;
        }

        casa.textContent = ".";
        casa.style.color = "gray";
    }
    //Define função de ação de clicar em casa
    casa.onclick = () => {
        if (!iniciouPartida) {
            alert("Selecione um jogador.");
            return;
        } else if (casaEstahOcupada(indice)) {
            alert("A posição escolhida já está ocupada.");
            return;
        }

        casa.textContent = jogAtual;
        casa.style.color = "black";
        temPeca[indice] = true;
        casasOcupadas++;

        if (partidaTerminou()) {
            premiarGanhador();
            resetarTela();
            return;
        }

        jogAtual = (jogAtual === 'O') ? 'X' : 'O';
        document.getElementById("labelJogAtual").textContent = "Vez do jogador " + jogAtual;
    }
});
