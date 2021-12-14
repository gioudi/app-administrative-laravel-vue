

<template>


<Row  type="flex" justify="center" align="middle">
    <Col :xs="24" :sm="24" :md="18" :lg="8"   >
        <Card  class="my-5">
            <div class="login__header">
                <h1>Sign In</h1>
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
    </Col>
</Row>



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
                        { required: true, message: 'Mailbox cannot be empty', trigger: 'blur' },
                        { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: 'Please fill in the password.', trigger: 'blur' },
                        { type: 'string', min: 6, message: 'The password length cannot be less than 6 bits', trigger: 'blur' }
                    ]
                },
               isLoggedIn: false
            }
        },
        methods: {
             ...mapActions({LogIn:'LogIn'}),
             ...mapMutations("updatedUser"),
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('Start ..');
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
                        this.s("SingIn successfully !!");
                        this.isLogging = true;
                        this.$router.push("/dashboard");

                    } catch (error) {
                         this.e(error);
                    }
            },


        }
    }
</script>
