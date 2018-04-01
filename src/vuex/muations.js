import {fireDB} from '../firebase'

export default {
  'CHANGE_USER' (state, user) {
    state.user = user
  },

  'GET_ADDRESS_LIST' (state, uid) {
    let id = state.user.id
    if (uid) {
      id = uid
    }
    state.userAddressList = []
    fireDB.ref('address').once('value')
      .then((user) => {
        user.forEach(function (userAddress) {
          if (userAddress.key === id) {
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

  'EDIT_ADDRESS' (state, payload) {
    fireDB.ref('address').child(state.user.id).child(payload.key).update({
      cep: payload.form.cep,
      street: payload.form.street,
      complement: payload.form.complement,
      neighborhood: payload.form.neighborhood,
      city: payload.form.city,
      state: payload.form.state
    })
  },

  'DELETE_ADDRESS' (state, key) {
    fireDB.ref('address').child(state.user.id).child(key).remove()
  },

  'SET_USER_LOCATION' (state, location) {
    if (location) {
      state.UserLocation = location
    } else {
      state.UserLocation = 'Rio de Janeiro'
    }
  }
}
