<template>
  <div>
    <b-navbar toggleable="md" type="dark" variant="info">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand href="#">{{title}}</b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav class="ml-auto">
          <b-navbar-nav>
            <b-nav-item>
              <b-nav-item-dropdown right>
                <template slot="button-content">
                  <em class="btn">Olá {{user.name}}</em>
                  <img class="rounded-img" width="60px" :src="user.photo" alt="">
                </template>
                <b-dropdown-item href="#" class="text-center">
                  <button @click="logoff" class="btn btn-info">
                    <span class="fa fa-power-off"></span> Logoff
                  </button>
                </b-dropdown-item>
              </b-nav-item-dropdown>
            </b-nav-item>
          </b-navbar-nav>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <div class="row">
      <button class="btn btn-info ml-5 mt-4 float-left" @click="showModal()">
        <span class="fa fa-plus"></span> Cadastrar Novo Endereço</button>
    </div>

    <b-modal ref="myModalRef" hide-footer title="Cadastro de novo endereço">
      <addressfrom></addressfrom>
    </b-modal>

    <div class="center">
      <addressmanage :user="user"></addressmanage>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Navbar } from 'bootstrap-vue/es/components'
import router from '../router'
import AddressForm from './addressService/AddressForm'
import AddressManager from './addressService/AddressManager'
import bModal from 'bootstrap-vue/es/components/modal/modal'
import store from '../vuex/store'
Vue.use(Navbar)

export default {
  name: 'Menu',

  data () {
    return {
      title: 'Desafio Estante Virtual',
      user: '',
      list: ''
    }
  },

  mounted () {
    this.user = store.state.user
    this.getUserLocation()
  },

  methods: {
    logoff () {
      let user = store.state.user
      user.auth = ''
      user.id = ''
      user.name = ''
      user.photo = ''
      user.location = ''
      router.push('/')
    },

    showModal () {
      this.$refs.myModalRef.show()
    },

    hideModal () {
      this.$refs.myModalRef.hide()
    },

    getUserLocation () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          store.state.user.location = position.coords.latitude + ' ' + position.coords.longitude
        })
      } else {
        store.state.user.location = null
        alert('Precisamos da sua localização para uma melhor experiencia com o aplicativo')
      }
    }
  },

  components: {
    addressfrom: AddressForm,
    addressmanage: AddressManager,
    'b-modal': bModal
  }
}
</script>

<style scoped>
  .rounded-img {
    border-radius: 30px;
  }
</style>
