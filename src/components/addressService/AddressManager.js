import {addressRef} from '../../firebase'

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
    deleteAddress (key) {
      addressRef.child(key).remove()
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
