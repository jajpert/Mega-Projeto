const state = {
  nome: "thales",
  produtos: [
    { id: "1", img: require("../../assets/pharma-remedio.png"), name: "produto 1", fabricante: "genérico", descricao: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.", valor:23 },
    { id: "2", img: require("../../assets/pharma-remedio.png"), name: "produto 2", fabricante: "sintetico", descricao: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.", valor: 8.40},
    { id: "3", img: require("../../assets/pharma-remedio.png"), name: "produto 3", fabricante: "genérico" , descricao: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.", valor: 12},
    { id: "4", img: require("../../assets/pharma-remedio.png"), name: "produto 4", fabricante: "genérico" , descricao: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.", valor: 23},
    { id: "5", img: require("../../assets/pharma-remedio.png"), name: "produto 5" , fabricante: "genérico" , descricao: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.", valor: 35},
    { id: "6", img: require("../../assets/pharma-remedio.png"), name: "produto 6", fabricante: "sintetico", descricao: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.", valor: 123},
    { id: "7", img: require("../../assets/pharma-remedio.png"), name: "produto 7" , fabricante: "genérico" , descricao: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.", valor: 30},
    { id: "8", img: require("../../assets/pharma-remedio.png"), name: "produto 8", fabricante: "sintetico", descricao: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.", valor: 12},
    { id: "9", img: require("../../assets/pharma-remedio.png"), name: "produto 9", fabricante: "sintetico", descricao: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.", valor: 90},
    { id: "10", img: require("../../assets/pharma-remedio.png"), name: "produto 10" , fabricante: "sintetico", descricao: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.", valor: 80},
    { id: "12", img: require("../../assets/pharma-remedio.png"), name: "produto 12" , fabricante: "genérico" , descricao: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.", valor: 120},
    { id: "13", img: require("../../assets/pharma-remedio.png"), name: "produto 13", fabricante: "sintetico", descricao: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.", valor: 40},
    { id: "14", img: require("../../assets/pharma-remedio.png"), name: "produto 14" , fabricante: "genérico" , descricao: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.", valor: 70},
    { id: "15", img: require("../../assets/pharma-remedio.png"), name: "produto 15" , fabricante: "genérico" , descricao: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.", valor: 50},
  ],
  produtoSelecionado: null,
};

const mutations = {
  SET_PRODUTO_SELECIONADO(state, produto) {
    state.produtoSelecionado = produto;
  },
};

const actions = {
  selecionarProduto({ commit }, produto) {
    commit('SET_PRODUTO_SELECIONADO', produto);
  },
};

const getters = {
  produtos: state => state.produtos, // Renomeado de listaProdutos para produtos
  nome: state => state.nome,
  produtoSelecionado: state => state.produtoSelecionado,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
