import {fireDB} from '../firebase'

export default {
  'CHANGE_USER' (state, user) {
    state.user = user
  },

  'GET_ADDRESS_LIST' (state) {
    state.userAddressList = []
    fireDB.ref('address').once('value')
      .then((user) => {
        user.forEach(function (userAddress) {
          if (userAddress.key === state.user.id) {
            let addressList = userAddress.val()
            for (let key in addressList) {
              state.userAddressList.push({
                key: key,
                address: addressList[key]
              })
            }
          }
        })
      })
  },

  'ADD_ADDRESS' (state, address) {
    fireDB.ref('address').child(state.user.id).push(address)
  },

  'EDIT_ADDRESS' (state, form, key) {
    fireDB.ref('address').child(state.user.id).child(key).update({
      cep: form.cep,
      street: form.street,
      complement: form.complement,
      neighborhood: form.neighborhood,
      city: form.city,
      state: form.state
    })
  },

  'DELETE_ADDRESS' (state, key) {
    fireDB.ref('address').child(state.user.id).child(key).remove()
  }
}
