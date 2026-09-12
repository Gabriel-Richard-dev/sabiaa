// Dados fictícios do protótipo. Tudo vive em memória (ver App.js).

export const TOTAL_TURMA = 28;

export const ALUNO = { nome: 'Gabriel', turma: '9º A' };

// XP mínimo dos níveis 6, 7, 8...; o aluno do mock já começa no 6 (840/1000 XP, como na spec)
// depois do último, um nível a cada 500 XP
export const niveis = [0, 1000, 1200, 1500, 2000];

export function nivel(xp) {
  const ultimo = niveis[niveis.length - 1];
  if (xp >= ultimo) {
    const extra = Math.floor((xp - ultimo) / 500);
    return { n: 5 + niveis.length + extra, min: ultimo + extra * 500, prox: ultimo + (extra + 1) * 500 };
  }
  const i = niveis.filter((m) => xp >= m).length - 1;
  return { n: 6 + i, min: niveis[i], prox: niveis[i + 1] };
}

export const categorias = ['ROUPAS', 'ACESSÓRIOS', 'CHAPÉUS', 'ITENS'];

// x/y (canto superior esquerdo) e tam em fração do quadro 640x640 dos vídeos idle; icone = nome no MaterialCommunityIcons
// nivel = nível em que o item é desbloqueado (os de nível 7 são a "próxima recompensa" da home)
export const itens = [
  { id: 'camiseta', cat: 'ROUPAS', nome: 'Camiseta da escola', icone: 'tshirt-crew', cor: '#45b6ff', nivel: 6, slot: 'corpo', x: 0.37, y: 0.44, tam: 0.36 },
  { id: 'interclasse', cat: 'ROUPAS', nome: 'Camisa do interclasse', icone: 'tshirt-v', cor: '#22c58b', nivel: 9, slot: 'corpo', x: 0.37, y: 0.44, tam: 0.36 },
  { id: 'oculos', cat: 'ACESSÓRIOS', nome: 'Óculos escuros', icone: 'sunglasses', cor: '#030021', nivel: 6, slot: 'rosto', x: 0.41, y: 0.2, tam: 0.34 },
  { id: 'laco', cat: 'ACESSÓRIOS', nome: 'Gravata borboleta', icone: 'bow-tie', cor: '#ff5d73', nivel: 6, slot: 'pescoco', x: 0.53, y: 0.43, tam: 0.14 },
  { id: 'colar', cat: 'ACESSÓRIOS', nome: 'Colar de estrela', icone: 'necklace', cor: '#ffc247', nivel: 8, slot: 'pescoco', x: 0.51, y: 0.41, tam: 0.18 },
  { id: 'bone', cat: 'CHAPÉUS', nome: 'Boné do Sabiá', icone: 'hat-fedora', cor: '#1f97e8', nivel: 7, slot: 'cabeca', x: 0.44, y: 0, tam: 0.24 },
  { id: 'mago', cat: 'CHAPÉUS', nome: 'Chapéu de mago', icone: 'wizard-hat', cor: '#5a43e2', nivel: 9, slot: 'cabeca', x: 0.42, y: -0.05, tam: 0.28 },
  { id: 'coroa', cat: 'CHAPÉUS', nome: 'Coroa', icone: 'crown', cor: '#ffc247', nivel: 10, slot: 'cabeca', x: 0.47, y: 0.07, tam: 0.2 },
  { id: 'livro', cat: 'ITENS', nome: 'Livro favorito', icone: 'book-open-variant', cor: '#ff5d73', nivel: 6, slot: 'item', x: 0.64, y: 0.61, tam: 0.22 },
  { id: 'bola', cat: 'ITENS', nome: 'Bola de futebol', icone: 'soccer', cor: '#030021', nivel: 7, slot: 'item', x: 0.63, y: 0.75, tam: 0.18 },
  { id: 'mochila', cat: 'ITENS', nome: 'Mochila escolar', icone: 'bag-personal', cor: '#ff5d73', nivel: 8, slot: 'costas', x: 0.14, y: 0.44, tam: 0.28 },
  { id: 'violao', cat: 'ITENS', nome: 'Violão', icone: 'guitar-acoustic', cor: '#d99a1c', nivel: 9, slot: 'item', x: 0.55, y: 0.45, tam: 0.34 },
];

export const notas = [
  { disc: 'Matemática', hist: [7.2, 8.0, 8.7] },
  { disc: 'Português', hist: [8.4, 8.8, 9.1] },
  { disc: 'História', hist: [7.5, 8.0, 8.4] },
  { disc: 'Ciências', hist: [8.1, 8.9, 9.3] },
];

export const slides = [
  {
    titulo: 'Frações no dia a dia',
    texto: 'Uma pizza foi dividida em 8 fatias iguais. Cada fatia é 1/8 da pizza.',
  },
  {
    titulo: 'Pergunta rápida',
    pergunta: 'Ana comeu 3/8 e Leo comeu 2/8 da pizza. Quanto eles comeram juntos?',
    opcoes: ['5/16', '5/8', '1/8', '6/8'],
    certa: 1,
  },
  {
    titulo: 'Enquete',
    pergunta: 'Como você está com frações?',
    opcoes: ['Ainda confuso', 'Tranquilo', 'Domino o assunto'],
  },
];

export const atividadesIniciais = [
  {
    id: 1,
    materia: 'Matemática',
    titulo: 'Equações do 2º grau',
    desc: 'Raízes e discriminante',
    entrega: 'Entrega hoje',
    concluiram: 17,
    perguntas: [
      { p: 'Quais são as raízes de x² − 5x + 6 = 0?', opcoes: ['2 e 3', '1 e 6', '−2 e −3'], certa: 0 },
      { p: 'Em x² + 4x − 5 = 0, quanto vale o Δ?', opcoes: ['16', '36', '−4'], certa: 1 },
      { p: 'Se Δ < 0, a equação tem:', opcoes: ['Duas raízes reais', 'Uma raiz real', 'Nenhuma raiz real'], certa: 2 },
    ],
  },
  {
    id: 2,
    materia: 'Português',
    titulo: 'Figuras de linguagem',
    desc: 'Metáfora, hipérbole e companhia',
    entrega: 'Entrega amanhã',
    concluiram: 12,
    perguntas: [
      { p: '"Ela é uma flor" é um exemplo de:', opcoes: ['Metáfora', 'Hipérbole', 'Onomatopeia'], certa: 0 },
      { p: '"Estou morrendo de fome" é um exemplo de:', opcoes: ['Ironia', 'Hipérbole', 'Metonímia'], certa: 1 },
    ],
  },
  {
    id: 3,
    materia: 'Ciências',
    titulo: 'Sistema solar',
    desc: 'Atividade extra de Ciências',
    entrega: 'Entrega sexta',
    concluiram: 9,
    perguntas: [
      { p: 'Qual é o maior planeta?', opcoes: ['Saturno', 'Júpiter', 'Netuno'], certa: 1 },
      { p: 'Qual planeta é conhecido como planeta vermelho?', opcoes: ['Marte', 'Vênus', 'Mercúrio'], certa: 0 },
    ],
  },
  {
    id: 4,
    materia: 'História',
    titulo: 'Revolução Industrial',
    desc: 'Revisão para o trabalho',
    entrega: 'Próxima semana',
    concluiram: 5,
    perguntas: [
      { p: 'Em qual país começou a Revolução Industrial?', opcoes: ['França', 'Inglaterra', 'Alemanha'], certa: 1 },
      { p: 'Qual máquina foi símbolo da 1ª Revolução Industrial?', opcoes: ['Máquina a vapor', 'Computador', 'Motor elétrico'], certa: 0 },
    ],
  },
];

// icone = nome no MaterialCommunityIcons
export const avisos = [
  { id: 'horario', tipo: 'IMPORTANTE', icone: 'alert-circle', titulo: 'Alteração no horário de amanhã', quando: 'Publicado hoje', texto: 'Amanhã as aulas começam às 8h por causa da reunião de professores. A saída continua no horário normal.' },
  { id: 'feira', tipo: 'EVENTO', icone: 'party-popper', titulo: 'Feira de Ciências', quando: 'Sexta-feira • 14h', texto: 'Os projetos das turmas do 6º ao 9º ano ficam expostos no pátio. Passe para ver os experimentos e votar no seu favorito. Famílias são bem-vindas!' },
  { id: 'historia', tipo: 'ACADÊMICO', icone: 'book-open-variant', titulo: 'Entrega do trabalho de História', quando: 'Até segunda-feira', texto: 'O trabalho sobre a Revolução Industrial pode ser feito em dupla e deve ser entregue pelo app até segunda-feira, 23h59.' },
  { id: 'interclasse', tipo: 'COMPETIÇÃO', icone: 'trophy', titulo: 'Interclasse 2026', quando: 'Inscrições até dia 20', texto: 'Futsal, vôlei, queimada e xadrez. Monte seu time com a turma e faça a inscrição com o professor de Educação Física.' },
  { id: 'plantao', tipo: 'ACADÊMICO', icone: 'book-open-variant', titulo: 'Plantão de dúvidas de Matemática', quando: 'Quarta-feira • 15h', texto: 'O professor Marcos atende na biblioteca para tirar dúvidas sobre equações do 2º grau antes da prova.' },
];

export const comunidades = [
  {
    id: 'xadrez', icone: 'chess-knight', nome: 'Xadrez', membros: 12,
    desc: 'Partidas amistosas e dicas de abertura. Tem tabuleiro na biblioteca para quem não tiver.',
    encontro: { titulo: 'Xadrez no intervalo', dia: 'Hoje', hora: '10:30', local: 'Pátio', interessados: 8 },
    recados: [{ autor: 'Lucas · 8º B', txt: 'Alguém topa uma revanche hoje?' }, { autor: 'Profa. Rita', txt: 'Chegaram tabuleiros novos na biblioteca!' }],
  },
  {
    id: 'desenho', icone: 'palette', nome: 'Clube de Desenho', membros: 24,
    desc: 'Desenho livre, quadrinhos e dicas entre colegas. Todo mundo começa de algum lugar.',
    encontro: { titulo: 'Desenho livre', dia: 'Hoje', hora: '15:00', local: 'Biblioteca', interessados: 11 },
    recados: [{ autor: 'Maju · 6º A', txt: 'Vou levar lápis de cor para dividir.' }],
  },
  {
    id: 'futebol', icone: 'soccer', nome: 'Futebol', membros: 31,
    desc: 'Racha na quadra e treino para o interclasse.',
    encontro: { titulo: 'Racha na quadra', dia: 'Amanhã', hora: '16:00', local: 'Quadra', interessados: 14 },
    recados: [{ autor: 'Davi · 9º A', txt: 'Faltam 2 para fechar o time!' }],
  },
  {
    id: 'jogos', icone: 'gamepad-variant', nome: 'Jogos', membros: 18,
    desc: 'Jogos de tabuleiro, cartas e estratégia na sala de jogos.',
    encontro: { titulo: 'Torneio de jogos de tabuleiro', dia: 'Sexta', hora: '14:00', local: 'Sala de jogos', interessados: 9 },
    recados: [{ autor: 'Enzo · 9º A', txt: 'Quem traz o Uno?' }],
  },
  {
    id: 'estudos', icone: 'book-open-variant', nome: 'Grupo de Estudos', membros: 15,
    desc: 'Um ajuda o outro. Revisões antes das provas.',
    encontro: { titulo: 'Revisão de Matemática', dia: 'Quarta', hora: '15:00', local: 'Biblioteca', interessados: 6 },
    recados: [{ autor: 'Lara · 9º A', txt: 'Fiz um resumo de equações, levo impresso.' }],
  },
];

export const desenhos = [
  { autor: 'Bia', turma: '8º B', emoji: '🐶', titulo: 'Meu cachorro Pipoca', curtidas: 14 },
  { autor: 'Lara', turma: '7º C', emoji: '🌻', titulo: 'O jardim da vó', curtidas: 21 },
  { autor: 'Davi', turma: '9º A', emoji: '⚽', titulo: 'Jogar bola com os amigos', curtidas: 9 },
  { autor: 'Enzo', turma: '9º A', emoji: '🎸', titulo: 'Tocar violão', curtidas: 7 },
  { autor: 'Maju', turma: '6º A', emoji: '🌈', titulo: 'Dia de chuva e sol', curtidas: 18 },
  { autor: 'Théo', turma: '8º A', emoji: '🍕', titulo: 'Pizza de sexta', curtidas: 11 },
];

// respostas prontas da "IA": o objetivo é mostrar o conceito de tutora, não resolver por ela
export const iaRespostas = [
  { p: 'Como começo essa questão?', r: 'Vamos por partes!\n\nPrimeiro, descubra qual informação a questão está pedindo.\n\nDica: observe os números apresentados no enunciado.' },
  { p: 'Não entendi essa questão.', r: 'Vamos resolver juntos!\n\nPrimeiro, identifique qual informação a questão está pedindo. Depois, separe os dados que ela já te dá.' },
  { p: 'Me dá uma dica?', r: 'Claro! Numa equação do 2º grau, comece achando a, b e c. Depois calcule Δ = b² − 4ac.' },
  { p: 'Mostra um exemplo?', r: 'Veja este:\n\nx² − 5x + 6 = 0\na = 1, b = −5, c = 6\nΔ = 25 − 24 = 1\nx = (5 ± 1) / 2 → x = 3 ou x = 2\n\nAgora tenta a sua do mesmo jeito!' },
];
export const iaPadrao = 'Boa pergunta! Me conta qual parte do enunciado ficou confusa. Não vou te dar a resposta pronta, mas vou te ajudar a chegar lá.';

export const turmas = [
  { id: '9A', nome: '9º A', alunos: 28, participacao: 82, media: 7.6, hist: [64, 70, 76, 82] },
  { id: '8B', nome: '8º B', alunos: 31, participacao: 69, media: 6.9, hist: [58, 61, 66, 69] },
  { id: '1C', nome: '1º C (médio)', alunos: 26, participacao: 77, media: 7.2, hist: [71, 69, 74, 77] },
];

export const alunos9A = [
  { nome: 'Bruno Lima', xp: 1310, participacao: 93 },
  { nome: 'Carla Souza', xp: 1040, participacao: 88 },
  { nome: 'Davi Rocha', xp: 620, participacao: 64 },
  { nome: 'Elisa Martins', xp: 905, participacao: 81 },
  { nome: 'Felipe Nunes', xp: 475, participacao: 52 },
];

export const eventosIniciais = [
  { id: 1, titulo: 'Semana da Ciência', periodo: '15 a 19 de setembro', publico: 'Todas as turmas', bonus: 50 },
  { id: 2, titulo: 'Desafio de leitura', periodo: 'Outubro', publico: '8º e 9º anos', bonus: 30 },
];

export const humores = [
  { nome: 'Mal', icone: 'emoticon-cry-outline' },
  { nome: 'Chateado', icone: 'emoticon-sad-outline' },
  { nome: 'Normal', icone: 'emoticon-neutral-outline' },
  { nome: 'Bem', icone: 'emoticon-happy-outline' },
  { nome: 'Ótimo', icone: 'emoticon-excited-outline' },
];
export const humoresBase = [6, 14, 31, 42, 27]; // contagem agregada fictícia da escola
