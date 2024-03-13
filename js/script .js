document.addEventListener('DOMContentLoaded', () => {
    const mario = document.querySelector('.mario');
    const pipe = document.querySelector('.pipe');
    const contadorDisplay = document.getElementById('contador');
    const modal = document.getElementById('myModal');
    const restartBtn = document.getElementById('btn');
    let pontos = 0;
    let jogoAtivo = true;

    const jump = () => {
        if (!jogoAtivo) return;
        mario.classList.add('jump');

        setTimeout(() => {
            mario.classList.remove('jump');
        }, 500);
    }

    // Event listener para clique ou toque (para dispositivos móveis)
    
    const loop = setInterval(() => {
        const pipePosition = pipe.offsetLeft;
        const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');
        
        if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 70) {
            jogoAtivo = false; 
            
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
        }
    }, 10);
    
    const atualizacaoDePontos = setInterval(() => {
        if (jogoAtivo) {
            pontos++;
            contadorDisplay.textContent = pontos;
        }
    }, 100);
    
    document.addEventListener('keydown', jump);
    document.addEventListener('click', jump);
    
    restartBtn.addEventListener('click', () => {
        window.location.reload();
    });
});
