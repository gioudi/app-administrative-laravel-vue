<template>
  <div class="content">
    <div class="container-fluid">
      <!--~~~~~~~ TABLE ONE ~~~~~~~~~-->
      <div
        class="
          _1adminOverveiw_table_recent
          _box_shadow
          _border_radious
          _mar_b30
          _p20
        "
      >
        <p class="_title0">
          Tags Recientes
          <Button @click="addModal= true">Agregar <i class="ml-3 lni lni-circle-plus"></i></Button>
        </p>

        <div class="_overflow _table_div">
          <table class="_table">
            <!-- TABLE TITLE -->
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Fecha Creación</th>
              <th>Acciones</th>
            </tr>
            <!-- TABLE TITLE -->

            <!-- ITEMS -->
            <tr>
              <td>1</td>
              <td class="_table_name">
                Manhattan's art center "Shed" opening ceremony
              </td>
              <td>27/05/95</td>
              <td>
                <Button type="info" size="small">Editar</Button>
                <Button type="error" size="small">Eliminar</Button>
              </td>
            </tr>
            <!-- ITEMS -->
          </table>
        </div>
      </div>

      <!-- tag additional -->
      <Modal v-model="addModal" title="Añadir Nuevo Tag"
      :mask-closable="false"
      :closable="false">
        <Input v-model="data.tagName" placeholder="Ingrese algo" style="width: 100%"></Input>
        <div slot="footer">
          <Button type="default" @click="addModal= false">Cancelar</Button>
          <Button type="primary" @click="addTag" :disabled="isAdding" :loading="isAdding" >{{isAdding ? 'Añadiendo ..' : 'Añadir'}}</Button>
        </div>
      </Modal>

      <Page :total="100" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: {
        tagName: "",
      },
      addModal: false,
      isAdding: false
    };
  },
  methods: {
      async addTag(){
          if(this.data.tagName.trim()=='') return this.e('El nombre es requerido')
          const res = await this.callApi('post', 'api/create_tag', this.data)
          if(res.status === 200) {
              this.s('Tag añadido de forma exitosa')
          }else {
              this.w();
          }
      }
  },

};
</script>

<style>
</style>
