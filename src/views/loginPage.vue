<template>
    <section class="vh-100" style="background-color: #874b0f;">
        <div class="container h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-lg-12 col-xl-11">
                    <div class="card text-black" style="border-radius: 25px;">
                        <div class="card-body p-md-5">
                            <div class="row justify-content-center">
                                <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                                    <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Login</p>

                                    <form @submit.prevent="store" class="mx-1 mx-md-4">

                                        <div class="d-flex flex-row align-items-center mb-4">
                                            <font-awesome-icon icon="fa-user" size="xl" class="me-3 mt-4" />
                                            <div class="form-outline flex-fill mb-0">
                                                <label class="form-label" for="form3Example3c">Your Email</label>
                                                <input type="email" v-model="form.email" id="form3Example3c"
                                                    class="form-control" />


                                            </div>
                                        </div>
                                        <div v-if="validation.email" class="mt-2 alert alert-danger">
                                            {{
                                                    validation.email[0]
                                            }}
                                        </div>

                                        <div class="d-flex flex-row align-items-center mb-4">
                                            <p><font-awesome-icon icon="fa-key" size="xl" class="me-3 mt-5" /></p>
                                            <div class="form-outline flex-fill mb-0">
                                                <label class="form-label" for="form3Example4c">Password</label>
                                                <input type="password" v-model="form.password" id="form3Example4c"
                                                    class="form-control" />


                                            </div>
                                        </div>
                                        <div v-if="validation.password" class=" ml-3 mt-2 alert alert-danger">
                                            {{ validation.password[0] }}
                                        </div>


                                        <div class=" d-flex justify-content-center mb-5">
                                            <span>
                                                Belum Registrasi? <router-link :to="{
                                                    name:
                                                        'register'
                                                }"><u>Register</u></router-link>
                                            </span>

                                        </div>

                                        <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                            <button type="submit" class="btn btn-primary btn-lg">Login</button>
                                        </div>

                                    </form>

                                </div>
                                <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                                    <img src="https://vignette.wikia.nocookie.net/logopedia/images/a/a3/Thetransluxuryhotel.png/revision/latest?cb=20180706090517.webp"
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
            email: '',
            password: '',
        })





        function store() {
            // let config = {
            //     headers: {
            //         Authorization: value,
            //     }
            // }
            let email = form.email
            let password = form.password
            axios.post('https://tubes-hotel-pw.herokuapp.com/api/login', {
                email: email,
                password: password,

            }).then(response => {
                //redirect ke post index
                toastr.success("Login Success");

                localStorage.setItem('token', response.data.access_token)
                console.log(response.data.data.name + ' name');
                localStorage.setItem('id', response.data.data.id);
                localStorage.setItem('nama_user', response.data.data.name);
                console.log(localStorage.getItem('nama_user') + ' name');
                // console.log(localStorage.getItem('token'));
                // console.log(localStorage.getItem('nama_user') + 'nama');
                router.push({
                    name: 'beranda'
                })
            }).catch(error => {
                //assign state validation with error
                validation.value = error.response.data
                if (typeof (validation.value.errors) !== 'undefined') {
                    validation.value = error.response.data.errors
                } else {
                    validation.value = error.response.data.message
                    toastr.error(error.response.data.message);
                }
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