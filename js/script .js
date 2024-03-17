document.addEventListener('DOMContentLoaded', () => {
    const mario = document.querySelector('.mario');
    const pipe = document.querySelector('.pipe');
    const contadorDisplay = document.getElementById('contador');
    const modal = document.getElementById('myModal');
    const restartBtn = document.getElementById('btn');
    let pontos = 0;
    let jogoAtivo = false;

    const jump = () => {
        if (!jogoAtivo) { // Verifica se o jogo está ativo
            jogoAtivo = true; // Define o jogo como ativo
            iniciarJogo(); // Chama a função para iniciar o jogo
        }
        mario.classList.add('jump');

        setTimeout(() => {
            mario.classList.remove('jump');
        }, 500);
    }

    // Define uma nova animação para o pipe que não começa imediatamente
    const novaAnimacaoPipe = `
        @keyframes pipe-start-animation {
            from {
                right: -80px;
            }
            to {
                right: 100%;
            }
        }
    `;

    // Cria uma nova folha de estilo e adiciona a animação nela
    const styleSheet = new CSSStyleSheet();
    styleSheet.insertRule(novaAnimacaoPipe);

    // Adiciona a nova folha de estilo ao documento
    document.adoptedStyleSheets = [...document.adoptedStyleSheets, styleSheet];

    // Remove a animação anterior e aplica a nova animação ao pipe, mas sem iniciar a animação
    pipe.style.animation = 'pipe-start-animation 1.2s infinite linear paused';

    // Função para iniciar o jogo
    const iniciarJogo = () => {
        // Adiciona animações apenas quando o jogo começa
        pipe.style.animation = 'pipe-animation 1.2s infinite linear';
        document.querySelectorAll('.clouds').forEach(cloud => cloud.style.animation = 'clouds-animation 15s infinite linear');

        const loop = setInterval(() => {
            const pipePosition = pipe.offsetLeft;
            const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

            if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 70) {
                if (pipePosition < 100 && marioPosition < 50) {jogoAtivo = false;

                    pipe.style.animation = 'none';
                    pipe.style.left = `${pipePosition}px`;
    
                    mario.style.animation = 'none';
                    mario.style.bottom = `${marioPosition}px`;
    
                    mario.src = './images/game-over.png';
                    mario.style.width = '75px';
                    mario.style.marginLeft = '50px';
    
                    clearInterval(loop);
                    clearInterval(atualizacaoDePontos);
    
                    document.getElementById('finalScore').textContent = pontos;
    
                    modal.style.display = 'block';
                    restartBtn.style.display = 'block';
    
                    // Adiciona a classe 'paused' para pausar as animações
                    pipe.classList.add('paused');
                    document.querySelectorAll('.clouds').forEach(cloud => cloud.classList.add('paused'));
                }
            }
        }, 10);
    }

    const atualizacaoDePontos = setInterval(() => {
        if (jogoAtivo) {
            pontos++;
            contadorDisplay.textContent = pontos;
        }
    }, 100);

    document.addEventListener('keydown', () => {
        jump(); // Chama a função jump quando uma tecla é pressionada
    });

    document.addEventListener('click', jump);

    restartBtn.addEventListener('click', () => {
        window.location.reload();
    });
});
