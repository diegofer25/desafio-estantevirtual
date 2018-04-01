<template>
  <div class="mt-5 container">
    <div class="text-center">
      <h1>{{title}}</h1>
      <small class="form-text text-muted mb-2">Etapa 3 - Diego Lamarão</small>
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

          <router-link :to="'/register'" class="btn btn-secondary col-sm-3 offset-sm-1 col-md-4 offset-md-2 col-lg-4 offset-lg-2 mt-3 float-right">
            <span class="fa fa-envelope"></span> Cadastrar
          </router-link>

          <small class="form-text text-muted mt-3">Logue com sua rede social favorita</small>
        </div>
      </form>
      <div class="col-12">
          <b-btn v-b-tooltip.hover title="Google" @click="googleLogin" class="first-btn btn btn-google col-sm-12 col-md-2 col-lg-2 mt-3">
            <span class="fa fa-google-plus"></span></b-btn>

          <b-btn v-b-tooltip.hover title="Facebook" @click="facebookLogin" class="btn btn-facebook col-sm-12 col-md-2 col-lg-2 ml-lg-2 ml-md-2 mt-3">
            <span class="fa fa-facebook-official"></span></b-btn>

          <b-btn v-b-tooltip.hover title="Twitter" @click="twitterLogin" class="btn btn-twitter col-sm-12 col-md-2 col-lg-2 ml-lg-2 ml-md-2 mt-3">
            <span class="fa fa-twitter"></span></b-btn>
        </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import store from '../vuex/store'

export default {
  name: 'Login',

  data () {
    return {
      title: 'Desafio Estante Virtual',

      form: {
        email: '',
        password: '',
        remind: ''
      }
    }
  },

  mounted () {
    this.form.email = localStorage.getItem('email') ? localStorage.getItem('email') : ''
  },

  methods: {
    login () {
      let form = this.form
      if (this.formValidate) {
        this.requestLogin(form)
        if (this.form.remind) {
          localStorage.setItem('email', form.email)
        }
      }
    },

    formValidate () {
      // to implement
      return true
    },

    requestLogin (form) {
      firebase.auth().signInWithEmailAndPassword(form.email, form.password)
        .then((user) => {
          this.loginProcess(user)
        })
        .catch((e) => {
          this.processLoginError(e)
        })
    },

    facebookLogin () {
      let facebookLoginInstance = new firebase.auth.FacebookAuthProvider()
      firebase.auth().signInWithPopup(facebookLoginInstance)
        .then((response) => {
          this.loginProcess(response.user)
        })
        .catch((e) => {
          this.processLoginError(e)
        })
    },

    googleLogin () {
      let googleLoginInstance = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithPopup(googleLoginInstance)
        .then((response) => {
          this.loginProcess(response.user)
        })
        .catch((e) => {
          this.processLoginError(e)
        })
    },

    twitterLogin () {
      let twitterLoginInstance = new firebase.auth.TwitterAuthProvider()
      firebase.auth().signInWithPopup(twitterLoginInstance)
        .then((response) => {
          this.loginProcess(response.user)
        })
        .catch((e) => {
          this.processLoginError(e)
        })
    },

    loginProcess (user) {
      store.commit('CHANGE_USER', {
        id: user.uid,
        auth: true,
        name: user.displayName,
        photo: user.photoURL
      })
      this.$router.push('/menu')
    },

    processLoginError (e) {
      console.log(e)
      if (e.code === 'auth/network-request-failed') {
        alert('Detectamos problema na sua conexão')
      } else if (e.code === 'auth/account-exists-with-different-credential') {
        alert('Você já se registrou com o email ' + e.email)
      } else if (e.code === 'auth/wrong-password') {
        alert('Senha incorreta')
      } else if (e.com === 'auth/user-not-found') {
        alert('E-mail não encontrado')
      }
    },

    toRegister () {
      this.$router.push('/register')
    }
  }
}
</script>

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
