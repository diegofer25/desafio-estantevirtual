<template>
  <div class="container">
    <div class="row justify-content-center">

      <form onsubmit="return false" class="col-sm-12">
        <div class="form-group">
          <label for="cep">CEP *</label>
          <input class="form-control" @blur="verifyCep()" @focus="verifyCep()" v-model="form.cep.value" type="text" placeholder="Ex: 12345678" required>
          <a class="mt-1 btn btn-info float-right btn-sm text-white" @click="findMyCep()">
            {{ requestCep ? 'Cancelar' : 'Não sei meu CEP' }}
          </a>
          <small :class="'mt-1 btn-sm text-white bg-'+form.cep.status">{{form.cep.mensage}}</small>
          <div v-if="ceps && !form.cep.value">
            <smalxl class="bg-success text-white">Este são os CEPs encontrados para sua busca</smalxl>
            <select class="col-12" v-model="choosedCep" @blur="verifyCep()" @focus="verifyCep()">
              <option v-for="cep in ceps" :key="cep['.key']" :value="cep">
                {{cep.cep ? cep.cep : ''}}
                {{cep.logradouro ? ' - ' + cep.logradouro : ''}} <br>
                {{cep.complemento ? cep.complemento : ''}}
                {{cep.bairro ? ', ' + cep.bairro : ''}} <br>
                {{cep.localidade ? ', ' + cep.localidade : ''}}
                {{cep.uf ? ' - ' + cep.uf : ''}}
              </option>
            </select>
          </div>
        </div>
        <div class="col-12 text-center" v-if="requestCep">
          <small :class="requestCepStatus + ' col-s12'">{{requestCepMensage}}</small>
        </div>
        <div class="form-group">
          <label for="cep">Logradouro *</label>
          <input :class="streetStatus + ' form-control'" v-model="form.street" type="text" required>
        </div>
        <div class="row">
          <div class="form-group col-sm-12 col-md-8 col-lg-8">
            <label for="cep">Complemento: </label>
            <input class="form-control" v-model="form.complement" type="text">
          </div>
          <div class="form-group col-sm-12 col-md-4 col-lg-4">
            <label for="cep">Bairro *</label>
            <input class="form-control" v-model="form.neighborhood" type="text">
          </div>
        </div>
        <div class="row">
          <div class="form-group col-sm-12 col-md-8 col-lg-8">
            <label for="cep">Cidade *</label>
            <input :class="cityStatus + ' form-control'" v-model="form.city" type="text" required>
          </div>
          <div class="form-group col-sm-12 col-md-4 col-lg-4">
            <label for="cep">Estado (UF) *</label>
            <input :class="stateStatus + ' form-control'" v-model="form.state" type="text" placeholder="Ex: RJ" required>
          </div>
        </div>
        <div class="row">
          <div class="form-group col-lg-12 align-items-center">
            <button type="submit" @click="saveAddress()" class="btn btn-success col-sm-6">Cadastrar</button>
            <a class="btn btn-info text-white col-sm-4 offset-sm-1" v-if="requestCep" @click="getCep()">Buscar CEP</a>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import store from '../../vuex/store'

export default {
  name: 'Index',

  data () {
    return {
      form: {
        cep: {
          value: '',
          mensage: 'Digite seu CEP sem " - " ',
          status: 'secondary'
        },
        street: '',
        complement: '',
        neighborhood: '',
        city: '',
        state: ''
      },
      ceps: '',
      choosedCep: '',
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
      } else if (this.choosedCep) {
        this.setChoosedCep()
      }
    },

    setChoosedCep () {
      let form = this.form
      form.cep.value = this.choosedCep.cep
      form.street = this.choosedCep.logradouro
      form.complement = this.choosedCep.complemento
      form.neighborhood = this.choosedCep.bairro
      form.city = this.choosedCep.localidade
      form.state = this.choosedCep.uf
      this.choosedCep = ''
      this.showAlert('CEP válido', 'success')
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
      this.clearForm()
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
        this.$http.get(`https://viacep.com.br/ws/${form.state}/${form.city}/${form.street}/json/`).then(response => {
          if (response.ok) {
            this.requestCep = false
            this.setBorder('success', true)
            this.ceps = response.body
            console.log(this.ceps)
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
        this.form.cep.status = false
        store.commit('ADD_ADDRESS', this.form)
        store.commit('GET_ADDRESS_LIST')
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
          mensage: 'Digite seu CEP sem " - " ',
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
</script>
