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
                        <router-link :to="{ name: 'proyek.create' }" class="btn btn-md btn-success">TAMBAH
                            PROYEK
                        </router-link>
                        <table class="table table-striped table-bordered mt-4">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">NAMA PROYEK</th>
                                    <th scope="col">DEPARTEMEN</th>
                                    <th scope="col">WAKTU MULAI</th>
                                    <th scope="col">WAKTU SELESAI</th>
                                    <th scope="col">STATUS</th>
                                    <th scope="col">AKSI</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(proyek, id) in proyeks" :key="id">
                                    <td>{{ proyek.nama_proyek }}</td>
                                    <template v-for="(departemen, id) in departemens" :key="id">
                                        <td v-if="departemen.id == proyek.departemen_id ">{{ departemen.nama_departemen }}</td>
                                    </template>
                                    <td>{{ formatDate(proyek.waktu_mulai)  }}</td>
                                    <td>{{ formatDate(proyek.waktu_selesai) }}</td>
                                    <td>{{ proyek.status ? 'Aktif' : 'Tidak Aktif' }}</td>
                                    <td class="text-center">
                                        <router-link :to="{
                                            name: 'proyek.edit', params: { id: proyek.id }
                                        }" class="btn btn-sm btn-primary mx-1">EDIT</router-link>
                                        <button class="btn btn-sm btn-danger mx-1" @click="destroyProyek(proyek.id)">DELETE</button>
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
import moment from 'moment'
import toastr from 'toastr'


export default {
    setup() {
        //reactive state
        let proyeks = ref([])
        let departemens = ref([])
        //mounted
        onMounted(() => {
            //get API from Laravel Backend
            axios.get('http://localhost:8000/api/proyeks')
                .then(response => {
                    //assign state posts with response data
                    proyeks.value = response.data.data
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

        const destroyProyek = async (id) =>{
            await axios.delete('http://localhost:8000/api/proyeks/' +id)
            await axios.get('http://localhost:8000/api/proyeks')
                .then(response => {
                    //assign state posts with response data
                    proyeks.value = response.data.data
                }).catch(error => {
                    console.log(error.response.data)
                })
            await axios.get('http://localhost:8000/api/departemens')
            .then(response => {
                //assign state posts with response data
                toastr.success("Data Proyek Berhasil dihapus !");
                departemens.value = response.data.data
            }).catch(error => {
                console.log(error.response.data)
            })
        }


        //return
        return {
            proyeks,
            departemens,
            destroyProyek
        }
    },

    computed: {
        formatDate(){
            return (v)=>{
                return moment(String(v)).format('D MMMM YYYY')
            }
        }


    },

//     methods: { 
//       format_date(value){
//          if (value) {
//            return moment(String(value)).format('YYYYMMDD')
//           }
//       },
//    },
}
</script>

<style>

</style>