import {addressRef} from '../../firebase'

export default {
  name: 'Index',

  data () {
    return {
      form: {
        cep: {
          value: '',
          mensage: 'Digite CEP seu para localizar seu endereço',
          status: 'secondary'
        },
        street: '',
        complement: '',
        neighborhood: '',
        city: '',
        state: ''
      },

      ceps: '',
      requestCep: false,
      streetStatus: '',
      cityStatus: '',
      stateStatus: '',
      requestCepMensage: '',
      requestCepStatus: ''
    }
  },

  methods: {
    verifyCep () {
      let cep = this.form.cep
      if (cep.value.length === 8) {
        this.getAddres()
      } else if (cep.value !== '' && cep.value.length !== 9) {
        this.showAlert('CEP inválido', 'warning')
      }
    },

    getAddres () {
      let cep = this.form.cep
      this.$http.get(`https://viacep.com.br/ws/${cep.value}/json/`).then(response => {
        if (response.ok) {
          if (response.body.erro) {
            this.showAlert('CEP não encontrado', 'warning')
          } else {
            this.showAlert('CEP válido', 'success')
            this.fillFormAddress(response.body)
          }
        }
      }, (e) => {
        console.log(e)
      })
    },

    findMyCep () {
      this.requestCep = !this.requestCep
      this.setBorder('Preencha os campos solicitados para encontrar-mos seu cep', false)
    },

    setBorder (mensage, validate) {
      this.requestCepMensage = mensage
      this.requestCepStatus = validate ? 'btn-success' : 'btn-warning'
      this.streetStatus = this.requestCep && !validate ? 'border border-warning' : ''
      this.cityStatus = this.requestCep && !validate ? 'border border-warning' : ''
      this.stateStatus = this.requestCep && !validate ? 'border border-warning' : ''
    },

    getCep () {
      if (this.validateRquestCep()) {
        let form = this.form
        this.$http.get(`https://viacep.com.br/ws/${form.state}/${form.city}${form.cep.value}/json/`).then(response => {
          if (response.ok) {
            this.requestCep = false
            this.setBorder('', true)
            this.ceps = response.body
          }
        }, (e) => {
          console.log(e)
        })
      } else {
        this.setBorder('Ainda existem itens pendentes a serem preenchidos', false)
      }
    },

    validateRquestCep () {
      let form = this.form
      return form.street && form.city && form.state
    },

    fillFormAddress (address) {
      let form = this.form
      form.street = address.logradouro
      form.complement = address.complemento
      form.neighborhood = address.bairro
      form.city = address.localidade
      form.state = address.uf
    },

    showAlert (mensage, status) {
      let cep = this.form.cep
      cep.mensage = mensage
      cep.status = status
    },

    saveAddress () {
      if (this.isValidAddress()) {
        this.ceps = ''
        addressRef.push(this.form)
        this.clearForm()
        alert('Endereço cadastrado com sucesso')
      } else {
        alert('Por favor preencha os dados obrigatórios')
      }
    },

    clearForm () {
      this.form = {
        cep: {
          value: '',
          mensage: 'Digite seu CEP',
          status: 'secondary'
        },
        street: '',
        complement: '',
        neighborhood: '',
        city: '',
        state: ''
      }
    },

    isValidAddress () {
      let form = this.form
      return form.cep.value && form.street && form.neighborhood && form.city && form.state
    },

    showModal () {
      this.$refs.forgotcep.show()
    },

    hideModal () {
      this.$refs.forgotcep.hide()
    }
  }
}
