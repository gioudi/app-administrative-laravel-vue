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
            <tr v-for="( tag, i ) in tags" :key="tag" >
              <td>{{i +1}}</td>
              <td class="_table_name">
               {{tag.tagName}}
              </td>
              <td> {{tag.created_at}}</td>
              <td>
                <Button type="info" size="small" @click="showModalEdit(tag)">Editar</Button>
                <Button type="error" size="small">Eliminar</Button>
              </td>
            </tr>
            <!-- ITEMS -->
          </table>
        </div>
      </div>

      <!-- tag add modal -->
      <Modal v-model="addModal" title="Añadir Nuevo Tag"
      :mask-closable="false"
      :closable="false">
        <Input v-model="data.tagName" placeholder="Ingrese algo" style="width: 100%"></Input>
        <div slot="footer">
          <Button type="default" @click="addModal= false">Cancelar</Button>
          <Button type="primary" @click="addTag" :disabled="isAdding" :loading="isAdding" >{{isAdding ? 'Añadiendo ..' : 'Añadir'}}</Button>
        </div>
      </Modal>
      <!-- tag editing modal -->
      <Modal v-model="editModal" title="Editar  Tag"
      :mask-closable="false"
      :closable="false">
        <Input v-model="editData.tagName" placeholder="Ingrese algo" style="width: 100%"></Input>
        <div slot="footer">
          <Button type="default" @click="editModal= false">Cancelar</Button>
          <Button type="primary" @click="editTag" :disabled="isEditing" :loading="isEditing" >{{isEditing ? 'Editando ..' : 'Editar'}}</Button>
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
      editModal: false,
      isAdding: false,
      isEditing: false,
      tags: [],
      editData: {
             tagName: "",
      }
    };
  },
  methods: {
      async addTag(){
          if(this.data.tagName.trim()=='') return this.e('El nombre es requerido')
          const res = await this.callApi('post', 'api/create_tag', this.data)
          if(res.status === 201) {
              this.s('Tag añadido de forma exitosa');
              this.addModal = false;
              this.data.tagName = '';
          }else {
              if(res.status == 422){
                  if(res.data.errors.tagName){
                        this.e(res.data.errors.tagName[0]);
                  }

              }else {
                  this.swr();
              }
          }
      },
      async editTag(){
          if(this.editData.tagName.trim()=='') return this.e('El nombre es requerido')
          const res = await this.callApi('put', 'api/edit_tag', this.editData)
          if(res.status === 200) {
              this.s('Tag actualizado de forma exitosa');
              this.editModal = false;
              this.data.tagName = '';
          }else {
              if(res.status == 422){
                  if(res.data.errors.tagName){
                        this.e(res.data.errors.tagName[0]);
                  }

              }else {
                  this.swr();
              }
          }
      },
      showModalEdit(tag){
          this.editData = tag;
          this.editModal = true;
      }
  },
  async created(){
      const res = await this.callApi('get', 'api/get_tag')
      if( res.status == 200) {

          this.tags = res.data.tags;
      }else {
          this.swr()
      }
  }

};
</script>

<style>
</style>
