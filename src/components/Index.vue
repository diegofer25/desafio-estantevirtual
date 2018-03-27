<template>
  <div>

    <div v-if="!login" class="mt-5 container jumbotron text-center">
      <h1>{{title}}</h1>
      <p>Etapa 1 - Diego Lamarão</p>
      <button class="btn btn-info btn-lg" @click="login = true">ENTRAR</button>
    </div>
    <div v-else>
      <addressform></addressform>
      <addressmanage></addressmanage>
    </div>

  </div>
</template>

<script>
import AddressForm from './addressService/AddressForm'
import AddressManage from './addressService/AddressManage'

export default {
  name: 'Index',

  data () {
    return {
      title: 'Desafio Estante Virtual',
      login: false
    }
  },

  components: {
    addressform: AddressForm,
    addressmanage: AddressManage
  }
}
</script>

<style>
  body {
    background: lightblue;
  }
</style>
