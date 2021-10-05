export default {
    data() {
        return {

        }
    },
    methods: {
        callApi(method, url ,dataObj){
            try {
              return  axios({
                    method,
                    url,
                    data: dataObj
                })
            }catch(e) {
                console.log(e);
                return e.response;
            }
        },
        i(desc, title="Hey"){
            this.$Notice.info({
                title,
                desc
            })
        },
        s(desc, title="Grandioso"){
            this.$Notice.success({
                title,
                desc
            })
        },
        w(desc, title="Aviso"){
            this.$Notice.warning({
                title,
                desc
            })
        },
        e(desc='A ocurrido un error. Por favor intent mas tarde', title="Oops"){
            this.$Notice.error({
                title,
                desc
            })
        },
    }
}
