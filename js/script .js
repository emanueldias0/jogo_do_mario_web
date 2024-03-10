    document.addEventListener('DOMContentLoaded', () => {
    const mario = document.querySelector('.mario');
    const pipe = document.querySelector('.pipe');
    const contadorDisplay = document.getElementById('contador');
    const modal = document.getElementById('myModal');
    const restartBtn = document.getElementById('btn'); // Seleciona o botão de reiniciar
    let pontos = 0;
    let jogoAtivo = true;

    const jump = () => {
        if (!jogoAtivo) return; // Impede o pulo se o jogo acabou
        mario.classList.add('jump');

        setTimeout(() => {
            mario.classList.remove('jump');
        }, 500);
    }

    const loop = setInterval(() => {
        const pipePosition = pipe.offsetLeft;
        const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

        // Condição de colisão
        if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 70) {
            jogoAtivo = false; // Indica que o jogo acabou

            pipe.style.animation = 'none';
            pipe.style.left = `${pipePosition}px`;

            mario.style.animation = 'none';
            mario.style.bottom = `${marioPosition}px`;

            mario.src = './images/game-over.png';
            mario.style.width = '75px';
            mario.style.marginLeft = '50px';

            clearInterval(loop); // Para o loop do jogo
            clearInterval(atualizacaoDePontos); // Para a atualização da pontuação

            document.getElementById('finalScore').textContent = pontos;
            
            // Mostra o botão de reiniciar
            modal.style.display = 'block';
            restartBtn.style.display = 'block';
        }
    }, 10);

    // Armazena o ID do intervalo para poder pará-lo depois
    const atualizacaoDePontos = setInterval(() => {
        if (jogoAtivo) {
            pontos++;
            contadorDisplay.textContent = pontos;
        }
    }, 100); // Aumenta a pontuação a cada 100ms

    document.addEventListener('keydown', jump);

    // Evento de clique para reiniciar o jogo
    restartBtn.addEventListener('click', () => {
        window.location.reload(); // Recarrega a página para reiniciar o jogo
    });
});
