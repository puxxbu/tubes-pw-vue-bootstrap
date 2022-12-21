

<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>Data Penginap</h4>
                        <hr>
                        <form @submit.prevent="store">

                            <div class="form-group mb-3">
                                <label class="form-label">NIK</label>
                                <input type="text" class="form-control" v-model="datapenginap.nik"
                                    placeholder="Masukkan NIK">
                                <!-- validation -->
                                <div v-if="validation.nik" class="mt-2 alert alert-danger">
                                    {{
                                            validation.nik[0]
                                    }}
                                </div>
                            </div>

                            <div class="form-group mb-3">
                                <label class="form-label">Nama</label>
                                <input type="text" class="form-control" v-model="datapenginap.nama"
                                    placeholder="Masukkan nama">
                                <!-- validation -->
                                <div v-if="validation.nama" class="mt-2 alert alert-danger">
                                    {{
                                            validation.nama[0]
                                    }}
                                </div>
                            </div>

                            <div class="form-group mb-3">
                                <label class="form-label">Wilayah</label>
                                <input type="text" class="form-control" v-model="datapenginap.wilayah"
                                    placeholder="Masukkan wilayah">
                                <!-- validation -->
                                <div v-if="validation.wilayah" class="mt-2 alert alert-danger">
                                    {{
                                            validation.wilayah[0]
                                    }}
                                </div>
                            </div>

                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Jenis Kelamin</label>
                                <div class="form-group mb-3">
                                    <select class="form-select" v-model="datapenginap.jenis_kelamin">

                                        <option value="1">Pria</option>
                                        <option value="0">Wanita</option>
                                    </select>
                                </div>
                                <!-- validation -->
                                <div v-if="validation.jenis_kelamin" class="mt-2 alert alert-danger">
                                    {{
                                            validation.jenis_kelamin[0]
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
// import $ from 'jquery'
import toastr from 'toastr'





export default {

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

        const datapenginap = reactive({
            nik: '',
            nama: '',
            tanggal_lahir: '',
            wilayah: '',
            jenis_kelamin: '',
        })
        //state validation
        const validation = ref([])
        //vue router
        const router = useRouter()
        //method store
        function store() {
            console.log(datapenginap)
            let nik = datapenginap.nik
            let nama = datapenginap.nama
            let tanggal_lahir = datapenginap.tanggal_lahir
            let wilayah = datapenginap.wilayah
            let jenis_kelamin = datapenginap.jenis_kelamin


            axios.post('https://tubes-hotel-pw.herokuapp.com/api/data-penginap', {
                nama_pesanan: nama_pesanan,
                harga: harga,
                user_id: users.value.id
            }).then(() => {
                //redirect ke post index
                toastr.success('Pesanan telah berhasil dibuat');
                router.push({
                    name: 'datapenginap.index'
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
            datapenginap,
            users,
            store
        }
    }
}
</script>


<style>

</style>