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
                        <router-link :to="{ name: 'data_penginap.create' }" class="btn btn-md btn-success">TAMBAH
                            DATA PENGINAP
                        </router-link>
                        <table class="table table-striped table-bordered mt-4">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">USER LOGIN</th>
                                    <th scope="col">NIK</th>
                                    <th scope="col">NAMA</th>
                                    <th scope="col">TANGGAL LAHIR</th>
                                    <th scope="col">WILAYAH</th>
                                    <th scope="col">JENIS KELAMIN</th>
                                    <th scope="col">ACTION</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(data_penginap, id) in data_penginaps" :key="id">
                                    <td>{{ nama_user }}</td>
                                    <td>{{ data_penginap.nik }}</td>
                                    <td>{{ data_penginap.nama }}</td>
                                    <td>{{ data_penginap.tanggal_lahir }}</td>
                                    <td>{{ data_penginap.wilayah }}</td>
                                    <td>{{ data_penginap.jenis_kelamin }}</td>
                                    <td class="text-center">
                                        <router-link :to="{
                                            name: 'data_penginap.edit', params: { id: data_penginap.id }
                                        }" class="btn btn-sm btn-primary mx-1">EDIT</router-link>
                                        <button class="btn btn-sm btn-danger mx-1"
                                            @click="destroyPenginap(data_penginap.id)">DELETE</button>
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
        let data_penginaps = ref([])
        let user = ref([])
        let nama_user = localStorage.getItem('nama_user')
        console.log(nama_user)
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
                    axios.get('https://tubes-hotel-pw.herokuapp.com/api/data-penginap')
                        .then(response => {
                            //assign state posts with response data
                            data_penginaps.value = response.data.data
                            console.log(data_penginaps.value)
                            var filterData = data_penginaps.value.filter(function (el) {
                                return el.user_id == localStorage.getItem('id')
                            })

                            data_penginaps.value = filterData
                            data_penginaps.value.nama_user = localStorage.getItem('nama_user')


                        }).catch(error => {
                            console.log(error.response.data)
                        })
                }).catch(error => {
                    console.log(error.response.data.data)
                })


        })

        const destroyPenginap = async (id) => {
            await axios.delete('https://tubes-hotel-pw.herokuapp.com/api/data-penginap/' + id)
            await axios.get('https://tubes-hotel-pw.herokuapp.com/api/data-penginap')
                .then(response => {
                    //assign state posts with response data
                    data_penginaps.value = response.data.data
                    toastr.success("Data Pesanan Berhasil dihapus !");
                }).catch(error => {
                    console.log(error.response.data)
                })
        }


        //return
        return {
            data_penginaps,
            user,
            nama_user,
            destroyPenginap
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