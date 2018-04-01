<template>
  <div class="mt-5 container">

    <div class="col-sm-12 col-md-8 col-lg-6 offset-lg-3 offset-md-2 justify-content-center">
      <form onsubmit="return false" class="jumbotron">
        <div class="form-group">
          <label for="email">Nome</label>
          <input type="text" class="form-control" v-model="form.name" placeholder="Informe seu nome..." required>
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" class="form-control" v-model="form.email" aria-describedby="emailHelp" placeholder="Ex: email@dominio.com" required>
        </div>
        <div class="form-group">
          <label for="password">Senha</label>
          <input type="password" class="form-control" v-model="form.password" placeholder="Digite sua senha..." required>
          <small class="form-text text-muted">Deve conter pelo menos 6 digitos</small>
        </div>
        <input type="submit" @click="requestRegister()" class="btn btn-info col-12 mt-3" value="Cadastrar">
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
import firebase from 'firebase'
import store from '../vuex/store'

export default {
  name: 'Register',

  data () {
    return {
      title: 'Cadastro',
      form: {
        name: '',
        email: '',
        password: ''
      }
    }
  },

  methods: {
    requestRegister () {
      let form = this.form
      firebase.auth().createUserWithEmailAndPassword(form.email, form.password)
        .then((user) => {
          user.updateProfile({
            displayName: form.name,
            photoURL: 'https://i1.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?resize=256%2C256&quality=100'
          })
            .then((response) => {
              console.log(response)
              user.sendEmailVerification()
              this.processRegister(user)
            })
            .catch((e) => {
              console.log(e)
            })
        })
        .catch((e) => {
          this.processInvalidForm(e)
        })
    },

    processInvalidForm (e) {
      if (e.code === 'auth/email-already-in-use') {
        alert('Este e-mail já está cadastrado')
      } else if (e.code === 'auth/invalid-email') {
        alert('Formato inválido de email')
      } else if (e.code === 'auth/weak-password') {
        alert('Sua senha obrigatóriamente deve conter pelo menos 6 digitos')
      }
    },

    processRegister (user) {
      store.commit('CHANGE_USER', {
        id: user.uid,
        auth: true,
        name: user.displayName,
        photo: user.photoURL
      })
      this.$router.push('/menu')
    }
  }
}
</script>
