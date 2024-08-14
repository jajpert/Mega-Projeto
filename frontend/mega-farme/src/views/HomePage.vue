<template lang="pug">
main.container-cliente
    .produtos
        router-link.produto(v-for="produto in produtos" :key="produto.id" :to="{name: 'produto', params:{id: produto.id}}")
            .container-img
                img.imagem(:src="produto.img")
                p.nome-produto {{produto.name}}
</template>

<script>

export default {
    props: true,
  name: "HomePage",
  components: {
  },
  data() {
    return {
      produtos: [
        {
          id: 1,
          img: require("../assets/pharma-remedio.png"),
          name: "produto 1",
        },
        {
          id: 2,
          img: require("../assets/pharma-remedio.png"),
          name: "produto 2",
        },
        {
          id: 3,
          img: require("../assets/pharma-remedio.png"),
          name: "produto 3",
        },
        {
          id: 4,
          img: require("../assets/pharma-remedio.png"),
          name: "produto 4",
        },
        {
          id: 5,
          img: require("../assets/pharma-remedio.png"),
          name: "produto 5",
        },
        {
          id: 6,
          img: require("../assets/pharma-remedio.png"),
          name: "produto 6",
        },
        {
          id: 7,
          img: require("../assets/pharma-remedio.png"),
          name: "produto 7",
        },
        {
          id: 8,
          img: require("../assets/pharma-remedio.png"),
          name: "produto 8",
        },
        {
          id: 9,
          img: require("../assets/pharma-remedio.png"),
          name: "produto 9",
        },
        {
          id: 10,
          img: require("../assets/pharma-remedio.png"),
          name: "produto 10",
        },
        {
          id: 11,
          img: require("../assets/pharma-remedio.png"),
          name: "produto 11",
        },
        {
          id: 12,
          img: require("../assets/pharma-remedio.png"),
          name: "produto 12",
        },
        {
          id: 13,
          img: require("../assets/pharma-remedio.png"),
          name: "produto 13",
        },
        {
          id: 14,
          img: require("../assets/pharma-remedio.png"),
          name: "produto 14",
        },
        {
          id: 15,
          img: require("../assets/pharma-remedio.png"),
          name: "produto 15",
        },
      ],
    };
  },
  // computed:{
  //     ...mapState(["name"]),
  // },
};
</script>

<style lang="scss" scoped>
main.container-cliente {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 50px;
  .produtos {
    margin: 0 auto;
    width: 1200px;
    height: 100px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 30px;
    .produto {
      .container-img {
        border: 2px solid #000;
        border-radius: 10px;
        position: relative;
        padding-bottom: 20px;
        cursor: pointer;
        img.imagem {
          display: block;
          max-width: 180px;
        }
        .nome-produto {
          text-align: center;
          position: absolute;
          bottom: 10px;
          display: flex;
          justify-content: center;
          right: 29%;
        }
      }
      &:hover {
        background: rgba(0, 0, 0, 0.1); /* Escurece o fundo da .container-img */
      }
    }
  }
}
</style>
