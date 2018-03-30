<template>
  <div class="container text-center">
    <div class="col-12">
      <img src="../assets/error404.png" alt="">
    </div>
    <router-link class="btn btn-info" :to="'/'">Ir para o menu</router-link>
  </div>
</template>

<script>
export default {
  name: 'RouterError'
}
</script>
