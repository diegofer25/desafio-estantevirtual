<template>
  <div>
    <addressweather :city="address.city"></addressweather>
    <iframe
      width="100%"
      height="400px"
      frameborder="0" style="border:0"
      :src="`https://www.google.com/maps/embed/v1/directions?key=AIzaSyCdy7wKFGnVg_s5vLBOf1oopre5V_xeico&origin=${address.cep.value}&destination=${destination}&mode=${mode}`" allowfullscreen>
    </iframe>
  </div>
</template>

<script>
import AddressWeather from './AddressWeather'
import store from '../../vuex/store'

export default {
  name: 'AddressDetails',

  data () {
    return {
      title: 'Teste',
      mode: 'driving'
    }
  },

  computed: {
    destination: () => {
      return store.state.UserLocation
    }
  },

  mounted () {
    this.getUserLocation()
  },

  props: {
    address: ''
  },

  methods: {
    getUserLocation () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          let coords = position.coords.latitude + ',' + position.coords.longitude
          store.commit('SET_USER_LOCATION', coords)
        })
      } else {
        console.log('ok')
      }
    }
  },

  components: {
    addressweather: AddressWeather
  }
}
</script>
