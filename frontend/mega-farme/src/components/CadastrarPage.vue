<template lang="pug">
section.login
    h1  Login
    form
        label(for="email") email
        input(type="email" name="email" id="email" v-model="login.email")
        label(for="senha") senha
        input(type="password" name="senha" id="senha" v-model="login.senha")
        button(class="btn" @click.prevent="logar")
    a(href="/" target="_blank") Perdeu a senha? clique aqui!
</template>

<script>
export default{
    name: "LoginPage",
    data(){
        return{
            login: {
                email: "",
                senha: ""
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.login{
    display: flex;
    flex-direction: column;
    width: 350px;
    height: 300px;
    margin-top: 100px;
    justify-content: center;
    border: 1px solid rgb(217, 46, 16);
    margin: 0 auto;
    margin-top: 30px;
    padding: 20px;
    border-radius: 10px;
    h1{
        text-align: center;
        margin-bottom: 10px;
    }
    form{
        display: flex;
        flex-direction: column;
        input{
            width: 300px;
            height: 30px;
            border-radius: 10px;
            border: 2px solid rgb(217, 46, 16);
            color: #000;
            font-weight: bold;
            text-align: center;
            margin: 5px 0;
            &:active {
                background: rgba($color: #000000, $alpha: 0.8);
            }

            &:focus {
                border: 2px solid rgb(217, 46, 16);
                background: rgba($color: #000000, $alpha: 0.02);
                outline: none;
            }
        }
        label{
            text-transform: capitalize;
            font-weight: 600;
}
    }
}
</style>
