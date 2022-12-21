

<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>EDIT DATA PENGINAP </h4>
                        <hr>
                        <form @submit.prevent="put">
                            <div class="form-group mb-3">
                                <label class="form-label">NIK</label>
                                <input type="text" class="form-control" v-model="data_penginaps.nik"
                                    placeholder="Masukkan nomor induk kependudukan">
                                <!-- validation -->
                                <div v-if="validation.nik" class="mt-2 alert alert-danger">
                                    {{
                                            validation.nik[0]
                                    }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label class="form-label">Nama Penginap</label>
                                <input type="text" class="form-control" v-model="data_penginaps.nama"
                                    placeholder="Masukkan nama penginap">
                                <!-- validation -->
                                <div v-if="validation.nama" class="mt-2 alert alert-danger">
                                    {{
                                            validation.nama[0]
                                    }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label class="form-label">Wilayah</label>
                                <input type="text" class="form-control" v-model="data_penginaps.wilayah"
                                    placeholder="Masukkan alamat wilayah">
                                <!-- validation -->
                                <div v-if="validation.wilayah" class="mt-2 alert alert-danger">
                                    {{
                                            validation.wilayah[0]
                                    }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label class="form-label">Jenis Kelamin</label>
                                <input type="text" class="form-control" v-model="data_penginaps.jenis_kelamin"
                                    placeholder="Masukkan jenis kelamin">
                                <!-- validation -->
                                <div v-if="validation.jenis_kelamin" class="mt-2 alert alert-danger">
                                    {{
                                            validation.jenis_kelamin[0]
                                    }}
                                </div>
                            </div>

                            <div class="form-group mb-3">
                                <label class="form-label">Tanggal Lahir</label>
                                <div class="input-group mb-3">
                                    <input type="text" class="form-control" id="datepicker"
                                        v-model="data_penginaps.tanggal_lahir">
                                    <span class="input-group-text bg-light d-block">
                                        <font-awesome-icon icon="fa-solid fa-calendar-alt" />
                                    </span>
                                </div>
                                <!-- <div v-if="validation.tanggal_masuk" class="mt-2 alert alert-danger">
                                    {{
                                            validation.tanggal_masuk[0]
                                    }}
                                </div> -->
                            </div>



                            <button type="submit" class="btn btn-primary">SIMPAN</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
// import moment from 'moment'
import $ from 'jquery'
import toastr from 'toastr'


export default {
    methods: {
        setDateValue1(value) {
            this.data_penginaps.tanggal_lahir = value;
        },

    },
    mounted() {
        $('#datepicker').datepicker({
            dateFormat: "dd-mm-yy",
            onSelect: this.setDateValue1
        });
    },

    data() {
        return {
            user: {
                name: '',
                email: '',
                password: null,
            }
        }
    },
    // computed: {
    //     formatDate(){
    //         return (v)=>{
    //             return moment(String(v)).format('DD-MM-YYYY')
    //         }
    //     }


    // },

    setup() {
        //state departemen
        const router = useRouter()
        const route = useRoute()
        const id = route.params.id;
        console.log(id);

        //state validation
        const validation = ref([])
        //vue route
        let data_penginaps = ref([])
        let users = ref([])
        let token = localStorage.getItem('token')

        onMounted(() => {
            let config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            axios.get('https://tubes-hotel-pw.herokuapp.com/api/user', config)
                .then(response => {
                    //assign state posts with response data
                    users.value = response.data

                }).catch(error => {
                    console.log(error.response.data.data)
                })

            axios.get('https://tubes-hotel-pw.herokuapp.com/api/data-penginap/' + id)
                .then(response => {
                    //assign state posts with response data
                    data_penginaps.value = response.data.data[0]
                    console.log(data_penginaps.value)

                }).catch(error => {
                    console.log(error.response.data)
                })
        }),

            function edit() {

            }

        function put() {
            let nik = data_penginaps.value.nik
            let nama = data_penginaps.value.nama
            let wilayah = data_penginaps.value.wilayah
            let jenis_kelamin = data_penginaps.value.jenis_kelamin
            let tanggal_lahir = data_penginaps.value.tanggal_lahir

            axios.put('https://tubes-hotel-pw.herokuapp.com/api/data-penginap/' + id, {
                nik: nik,
                nama: nama,
                wilayah: wilayah,
                jenis_kelamin: jenis_kelamin,
                tanggal_lahir: tanggal_lahir,
                user_id: localStorage.getItem('id'),

            }).then(() => {
                //redirect ke post index
                toastr.success("Data Penginap Berhasil diedit !");
                router.push({
                    name: 'data_penginap.index'
                })
            }).catch(error => {
                //assign state validation with error
                validation.value = error.response.data
                console.log(error)
            })
        }


        //return
        return {
            validation,
            route,
            users,
            data_penginaps,
            put
        }
    }
}
</script>

<style>

</style>