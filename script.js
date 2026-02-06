// ===================================
// SISTEMA DE TEMA (CLARO/ESCURO)
// ===================================
const body = document.body;
// Suporta múltiplos IDs para o botão de tema
const themeToggle = document.getElementById('theme-toggle') || document.getElementById('botao-tema');

// Carrega o tema salvo no armazenamento local
const savedTema = localStorage.getItem('tema');
if (savedTema === 'escuro') {
  body.classList.add('modo-escuro');
  if (themeToggle) themeToggle.textContent = '☀️'; // Sol
} else {
  if (themeToggle) themeToggle.textContent = '🌙'; // Lua
}


// Adiciona o evento de clique ao botão, se ele existir
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      body.classList.toggle('modo-escuro');

      if (body.classList.contains('modo-escuro')) {
        themeToggle.textContent = '☀️'; // Sol
        try { localStorage.setItem('tema', 'escuro'); } catch(e) {}
      } else {
        themeToggle.textContent = '🌙'; // Lua
        try { localStorage.setItem('tema', 'claro'); } catch(e) {}
      }
    });
}


// ===================================
// CALCULADORA DE BENEFÍCIOS DO ENEM
// ===================================

// Seleciona os elementos da calculadora ENEM
const calculateEnemBtn = document.getElementById('calculate-enem');
const resultEnemDiv = document.getElementById('result-enem');
const enemInputs = {
    ch: document.getElementById('nota-ch'),
    cn: document.getElementById('nota-cn'),
    ling: document.getElementById('nota-ling'),
    mat: document.getElementById('nota-mat'),
    red: document.getElementById('nota-red')
};

// Só inicializa a calculadora se todos os elementos necessários existirem
if (calculateEnemBtn && resultEnemDiv && Object.values(enemInputs).every(input => input)) {

    calculateEnemBtn.addEventListener('click', () => {
        // 1. Coleta e valida as notas
        const notas = {};
        let hasError = false;
        for (const key in enemInputs) {
            const value = parseFloat(enemInputs[key].value);
            if (isNaN(value) || value < 0 || value > 1000) {
                hasError = true;
                break;
            }
            notas[key] = value;
        }

        if (hasError) {
            resultEnemDiv.innerHTML = `<p class="error">Por favor, insira todas as notas corretamente (valores entre 0 e 1000).</p>`;
            resultEnemDiv.style.display = 'block'; // Garante que o erro seja visível
            return;
        }

        // 2. Calcula a média final
        const mediaFinal = (notas.ch + notas.cn + notas.ling + notas.mat + notas.red) / 5;

        // 3. Define as funções de cálculo de desconto para cada faculdade
        const getDescontoUnisuam = (media) => {
            if (media >= 800) return '<strong>85% de bolsa</strong> (para todo o curso)';
            if (media >= 700) return '<strong>70% de bolsa</strong> (para todo o curso)';
            if (media >= 600) return '<strong>60% de bolsa</strong> (para todo o curso)';
            if (media >= 400) return '<strong>55% de bolsa</strong> (para todo o curso)';
            if (media >= 300) return '<strong>50% de bolsa</strong> (para todo o curso)';
            return 'Não elegível (mínimo 300 pontos)';
        };

        const getDescontoEstacio = (media) => {
            if (media >= 900) return '<strong>100% no 1º semestre</strong> + até 55% no resto do curso';
            if (media >= 700) return '<strong>Até 70% no 1º semestre</strong> + até 50% no resto do curso';
            if (media >= 500) return '<strong>Até 60% no 1º semestre</strong> + até 45% no resto do curso';
            if (media >= 300) return '<strong>Até 50% no 1º semestre</strong> + até 40% no resto do curso';
            return 'Não elegível (mínimo 300 pontos)';
        };

        const getDescontoIbmr = (media) => {
            if (media >= 900) return '<strong>100% no 1º semestre</strong> + até 50% no resto do curso';
            if (media >= 701) return '<strong>Até 70% no 1º semestre</strong> + até 50% no resto do curso';
            if (media >= 501) return '<strong>Até 60% no 1º semestre</strong> + até 45% no resto do curso';
            if (media >= 300) return '<strong>Até 50% no 1º semestre</strong> + até 40% no resto do curso';
            return 'Não elegível (mínimo 300 pontos)';
        };
        
        const getDescontoUva = (media) => {
            if (media >= 750) return '<strong>100% de bolsa</strong> (para todo o curso)';
            if (media >= 650) return '<strong>Até 60% de bolsa</strong> (para todo o curso)';
            if (media >= 550) return '<strong>Até 50% de bolsa</strong> (para todo o curso)';
            if (media >= 450) return '<strong>Até 45% de bolsa</strong> (para todo o curso)';
            return 'Não elegível (mínimo 450 pontos)';
        };

        // 4. Monta o HTML do resultado final
        resultEnemDiv.innerHTML = `
            <div class="resultado-header">
                <h3>Sua Média Final do ENEM:</h3>
                <p class="media-final">${mediaFinal.toFixed(2)}</p>
            </div>
            <div class="faculdades-container">
                <div class="faculdade-card">
                    <h4>UNISUAM</h4>
                    <p>${getDescontoUnisuam(mediaFinal)}</p>
                </div>
                <div class="faculdade-card">
                    <h4>Estácio</h4>
                    <p>${getDescontoEstacio(mediaFinal)}</p>
                </div>
                <div class="faculdade-card">
                    <h4>IBMR</h4>
                    <p>${getDescontoIbmr(mediaFinal)}</p>
                </div>
                <div class="faculdade-card">
                    <h4>UVA (Veiga de Almeida)</h4>
                    <p>${getDescontoUva(mediaFinal)}</p>
                </div>
            </div>
            <p class="disclaimer">*Os descontos são baseados em políticas divulgadas pelas instituições e podem sofrer alterações. Consulte sempre o site oficial da faculdade.</p>
        `;

        resultEnemDiv.style.display = 'block'; // Torna a div de resultados visível
    });
}