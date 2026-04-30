const sky = document.getElementById('sky');
const viewport = document.getElementById('viewport');
const starsLayer = document.getElementById('stars-layer');
const linesLayer = document.getElementById('lines-layer');
const infoCard = document.getElementById('info-card');

// configs gerais
let currentMode = 'hand'; // escolhendo entre 'hand' ou 'select'
let isDragging = false;
let startX, startY;
let translateX = -1000;
let translateY = -1000;

// database das constelações através de um array list de objetos
const constellations = [
    {
        name: "Orion",
        stars: [
            { id: "o1", x: 1500, y: 1500, name: "Betelgeuse", color: "orange", dist: "642 ly", mag: "0.50", desc: "Uma supergigante vermelha massiva. É uma das estrelas mais brilhantes do céu noturno e marca o ombro do caçador Orion." },
            { id: "o2", x: 1700, y: 1650, name: "Alnilam", dist: "2000 ly", mag: "1.65", desc: "Uma supergigante azul brilhante localizada no centro do cinturão de Orion (as 'Três Marias')." },
            { id: "o3", x: 1950, y: 1800, name: "Rigel", dist: "860 ly", mag: "0.12", desc: "A estrela mais brilhante da constelação de Orion. É um sistema estelar múltiplo de cor branco-azulada." }
        ],
        links: [["o1", "o2"], ["o2", "o3"]]
    },
    {
        name: "Cruzeiro do Sul",
        stars: [
            { id: "c1", x: 1200, y: 2200, name: "Gacrux", color: "orange", dist: "88 ly", mag: "1.59", desc: "A estrela mais ao norte do Cruzeiro do Sul. É a gigante vermelha mais próxima do Sol." },
            { id: "c2", x: 1200, y: 2500, name: "Acrux", dist: "320 ly", mag: "0.77", desc: "A estrela mais brilhante da constelação e a mais ao sul, apontando para o polo celeste." },
            { id: "c3", x: 1100, y: 2350, name: "Becrux", dist: "280 ly", mag: "1.25", desc: "Também conhecida como Mimosa, é uma gigante azul extremamente quente." },
            { id: "c4", x: 1300, y: 2350, name: "Delta Crucis", dist: "345 ly", mag: "2.79", desc: "Uma estrela subgigante azul-branca, a quarta mais brilhante da constelação." },
            { id: "c5", x: 1230, y: 2390, name: "Epsilon Crucis", dist: "228 ly", mag: "3.59", desc: "Conhecida como 'Intrometida', é uma gigante laranja que quebra a simetria da cruz." }
        ],
        links: [["c1", "c2"], ["c3", "c4"]]
    },
    {
        name: "Ursa Maior",
        stars: [
            { id: "um1", x: 3200, y: 500, name: "Dubhe", dist: "123 ly", mag: "1.81", desc: "Uma das estrelas 'apontadoras' que ajudam a localizar a Estrela Polar." },
            { id: "um2", x: 3100, y: 650, name: "Merak", dist: "79 ly", mag: "2.34", desc: "A outra estrela apontadora da concha da Ursa Maior." },
            { id: "um3", x: 2900, y: 680, name: "Phecda", dist: "84 ly", mag: "2.41", desc: "Marca a base da concha do 'Grande Carro'." },
            { id: "um4", x: 2800, y: 520, name: "Megrez", dist: "81 ly", mag: "3.32", desc: "A estrela mais fraca do asterismo principal da Ursa Maior." }
        ],
        links: [["um1", "um2"], ["um2", "um3"], ["um3", "um4"], ["um4", "um1"]]
    },
    {
        name: "Gêmeos",
        stars: [
            { id: "g1", x: 500, y: 500, name: "Castor", dist: "51 ly", mag: "1.58", desc: "Um sistema estelar complexo composto por seis estrelas, representando um dos gêmeos." },
            { id: "g2", x: 650, y: 500, name: "Pollux", color: "orange", dist: "34 ly", mag: "1.14", desc: "Uma gigante laranja e a estrela mais brilhante da constelação de Gêmeos." },
            { id: "g3", x: 500, y: 900, name: "Alhena", dist: "105 ly", mag: "1.93", desc: "Marca o 'pé' do gêmeo Pollux." }
        ],
        links: [["g1", "g2"], ["g2", "g3"]]
    },
    {
        name: "Peixe Austral",
        stars: [
            { id: "pa1", x: 3500, y: 3200, name: "Fomalhaut", dist: "25 ly", mag: "1.17", desc: "Conhecida como 'A Estrela Solitária do Outono', possui um disco de poeira ao seu redor." },
            { id: "pa2", x: 3700, y: 3300, name: "Aboras", dist: "130 ly", mag: "4.35", desc: "Uma estrela menor que ajuda a definir o corpo do peixe mítico." }
        ],
        links: [["pa1", "pa2"]]
    },
    {
        name: "Escorpião",
        stars: [
            { id: "s1", x: 2000, y: 2500, name: "Antares", color: "orange", dist: "550 ly", mag: "1.06", desc: "O 'coração' do Escorpião. É uma supergigante vermelha rival de Marte em brilho e cor." },
            { id: "s2", x: 1900, y: 2400, name: "Acrab", dist: "400 ly", mag: "2.56", desc: "Um sistema de estrelas múltiplas que marca a cabeça do escorpião." },
            { id: "s6", x: 2050, y: 3000, name: "Shaula", dist: "570 ly", mag: "1.62", desc: "Localizada no ferrão, é a segunda estrela mais brilhante da constelação." }
        ],
        links: [["s2", "s1"], ["s1", "s6"]]

    }, {
        name: "Touro",
        stars: [
            { id: "t1", x: 1000, y: 1300, name: "Aldebaran", color: "orange", dist: "65 ly", mag: "0.85", desc: "O 'olho' do Touro. Uma gigante laranja que é a estrela mais brilhante da constelação." },
            { id: "t2", x: 850, y: 1200, name: "Elnath", dist: "130 ly", mag: "1.65", desc: "Localizada na ponta de um dos chifres, faz fronteira com a constelação de Cocheiro." },
            { id: "t3", x: 800, y: 1400, name: "Zeta Tauri", dist: "417 ly", mag: "2.97", desc: "Uma estrela binária massiva que marca a ponta do outro chifre." }
        ],
        links: [["t1", "t2"], ["t1", "t3"]]
    },
    {
        name: "Cisne",
        stars: [
            { id: "cy1", x: 2800, y: 2500, name: "Deneb", dist: "2600 ly", mag: "1.25", desc: "Uma das maiores e mais distantes estrelas visíveis a olho nu, marcando a cauda do cisne." },
            { id: "cy2", x: 3000, y: 2700, name: "Sadr", dist: "1500 ly", mag: "2.23", desc: "Localizada no centro da 'Cruz do Norte', onde as asas e o corpo se cruzam." },
            { id: "cy3", x: 3200, y: 2900, name: "Albireo", color: "orange", dist: "430 ly", mag: "3.05", desc: "Uma das estrelas duplas mais bonitas do céu, com cores azul e dourada contrastantes." }
        ],
        links: [["cy1", "cy2"], ["cy2", "cy3"]]
    },
    {
        name: "Andrômeda",
        stars: [
            { id: "a1", x: 3500, y: 800, name: "Alpheratz", dist: "97 ly", mag: "2.06", desc: "Conecta a constelação de Andrômeda ao Grande Quadrado de Pégaso." },
            { id: "a2", x: 3700, y: 1000, name: "Mirach", color: "orange", dist: "200 ly", mag: "2.07", desc: "Uma gigante vermelha fria usada frequentemente para localizar a Galáxia de Andrômeda." },
            { id: "a3", x: 3900, y: 1200, name: "Almach", dist: "350 ly", mag: "2.10", desc: "Uma estrela múltipla impressionante que marca o 'pé' de Andrômeda." }
        ],
        links: [["a1", "a2"], ["a2", "a3"]]
    }
];

// function para startar o map
function initMap() {
    const starCoords = {};

    constellations.forEach(con => {
        con.stars.forEach(s => {
            starCoords[s.id] = { x: s.x, y: s.y };

            const container = document.createElement('div');
            const label = document.createElement('div');
            label.className = 'constellation-label';
            label.innerText = con.name;
            label.style.left = `${con.stars[0].x + 50}px`;
            label.style.top = `${con.stars[0].y - 30}px`;
            sky.appendChild(label);
            container.className = 'star-container';
            container.style.left = `${s.x}px`;
            container.style.top = `${s.y}px`;

            container.innerHTML = `
                <div class="star ${s.color || ''}"></div>
                <div class="tooltip"><h3>${s.name}</h3><p>${con.name}</p></div>
            `;

            // evento de clique na estrela - modo select
            container.onclick = (e) => {
                if (currentMode !== 'select') return;
                e.stopPropagation(); // impede o fechamento ao clicar na estrela

                document.getElementById('star-name').innerText = s.name;
                document.getElementById('constellation-tag').innerText = con.name;
                document.getElementById('star-dist').innerText = s.dist || "--";
                document.getElementById('star-mag').innerText = s.mag || "--";
                document.getElementById('star-desc').innerText = s.desc || "Dados não disponíveis.";

                infoCard.classList.add('active');
            };

            starsLayer.appendChild(container);
        });

        // desenho das lines
        con.links.forEach(([fromId, toId]) => {
            const from = starCoords[fromId];
            const to = starCoords[toId];
            if (!from || !to) return;

            const dx = to.x - from.x;
            const dy = to.y - from.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const angle = Math.atan2(dy, dx) * 180 / Math.PI;

            const line = document.createElement('div');
            line.className = 'line';
            line.style.width = `${dist}px`;
            line.style.left = `${from.x + 10}px`;
            line.style.top = `${from.y + 10}px`;
            line.style.transform = `rotate(${angle}deg)`;
            linesLayer.appendChild(line);
        });
    });

    // for para gerar as estrelas de fundo aleatoriamente
    for (let i = 0; i < 700; i++) {
        const star = document.createElement('div');
        star.className = 'bg-star';
        const size = Math.random() * 2;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${Math.random() * 4000}px`;
        star.style.top = `${Math.random() * 4000}px`;
        star.style.opacity = Math.random() * 0.7;
        sky.prepend(star);
    }
}

// controle de tooltips e toolbar
const btnHand = document.getElementById('btn-hand');
const btnSelect = document.getElementById('btn-select');

btnHand.onclick = () => {
    currentMode = 'hand';
    btnHand.classList.add('active');
    btnSelect.classList.remove('active');
    viewport.classList.add('hand-mode');
    infoCard.classList.remove('active'); // fecha o card ao mudar de modo automaticamente
};

btnSelect.onclick = () => {
    currentMode = 'select';
    btnSelect.classList.add('active');
    btnHand.classList.remove('active');
    viewport.classList.remove('hand-mode');
};

// vw para arrastar o mapa
viewport.onmousedown = (e) => {
    if (currentMode !== 'hand') return;
    isDragging = true;
    startX = e.clientX - translateX;
    startY = e.clientY - translateY;
    sky.style.transition = 'none';
};

window.onmousemove = (e) => {
    if (!isDragging) return;
    translateX = e.clientX - startX;
    translateY = e.clientY - startY;
    sky.style.transform = `translate(${translateX}px, ${translateY}px)`;
};

window.onmouseup = () => {
    isDragging = false;
    sky.style.transition = 'transform 0.1s ease-out';
};

// fecha o info card
document.getElementById('close-card').onclick = () => {
    infoCard.classList.remove('active');
};

// starta a aplicação
initMap();
feather.replace(); // Inicializa os ícones do Feather
sky.style.transform = `translate(${translateX}px, ${translateY}px)`;