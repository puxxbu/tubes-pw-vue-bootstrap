

<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>Buat Reservasi</h4>
                        <hr>
                        <form @submit.prevent="store">
                            <div class="form-group mb-3">
                                <label class="form-label">Tipe Kamar</label>
                                <input type="text" class="form-control" v-model="reservasi.tipe_kamar"
                                    placeholder="Masukkan nomor induk pegawai">
                                <!-- validation -->
                                <div v-if="validation.tipe_kamar" class="mt-2 alert alert-danger">
                                    {{
                                            validation.tipe_kamar[0]
                                    }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Nama Pemesan</label>
                                <input class="form-control" v-model="reservasi.nama_pemesan"
                                    placeholder="Masukkan nama pemesan">
                                <!-- validation -->
                                <div v-if="validation.nama_pemesan" class="mt-2 alert alert-danger">
                                    {{ validation.nama_pemesan[0]
                                    }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Departemen</label>
                                <div class="form-group mb-3">
                                    <select class="form-select" aria-label="Gender" v-model="pegawai.departemen_id">
                                        <option v-for="(departemen, id) in departemens" :key="id"
                                            :value="departemen.id">{{ departemen.nama_departemen }}</option>
                                    </select>
                                </div>
                                <!-- validation -->
                                <div v-if="validation.departemen_id" class="mt-2 alert alert-danger">
                                    {{
                                            validation.departemen_id[0]
                                    }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Email</label>
                                <input class="form-control" type="text" v-model="pegawai.email"
                                    placeholder="Masukkan Email">
                                <!-- validation -->
                                <div v-if="validation.email" class="mt-2 alert alert-danger">
                                    {{
                                            validation.email[0]
                                    }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Telepon</label>
                                <input class="form-control" type="text" v-model="pegawai.telepon"
                                    placeholder="Masukkan Telepon">
                                <!-- validation -->
                                <div v-if="validation.telepon" class="mt-2 alert alert-danger">
                                    {{
                                            validation.telepon[0]
                                    }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Gender</label>
                                <div class="form-group mb-3">
                                    <select class="form-select" v-model="pegawai.gender">

                                        <option value="1">Pria</option>
                                        <option value="0">Wanita</option>
                                    </select>
                                </div>
                                <!-- validation -->
                                <div v-if="validation.gender" class="mt-2 alert alert-danger">
                                    {{
                                            validation.gender[0]
                                    }}
                                </div>
                            </div>


                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Status</label>
                                <div class="form-group mb-3">
                                    <select class="form-select" aria-label="Status" v-model="pegawai.status">

                                        <option value="1">Aktif</option>
                                        <option value="0">Tidak Aktif</option>
                                    </select>
                                </div>
                                <!-- validation -->
                                <div v-if="validation.status" class="mt-2 alert alert-danger">
                                    {{
        validation.status[0]
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
import toastr from 'toastr'

export default {
    setup() {
        //state departemen

        let departemens = ref([])


        onMounted(() => {
            //get API from Laravel Backend
            axios.get('http://localhost:8000/api/departemens')
                .then(response => {
                    //assign state posts with response data
                    departemens.value = response.data.data
                }).catch(error => {
                    console.log(error.response.data.data)
                })
        })

        const departemen = reactive({
            nama_departemen: '',
            nama_manager: '',
            jumlah_pegawai: ''
        })

        const pegawai = reactive({
            nomor_induk_pegawai: '',
            nama_pegawai: '',
            departemen_id: '',
            email: '',
            telepon: '',
            gender: '',
            status: '',
        })
        //state validation
        const validation = ref([])
        //vue router
        const router = useRouter()
        //method store
        function store() {
            console.log(pegawai)
            let nomor_induk_pegawai = pegawai.nomor_induk_pegawai
            let nama_pegawai = pegawai.nama_pegawai
            let departemen_id = pegawai.departemen_id
            let email = pegawai.email
            let telepon = pegawai.telepon
            let gender = pegawai.gender
            let status = pegawai.status

            axios.post('http://localhost:8000/api/pegawais/', {
                nomor_induk_pegawai: nomor_induk_pegawai,
                nama_pegawai: nama_pegawai,
                departemen_id: departemen_id,
                email: email,
                telepon: telepon,
                gender: gender,
                status: status
            }).then(() => {
                //redirect ke post index
                toastr.success("Data Pegawai berhasil diupdate")
                router.push({
                    name: 'pegawai.index'
                })
            }).catch(error => {
                //assign state validation with error
                validation.value = error.response.data
                console.log(validation.value)
            })
        }
        //return
        return {
            departemen,
            validation,
            router,
            pegawai,
            departemens,
            store
        }
    }
}
</script>

<style>

</style>