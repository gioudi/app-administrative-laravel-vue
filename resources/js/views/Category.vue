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
              <th>Imagen</th>
              <th>Fecha Creación</th>
              <th>Acciones</th>
            </tr>
            <!-- TABLE TITLE -->

            <!-- ITEMS -->
            <tr v-for="(category, i) in categories" :key="i">
              <td>{{ i + 1 }}</td>
              <td class="_table_name">
                {{ category.categoryName }}
              </td>
              <td class="table_image">
                <img
                  :src="`uploads/${category.iconImage}`"
                  :alt="`${category.iconImage}`"
                />
              </td>
              <td>{{ category.created_at }}</td>
              <td>
                <Button
                  type="info"
                  size="small"
                  @click="showModalEdit(category, index)"
                  >Editar</Button
                >
                <Button
                  type="error"
                  size="small"
                  @click="showDeletingModal(category, i)"
                  :loading="category.isDeleting"
                  >Eliminar</Button
                >
              </td>
            </tr>
            <!-- ITEMS -->
          </table>
        </div>
      </div>

      <!-- category add modal -->
      <Modal
        v-model="addModal"
        title="Añadir Nueva Categoria"
        :mask-closable="false"
        :closable="false"
      >
        <Input
          v-model="data.categoryName"
          placeholder="Ingrese algo"
          style="width: 100%"
        ></Input>
        <div style="padding: 20px 0"></div>
        <Upload
          ref="upload"
          type="drag"
          :headers="{ 'x-csrf-token': token }"
          :on-success="handleSuccess"
          :format="['jpg', 'jpeg', 'png']"
          :on--error="handleError"
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
            <p>Subir imagen</p>
          </div>
        </Upload>
        <div class="demo-upload-list" v-if="data.iconImage">
          <img :src="`/uploads/${data.iconImage}`" />
          <div class="demo-upload-list-cover">
            <Icon type="ios-trash-outline" @click="deleteImage"></Icon>
          </div>
        </div>

        <div slot="footer">
          <Button type="default" @click="addModal = false">Cancelar</Button>
          <Button
            type="primary"
            @click="addCategory"
            :disabled="isAdding"
            :loading="isAdding"
            >{{ isAdding ? "Añadiendo .." : "Añadir" }}</Button
          >
        </div>
      </Modal>
      <!-- category editing modal -->
      <Modal
        v-model="editModal"
        title="Editar  Categoria"
        :mask-closable="false"
        :closable="false"
      >
        <Input
          v-model="editData.categoryName"
          placeholder="Ingrese algo"
          style="width: 100%"
        ></Input>
        <div style="padding: 20px 0"></div>
        <Upload
          v-show="isIconImageNew"
          ref="editDataUploads"
          type="drag"
          :headers="{ 'x-csrf-token': token }"
          :on-success="handleSuccess"
          :format="['jpg', 'jpeg', 'png']"
          :on-error="handleError"
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
            <p>Subir imagen</p>
          </div>
        </Upload>

        <div class="demo-upload-list" v-if="editData.iconImage">
          <img :src="`/uploads/${editData.iconImage}`" />
          <div class="demo-upload-list-cover">
            <Icon type="ios-trash-outline" @click="deleteImage(isAdd = false)"></Icon>
          </div>
        </div>
        <div slot="footer">
          <Button type="default" @click="closeEditModal">Cancelar</Button>
          <Button
            type="primary"
            @click="editCategory"
            :disabled="isEditing"
            :loading="isEditing"
            >{{ isEditing ? "Editando .." : "Editar" }}</Button
          >
        </div>
      </Modal>

      <!-- category delete modal -->
      <deleteModal/>


    </div>
  </div>
</template>

<script>

import deleteModal from '../components/deleteModal.vue'
import {mapGetters } from 'vuex';
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
      categories: [],
      editData: {
        iconImage: "",
        categoryName: "",
      },
      index: -1,
      isDeleing: false,
      showDeleteModal: false,
      deleteItem: {},
      deletingIndex: -1,
      websiteSettings: [],
      token: "",
      isIconImageNew: false,
      isEditingItem: false
    };
  },
  components:{
      deleteModal
  },
  methods: {
    async addCategory() {
      if (this.data.categoryName.trim() == "")
        return this.e("El nombre es requerido");
      if (this.data.iconImage.trim() == "")
        return this.e("La imagen es requerida");

      const res = await this.callApi("post", "api/create_category", this.data);
      if (res.status === 201) {
        this.s("Categoria añadida de forma exitosa");
        this.addModal = false;
        this.data.categoryName = "";
        this.data.iconImage = "";
      } else {
        if (res.status == 422) {
          if (res.data.errors.categoryName) {
            this.e(res.data.errors.categoryName[0]);
          }
          if (res.data.errors.iconImage) {
            this.e(res.data.errors.iconImage[0]);
          }
        }
      }
    },
    async editCategory() {
      if (this.editData.categoryName.trim() == "") return this.e("El nombre es requerido");
      if (this.editData.iconImage.trim() == "")  return this.e("El imagen  es requerida");

      const res = await this.callApi("put", "api/edit_category", this.editData);
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
    showModalEdit(category, index) {

      this.editData = category;
      this.editModal = true;
      this.index = index;
      this.isEditingItem = true;
    },

    showDeletingModal(category, i) {
       const deleteModalObj = {
         showModalDelete :true,
         deleteUrl: 'api/delete_category',
         data: category,
         deletingIndex: i,
         isDeleted: false,
         msg:'¿Esta seguro de eliminar una categoria?'
       }
       this.$store.commit('setDeletingModalObj', deleteModalObj);
    },
    handleView(name) {
      this.imgName = name;
      this.visible = true;
    },

    handleSuccess(res, file) {
      if(this.isEditingItem){
        return this.editData.iconImage = res.data
      }
      this.data.iconImage = res.data;
    },
    handleError(res, file) {

      this.$Notice.warning({
        title: "Formato de archivo es incorrecto",
        desc: `${
          file.errors.file.length ? file.errors.file[0] : "Algo esta mal"
        }`,
      });
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: "Formato de archivo es incorrecto",
        desc:
          "Formato de archivo " +
          file.name +
          " es incorrecto, por favor  seleccione jpg o png.",
      });
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: "El peso de la imagen excede el limite",
        desc: "El peso de la imagen  " + file.name + "no debe exceder 2M.",
      });
    },
    async deleteImage(isAdd = true) {
      let image;
      if (!isAdd) {
        this.isIconImageNew = true;
        image = this.editData.iconImage;
        this.editTag.iconImage = "";
        this.$refs.editDataUploads.clearFiles();
      } else {
        image = this.data.iconImage;
        this.data.iconImage = "";
        this.$refs.upload.clearFiles();
      }

      const res = await this.callApi("delete", "api/img_upload", {
        imageName: image,
      });
      if (res.status != 200) {
        this.data.iconImage = image;
        this.swr();
      }
    },
    closeEditModal(){
      this.isEditingItem = false;
      this.editModal= false;
    }
  },
  async created() {
    this.token = window.Laravel.csrfToken;
    const res = await this.callApi("get", "api/get_category");
    if (res.status == 200) {
      this.categories = res.data.categories;
    } else {
      this.swr();
    }
  },
  computed: {
      ...mapGetters(["getDeleteModalObj"])
  },
  watch: {
      getDeleteModalObj(obj){
          if(obj.isDeleted){
              this.categories.splice(obj.deletetingIndex,1)
          }
      }
  }
};
</script>

<style>
.table_image {
  width: 40px;
}
.table_image img {
  object-fit: cover;
}
.image_thumb {
  width: 140px;
}
.demo-upload-list {
  display: inline-block;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
.demo-upload-list img {
  width: 100%;
  height: 100%;
}
.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}
.demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;

}
</style>
