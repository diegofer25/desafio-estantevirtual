<template>
  <div class="mt-5 container">

    <div class="col-sm-12 col-md-8 col-lg-6 offset-lg-3 offset-md-2 justify-content-center">
      <form class="jumbotron">
        <div class="form-group">
          <label for="email">Nome</label>
          <input type="text" class="form-control" v-model="form.name" placeholder="Informe seu nome...">
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" class="form-control" v-model="form.email" aria-describedby="emailHelp" placeholder="Ex: email@dominio.com">
        </div>
        <div class="form-group">
          <label for="password">Senha</label>
          <input type="password" class="form-control" v-model="form.password" placeholder="Digite sua senha...">
          <small class="form-text text-muted">Deve conter pelo menos 6 digitos</small>
        </div>
        <button @click="register()" class="btn btn-info col-12 mt-3">Cadastrar</button>
      </form>
      <div class="row pl-3">
        <router-link :to="'/'">
          <button class="btn btn-secondary">Voltar</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import router from '../router'
import firebase from 'firebase'

export default {
  name: 'Register',

  data () {
    return {
      form: {
        name: '',
        email: '',
        password: ''
      }
    }
  },

  methods: {
    register () {
      if (this.formValidate()) {
        this.requestRegister(this.form)
      } else {
        this.processInvalidForm()
      }
    },

    formValidate () {
      // to implement
      return true
    },

    processInvalidForm () {
    },

    requestRegister (form) {
      console.log(firebase)
      firebase.auth().createUserWithEmailAndPassword(form.email, form.password)
        .then((user) => {
          user.sendEmailVerification()
          this.processRegister(user, form)
        })
        .catch((e) => {
          console.log(e)
        })
    },

    processRegister (user, form) {
      console.log('ok')
      user.updateProfile({
        displayName: form.name,
        phoneNumber: form.phone ? form.phone : null
      })
      sessionStorage.setItem('auth', true)
      sessionStorage.setItem('user', JSON.stringify(user))
      router.push('/menu')
    }
  }
}
</script>
