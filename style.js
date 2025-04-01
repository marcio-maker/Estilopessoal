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
    
    // Adicione no início do script, após as perguntas
const inspirationGallery = [
    {
        id: 1,
        image: "https://i.pinimg.com/736x/ff/dc/7b/ffdc7b8287c18ce8442ff550bfb1ac5b.jpg",
        caption: "Corte moderno para rostos ovais"
    },
    {
        id: 2,
        image: "https://i.pinimg.com/736x/fd/df/12/fddf1222ec90fae02a250f159e4a6663.jpg",
        caption: "Franja longa para rostos quadrados"
    },
    {
        id: 3,
        image: "https://i.pinimg.com/736x/91/7f/64/917f6409deb677e4470a17d2618b2ec7.jpg",
        caption: "Camadas para cabelos cacheados"
    },
    {
        id: 4,
        image: "https://i.pinimg.com/736x/5a/3b/e6/5a3be6a6c4d5c0a9b5e5b5e5b5e5b5e5.jpg",
        caption: "Corte assimétrico para rostos redondos"
    },
    {
        id: 5,
        image: "https://i.pinimg.com/736x/3a/7d/5b/3a7d5b5e5b5e5b5e5b5e5b5e5b5e5b5.jpg",
        caption: "Estilo romântico com ondas suaves"
    },
    {
        id: 6,
        image: "https://i.pinimg.com/736x/7b/2c/9a/7b2c9a5e5b5e5b5e5b5e5b5e5b5e5b5.jpg",
        caption: "Corte pixie para contraste alto"
    }
];

// Modifique a função showResults para incluir a galeria
function showResults() {
    // ... (mantenha o conteúdo existente até a parte dos exemplos visuais)
    
    // Substitua a seção de exemplos visuais por:
    resultsHTML += `
        <div class="gallery-section">
            <h3 class="gallery-title">Galeria de Inspiração</h3>
            <div class="gallery-grid" id="inspirationGallery">
                ${inspirationGallery.map(item => `
                    <div class="gallery-item">
                        <img src="${item.image}" alt="${item.caption}">
                        <div class="gallery-caption">${item.caption}</div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    // ... (mantenha o restante do código existente)
}

// Adicione este evento para melhorar a experiência mobile
document.addEventListener('DOMContentLoaded', function() {
    // ... (código existente)
    
    // Melhorias para mobile
    if ('ontouchstart' in window) {
        document.querySelectorAll('.option-btn').forEach(btn => {
            btn.style.minHeight = '60px';
        });
        
        document.querySelectorAll('button').forEach(btn => {
            btn.style.fontSize = '1rem';
        });
    }
});
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
                    <img src="https://i.pinimg.com/736x/ff/dc/7b/ffdc7b8287c18ce8442ff550bfb1ac5b.jpg" alt="Exemplo de corte">
                    <img src="https://i.pinimg.com/736x/fd/df/12/fddf1222ec90fae02a250f159e4a6663.jpg" alt="Exemplo de corte">
                    <img src="https://i.pinimg.com/736x/91/7f/64/917f6409deb677e4470a17d2618b2ec7.jpg" alt="Exemplo de corte">
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
                return '<a href="https://mercadolivre.com/sec/18uy8jS" target="_blank">Shampoo para cuidados dos cachos (ex: Loreal Shampoo  )</a>';
            } else if (answers.hairType === 'liso') {
                return '<a href="https://mercadolivre.com/sec/1jKirLi" target="_blank">Shampoo sem sal para brilho (ex: Kérastase Densifique)</a>';
            } else {
                return '<a href="https://mercadolivre.com/sec/1wFbYxw" target="_blank">Shampoo hidratante (ex: Loreal Shampoo)</a>';
            }
        } else if (type === 'styling') {
            if (answers.hairType === 'cacheado' || answers.hairType === 'crespo') {
                return '<a href="https://mercadolivre.com/sec/1siypwP" target="_blank">Creme de pentear definidor (ex: Loreal Leave-in )</a>';
            } else if (answers.hairType === 'liso') {
                return '<a href="https://mercadolivre.com/sec/29z4Pnp" target="_blank">Óleo de argan para brilho (ex: Moroccanoil)</a>';
            } else {
                return '<a href="https://mercadolivre.com/sec/16FfURj" target="_blank">Mousse ou spray texturizador (ex: Wella Professionals)</a>';
            }
        } else if (type === 'treatment') {
            if (answers.hairType === 'cacheado' || answers.hairType === 'crespo') {
                return '<a href="https://mercadolivre.com/sec/12UwAdP" target="_blank">Máscara de hidratação profunda (ex: Curl Expression Máscara )</a>';
            } else if (answers.hairType === 'liso') {
                return '<a href="https://mercadolivre.com/sec/2356nrv" target="_blank">Máscara de reconstrução (ex: Kérastase Resistance)</a>';
            } else {
                return '<a href="https://mercadolivre.com/sec/1HhvTKM" target="_blank">Máscara nutritiva (ex: Loreal Professionnel Nutrioil)</a>';
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

// Mini Blog - Dados e Funcionalidades
const blogPosts = [
    {
        id: 1,
        date: '15/05/2023',
        title: 'Como escolher o corte certo para seu formato de rosto',
        summary: 'Descubra como realçar seus melhores traços com cortes que harmonizam com seu formato facial. Aprenda técnicas de visagismo para valorizar seus pontos fortes.',
        fullContent: `
            <h3>Guia Completo de Cortes por Formato Facial</h3>
            <p>O visagismo ensina que cada formato de rosto pede abordagens diferentes:</p>
            <ul>
                <li><strong>Rosto oval:</strong> O formato mais versátil, permite praticamente todos os cortes</li>
                <li><strong>Rosto redondo:</strong> Beneficia-se de cortes que criam ângulos e alongam visualmente</li>
                <li><strong>Rosto quadrado:</strong> Cortes que suavizam os ângulos da mandíbula são ideais</li>
                <li><strong>Rosto triangular:</strong> Volume na parte superior equilibra o queixo estreito</li>
            </ul>
            <div class="example-grid">
                <img src="https://i.pinimg.com/736x/5a/3b/e6/5a3be6a6c4d5c0a9b5e5b5e5b5e5b5e5.jpg" alt="Exemplos de cortes">
            </div>
        `,
        category: 'Visagismo'
    },
    {
        id: 2,
        date: '22/05/2023',
        title: 'Cores que complementam seu tom de pele',
        summary: 'Aprenda a selecionar cores de cabelo que realçam sua beleza natural e combinam com sua personalidade.',
        fullContent: `
            <h3>Paleta de Cores por Tom de Pele</h3>
            <p>Baseado na teoria das estações:</p>
            <ul>
                <li><strong>Inverno:</strong> Tons frios e intensos como preto azulado e vermelho cereja</li>
                <li><strong>Verão:</strong> Tons frios mas suaves como castanho acinzentado e loiro gelo</li>
                <strong>Outono:</strong> Tons quentes e terrosos como cobre e vermelho tijolo</li>
                <li><strong>Primavera:</strong> Tons quentes e claros como mel e dourado</li>
            </ul>
            <p>Dica profissional: Considere também a cor dos seus olhos para harmonização completa.</p>
        `,
        category: 'Coloração'
    },
    // Adicione mais posts conforme necessário
];

// Função para renderizar o mini blog
function renderBlogPosts() {
    const blogContainer = document.createElement('div');
    blogContainer.className = 'blog-section';
    blogContainer.innerHTML = `
        <h2 class="blog-title">Dicas de Visagismo</h2>
        <div class="blog-posts" id="blogPostsContainer"></div>
    `;

    const postsContainer = blogContainer.querySelector('#blogPostsContainer');
    
    blogPosts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'blog-post';
        postElement.innerHTML = `
            <p class="post-date">${post.date} • ${post.category}</p>
            <h3>${post.title}</h3>
            <p>${post.summary}</p>
            <a href="#" class="read-more" data-post-id="${post.id}">Ler mais</a>
        `;
        postsContainer.appendChild(postElement);
    });

    return blogContainer;
}

// Função para mostrar o post completo
function showFullPost(postId) {
    const post = blogPosts.find(p => p.id == postId);
    if (!post) return;

    const modalContent = `
        <div class="blog-post-full">
            <button class="btn btn-secondary" id="backToBlog">← Voltar ao blog</button>
            <p class="post-date">${post.date} • ${post.category}</p>
            <h2>${post.title}</h2>
            <div class="post-content">${post.fullContent}</div>
            <button class="btn btn-primary" id="backToBlogBottom">Voltar ao blog</button>
        </div>
    `;

    const blogContainer = document.querySelector('.blog-section');
    blogContainer.innerHTML = modalContent;

    document.getElementById('backToBlog').addEventListener('click', renderBlog);
    document.getElementById('backToBlogBottom').addEventListener('click', renderBlog);
}

// Função para renderizar o blog principal
function renderBlog() {
    const blogContainer = document.querySelector('.blog-section');
    if (blogContainer) {
        blogContainer.innerHTML = `
            <h2 class="blog-title">Dicas de Visagismo</h2>
            <div class="blog-posts" id="blogPostsContainer"></div>
        `;

        const postsContainer = blogContainer.querySelector('#blogPostsContainer');
        
        blogPosts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.className = 'blog-post';
            postElement.innerHTML = `
                <p class="post-date">${post.date} • ${post.category}</p>
                <h3>${post.title}</h3>
                <p>${post.summary}</p>
                <a href="#" class="read-more" data-post-id="${post.id}">Ler mais</a>
            `;
            postsContainer.appendChild(postElement);
        });

        // Adiciona event listeners aos novos links
        document.querySelectorAll('.read-more').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                showFullPost(this.dataset.postId);
            });
        });
    }
}
