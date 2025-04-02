// Crear partículas decorativas
const particlesContainer = document.getElementById('particles');
const particleCount = 20;

for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Posicionar aleatoriamente
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    
    // Tamaño aleatorio
    const size = Math.random() * 5 + 3;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    
    // Opacidad aleatoria
    particle.style.opacity = Math.random() * 0.5;
    
    // Retraso aleatorio en la animación
    particle.style.animationDelay = Math.random() * 10 + 's';
    particle.style.animationDuration = Math.random() * 10 + 10 + 's';
    
    particlesContainer.appendChild(particle);
}
