import router from '../router'
import firebase from 'firebase'

export default {
  name: 'Index',

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
      if (this.form.remind) {
        localStorage.setItem('email', form.email)
      }
      if (this.formValidate) {
        this.requestLogin(form)
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
          console.log(e)
        })
    },

    facebookLogin () {
      let facebookLoginInstance = new firebase.auth.FacebookAuthProvider()
      firebase.auth().signInWithPopup(facebookLoginInstance)
        .then((response) => {
          this.loginProcess(response.user)
        })
        .catch((e) => {
          console.log(e)
        })
    },

    googleLogin () {
      let googleLoginInstance = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithPopup(googleLoginInstance)
        .then((response) => {
          this.loginProcess(response.user)
        })
        .catch((e) => {
          console.log(e)
        })
    },

    twitterLogin () {
      let twitterLoginInstance = new firebase.auth.TwitterAuthProvider()
      firebase.auth().signInWithPopup(twitterLoginInstance)
        .then((response) => {
          this.loginProcess(response.user)
        })
        .catch((e) => {
          console.log(e)
        })
    },

    loginProcess (user) {
      sessionStorage.setItem('auth', true)
      sessionStorage.setItem('user', JSON.stringify(user))
      router.push('/menu')
    },

    toRegister () {
      router.push('register')
    }
  }
}
