<template>
<div>
  <div :class="formatTable + ' table-responsive'">
    <h2 class="text-center mt-2">{{title}}</h2>
    <table class="table table-dark table-hover table-sm">
      <thead>
        <tr class="text-center">
          <th scope="col">CEP</th>
          <th scope="col">Rua</th>
          <th scope="col">Complemento</th>
          <th scope="col">Bairro</th>
          <th scope="col">Cidade</th>
          <th scope="col">Estado</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr class="text-center" scope="row" v-for="address in addressList" :key="address['.key']">
          <td>
            <span v-if="!isEditing || addresskey !== address['.key']">{{address.cep.value}}</span>
            <input v-if="isEditing && addresskey === address['.key']" v-model="address.cep.value" type="text">
          </td>
          <td>
            <span v-if="!isEditing || addresskey !== address['.key']">{{address.street}}</span>
            <input v-if="isEditing && addresskey === address['.key']" v-model="address.street" type="text">
          </td>
          <td>
            <span v-if="!isEditing || addresskey !== address['.key']">{{address.complement}}</span>
            <input v-if="isEditing && addresskey === address['.key']" v-model="address.complement" type="text">
          </td>
          <td>
            <span v-if="!isEditing || addresskey !== address['.key']">{{address.neighborhood}}</span>
            <input v-if="isEditing && addresskey === address['.key']" v-model="address.neighborhood" type="text">
          </td>
          <td>
            <span v-if="!isEditing || addresskey !== address['.key']">{{address.city}}</span>
            <input v-if="isEditing && addresskey === address['.key']" v-model="address.city" type="text">
          </td>
          <td>
            <span v-if="!isEditing || addresskey !== address['.key']">{{address.state}}</span>
            <input v-if="isEditing && addresskey === address['.key']" v-model="address.state" type="text">
          </td>
          <td>
            <button v-if="!isEditing || addresskey !== address['.key']" @click="getAddressToEdit(address['.key'])" class="btn btn-secondary">Editar</button>
            <button v-else @click="editAddress(address, address['.key'])" class="btn btn-success">Salvar</button>
            <button v-if="!isEditing || addresskey !== address['.key']" @click="deleteAddress(address['.key'])" class="btn btn-danger">Deleter</button>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td v-if="isEditing">
            <button class="btn btn-info float-right" @click="finishEdit()">Cancelar Edição</button>
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
</div>
</template>

<script>
import {addressRef} from '../../firebase'

export default {
  name: 'AddressManage',
  data () {
    return {
      title: 'Endereços Cadastrados',
      showTable: false,
      formatTable: 'container',
      isEditing: false,
      addresskey: '',
      addressRef: addressRef
    }
  },

  firebase: {
    addressList: addressRef
  },

  methods: {
    deleteAddress (key) {
      addressRef.child(key).remove()
    },

    getAddressToEdit (key) {
      this.addresskey = key
      this.isEditing = true
      this.formatTable = 'edit-container'
    },

    editAddress (address, key) {
      addressRef.child(key).update({
        cep: address.cep,
        street: address.street,
        complement: address.complement,
        neighborhood: address.neighborhood,
        city: address.city,
        state: address.state
      })
      this.finishEdit()
    },

    finishEdit () {
      this.addresskey = ''
      this.isEditing = false
      this.formatTable = 'container'
    }
  }
}
</script>

<style>
  .edit-container {
    margin: 0 auto;
    width: 90%
  }
</style>
