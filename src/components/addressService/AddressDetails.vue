<template>
  <div>
    <addressweather></addressweather>
    <iframe
      width="100%"
      height="400px"
      frameborder="0" style="border:0"
      :src="`https://www.google.com/maps/embed/v1/directions?key=AIzaSyCdy7wKFGnVg_s5vLBOf1oopre5V_xeico&origin=${addressDetails.cep.value}&destination=${getPosition()}&mode=${mode}`" allowfullscreen>
    </iframe>
  </div>
</template>

<script>
import store from '../../vuex/store'
import AddressWeather from './AddressWeather'

export default {
  name: 'AddressDetails',

  data () {
    return {
      title: 'Teste',
      mode: 'driving'
    }
  },

  mounted () {
    this.getUserLocation()
  },

  props: {
    addressDetails: ''
  },

  methods: {
    getAddressDetails: () => {
    },

    getUserLocation () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          store.commit('SET_USER_LOCATION', position.coords.latitude + ',' + position.coords.longitude)
        })
      } else {
        store.commit('SET_USER_LOCATION')
        alert('Precisamos da sua localização para uma melhor experiencia com o aplicativo, por padrão sua localização será Rio de Janeiro - Centro')
      }
    },

    switchWay: () => {
      this.mode = 'driving'// this.mode === 'driving' ? 'walking' : 'driving'
    },

    getPosition () {
      return store.state.UserLocation
    },

    component: {
      addressweather: AddressWeather
    }
  }
}
</script>
