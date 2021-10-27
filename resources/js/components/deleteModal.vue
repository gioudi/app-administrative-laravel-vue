<template>
    <div>
        <Modal :value="getDeleteModalObj.showModalDelete"
        :mask-closable="false"
        :closable="false"
        width="360">
        <p slot="header" style="color: #f60; text-align: center">
          <Icon type="ios-information-circle"></Icon>
          <span>Modal de confirmación</span>
        </p>
        <div style="text-align: center">
          <p>{{getDeleteModalObj.msg}}</p>
        </div>
        <div slot="footer">
            <Button
            type="default"
            size="large"

            @click="closeModal"
            >Close</Button
            >
            <Button
            type="error"
            size="large"

            :loading="isDeleing"
            :disabled="isDeleing"
            @click="deleteElement"
            >Delete</Button
            >
        </div>
      </Modal>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'modalDelete',
    data(){
        return {
            isDeleing : false
        }
    },
    computed: {
        ...mapGetters(['getDeleteModalObj'])
    },
    methods : {
        async deleteElement() {
            this.isDeleing = true;
            const res = await this.callApi(
                "delete",
                this.getDeleteModalObj.deleteUrl,
                this.getDeleteModalObj.data
            );
            if (res.status === 200) {
               this.s(this.getDeleteModalObj.successMsg);
                this.$store.commit('setDeleteModal', true)
            } else {
                this.swr();
                this.$store.commit('setDeleteModal', false)
            }
            this.isDeleing = false;

        },
        closeModal(){
            this.$store.commit('setDeleteModal', false)
        }
    }
}
</script>

<style>

</style>
