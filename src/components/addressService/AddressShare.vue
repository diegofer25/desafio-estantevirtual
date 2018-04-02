<template>
  <div class="container text-center mt-4">
    <h2>Lista compartilhada de {{listOwner}}</h2>
    <small v-if="isOwner" class="text text-muted">Copie o link e compartilhe com quem quiser</small>
    <div class="col-12 text-center">
      <router-link class="btn btn-secondary mt-2" :to="'/'">Criar uma lista</router-link>
    </div>
    <div class="mt-4" role="tablist" v-if="addressList !== undefined">
      <b-card no-body class="mb-1" v-for="object in addressList" :key="object.key">
        <b-card-header header-tag="header" class="p-0" role="tab">
          <b-btn block @click="object.address.cep.status = !object.address.cep.status"
           :class="object.address.cep.status ? 'collapsed' : null"
           :aria-controls="addressList.indexOf(object)"
           :aria-expanded="object.address.cep.status" variant="info">
            {{`${addressList.indexOf(object) + 1}º ${object.address.street} ${object.address.complement ? ' - ' + object.address.complement : ''}`}}
          </b-btn>
        </b-card-header>
        <b-collapse :id="String(addressList.indexOf(object))" v-model="object.address.cep.status" accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <div class="col-12 content">
              {{object.address.cep.value}} - {{object.address.street}} {{object.address.complement}} {{object.address.neighborhood}}, {{object.address.city}} - {{object.address.state}}
            </div>
            <addressdetails :address="object.address"></addressdetails>
          </b-card-body>
        </b-collapse>
      </b-card>
    </div>
  </div>
</template>

<script>
import AddressDetails from './AddressDetails'
import store from '../../vuex/store'

export default {
  name: 'AddressShare',

  computed: {
    addressList () {
      return store.state.userAddressList
    },

    listOwner () {
      return this.$route.query.userName
    },

    isOwner () {
      return store.state.user.auth === true
    }
  },

  mounted () {
    store.commit('GET_ADDRESS_LIST', this.$route.query.uid)
    this.getUserLocation()
  },

  methods: {
    getUserLocation () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          store.commit('SET_USER_LOCATION', position.coords.latitude + ',' + position.coords.longitude)
        })
      } else {
        store.commit('SET_USER_LOCATION', null)
        alert('Precisamos da sua localização para uma melhor experiencia com o aplicativo')
      }
    }
  },

  components: {
    addressdetails: AddressDetails
  }
}
</script>
