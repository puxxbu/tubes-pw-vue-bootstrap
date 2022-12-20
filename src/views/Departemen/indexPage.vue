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
                        <router-link :to="{ name: 'departemen.create' }" class="btn btn-md btn-success">TAMBAH
                            DEPARTEMEN
                        </router-link>
                        <table class="table table-striped table-bordered mt-4">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">NAMA DEPARTEMEN</th>
                                    <th scope="col">NAMA MANAGER</th>
                                    <th scope="col">JUMLAH PEGAWAI</th>
                                    <th scope="col">AKSI</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(departemen, id) in departemens" :key="id">
                                    <td>{{ departemen.nama_departemen }}</td>
                                    <td>{{ departemen.nama_manager }}</td>
                                    <td>{{ departemen.jumlah_pegawai }}</td>
                                    <td class="text-center">
                                        <router-link :to="{
                                            name: 'departemen.edit', params: { id: departemen.id }
                                        }" class="btn btn-sm btn-primary mx-1">EDIT</router-link>
                                        <button @click="destroyDepartemen(departemen.id)" class="btn btn-sm btn-danger mx-1">DELETE</button>
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
        let departemens = ref([])
        //mounted
        onMounted(() => {
            //get API from Laravel Backend
            axios.get('http://localhost:8000/api/departemens')
                .then(response => {
                    //assign state posts with response data
                    departemens.value = response.data.data
                }).catch(error => {
                    console.log(error.response.data)
                })
        })

        const destroyDepartemen = async (id) =>{
            await axios.delete('http://localhost:8000/api/departemens/' +id)
            await axios.get('http://localhost:8000/api/departemens')
                .then(response => {
                    //assign state posts with response data
                    toastr.success("Data Departemen Berhasil dihapus!")
                    departemens.value = response.data.data
                }).catch(error => {
                    console.log(error.response.data)
                })
        }


        //return
        return {
            departemens,
            destroyDepartemen
        }
    }
}
</script>

<style>

</style>