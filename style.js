document.addEventListener('DOMContentLoaded', function() {
    // Elementos da UI
    const questionContainer = document.getElementById('questionContainer');
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    const btnNext = document.getElementById('btnNext');
    const btnBack = document.getElementById('btnBack');
    const resultsModal = document.getElementById('resultsModal');
    const resultsContent = document.getElementById('resultsContent');
    const closeModal = document.getElementById('closeModal');
    const btnRestart = document.getElementById('btnRestart');
    
    // Estado do aplicativo
    let currentQuestion = 0;
    let answers = {};
    
    // Perguntas do questionário baseadas em Hallawell
    const questions = [
        {
            id: 'gender',
            title: 'Com qual gênero você mais se identifica?',
            type: 'option',
            options: [
                { text: 'Mulher', value: 'mulher' },
                { text: 'Homem', value: 'homem' },
                { text: 'Não-binário', value: 'nao-binario' }
            ]
        },
        {
            id: 'faceShape',
            title: 'Qual o formato predominante do seu rosto?',
            type: 'option',
            options: [
                { text: 'Oval (proporcional)', value: 'oval' },
                { text: 'Redondo (curvas suaves)', value: 'redondo' },
                { text: 'Quadrado (ângulos marcados)', value: 'quadrado' },
                { text: 'Retangular (comprido)', value: 'retangular' },
                { text: 'Triangular (queixo estreito)', value: 'triangular' },
                { text: 'Diamante (maior largura nos ossos)', value: 'diamante' }
            ]
        },
        {
            id: 'features',
            title: 'Quais seus traços faciais mais marcantes?',
            type: 'option',
            multiple: true,
            options: [
                { text: 'Olhos grandes', value: 'olhos-grandes' },
                { text: 'Nariz proeminente', value: 'nariz-proeminente' },
                { text: 'Lábios carnudos', value: 'labios-carnudos' },
                { text: 'Testa larga', value: 'testa-larga' },
                { text: 'Queixo forte', value: 'queixo-forte' },
                { text: 'Maçãs do rosto altas', value: 'macas-altas' }
            ]
        },
        {
            id: 'styleArchetype',
            title: 'Qual arquétipo de estilo mais combina com você?',
            type: 'option',
            options: [
                { text: 'Clássico (elegância atemporal)', value: 'classico' },
                { text: 'Romântico (suave e delicado)', value: 'romantico' },
                { text: 'Dramático (impactante e ousado)', value: 'dramatico' },
                { text: 'Natural (despojado e orgânico)', value: 'natural' },
                { text: 'Criativo (inovador e artístico)', value: 'criativo' },
                { text: 'Sedutor (sensual e misterioso)', value: 'sedutor' }
            ]
        },
        {
            id: 'contrast',
            title: 'Qual o nível de contraste entre seus traços?',
            type: 'option',
            options: [
                { text: 'Alto contraste (ex: pele clara + cabelo escuro)', value: 'alto' },
                { text: 'Médio contraste', value: 'medio' },
                { text: 'Baixo contraste (tons próximos)', value: 'baixo' }
            ]
        },
        {
            id: 'hairType',
            title: 'Qual a textura natural do seu cabelo?',
            type: 'option',
            options: [
                { text: 'Liso', value: 'liso' },
                { text: 'Ondulado', value: 'ondulado' },
                { text: 'Cacheado', value: 'cacheado' },
                { text: 'Crespo', value: 'crespo' }
            ]
        },
        {
            id: 'hairLength',
            title: 'Qual comprimento de cabelo você prefere?',
            type: 'option',
            options: [
                { text: 'Curto', value: 'curto' },
                { text: 'Médio', value: 'medio' },
                { text: 'Longo', value: 'longo' }
            ]
        },
        {
            id: 'colors',
            title: 'Quais cores você mais usa no guarda-roupa?',
            type: 'option',
            multiple: true,
            options: [
                { text: 'Neutras (preto, branco, cinza, bege)', value: 'neutras' },
                { text: 'Quentes (vermelho, laranja, amarelo)', value: 'quentes' },
                { text: 'Friais (azul, verde, roxo)', value: 'frias' },
                { text: 'Pastéis', value: 'pasteis' },
                { text: 'Vivas/fluorescentes', value: 'vivas' },
                { text: 'Terrosas', value: 'terrosas' }
            ]
        }
    ];
    
    // Função para renderizar a pergunta atual
    function renderQuestion() {
        const progress = ((currentQuestion + 1) / questions.length) * 100;
        progressBar.style.width = `${progress}%`;
        progressText.textContent = `Pergunta ${currentQuestion + 1} de ${questions.length}`;
        
        const question = questions[currentQuestion];
        
        let questionHTML = `
            <div class="question-card">
                <h2 class="question-title">${question.title}</h2>
                <div class="options-container">
        `;
        
        if (question.type === 'option') {
            question.options.forEach(option => {
                const isSelected = question.multiple 
                    ? (answers[question.id] && answers[question.id].includes(option.value))
                    : (answers[question.id] === option.value);
                    
                questionHTML += `
                    <button class="option-btn ${isSelected ? 'selected' : ''}" 
                            data-value="${option.value}">
                        ${option.text}
                    </button>
                `;
            });
        }
        
        questionHTML += `</div></div>`;
        questionContainer.innerHTML = questionHTML;
        
        if (question.type === 'option') {
            document.querySelectorAll('.option-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    if (question.multiple) {
                        if (!answers[question.id]) answers[question.id] = [];
                        
                        const index = answers[question.id].indexOf(this.dataset.value);
                        if (index === -1) {
                            answers[question.id].push(this.dataset.value);
                        } else {
                            answers[question.id].splice(index, 1);
                        }
                        
                        this.classList.toggle('selected');
                    } else {
                        document.querySelectorAll('.option-btn').forEach(b => {
                            b.classList.remove('selected');
                        });
                        
                        this.classList.add('selected');
                        answers[question.id] = this.dataset.value;
                    }
                    
                    btnNext.disabled = question.multiple 
                        ? (answers[question.id] && answers[question.id].length === 0)
                        : !answers[question.id];
                });
            });
        }
        
        btnBack.disabled = currentQuestion === 0;
        btnNext.disabled = question.type === 'option' && 
            (question.multiple 
                ? (!answers[question.id] || answers[question.id].length === 0)
                : !answers[question.id]);
    }
    
    function nextQuestion() {
        if (currentQuestion < questions.length - 1) {
            currentQuestion++;
            renderQuestion();
        } else {
            showResults();
        }
    }
    
    function prevQuestion() {
        if (currentQuestion > 0) {
            currentQuestion--;
            renderQuestion();
        }
    }
    
    function showResults() {
        let resultsHTML = `
            <div class="result-item">
                <h3 class="result-title">Seu Perfil de Visagismo</h3>
                <p class="result-value">${getProfileDescription()}</p>
            </div>
            
            <div class="result-item">
                <h3 class="result-title">Formato do Rosto</h3>
                <p class="result-value">${answers.faceShape || 'Não informado'}</p>
            </div>
            
            <div class="result-item">
                <h3 class="result-title">Arquétipo de Estilo</h3>
                <p class="result-value">${answers.styleArchetype || 'Não informado'}</p>
            </div>
            
            <div class="result-item">
                <h3 class="result-title">Nível de Contraste</h3>
                <p class="result-value">${answers.contrast || 'Não informado'}</p>
            </div>
            
            <div class="result-item">
                <h3 class="result-title">Tipo e Comprimento de Cabelo</h3>
                <p class="result-value">${answers.hairType || 'Não informado'} - ${answers.hairLength || 'Não informado'}</p>
            </div>
            
            <div class="result-item">
                <h3 class="result-title">Cores Preferidas</h3>
                <p class="result-value">${answers.colors ? answers.colors.join(', ') : 'Não informado'}</p>
            </div>
        `;
        
        // Recomendações baseadas em Hallawell
        resultsHTML += `<div class="recommendation"><h3>Recomendações de Visagismo</h3>`;
        
        // Formato do rosto
        switch(answers.faceShape) {
            case 'redondo':
                resultsHTML += `<p>- Rostos redondos se beneficiam de cortes que criam ângulos e alongam o rosto</p>`;
                resultsHTML += `<p>- Franjas laterais ou cortes assimétricos ajudam a quebrar a circularidade</p>`;
                break;
            case 'quadrado':
                resultsHTML += `<p>- Para rostos quadrados, recomenda-se suavizar os ângulos com camadas</p>`;
                resultsHTML += `<p>- Franjas arredondadas ou cortes em camadas suaves equilibram a mandíbula marcada</p>`;
                break;
            case 'oval':
                resultsHTML += `<p>- Seu rosto oval é considerado o formato mais versátil</p>`;
                resultsHTML += `<p>- Você pode experimentar praticamente qualquer estilo de corte</p>`;
                break;
            case 'retangular':
                resultsHTML += `<p>- Para rostos longos, recomenda-se cortes que encurtam visualmente o rosto</p>`;
                resultsHTML += `<p>- Franjas grossas ou cortes na altura do queixo criam equilíbrio</p>`;
                break;
            case 'triangular':
                resultsHTML += `<p>- Rostos triangulares ficam bem com volume na parte superior para equilibrar o queixo estreito</p>`;
                break;
            case 'diamante':
                resultsHTML += `<p>- Para rostos em diamante, cortes com volume nas têmporas suavizam os ossos proeminentes</p>`;
                break;
        }
        
        // Arquétipo de estilo
        if(answers.styleArchetype === 'classico') {
            resultsHTML += `<p>- Como clássico, recomenda-se cortes bem estruturados e cores naturais</p>`;
        } else if(answers.styleArchetype === 'dramatico') {
            resultsHTML += `<p>- Seu perfil dramático combina com cortes geométricos e cores contrastantes</p>`;
        } else if(answers.styleArchetype === 'romantico') {
            resultsHTML += `<p>- Seu estilo romântico pede cortes com movimento e linhas suaves</p>`;
        }
        
        // Contraste
        if(answers.contrast === 'alto') {
            resultsHTML += `<p>- Seu alto contraste permite cores vibrantes e contrastes marcantes</p>`;
        } else if(answers.contrast === 'baixo') {
            resultsHTML += `<p>- Seu baixo contraste fica melhor com tons próximos e gradientes suaves</p>`;
        }
        
        resultsHTML += `</div>`;
        
        // Exemplos visuais
        resultsHTML += `
            <div class="visual-examples">
                <h3>Inspirações para Você</h3>
                <div class="example-grid">
                    <img src="{{ url_for('static', filename='images/exemplo1.jpg') }}" alt="Exemplo de corte">
                    <img src="{{ url_for('static', filename='images/exemplo2.jpg') }}" alt="Exemplo de corte">
                    <img src="{{ url_for('static', filename='images/exemplo3.jpg') }}" alt="Exemplo de corte">
                </div>
            </div>
            
            <div class="recommendation">
                <h3>Produtos Recomendados</h3>
                <p>Baseado no seu perfil, recomendamos:</p>
                <ul>
                    <li><strong>Shampoo e Condicionador:</strong> ${getProductRecommendation('haircare')}</li>
                    <li><strong>Produto para Estilização:</strong> ${getProductRecommendation('styling')}</li>
                    <li><strong>Tratamento:</strong> ${getProductRecommendation('treatment')}</li>
                </ul>
            </div>
            
            <div class="premium-offer">
                <h3>Consulta de Visagismo Premium</h3>
                <p>Receba uma análise completa personalizada com:</p>
                <ul>
                    <li>Análise detalhada do seu biótipo</li>
                    <li>Paleta de cores ideal</li>
                    <li>Guia de cortes e penteados</li>
                    <li>Recomendações de maquiagem</li>
                    <li>1 hora de consultoria online</li>
                </ul>
                <div class="pricing">
                    <span class="original-price">R$ 297</span>
                    <span class="special-price">R$ 197 (oferta especial)</span>
                </div>
                <button class="btn btn-accent" id="btnBuy">Quero minha consultoria</button>
            </div>
        `;
        
        resultsContent.innerHTML = resultsHTML;
        
        document.getElementById('btnBuy')?.addEventListener('click', function() {
            alert('Você será redirecionado para completar sua compra');
        });
        
        resultsModal.style.display = 'flex';
    }
    
    function getProfileDescription() {
        let description = '';
        
        if (answers.styleArchetype === 'classico') {
            description = 'Perfil Clássico - Elegância atemporal e sofisticação';
        } else if (answers.styleArchetype === 'dramatico') {
            description = 'Perfil Dramático - Impactante e cheio de personalidade';
        } else if (answers.styleArchetype === 'romantico') {
            description = 'Perfil Romântico - Suave, delicado e feminino';
        } else {
            description = 'Perfil Versátil - Combina elementos de vários estilos';
        }
        
        return description;
    }
    
    function getProductRecommendation(type) {
        if (type === 'haircare') {
            if (answers.hairType === 'cacheado' || answers.hairType === 'crespo') {
                <a href="https://mercadolivre.com/sec/1T8Ucwpr" target="_blank">Absolut repair máscara  (ex: Absolut repair máscara )</a>';
            } else if (answers.hairType === 'liso') {
                return '<a href="https://www.kerastase.com.br" target="_blank">Shampoo sem sal para brilho (ex: Kérastase Discipline)</a>';
            } else {
                return '<a href="https://www.pantene.com.br" target="_blank">Shampoo hidratante (ex: Pantene Pro-V)</a>';
            }
        } else if (type === 'styling') {
            if (answers.hairType === 'cacheado' || answers.hairType === 'crespo') {
                return '<a href="https://www.salonline.com.br" target="_blank">Creme de pentear definidor (ex: Salon Line Cachos ou Cantu)</a>';
            } else if (answers.hairType === 'liso') {
                return '<a href="https://www.moroccanoil.com" target="_blank">Óleo de argan para brilho (ex: Moroccanoil)</a>';
            } else {
                return '<a href="https://www.wella.com" target="_blank">Mousse ou spray texturizador (ex: Wella Professionals)</a>';
            }
        } else if (type === 'treatment') {
            if (answers.hairType === 'cacheado' || answers.hairType === 'crespo') {
                return '<a href="https://www.salonline.com.br" target="_blank">Máscara de hidratação profunda (ex: Salon Line Cachos ou Lola Cosmetics)</a>';
            } else if (answers.hairType === 'liso') {
                return '<a href="https://www.kerastase.com.br" target="_blank">Máscara de reconstrução (ex: Kérastase Resistance)</a>';
            } else {
                return '<a href="https://www.elseve.com.br" target="_blank">Máscara nutritiva (ex: Elseve Hidra Hialurônico)</a>';
            }
        }
        
        return '<a href="https://www.example.com" target="_blank">Produto adequado para seu tipo de cabelo</a>';
    }
    
    // Event Listeners
    btnNext.addEventListener('click', nextQuestion);
    btnBack.addEventListener('click', prevQuestion);
    closeModal.addEventListener('click', () => {
        resultsModal.style.display = 'none';
    });
    btnRestart.addEventListener('click', () => {
        resultsModal.style.display = 'none';
        currentQuestion = 0;
        answers = {};
        renderQuestion();
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === resultsModal) {
            resultsModal.style.display = 'none';
        }
    });
    
    // Inicia o questionário
    renderQuestion();
});
// Adiciona funcionalidade ao footer de contato
const contactFooter = document.querySelector('.contact-footer');

contactFooter.addEventListener('click', (e) => {
    if (e.target.tagName === 'A' && e.target.href.includes('instagram.com')) {
        alert('Você será redirecionado para o Instagram do Hair by Marcio.');
    }
});
