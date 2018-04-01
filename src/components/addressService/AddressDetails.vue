<template>
  <div>
    <iframe
      width="100%"
      height="450px"
      frameborder="0" style="border:0"
      :src="`https://www.google.com/maps/embed/v1/directions?key=AIzaSyCdy7wKFGnVg_s5vLBOf1oopre5V_xeico&origin=${addressDetails.cep.value}&destination=${getPosition()}`" allowfullscreen>
    </iframe>
  </div>
</template>

<script>
export default {
  name: 'AddressDetails',

  data () {
    return {
      title: 'Teste'
    }
  },

  props: {
    addressDetails: '',
    userLocation: ''
  },

  methods: {
    getAddressDetails: () => {
    },

    getPosition () {
      if (this.userLocation) {
        return this.userLocation
      } else {
        return 'rio de janeiro'
      }
    }
  }
}
</script>
