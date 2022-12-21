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
                        <router-link :to="{ name: 'reservasi.create' }" class="btn btn-md btn-success">TAMBAH
                            RESERVASI
                        </router-link>
                        <table class="table table-striped table-bordered mt-4">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">JENIS_KAMAR</th>
                                    <th scope="col">TANGGAL MASUK</th>
                                    <th scope="col">TANGGAL KELUAR</th>
                                    <th scope="col">STATUS</th>
                                    <th scope="col">AKSI</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(reservasi, id) in reservasis" :key="id">
                                    <td>{{ reservasi.tipe_kamar }}</td>
                                    <td>{{ reservasi.tanggal_masuk }}</td>
                                    <td>{{ reservasi.tanggal_keluar }}</td>
                                    <td>{{ reservasi.status }}</td>
                                    <!-- <td class="text-center">
                                        <router-link :to="{
                                            name: 'reservasi.edit', params: { id: reservasi.id }
                                        }" class="btn btn-sm btn-primary mx-1">EDIT</router-link>
                                        <button class="btn btn-sm btn-danger mx-1"
                                            @click="destroyPesanan(reservasi.id)">DELETE</button>
                                    </td> -->
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
        let reservasis = ref([])
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
                    axios.get('https://tubes-hotel-pw.herokuapp.com/api/reservasi')
                        .then(response => {
                            //assign state posts with response data
                            reservasis.value = response.data.data
                            console.log(reservasis.value)
                            // var filterData = pesanan_makanans.value.filter(function (el) {
                            //     return el.user_id == user.value.id
                            // })

                            // pesanan_makanans.value = filterData
                            // console.log(user.value.id + "PESANAN")

                        }).catch(error => {
                            console.log(error.response.data)
                        })
                }).catch(error => {
                    console.log(error.response.data.data)
                })


        })

        const destroyPesanan = async (id) => {
            await axios.delete('https://tubes-hotel-pw.herokuapp.com/api/reservasi/' + id)
            await axios.get('https://tubes-hotel-pw.herokuapp.com/api/reservasi')
                .then(response => {
                    //assign state posts with response data
                    reservasis.value = response.data.data
                    toastr.success("Data Pesanan Berhasil dihapus !");
                }).catch(error => {
                    console.log(error.response.data)
                })
        }


        //return
        return {
            reservasis,
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