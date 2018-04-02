<template>
<div>
  <div v-if="addressList.length > 0" class="col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-8 offset-lg-2">
    <h2 class="text-center mt-2">{{title}}</h2>
    <div role="tablist">
      <b-card no-body class="mb-1" v-for="object in addressList" :key="object.key">
        <b-card-header header-tag="header" class="p-0" role="tab">
          <b-btn block @click="object.address.cep.status = !object.address.cep.status"
           :class="object.address.cep.status ? 'collapsed' : null"
           :aria-controls="addressList.indexOf(object)"
           :aria-expanded="object.address.cep.status" variant="info">
            {{`${addressList.indexOf(object) + 1}º ${object.address.cep.value} - ${object.address.street} - ${object.address.state}`}}
          </b-btn>
        </b-card-header>
        <b-collapse :id="String(addressList.indexOf(object))" v-model="object.address.cep.status" accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <div class="col-12 content">
              {{object.address.street}} {{object.address.complement}} {{object.address.neighborhood}}, {{object.address.city}} - {{object.address.state}}
              <div class="col-12 options mt-2">
                <button v-b-tooltip.hover title="Excluir"
                  @click="deleteAddress(object.key, object.address)"
                  class="btn btn-danger float-right mb-3">
                  <span class="fa fa-trash"></span>
                </button>
                <button v-b-tooltip.hover title="Editar"
                  @click="getAddressToEdit(object.address, object.key)"
                  class="btn btn-secondary float-right mr-3 mb-3">
                  <span class="fa fa-edit"></span>
                </button>
              </div>
            </div>
            <addressdetails :address="object.address"></addressdetails>
          </b-card-body>
        </b-collapse>
      </b-card>
    </div>

    <b-modal ref="myModalRef" hide-footer title="Edição de endereço">

      <form class="col-12">
        <div class="form-group">
          <label for="cep">CEP *</label>
          <input class="form-control" @blur="verifyCep()" v-model="form.cep.value" type="text" required>
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
      </form>

      <button  class="btn btn-info" @click="hideModal(); finishEdit()">
        <span class="fa fa-times"></span> Cancelar Edição</button>
      <button class="btn btn-success" @click="editAddress()">
        <span class="fa fa-save"></span> Salvar</button>
    </b-modal>

  </div>
</div>
</template>

<script>
import AddressDetails from './AddressDetails'
import store from '../../vuex/store'

export default {
  name: 'AddressManager',
  data () {
    return {
      title: 'Endereços Cadastrados',
      form: {
        cep: '',
        street: '',
        complement: '',
        neighborhood: '',
        city: '',
        state: ''
      },
      addresskey: '',
      showCollapse: false
    }
  },

  computed: {
    addressList () {
      return store.state.userAddressList
    }
  },

  mounted () {
    this.uid = store.state.user.id
    store.commit('GET_ADDRESS_LIST')
  },

  methods: {
    deleteAddress (key, address) {
      if (confirm(`Deseja mesmo excluir o endereço ${address.cep.value} - ${address.street}, ${address.city} - ${address.state}?`)) {
        store.commit('DELETE_ADDRESS', key)
        store.commit('GET_ADDRESS_LIST')
      }
    },

    getAddressToEdit (address, key) {
      console.log('key que meu formulario manda' + key)
      this.showModal()
      this.addresskey = key
      this.form = address
    },

    editAddress () {
      let form = this.form
      let key = this.addresskey
      console.log('key que vou mandar para mutation' + key)
      store.commit('EDIT_ADDRESS', {form: form, key: key})
      store.commit('GET_ADDRESS_LIST')
      this.finishEdit()
    },

    finishEdit () {
      this.addresskey = ''
      this.hideModal()
    },

    showModal () {
      this.$refs.myModalRef.show()
    },

    hideModal () {
      this.$refs.myModalRef.hide()
    }
  },

  components: {
    addressdetails: AddressDetails
  }
}
</script>

<style>
  .edit-container {
    margin: 0 auto;
    width: 80%
  }
</style>
