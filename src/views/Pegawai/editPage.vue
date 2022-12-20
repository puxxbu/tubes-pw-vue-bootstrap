

<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>EDIT PEGAWAI </h4>
                        <hr>
                        <form @submit.prevent="put">
                            <div class="form-group mb-3">
                                <label class="form-label">NIP</label>
                                <input type="text" class="form-control" v-model="pegawais.nomor_induk_pegawai"
                                    placeholder="Masukkan nomor induk pegawai">
                                <!-- validation -->
                                <div v-if="validation.nomor_induk_pegawai" class="mt-2 alert alert-danger">
                                    {{
                                            validation.nomor_induk_pegawai[0]
                                    }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Nama Pegawai</label>
                                <input class="form-control" v-model="pegawais.nama_pegawai"
                                    placeholder="Masukkan nama pegawai">
                                <!-- validation -->
                                <div v-if="validation.nama_pegawai" class="mt-2 alert alert-danger">
                                    {{ validation.nama_pegawai[0]
                                    }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Departemen</label>
                                <div  class="form-group mb-3">
                                    <select  class="form-select" aria-label="Gender" v-model="pegawais.departemen_id">
                                    <option v-for="(departemen, id) in departemens" :key="id" :value="departemen.id"  >{{ departemen.nama_departemen }}</option>
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
                                <input class="form-control" type="text" v-model="pegawais.email"
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
                                <input class="form-control" type="text" v-model="pegawais.telepon" placeholder="Masukkan Telepon">
                                <!-- validation -->
                                <div v-if="validation.telepon" class="mt-2 alert alert-danger">
                                    {{
                                        validation.telepon[0]
                                    }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Gender</label>
                                <div  class="form-group mb-3">
                                    <select  class="form-select" v-model="pegawais.gender">
                                
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
                                <div  class="form-group mb-3">
                                    <select  class="form-select" aria-label="Status" v-model="pegawais.status">
                                    
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
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import toastr from 'toastr'


export default {
    data() {
        return{
            departemen: {
                nama_departemen : '',
                nama_manager : '',
                jumlah_pegawai : null,
            }
        }
    },
   
    setup() {
        //state departemen
        const router = useRouter()
        const route = useRoute()
        const id = route.params.id;
        console.log(id);
        
        //state validation
        const validation = ref([])
        //vue route
        let pegawais = ref([])
        let departemens = ref([])

        onMounted(() => {
            axios.get('http://localhost:8000/api/departemens')
            .then(response => {
                //assign state posts with response data
                departemens.value = response.data.data
            }).catch(error => {
                console.log(error.response.data.data)
            })

            axios.get('http://localhost:8000/api/pegawais/' + id)
                .then(response => {
                    //assign state posts with response data
                    pegawais.value = response.data.data
                    console.log(pegawais)
                }).catch(error => {
                    console.log(error.response.data)
            })
        
        }),



        function edit() {
            
        }

        function put() {
            let nomor_induk_pegawai = pegawais.value.nomor_induk_pegawai
            let nama_pegawai = pegawais.value.nama_pegawai
            let departemen_id = pegawais.value.departemen_id
            let email = pegawais.value.email
            let telepon = pegawais.value.telepon
            let gender = pegawais.value.gender
            let status = pegawais.value.status
            


            axios.put('http://localhost:8000/api/pegawais/' + id, {
                nomor_induk_pegawai: nomor_induk_pegawai,
                nama_pegawai: nama_pegawai,
                departemen_id: departemen_id,
                email: email,
                telepon: telepon,
                gender: gender,
                status: status,
                
            }).then(() => {
                //redirect ke post index
                toastr.success("Data Pegawai berhasil diupdate!")
                router.push({
                    name: 'pegawai.index'
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
            departemens,
            pegawais,
            put
        }
    }
}
</script>

<style>

</style>