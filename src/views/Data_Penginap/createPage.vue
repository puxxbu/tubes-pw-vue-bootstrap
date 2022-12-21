

<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>TAMBAH PENGINAP</h4>
                        <hr>
                        <form @submit.prevent="store">

                            <!-- <div class="form-group mb-3">
                                <label class="form-label">USER LOGIN</label>
                                <input type="text" class="form-control" v-model="data_penginap.nama_pesanan"
                                    placeholder="Masukkan nama makanan">
                                 validation 
                                <div v-if="validation.nama_pesanan" class="mt-2 alert alert-danger">
                                    {{
                                            validation.nama_pesanan[0]
                                    }}
                                </div>
                            </div> -->

                            <div class="form-group mb-3">
                                <label class="form-label">NIK</label>
                                <input type="text" class="form-control" v-model="data_penginap.nik"
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
                                <input type="text" class="form-control" v-model="data_penginap.nama"
                                    placeholder="Masukkan nama anda">
                                <!-- validation -->
                                <div v-if="validation.nama" class="mt-2 alert alert-danger">
                                    {{
                                            validation.nama[0]
                                    }}
                                </div>
                            </div>

                            <div class="form-group mb-3">
                                <label class="form-label">Wilayah</label>
                                <input type="text" class="form-control" v-model="data_penginap.wilayah"
                                    placeholder="Masukkan lokasi wilayah">
                                <!-- validation -->
                                <div v-if="validation.wilayah" class="mt-2 alert alert-danger">
                                    {{
                                            validation.wilayah[0]
                                    }}
                                </div>
                            </div>

                            <div class="form-group mb-3">
                                <label class="form-label">Jenis Kelamin</label>
                                <input type="text" class="form-control" v-model="data_penginap.jenis_kelamin"
                                    placeholder="Masukkan jenis kelamin">
                                <!-- validation -->
                                <div v-if="validation.jenis_kelamin" class="mt-2 alert alert-danger">
                                    {{
                                            validation.jenis_kelamin[0]
                                    }}
                                </div>
                            </div>

                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Tanggal Lahir</label>
                                <div class="input-group mb-3">
                                    <input type="text" class="form-control" id="datepicker"
                                        v-model="data_penginap.tanggal_lahir">
                                    <span class="input-group-text bg-light d-block">
                                        <font-awesome-icon icon="fa-solid fa-calendar-alt" />
                                    </span>
                                </div>
                                <div v-if="validation.tanggal_lahir" class="mt-2 alert alert-danger">
                                    {{
        validation.tanggal_lahir[0]
                                    }}
                                </div>
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
import { reactive, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import $ from 'jquery'
import toastr from 'toastr'

export default {
    methods: {
        setDateValue1(value) {
            this.data_penginap.tanggal_lahir = value;
        },

    },

    mounted() {
        $('#datepicker').datepicker({
            dateFormat: "yy-mm-dd",
            onSelect: this.setDateValue1
        });
    },

    setup() {
        //state departemen

        let users = ref([])
        // const picked = ref(new Date())
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
                    router.push({
                        name: 'login'
                    })
                })
        })

        const user = reactive({
            name: '',
            email: '',
            password: ''
        })

        const data_penginap = reactive({
            nik: '',
            nama: '',
            wilayah: '',
            jenis_kelamin: '',
            tanggal_lahir: '',
        })
        //state validation
        const validation = ref([])
        //vue router
        const router = useRouter()
        //method store
        function store() {
            console.log(data_penginap)
            let nik = data_penginap.nik
            let nama = data_penginap.nama
            let wilayah = data_penginap.wilayah
            let jenis_kelamin = data_penginap.jenis_kelamin
            let tanggal_lahir = data_penginap.tanggal_lahir

            axios.post('https://tubes-hotel-pw.herokuapp.com/api/data-penginap', {
                nik: nik,
                nama: nama,
                wilayah: wilayah,
                jenis_kelamin: jenis_kelamin,
                tanggal_lahir: tanggal_lahir,
                user_id: localStorage.getItem('id')
            }).then(() => {
                //redirect ke post index
                toastr.success('Pesanan telah berhasil dibuat');
                router.push({
                    name: 'data_penginap.index'
                })
            }).catch(error => {
                //assign state validation with error
                console.log(error)
                validation.value = error.response.data
            })
        }
        //return
        return {
            user,
            validation,
            router,
            data_penginap,
            users,
            store
        }
    }
}
</script>


<style>

</style>