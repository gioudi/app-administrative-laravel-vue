<template>


<Row  type="flex" justify="center" align="middle">
    <Col :xs="24" :sm="24" :md="18" :lg="8"   >
        <Card  class="my-5">
            <div class="login__header">
                <h1>Sing Up</h1>
            </div>
            <Form ref="formInline" label-position="top" :model="formInline" block :rules="ruleInline"  >
                <FormItem prop="fullName">
                    <Input type="text" v-model="formInline.fullName"    placeholder="Username">
                        <Icon type="ios-person-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="email">
                    <Input type="text" v-model="formInline.email" placeholder="Email">
                        <Icon type="ios-person-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>

                <FormItem prop="password">
                    <Input type="password" v-model="formInline.password" placeholder="Password">
                        <Icon type="ios-lock-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="handleSubmit('formInline')" >Sing Up</Button>
                    </FormItem>
            </Form>
        </Card>
    </Col>
</Row>

</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      formInline: {
        fullName: "",
        email: "",
        password: "",

      },
       ruleInline: {
            fullName: [
                { required: true, message: 'The name cannot be empty', trigger: 'blur' }
            ],
            email: [
                { required: true, message: 'Mailbox cannot be empty', trigger: 'blur' },
                { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
            ],
            password: [
                { required: true, message: 'Please fill in the password.', trigger: 'blur' },
                { type: 'string', min: 6, message: 'The password length cannot be less than 6 bits', trigger: 'blur' }
            ]
        },

      showError: false,
      submitted: false,
      successful: false,
      message: "",
    };
  },
  methods: {
    ...mapActions(["Register"]),
    handleSubmit(form) {
      this.message = "";
      this.submitted = true;
       this.$refs[form].validate((valid) => {
            if (valid) {
                this.$Message.success('Start ..');
                this.submit();
            } else {
                this.$Message.error('Error!');
            }
        })
    },
    async submit() {
        try {
            await this.Register(this.formInline);
            this.s("SingUp successfully !!");
            this.isLogging = true;
            this.$router.push("/dashboard");
        } catch (error) {
           this.e(error);
        }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
