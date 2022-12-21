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
                        <router-link :to="{ name: 'datapenginap.create' }" class="btn btn-md btn-success">TAMBAH
                            PESANAN
                        </router-link>
                        <table class="table table-striped table-bordered mt-4">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">NIK</th>
                                    <th scope="col">NAMA</th>
                                    <th scope="col">TANGGAL LAHIR</th>
                                    <th scope="col">WILAYAH</th>
                                    <th scope="col">JENIS KELAMIN</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(datapenginap, id) in datapenginaps" :key="id">
                                    <td>{{ datapenginap.nik }}</td>
                                    <td>{{ datapenginap.nama }}</td>
                                    <td>{{ datapenginap.tanngal_lahir }}</td>
                                    <td>{{ datapenginap.wilayah }}</td>
                                    <td>{{ datapenginap.jenis_kelamin }}</td>
                                    <td class="text-center">
                                        <router-link :to="{
                                            name: 'datapenginap.edit', params: { id: datapenginap.id }
                                        }" class="btn btn-sm btn-primary mx-1">EDIT</router-link>
                                        <button class="btn btn-sm btn-danger mx-1"
                                            @click="destroyPesanan(datapenginap.id)">DELETE</button>
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
// import moment from 'moment'
import toastr from 'toastr'

export default {
    setup() {
        //reactive state
        let datapenginaps = ref([])
        let user = ref([])
        let token = localStorage.getItem('token')
        //mounted
        onMounted(() => {
            let config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            axios.get('https://tubes-hotel-pw.herokuapp.com/api/user', config)
                .then(response => {
                    //assign state posts with response data
                    user.value = response.data
                    console.log(user.value.id)
                }).catch(error => {
                    console.log(error.response.data.data)
                })

            axios.get('https://tubes-hotel-pw.herokuapp.com/api/datapenginap')
                .then(response => {
                    //assign state posts with response data
                    datapenginaps.value = response.data.data
                    console.log(datapenginaps.value)

                }).catch(error => {
                    console.log(error.response.data)
                })
        })

        const destroyPesanan = async (id) => {
            await axios.delete('https://tubes-hotel-pw.herokuapp.com/api/datapenginap/' + id)
            await axios.get('https://tubes-hotel-pw.herokuapp.com/api/datapenginap')
                .then(response => {
                    //assign state posts with response data
                    datapenginaps.value = response.data.data
                }).catch(error => {
                    console.log(error.response.data)
                })
            await axios.get('https://gentle-scrubland-87023.herokuapp.com/api/users')
                .then(response => {
                    //assign state posts with response data
                    toastr.success("Data Pesanan Berhasil dihapus !");
                    user.value = response.data.data
                }).catch(error => {
                    console.log(error.response.data)
                })
        }


        //return
        return {
            datapenginaps,
            user,
            destroyPesanan
        }
    },

    // computed: {
    //     formatDate(){
    //         return (v)=>{
    //             return moment(String(v)).format('D MMMM YYYY')
    //         }
    //     }


    // },

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