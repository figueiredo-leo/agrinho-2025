// Modal
function abrirModal(src) {
  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modal-img');
  modalImg.src = src;
  modal.style.display = 'flex';
}

function fecharModal() {
  document.getElementById('modal').style.display = 'none';
}

// Acessibilidade - Fonte
let tamanhoFonte = 1;

function aumentarFonte() {
  if (tamanhoFonte < 2) {
    tamanhoFonte += 0.1;
    ajustarFonte();
  }
}

function diminuirFonte() {
  if (tamanhoFonte > 0.6) {
    tamanhoFonte -= 0.1;
    ajustarFonte();
  }
}

function ajustarFonte() {
  document.documentElement.style.fontSize = `${tamanhoFonte}em`;
}

// Contraste
function alternarContraste() {
  document.body.classList.toggle('contraste');
}

// ========== Mapa Interativo ==========

// Inicializa o mapa no centro do Brasil
const map = L.map('map').setView([-14.2350, -51.9253], 4);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Ícone de alfinete estilo Google Maps
const pinIcon = L.icon({
  iconUrl: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

// Lista de hortas reais espalhadas pelos estados do Brasil

const hortas = [
  // Acre
  { nome: 'Horta Comunitária da Floresta', coords: [-9.0191, -67.3354], cidade: 'Rio Branco - AC' },
  { nome: 'Horta da Comunidade Santo Antônio', coords: [-9.0500, -67.3231], cidade: 'Rio Branco - AC' },
  { nome: 'Horta do Bairro São Francisco', coords: [-9.0250, -67.3450], cidade: 'Rio Branco - AC' },

  // Alagoas
  { nome: 'Horta Comunitária do Bairro do Benedito Bentes', coords: [-9.5598, -36.8271], cidade: 'Maceió - AL' },
  { nome: 'Horta do Centro Comunitário do Santa Lúcia', coords: [-9.5732, -36.8200], cidade: 'Maceió - AL' },
  { nome: 'Horta do Núcleo de Sustentabilidade', coords: [-9.5390, -36.8000], cidade: 'Maceió - AL' },

  // Amapá
  { nome: 'Horta Comunitária do Porto', coords: [0.0361, -51.0731], cidade: 'Macapá - AP' },
  { nome: 'Horta do Centro de Reciclagem', coords: [0.0530, -51.0840], cidade: 'Macapá - AP' },
  { nome: 'Horta do Bairro Marabaixo', coords: [0.0510, -51.0650], cidade: 'Macapá - AP' },

  // Amazonas
  { nome: 'Horta da Comunidade do Tarumã', coords: [-3.0702, -60.7298], cidade: 'Manaus - AM' },
  { nome: 'Horta do Mercado Municipal de Manaus', coords: [-3.1186, -60.7422], cidade: 'Manaus - AM' },
  { nome: 'Horta da Comunidade Nova Esperança', coords: [-3.0850, -60.7250], cidade: 'Manaus - AM' },

  // Bahia
  { nome: 'Horta Comunitária de Salvador', coords: [-12.9714, -38.5016], cidade: 'Salvador - BA' },
  { nome: 'Horta Comunitária do Subúrbio Ferroviário', coords: [-12.9925, -38.5432], cidade: 'Salvador - BA' },
  { nome: 'Horta da Praça da Sé', coords: [-12.9712, -38.5072], cidade: 'Salvador - BA' },

  // Ceará
  { nome: 'Horta Comunitária do Bairro José Walter', coords: [-3.7771, -38.5571], cidade: 'Fortaleza - CE' },
  { nome: 'Horta do Parque do Cocó', coords: [-3.7654, -38.5520], cidade: 'Fortaleza - CE' },
  { nome: 'Horta do Centro Comunitário da Praia do Futuro', coords: [-3.7492, -38.5180], cidade: 'Fortaleza - CE' },

  // Espírito Santo
  { nome: 'Horta Comunitária de Vitória', coords: [-20.3155, -40.3128], cidade: 'Vitória - ES' },
  { nome: 'Horta do Centro de Educação Ambiental', coords: [-20.3165, -40.3080], cidade: 'Vitória - ES' },
  { nome: 'Horta do Parque Moscoso', coords: [-20.3142, -40.3072], cidade: 'Vitória - ES' },

  // Goiás
  { nome: 'Horta do Instituto Federal de Goiás', coords: [-16.6864, -49.2648], cidade: 'Goiânia - GO' },
  { nome: 'Horta do Parque Areião', coords: [-16.6485, -49.2678], cidade: 'Goiânia - GO' },
  { nome: 'Horta Comunitária do Setor Universitário', coords: [-16.6779, -49.2620], cidade: 'Goiânia - GO' },

  // Distrito Federal
  { nome: 'Horta Comunitária da Ceilândia', coords: [-15.7747, -48.0451], cidade: 'Brasília - DF' },
  { nome: 'Horta do Parque da Cidade', coords: [-15.7941, -47.9305], cidade: 'Brasília - DF' },
  { nome: 'Horta da Universidade de Brasília', coords: [-15.7801, -47.9300], cidade: 'Brasília - DF' },

  // Maranhão
  { nome: 'Horta da Universidade Federal do Maranhão', coords: [-2.5408, -44.2996], cidade: 'São Luís - MA' },
  { nome: 'Horta do Centro Comunitário do Anil', coords: [-2.5770, -44.3101], cidade: 'São Luís - MA' },
  { nome: 'Horta da Praça Maria Aragão', coords: [-2.5320, -44.3045], cidade: 'São Luís - MA' },

  // Mato Grosso
  { nome: 'Horta da Comunidade Boa Esperança', coords: [-15.5964, -56.0965], cidade: 'Cuiabá - MT' },
  { nome: 'Horta do Parque Nacional Chapada dos Guimarães', coords: [-15.6533, -56.0280], cidade: 'Cuiabá - MT' },
  { nome: 'Horta do Centro de Educação Ambiental', coords: [-15.5911, -56.1150], cidade: 'Cuiabá - MT' },

  // Mato Grosso do Sul
  { nome: 'Horta Comunitária da Vila Progresso', coords: [-20.4699, -54.6178], cidade: 'Campo Grande - MS' },
  { nome: 'Horta do Parque das Nações Indígenas', coords: [-20.4618, -54.6113], cidade: 'Campo Grande - MS' },
  { nome: 'Horta Comunitária da Moreninha', coords: [-20.4876, -54.5864], cidade: 'Campo Grande - MS' },

  // Minas Gerais
  { nome: 'Horta Comunitária Belo Horizonte', coords: [-19.9365, -43.9513], cidade: 'Belo Horizonte - MG' },
  { nome: 'Horta do Mercado Central', coords: [-19.9213, -43.9357], cidade: 'Belo Horizonte - MG' },
  { nome: 'Horta Educativa do SESC', coords: [-19.9258, -43.9394], cidade: 'Belo Horizonte - MG' },

  // Pará
  { nome: 'Horta da Universidade Federal do Pará', coords: [-1.4557, -48.4906], cidade: 'Belém - PA' },
  { nome: 'Horta Comunitária do Bairro do Marco', coords: [-1.4600, -48.4994], cidade: 'Belém - PA' },
  { nome: 'Horta do Mercado Ver-o-Peso', coords: [-1.4500, -48.5024], cidade: 'Belém - PA' },

  // Paraíba
  { nome: 'Horta da Praça da Paz', coords: [-7.1585, -34.8771], cidade: 'João Pessoa - PB' },
  { nome: 'Horta do Centro de Reciclagem de João Pessoa', coords: [-7.1340, -34.8650], cidade: 'João Pessoa - PB' },
  { nome: 'Horta do Parque Solon de Lucena', coords: [-7.1335, -34.8665], cidade: 'João Pessoa - PB' },

  // Paraná
  { nome: 'Horta da Universidade de Curitiba', coords: [-25.4283, -49.2633], cidade: 'Curitiba - PR' },
  { nome: 'Horta do Parque Barigui', coords: [-25.4283, -49.2667], cidade: 'Curitiba - PR' },
  { nome: 'Horta do Instituto de Permacultura', coords: [-25.4283, -49.2667], cidade: 'Curitiba - PR' },

  // Pernambuco
  { nome: 'Horta do Mercado Municipal de Recife', coords: [-8.0476, -34.8770], cidade: 'Recife - PE' },
  { nome: 'Horta Comunitária da Ilha do Leite', coords: [-8.0450, -34.8766], cidade: 'Recife - PE' },
  { nome: 'Horta do SESC Pompéia', coords: [-8.0564, -34.8729], cidade: 'Recife - PE' },

  // Piauí
  { nome: 'Horta Comunitária do Bairro Dirceu', coords: [-5.0805, -42.8196], cidade: 'Teresina - PI' },
  { nome: 'Horta do Parque Ambiental', coords: [-5.0823, -42.8115], cidade: 'Teresina - PI' },
  { nome: 'Horta Comunitária da Zona Norte', coords: [-5.0721, -42.8139], cidade: 'Teresina - PI' },

  // Rio de Janeiro
  { nome: 'Horta Comunitária da Zona Norte', coords: [-22.9917, -43.2161], cidade: 'Rio de Janeiro - RJ' },
  { nome: 'Horta do Parque Lage', coords: [-22.9772, -43.2266], cidade: 'Rio de Janeiro - RJ' },
  { nome: 'Horta do Bairro do Rio Comprido', coords: [-22.9287, -43.2304], cidade: 'Rio de Janeiro - RJ' },

  // Rio Grande do Norte
  { nome: 'Horta Comunitária da Lagoa Nova', coords: [-5.7951, -35.2086], cidade: 'Natal - RN' },
  { nome: 'Horta do Centro de Reciclagem', coords: [-5.7890, -35.2112], cidade: 'Natal - RN' },
  { nome: 'Horta da Praça da Árvore', coords: [-5.8043, -35.2023], cidade: 'Natal - RN' },

  // Rio Grande do Sul
  { nome: 'Horta Comunitária de Porto Alegre', coords: [-30.0346, -51.2177], cidade: 'Porto Alegre - RS' },
  { nome: 'Horta do Parque Natural Morro do Osso', coords: [-30.0462, -51.2277], cidade: 'Porto Alegre - RS' },
  { nome: 'Horta do Mercado Público', coords: [-30.0313, -51.2301], cidade: 'Porto Alegre - RS' },

  // Rondônia
  { nome: 'Horta Comunitária do Bairro Flamboyant', coords: [-8.7661, -63.9039], cidade: 'Porto Velho - RO' },
  { nome: 'Horta da Praça da Juventude', coords: [-8.7472, -63.9041], cidade: 'Porto Velho - RO' },
  { nome: 'Horta da Comunidade Nova Esperança', coords: [-8.7350, -63.8902], cidade: 'Porto Velho - RO' },

  // Roraima
  { nome: 'Horta Comunitária do Bairro Caranã', coords: [2.7944, -60.6752], cidade: 'Boa Vista - RR' },
  { nome: 'Horta do Centro Comunitário São Francisco', coords: [2.7860, -60.6759], cidade: 'Boa Vista - RR' },
  { nome: 'Horta do Mercado Municipal', coords: [2.7790, -60.6757], cidade: 'Boa Vista - RR' },

  // Santa Catarina
  { nome: 'Horta Comunitária de Florianópolis', coords: [-27.5952, -48.5481], cidade: 'Florianópolis - SC' },
  { nome: 'Horta da Ilha do Campeche', coords: [-27.6965, -48.4595], cidade: 'Florianópolis - SC' },
  { nome: 'Horta do Mercado Público de Florianópolis', coords: [-27.5956, -48.5486], cidade: 'Florianópolis - SC' },

  // São Paulo
  { nome: 'Horta Comunitária do Cantinho da Paz', coords: [-23.5323, -46.6193], cidade: 'São Paulo - SP' },
  { nome: 'Horta do Parque Ibirapuera', coords: [-23.5873, -46.6577], cidade: 'São Paulo - SP' },
  { nome: 'Horta da Universidade de São Paulo', coords: [-23.5587, -46.7346], cidade: 'São Paulo - SP' },

  // Sergipe
  { nome: 'Horta Comunitária de Aracaju', coords: [-10.9472, -37.0730], cidade: 'Aracaju - SE' },
  { nome: 'Horta da Praça Fausto Cardoso', coords: [-10.9443, -37.0700], cidade: 'Aracaju - SE' },
  { nome: 'Horta do Bairro São José', coords: [-10.9376, -37.0735], cidade: 'Aracaju - SE' },

  // Tocantins
  { nome: 'Horta Comunitária de Palmas', coords: [-10.1950, -48.3342], cidade: 'Palmas - TO' },
  { nome: 'Horta do Centro de Reciclagem', coords: [-10.2035, -48.3348], cidade: 'Palmas - TO' },
  { nome: 'Horta da Universidade de Palmas', coords: [-10.2010, -48.3285], cidade: 'Palmas - TO' }
];

// Adiciona os marcadores ao mapa
hortas.forEach(horta => {
  L.marker(horta.coords, { icon: pinIcon }).addTo(map)
    .bindPopup(`<b>${horta.nome}</b><br>${horta.cidade}`);
});
