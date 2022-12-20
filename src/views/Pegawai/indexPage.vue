<template>
    <div
        class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">Dashboard</h1>
    </div>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <router-link :to="{ name: 'pegawai.create' }" class="btn btn-md btn-success">TAMBAH
                            PEGAWAI
                        </router-link>
                        <table class="table table-striped table-bordered mt-4">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">NIP</th>
                                    <th scope="col">NAMA PEGAWAI</th>
                                    <th scope="col">PEGAWAI</th>
                                    <th scope="col">EMAIL</th>
                                    <th scope="col">TELP</th>
                                    <th scope="col">GENDER</th>
                                    <th scope="col">STATUS</th>
                                    <th scope="col">AKSI</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(pegawai, id) in pegawais" :key="id">
                                    <td>{{ pegawai.nomor_induk_pegawai }}</td>
                                    <td>{{ pegawai.nama_pegawai }}</td>
                                    <template v-for="(departemen, id) in departemens" :key="id">
                                        <td v-if="departemen.id == pegawai.departemen_id ">{{ departemen.nama_departemen }}</td>
                                    </template>
                                    <td>{{ pegawai.email }}</td>
                                    <td>0{{ pegawai.telepon }}</td>
                                    <td>{{ pegawai.gender ? 'Pria' : 'Wanita' }}</td>
                                    <td>{{ pegawai.status ? 'Aktif' : 'Tidak Aktif' }}</td>
                                    <td class="text-center">
                                        <router-link :to="{
                                            name: 'pegawai.edit', params: { id: pegawai.id }
                                        }" class="btn btn-sm btn-primary mx-1">EDIT</router-link>
                                        <button @click="destroyPegawai(pegawai.id)" class="btn btn-sm btn-danger mx-1">DELETE</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import toastr from 'toastr'
export default {
    setup() {
        //reactive state
        let pegawais = ref([])
        let departemens = ref([])
        //mounted
        onMounted(() => {
            //get API from Laravel Backend
            axios.get('http://localhost:8000/api/pegawais')
                .then(response => {
                    //assign state posts with response data
                    pegawais.value = response.data.data
                }).catch(error => {
                    console.log(error.response.data)
                })

            axios.get('http://localhost:8000/api/departemens')
            .then(response => {
                //assign state posts with response data
                departemens.value = response.data.data
            }).catch(error => {
                console.log(error.response.data)
            })
        })

        const destroyPegawai = async (id) =>{
            await axios.delete('http://localhost:8000/api/pegawais/' +id)
            await axios.get('http://localhost:8000/api/pegawais')
                .then(response => {
                    //assign state posts with response data
                    pegawais.value = response.data.data
                }).catch(error => {
                    console.log(error.response.data)
                })
            await axios.get('http://localhost:8000/api/departemens')
            .then(response => {
                //assign state posts with response data
                toastr.success("Data Pegawai Berhasil dihapus !")
                departemens.value = response.data.data
            }).catch(error => {
                console.log(error.response.data)
            })
        }


        //return
        return {
            pegawais,
            departemens,
            destroyPegawai
        }
    }
}
</script>

<style>

</style>