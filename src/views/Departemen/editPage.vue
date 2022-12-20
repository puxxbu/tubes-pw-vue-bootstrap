

<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>EDIT DEPARTEMEN </h4>
                        <hr>
                        <form @submit.prevent="put">
                            <div class="form-group mb-3">
                                <label class="form-label">Nama
                                    Departemen</label>
                                <input type="text" class="form-control" v-model="departemens.nama_departemen"
                                    placeholder="Masukkan nama departemen">
                                <!-- validation -->
                                <div v-if="validation.nama_departemen" class="mt-2 alert alert-danger">
                                    {{
                                            validation.nama_departemen[0]
                                    }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Nama Manager</label>
                                <input class="form-control" v-model="departemens.nama_manager"
                                    placeholder="Masukkan nama manager">
                                <!-- validation -->
                                <div v-if="validation.nama_manager" class="mt-2 alert alert-danger">
                                    {{ validation.nama_manager[0]
                                    }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Jumlah Pegawai</label>
                                <input class="form-control" type="number" v-model="departemens.jumlah_pegawai"
                                    placeholder="Masukkan jumlah pegawai">
                                <!-- validation -->
                                <div v-if="validation.jumlah_pegawai" class="mt-2 alert alert-danger">
                                    {{
                                    validation.jumlah_pegawai[0]
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

        let departemens = ref([])

        onMounted(() => {
            axios
            .get('http://localhost:8000/api/departemens/' + id )
            .then( response => (departemens.value = response.data.data))

            // this.departemen.nama_departemen = departemens.value.nama_departemen;
            // this.departemen.nama_manager = departemens.value.nama_manager;
            // this.departemen.jumlah_pegawai = departemens.value.jumlah_pegawai;
            


        }),



        function edit() {
            
        }

        function put() {
            let nama_departemen = departemens.value.nama_departemen
            let nama_manager = departemens.value.nama_manager
            let jumlah_pegawai = departemens.value.jumlah_pegawai


            axios.put('http://localhost:8000/api/departemens/' + id, {
                nama_departemen: nama_departemen,
                nama_manager: nama_manager,
                jumlah_pegawai: jumlah_pegawai
            }).then(() => {
                //redirect ke post index
                toastr.success("Data Departemen Berhasil diupdate!")
                router.push({
                    name: 'departemen.index'
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
            put
        }
    }
}
</script>

<style>

</style>