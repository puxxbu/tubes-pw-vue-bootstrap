<template>
    <section class="vh-100" style="background-color: #eee;">
        <div class="container h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-lg-12 col-xl-11">
                    <div class="card text-black" style="border-radius: 25px;">
                        <div class="card-body p-md-5">
                            <div class="row justify-content-center">
                                <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                                    <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                                    <form @submit.prevent="store" class="mx-1 mx-md-4">


                                        <div class="d-flex flex-row align-items-center mb-4">
                                            <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                                            <div class="form-outline flex-fill mb-0">
                                                <label class="form-label" for="form3Example1c">Your Name</label>
                                                <input v-model="form.name" type="text" id="form3Example1c"
                                                    class="form-control" />
                                                <div v-if="validation.name" class="mt-2 alert alert-danger">
                                                    {{
                                                            validation.name[0]
                                                    }}
                                                </div>

                                            </div>
                                        </div>

                                        <div class="d-flex flex-row align-items-center mb-4">
                                            <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                            <div class="form-outline flex-fill mb-0">
                                                <label class="form-label" for="form3Example3c">Your Email</label>
                                                <input type="email" v-model="form.email" id="form3Example3c"
                                                    class="form-control" />
                                                <div v-if="validation.email" class="mt-2 alert alert-danger">
                                                    {{
                                                            validation.email[0]
                                                    }}
                                                </div>

                                            </div>
                                        </div>

                                        <div class="d-flex flex-row align-items-center mb-4">
                                            <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                                            <div class="form-outline flex-fill mb-0">
                                                <label class="form-label" for="form3Example4c">Password</label>
                                                <input type="password" v-model="form.password" id="form3Example4c"
                                                    class="form-control" />
                                                <div v-if="validation.password" class="mt-2 alert alert-danger">
                                                    {{ validation.password[0] }}
                                                </div>

                                            </div>
                                        </div>


                                        <div class=" d-flex justify-content-center mb-5">
                                            <span>
                                                Sudah Registrasi? <router-link :to="{
                                                    name:
                                                        'login'
                                                }"><u>Login</u></router-link>
                                            </span>

                                        </div>

                                        <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                            <button type="submit" class="btn btn-primary btn-lg">Register</button>
                                        </div>

                                    </form>

                                </div>
                                <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                                        class="img-fluid" alt="Sample image">

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import moment from 'moment'
import $ from 'jquery'
import toastr from 'toastr'


export default {
    methods: {
        setDateValue1(value) {
            this.proyeks.waktu_mulai = value;
        },
        setDateValue2(value) {
            this.proyeks.waktu_selesai = value;
        },

    },
    mounted() {
        $('#datepicker').datepicker({
            dateFormat: "dd-mm-yy",
            onSelect: this.setDateValue1
        });
        $('#datepicker2').datepicker({
            dateFormat: "dd-mm-yy",
            onSelect: this.setDateValue2
        });
    },

    data() {
        return {
            departemen: {
                nama_departemen: '',
                nama_manager: '',
                jumlah_pegawai: null,
            }
        }
    },
    computed: {
        formatDate() {
            return (v) => {
                return moment(String(v)).format('DD-MM-YYYY')
            }
        }


    },

    setup() {
        //state departemen
        const router = useRouter()
        const route = useRoute()

        //state validation
        const validation = ref([])
        //vue route
        const form = reactive({
            name: '',
            email: '',
            password: '',
        })





        function store() {
            let name = form.name
            let email = form.email
            let password = form.password



            axios.post('https://tubes-hotel-pw.herokuapp.com/api/register', {
                name: name,
                email: email,
                password: password,

            }).then(() => {
                //redirect ke post index
                toastr.success("Register Success");
                router.push({
                    name: 'login'
                })
            }).catch(error => {
                //assign state validation with error
                validation.value = error.response.data.errors
                console.log(validation.value)
            })
        }


        //return
        return {
            validation,
            route,
            store,
            form
        }
    }
}
</script>