

<template>
    <div class="container">
        <div class="row d-flex justify-content-center">
            <div class="col-md-4 ">
                <Card  class="my-5">
                    <div class="login__header">
                        <h1>Iniciar Sesión</h1>
                    </div>
                    <Form ref="formInline" label-position="top" :model="formInline" block :rules="ruleInline"  >
                        <FormItem prop="email">
                            <Input type="text" v-model="formInline.email" placeholder="Username">
                                <Icon type="ios-person-outline" slot="prepend"></Icon>
                            </Input>
                        </FormItem>
                        <FormItem prop="password">
                            <Input type="password" v-model="formInline.password" placeholder="Password">
                                <Icon type="ios-lock-outline" slot="prepend"></Icon>
                            </Input>
                        </FormItem>
                        <FormItem>
                            <Button type="primary" @click="handleSubmit('formInline')" :disabled="isLoggedIn">Ingresar</Button>
                        </FormItem>
                    </Form>
                </Card>
            </div>
        </div>
    </div>

</template>
<script>
import { mapActions, mapMutations } from "vuex";
    export default {
        data () {
            return {
                formInline: {
                   email: '',
                    password: ''
                },
                ruleInline: {
                    email: [
                        { required: true, message: 'Por favor ingrese un nombre de usuario', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: 'Por favor ingrese una contraseña.', trigger: 'blur' },
                        { type: 'string', min: 6, message: 'La contraseña debe contener minimo 6 digitos', trigger: 'blur' }
                    ]
                },
               isLoggedIn: false
            }
        },
        methods: {
             ...mapActions(["LogIn"]),
             ...mapMutations("updatedUser"),
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('Iniciando Sesión ..');
                        this.submit();
                    } else {
                        this.$Message.error('Error!');
                    }
                })
            },
            async submit() {
                    const User = new FormData();
                    User.append("email", this.formInline.email);
                    User.append("password", this.formInline.password);
                    try {
                        await this.LogIn(User);
                        this.s("Logueo Exitoso");
                         this.$store.commit('updatedUser', true);
                        this.isLogging = true;
                        this.$router.push("/dashboard");

                    } catch (error) {
                         this.e(error);
                    }
            },


        }
    }
</script>
