<template>
<div>
  <div class="col-sm-10 offset-sm-1">
    <h2 class="text-center mt-2">{{title}}</h2>
    <table class="table table-light table-hover table-responsive-sm">
      <thead class="thead-dark">
        <tr class="text-center">
          <th scope="col">CEP</th>
          <th scope="col">Logradouro</th>
          <th scope="col">Complemento</th>
          <th scope="col">Bairro</th>
          <th scope="col">Cidade</th>
          <th scope="col">Estado</th>
          <th scope="col">Editar</th>
          <th scope="col">Excluir</th>
        </tr>
      </thead>
      <tbody>
        <tr class="text-center" scope="row" v-for="address in addressList" :key="address['.key']">
          <td>{{address.cep.value}}</td>
          <td>{{address.street}}</td>
          <td>{{address.complement}}</td>
          <td>{{address.neighborhood}}</td>
          <td>{{address.city}}</td>
          <td>{{address.state}}</td>
          <td>
            <button @click="getAddressToEdit(address, address['.key']); showModal()" class="btn btn-secondary">
              <span class="fa fa-edit"></span>
            </button>
          </td>
          <td>
            <button @click="deleteAddress(address['.key'])" class="btn btn-danger">
              <span class="fa fa-trash"></span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>

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
      <button class="btn btn-success float-right" @click="editAddress()">
        <span class="fa fa-save"></span> Salvar</button>
    </b-modal>

  </div>
</div>
</template>

<script src="./AddressManager.js"></script>

<style>
  .edit-container {
    margin: 0 auto;
    width: 80%
  }
</style>
