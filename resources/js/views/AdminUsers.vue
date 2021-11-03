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
          Usuarios Recientes
          <Button @click="addModal = true"
            >Agregar Administrador<i class="ml-3 lni lni-circle-plus"></i
          ></Button>
        </p>

        <div class="_overflow _table_div">
          <table class="_table">
            <!-- TABLE TITLE -->
            <tr>
              <th>ID</th>
              <th>Nombre completo</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Fecha Creación</th>
              <th>Acciones</th>
            </tr>
            <!-- TABLE TITLE -->

            <!-- ITEMS -->
            <tr v-for="(user, i) in users" :key="i">
              <td>{{ i + 1 }}</td>
              <td class="_table_name">
                {{ user.fullName }}
              </td>
              <td >
                {{ user.email }}
              </td>
              <td >
                {{ user.rol }}
              </td>
              <td>{{ user.created_at }}</td>
              <td>
                <Button
                  type="info"
                  size="small"
                  @click="showModalEdit(user, index)"
                  >Editar</Button
                >
                <Button
                  type="error"
                  size="small"
                  @click="showDeletingModal(user, i)"
                  :loading="user.isDeleting"
                  >Eliminar</Button
                >
              </td>
            </tr>
            <!-- ITEMS -->
          </table>
        </div>
      </div>

      <!-- user add modal -->
      <Modal
        v-model="addModal"
        title="Añadir Nuevo Administrador"
        :mask-closable="false"
        :closable="false"
      >
        <Input
          v-model="data.fullName"
          placeholder="Nombre Completo"
          style="width: 100%"
        ></Input>
        <div style="padding: 10px 0"></div>
        <Input
          type="email"
          v-model="data.email"
          placeholder="Email"
          style="width: 100%"
        ></Input>
        <div style="padding: 10px 0"></div>
        <Input
          type="password"
          v-model="data.password"
          placeholder="Password"
          style="width: 100%"
        ></Input>
        <div style="padding: 10px 0"></div>
          <Select placeholder="Seleccione un rol" v-model="data.userType" style="width: 100%">
              <Option value="Admin">Administrador</Option>
              <Option value="Editor">Editor</Option>
          </Select>

        <div slot="footer">
          <Button type="default" @click="addModal = false">Cancelar</Button>
          <Button
            type="primary"
            @click="addAdmin"
            :disabled="isAdding"
            :loading="isAdding"
            >{{ isAdding ? "Añadiendo .." : "Añadir" }}</Button
          >
        </div>
      </Modal>
      <!-- user editing modal -->
      <Modal
        v-model="editModal"
        title="Editar  Administrador"
        :mask-closable="false"
        :closable="false"
      >
          <Input
          v-model="editData.fullName"
          placeholder="Nombre Completo"
          style="width: 100%"
        ></Input>
        <div style="padding: 10px 0"></div>
        <Input
          type="email"
          v-model="editData.email"
          placeholder="Email"
          style="width: 100%"
        ></Input>
        <div style="padding: 10px 0"></div>
        <Input
          type="password"
          v-model="editData.password"
          placeholder="Password"
          style="width: 100%"
        ></Input>
        <div style="padding: 10px 0"></div>
          <Select placeholder="Seleccione un rol" v-model="editData.userType" style="width: 100%">
              <Option value="Admin">Administrador</Option>
              <Option value="Editor">Editor</Option>
          </Select>
        <div slot="footer">
          <Button type="default" @click="closeEditModal">Cancelar</Button>
          <Button
            type="primary"
            @click="editUser"
            :disabled="isEditing"
            :loading="isEditing"
            >{{ isEditing ? "Editando .." : "Editar" }}</Button
          >
        </div>
      </Modal>

      <!-- user delete modal -->
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
        fullName: "",
        email: "",
        password: "",
        userType: "Admin"
      },
      addModal: false,
      editModal: false,
      isAdding: false,
      isEditing: false,
      users: [],
      editData: {
        fullName: "",
        email: "",
        password: "",
        userType: ""
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
    async addAdmin() {
      if (this.data.fullName.trim() == "")
        return this.e("El nombre es requerido");
      if (this.data.email.trim() == "")
        return this.e("El email es requerido");
      if (this.data.password.trim() == "")
        return this.e("La contraseña es requerida");
      if(!this.data.userType)
        return this.e("El rol es requerido");


      const res = await this.callApi("post", "api/create_user", this.data);
      if (res.status === 201) {
        this.s("Administrador añadido de forma exitosa");
        this.addModal = false;
        this.data.fullName = "";
        this.data.email = "";
        this.data.password = "";
        this.data.userType = "";
      } else {
        if (res.status == 422) {
            for (let index = 0; index < res.data.errors.length; index++) {
               this.e(res.data.errors[index][0]);
            }
        }
      }
    },
    async editUser() {
       if (this.editData.fullName.trim() == "")
        return this.e("El nombre es requerido");
      if (this.editData.email.trim() == "")
        return this.e("El email es requerido");
       if(!this.editData.userType)
        return this.e("El rol es requerido");

      const res = await this.callApi("put", "api/edit_user", this.editData);
      if (res.status === 200) {
        this.s("Administrador actualizado de forma exitosa");
        this.editModal = false;
         this.editData.fullName = "";
        this.editData.email = "";
        this.editData.password = "";
        this.editData.userType = "";
      } else {
        if (res.status == 422) {
           for (let index = 0; index < res.data.errors.length; index++) {
               this.e(res.data.errors[index][0]);
            }
        } else {
          this.swr();
        }
      }
    },
    showModalEdit(user, index) {
       let obj = {
           id: user.id,
           fullName: user.fullName,
           email: user.email,
           userType: user.userType
       }
      this.editData = obj;
      this.editModal = true;
      this.index = index;
      this.isEditingItem = true;
    },

    showDeletingModal(user, i) {
       const deleteModalObj = {
         showModalDelete :true,
         deleteUrl: 'api/delete_category',
         data: user,
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
      console.log("file", file);
      console.log("res", res);
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
    const res = await this.callApi("get", "api/get_user");
    if (res.status == 200) {
      this.users = res.data.users;
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
              this.users.splice(obj.deletetingIndex,1)
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

