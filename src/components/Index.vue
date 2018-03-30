<template>
  <div class="mt-5 container">
    <div class="text-center">
      <h1>{{title}}</h1>
      <small class="form-text text-muted mb-2">Etapa 2 - Diego Lamarão</small>
    </div>

    <div class="col-sm-12 col-md-8 col-lg-6 offset-lg-3 offset-md-2 justify-content-center jumbotron">
      <form class="form">
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" class="form-control" v-model="form.email" aria-describedby="emailHelp" required placeholder="Ex: email@dominio.com">
        </div>
        <div class="form-group">
          <label for="password">Senha</label>
          <input type="password" class="form-control" v-model="form.password" required placeholder="Digite sua senha...">
          <small class="form-text text-muted">Deve conter pelo menos 6 digitos</small>
        </div>
        <div class="form-check">
          <input type="checkbox" class="form-check-input" v-model="form.remind">
          <label class="form-check-label" for="remind">Lembrar-me</label>
        </div>
        <div class="col-12">
          <button @click="login" class="first-btn btn btn-info col-sm-8 col-md-6 col-lg-6 mt-3">
            <span class="fa fa-singin"></span> Login</button>

          <button @click="toRegister" class="btn btn-secondary col-sm-3 offset-sm-1 col-md-4 offset-md-2 col-lg-4 offset-lg-2 mt-3 float-right">
            <span class="fa fa-envelope"></span> Cadastrar</button>
          <small class="form-text text-muted mt-3">Logue com sua rede social favorita</small>
        </div>
      </form>
      <div class="col-12">
          <b-btn v-b-tooltip.hover title="Google" @click="googleLogin" class="first-btn btn btn-google col-sm-3 mt-3">
            <span class="fa fa-google-plus"></span></b-btn>

          <b-btn v-b-tooltip.hover title="Facebook" @click="facebookLogin" class="btn btn-facebook col-sm-3 ml-lg-2 ml-md-2 mt-3">
            <span class="fa fa-facebook-official"></span></b-btn>

          <b-btn v-b-tooltip.hover title="Twitter" @click="twitterLogin" class="btn btn-twitter col-sm-3 ml-lg-2 ml-md-2 mt-3">
            <span class="fa fa-twitter"></span></b-btn>
        </div>
    </div>
  </div>
</template>

<script src="./Index.js"></script>

<style scoped>
  .btn-facebook {
    background-color: rgba(59, 88, 152, 0.8) !important;
    color: white;
  }

  .btn-google {
    background-color: rgba(244, 67, 54, 0.8) !important;
    color: white;
  }

  .btn-twitter {
    background-color: rgba(104, 148, 236, 0.8) !important;
    color: white;
  }

  .btn-facebook:hover {
    background-color: rgb(59,89,152) !important;
  }

  .btn-google:hover {
    background-color: rgb(244, 67, 54) !important;
  }

  .btn-twitter:hover {
    background-color: rgb(104, 148, 236) !important;
  }
</style>
