import Vue from 'vue'
import { addressRef } from '../../firebase'
import { Collapse } from 'bootstrap-vue/es/components'
import bCollapse from 'bootstrap-vue/es/components/collapse/collapse'
import vBToggle from 'bootstrap-vue/es/directives/toggle/toggle'
Vue.directive('b-toggle', vBToggle)
Vue.component('b-collapse', bCollapse)
Vue.use(Collapse)

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
      addresskey: ''
    }
  },

  firebase: {
    addressList: addressRef
  },

  methods: {
    deleteAddress (key, address) {
      if (confirm(`Deseja mesmo excluir o endereço ${address.cep.value} - ${address.street}, ${address.city} - ${address.state}?`)) {
        addressRef.child(key).remove()
      }
    },

    getAddressToEdit (address, key) {
      this.addresskey = key
      this.form = address
    },

    editAddress () {
      let form = this.form
      let key = this.addresskey
      addressRef.child(key).update({
        cep: form.cep,
        street: form.street,
        complement: form.complement,
        neighborhood: form.neighborhood,
        city: form.city,
        state: form.state
      })
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
  }
}
