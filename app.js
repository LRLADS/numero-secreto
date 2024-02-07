let listaDeNumerosSorteados = [];
let numeroMaximo = 1000;
let numeroLimite = numeroMaximo;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;



function gerarNumeroAleatorio() {

    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if(quantidadeDeElementosNaLista == numeroLimite ) {
        listaDeNumerosSorteados = [];
    }

    if(listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function limparChute () {
    chute = document.querySelector('input');
    chute.value = '';
    
}

function mensagensInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', `Escolha um número entre 1 e ${numeroMaximo}`);
}

mensagensInicial()

function verificarChute() {
    let chute = document.querySelector('input').value;

    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1','Acertou.');
        let palavraTentativa = tentativas > 1? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você acertou o número secreto com ${tentativas} ${palavraTentativa}.`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    }   else {
            if (chute < numeroSecreto) {
                exibirTextoNaTela('h1','Errou!');
                exibirTextoNaTela(`p`,`O número secreto é maior que ${chute}.`);
            }   else {
                    if (chute > numeroSecreto) {
                        exibirTextoNaTela('h1','Errou!');
                        exibirTextoNaTela(`p`,`O número secreto é menor que ${chute}.`);
                }
            }
            tentativas ++;
            limparChute()
        }
    }


function novoJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparChute();
    tentativas = 1;
    mensagensInicial();
    document.getElementById('reiniciar').setAttribute('disabled',true);
}