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
          Categorias Recientes
          <Button @click="addModal = true"
            >Agregar <i class="ml-3 lni lni-circle-plus"></i
          ></Button>
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
            <tr v-for="(tag, i) in tags" :key="tag">
              <td>{{ i + 1 }}</td>
              <td class="_table_name">
                {{ tag.tagName }}
              </td>
              <td>{{ tag.created_at }}</td>
              <td>
                <Button type="info" size="small" @click="showModalEdit(tag)"
                  >Editar</Button
                >
                <Button
                  type="error"
                  size="small"
                  @click="showDeletingModal(tag, i)"
                  :loading="tag.isDeleting"
                  >Eliminar</Button
                >
              </td>
            </tr>
            <!-- ITEMS -->
          </table>
        </div>
      </div>

      <!-- tag add modal -->
      <Modal
        v-model="addModal"
        title="Añadir Nueva Categoria"
        :mask-closable="false"
        :closable="false"
      >
        <Input
          v-model="data.tagName"
          placeholder="Ingrese algo"
          style="width: 100%"
        ></Input>
        <div class="space"></div>
        <Upload
          type="drag"
          :headers="{ 'x-csrf-token': token }"
          :on-success="handleSuccess"
          :format="['jpg', 'jpeg', 'png']"
          :max-size="2048"
          :on-format-error="handleFormatError"
          :on-exceeded-size="handleMaxSize"
          action="api/img_upload"
        >
          <div style="padding: 20px 0">
            <Icon
              type="ios-cloud-upload"
              size="52"
              style="color: #3399ff"
            ></Icon>
            <p>Click or drag files here to upload</p>
          </div>
        </Upload>

        <div slot="footer">
          <Button type="default" @click="addModal = false">Cancelar</Button>
          <Button
            type="primary"
            @click="addTag"
            :disabled="isAdding"
            :loading="isAdding"
            >{{ isAdding ? "Añadiendo .." : "Añadir" }}</Button
          >
        </div>
      </Modal>
      <!-- tag editing modal -->
      <Modal
        v-model="editModal"
        title="Editar  Categoria"
        :mask-closable="false"
        :closable="false"
      >
        <Input
          v-model="editData.tagName"
          placeholder="Ingrese algo"
          style="width: 100%"
        ></Input>
        <div slot="footer">
          <Button type="default" @click="editModal = false">Cancelar</Button>
          <Button
            type="primary"
            @click="editTag"
            :disabled="isEditing"
            :loading="isEditing"
            >{{ isEditing ? "Editando .." : "Editar" }}</Button
          >
        </div>
      </Modal>

      <!-- tag delete modal -->
      <Modal v-model="showDeleteModal" width="360">
        <p slot="header" style="color: #f60; text-align: center">
          <Icon type="ios-information-circle"></Icon>
          <span>Eliminar Categoria</span>
        </p>
        <div style="text-align: center">
          <p>¿Estas seguro de querer eliminar este tag?</p>
        </div>
        <div slot="footer">
          <Button
            type="error"
            size="large"
            long
            :loading="isDeleing"
            :disabled="isDeleing"
            @click="deleteTag"
            >Delete</Button
          >
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
        iconImage: "",
        categoryName: "",
      },
      addModal: false,
      editModal: false,
      isAdding: false,
      isEditing: false,
      tags: [],
      editData: {
        tagName: "",
      },
      index: -1,
      isDeleing: false,
      showDeleteModal: false,
      deleteItem: {},
      deletingIndex: -1,
      websiteSettings: [],
      token: "",
    };
  },
  methods: {
    async addTag() {
      if (this.data.tagName.trim() == "")
        return this.e("El nombre es requerido");
      const res = await this.callApi("post", "api/create_tag", this.data);
      if (res.status === 201) {
        this.s("Categoria añadido de forma exitosa");
        this.addModal = false;
        this.data.tagName = "";
      } else {
        if (res.status == 422) {
          if (res.data.errors.tagName) {
            this.e(res.data.errors.tagName[0]);
          }
        } else {
          this.swr();
        }
      }
    },
    async editTag() {
      if (this.editData.tagName.trim() == "")
        return this.e("El nombre es requerido");
      const res = await this.callApi("put", "api/edit_tag", this.editData);
      if (res.status === 200) {
        this.s("Categoria actualizado de forma exitosa");
        this.editModal = false;
        this.data.tagName = "";
      } else {
        if (res.status == 422) {
          if (res.data.errors.tagName) {
            this.e(res.data.errors.tagName[0]);
          }
        } else {
          this.swr();
        }
      }
    },
    showModalEdit(tag) {
      this.editData = tag;
      this.editModal = true;
    },
    async deleteTag() {
      // Vue.set(tag, "isDeleting", true);
      this.isDeleing = true;
      const res = await this.callApi(
        "delete",
        "api/delete_tag",
        this.deleteItem
      );
      if (res.status === 200) {
        this.tags.splice(this.deletingIndex, 1);
        this.s("El tag ha sido borrado de forma exitosa");
      } else {
        this.swr();
      }
      this.isDeleing = false;
      this.showDeleteModal = false;
    },
    showDeletingModal(tag, i) {
      /* const deleteModalObj = {
         showDeleteModal :true,
         deleteUrl: 'api/delete_tag',
         data: tag,
         deletingIndex: i,
         isDeleted: false
       }
       this.$store.commit('setDeletingModalObj', deleteModalObj)
       console.log('Metodo delete llamado') */
      this.deleteItem = tag;
      this.deletingIndex = i;
      this.showDeleteModal = true;
    },
    handleView (name) {
        this.imgName = name;
        this.visible = true;
    },

    handleSuccess (res, file) {
        this.data.iconImage = res;
    },
    handleFormatError (file) {
        this.$Notice.warning({
            title: 'Formato de archivo es incorrecto',
            desc: 'Formato de archivo ' + file.name + ' es incorrecto, por favor  seleccione jpg o png.'
        });
    },
    handleMaxSize (file) {
        this.$Notice.warning({
            title: 'El peso de la imagen excede el limite',
            desc: 'El peso de la imagen  ' + file.name + 'no debe exceder 2M.'
        });
    },

  },
  async created() {
    this.token = window.Laravel.csrfToken;
    const res = await this.callApi("get", "api/get_tag");
    if (res.status == 200) {
      this.tags = res.data.tags;
    } else {
      this.swr();
    }
  },
};
</script>

<style>
</style>
