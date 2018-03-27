<template>
  <div class="container">
    <div class="row justify-content-center">

      <form class="col-sm-12 col-md-10 col-lg-6">
        <h2 class="text-center">{{title}}</h2>
        <div class="form-group">
          <label for="cep">CEP *</label>
          <input class="form-control" @blur="verifyCep()" v-model="form.cep.value" type="text" required>
          <a class="mt-1 btn btn-info float-right btn-sm text-white" @click="showModal()">
            Não sei meu CEP
          </a>
          <small :class="'mt-1 btn-sm text-white bg-'+form.cep.status">{{form.cep.mensage}}</small>
        </div>
        <div class="form-group">
          <label for="cep">Logradouro *</label>
          <input class="form-control" v-model="form.street" type="text" required>
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
            <input class="form-control" v-model="form.city" type="text" required>
          </div>
          <div class="form-group col-sm-12 col-md-4 col-lg-4">
            <label for="cep">Estado (UF) *</label>
            <input class="form-control" v-model="form.state" type="text" placeholder="Ex: RJ" required>
          </div>
        </div>
        <div class="row">
          <div class="form-group col-lg-12 align-items-center">
            <button @click="saveAddress()" class="btn btn-info col col-sm-6">Cadastrar</button>
          </div>
        </div>
      </form>

      <b-modal ref="myModalRef" hide-footer title="Forneça os dados abaixo">
        <form class="form">
          <div class="form-group">
            <label for="cep">Logradouro *</label>
            <input class="form-control" v-model="form.street" type="text" >
            <small>deve conter pelo menos 3 digitos</small>
          </div>
          <div class="row">
            <div class="form-group col-sm-12 col-md-8 col-lg-8">
              <label for="cep">Cidade *</label>
              <input class="form-control" v-model="form.city" type="text" >
              <small>deve conter pelo menos 3 digitos</small>
            </div>
            <div class="form-group col-sm-12 col-md-4 col-lg-4">
              <label for="cep">Estado (UF) *</label>
              <input class="form-control" v-model="form.state" type="text" placeholder="Ex: RJ" >
            </div>
          </div>
          <div v-if="ceps" class="form-group">
            <select v-model="form.cep.value">
              <option @select="hideModal()" v-for="cep in ceps" :key="cep['.key']"  :value="cep.cep">{{cep.cep}} - {{cep.localidade}}</option>
            </select>
            <small>selecione um CEP</small>
          </div>
          <b-btn class="mt-3" variant="outline-success" block @click="ceps ? null : getCep()">Buscar</b-btn>
        </form>
        <b-btn class="mt-3" variant="outline-info" block @click="hideModal()">Fechar</b-btn>
      </b-modal>

    </div>
  </div>
</template>

<script>
import {addressRef} from '../../firebase'
import bModal from 'bootstrap-vue/es/components/modal/modal'

export default {
  name: 'Index',

  data () {
    return {
      title: 'Cadastro de Endereços',

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

      ceps: ''
    }
  },

  components: {
    'b-modal': bModal
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

    getCep () {
      let form = this.form
      this.$http.get(`https://viacep.com.br/ws/${form.state}/${form.city}${form.cep.value}/json/`).then(response => {
        if (response.ok) {
          this.ceps = response.body
          this.showAlert('CEP válido', 'success')
        }
      }, (e) => {
        console.log(e)
      })
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
        addressRef.push(this.form)
        this.clearForm()
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
      this.$refs.myModalRef.show()
    },

    hideModal () {
      this.$refs.myModalRef.hide()
    }
  }
}
</script>
