<template>
  <div class='weather col-12 mb-2' v-if="weather !== ''">
    <h4>{{weather.name}} - {{parseInt(weather.main.temp)}}ºc</h4>
    <span>Min: {{weather.main.temp_min}}ºc - Max: {{weather.main.temp_max}}ºc</span>
    <small class='text text-muted'>- "{{weather.weather[0].description}}"</small>
    <small>Ventos: {{weather.wind.speed}}m/s</small>
  </div>
</template>

<script>
export default {
  name: 'AddressWeather',

  data () {
    return {
      weather: ''
    }
  },

  props: {
    city: ''
  },

  mounted () {
    this.get()
  },

  methods: {
    get () {
      this.$http.get(`https://api.openweathermap.org/data/2.5/weather?q=${this.city}&units=metric&lang=pt&appid=f13e118b48effa30578188ac740c2025`)
        .then((response) => {
          this.weather = response.data
        }, (e) => {
          console.log(e)
        })
    }
  }
}
</script>
