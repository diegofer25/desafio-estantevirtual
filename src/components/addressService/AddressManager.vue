<template>
<div>
  <div class="col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
    <h2 class="text-center mt-2">{{title}}</h2>

    <div role="tablist">
      <b-card no-body class="mb-1" v-for="address in addressList" :key="address['.key']">
        <b-card-header header-tag="header" class="'p-1" role="tab">
          <b-btn block href="#" v-b-toggle.accordion1 variant="info">
            {{`${addressList.indexOf(address) + 1}º - ${address.cep.value} - ${address.street} - ${address.state}`}}
          </b-btn>
        </b-card-header>
        <b-collapse id="accordion1" visible accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <p class="cards-text">
              {{address.cep.value}} - {{address.street}} - {{address.city}} - {{address.state}}
              </p>
            <div class="col-12">
              <button @click="deleteAddress(address['.key'], address)" class="btn btn-danger float-right mb-3">
                <span class="fa fa-trash"></span>
              </button>
              <button @click="getAddressToEdit(address, address['.key']); showModal()" class="btn btn-secondary float-right mr-3 mb-3">
                <span class="fa fa-edit"></span>
              </button>
            </div>
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
