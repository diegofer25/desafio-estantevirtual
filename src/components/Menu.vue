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
                  <em class="btn">Olá {{user.displayName}}</em>
                  <img class="rounded-img" width="60px" :src="user.photoURL" alt="">
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
      <addressmanage></addressmanage>
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
Vue.use(Navbar)

export default {
  name: 'Menu',

  data () {
    return {
      title: 'Desafio Estante Virtual',
      user: ''
    }
  },

  mounted () {
    this.user = JSON.parse(sessionStorage.getItem('user'))
    console.log(this.user)
  },

  methods: {
    logoff () {
      sessionStorage.removeItem('auth')
      sessionStorage.removeItem('user')
      router.push('/')
    },

    showModal () {
      this.$refs.myModalRef.show()
    },

    hideModal () {
      this.$refs.myModalRef.hide()
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
