<template>
  <div class="container">
    <div class="row justify-content-center">

      <form class="col-sm-12">
        <div class="form-group">
          <label for="cep">CEP *</label>
          <input class="form-control" @blur="verifyCep()" v-model="form.cep.value" type="text" required>
          <a class="mt-1 btn btn-info float-right btn-sm text-white" @click="findMyCep()">
            {{ requestCep ? 'Cancelar' : 'Não sei meu CEP' }}
          </a>
          <small :class="'mt-1 btn-sm text-white bg-'+form.cep.status">{{form.cep.mensage}}</small>
        </div>
        <div class="col-12 text-center" v-if="requestCep">
          <small :class="requestCepStatus + ' col-s12'">{{requestCepMensage}}</small>
          <select class="col-12" v-if="ceps" v-model="form.cep.value">
            <option v-for="cep in ceps" :key="cep['.key']" :value="cep"></option>
          </select>
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
            <button @click="saveAddress()" class="btn btn-success col-sm-6">Cadastrar</button>
            <a class="btn btn-info text-white col-sm-4 offset-sm-1" v-if="requestCep" @click="getCep()">Buscar CEP</a>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script src="./AddressForm.js"></script>
