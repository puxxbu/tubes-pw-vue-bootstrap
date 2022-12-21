

<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>EDIT PESANAN </h4>
                        <hr>
                        <form @submit.prevent="put">
                            <div class="form-group mb-3">
                                <label class="form-label">Jenis Kamar</label>
                                <select label="Jenis Kamar" v-model="reservasis.tipe_kamar" class="form-control">
                                    <option value="" selected disabled hidden>{{reservasis.tipe_kamar}}</option>
                                    <option value="deluxe">Deluxe Room</option>
                                    <option value="presidential">Presidential Suite</option>
                                    <option value="superior">Superior Room</option>
                                    <option value="standard">Standard Room</option>
                                </select>
                                <!-- <div v-if="validation.jenis_kamar" class="mt-2 alert alert-danger">
                                    {{
                                            validation.jenis_kamar[0]
                                    }}
                                </div> -->
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Tanggal Masuk</label>
                                <div class="input-group mb-3">
                                    <input type="text" class="form-control" id="datepicker"
                                        v-model="reservasis.tanggal_masuk">
                                    <span class="input-group-text bg-light d-block">
                                        <font-awesome-icon icon="fa-solid fa-calendar-alt" />
                                    </span>
                                </div>
                                <!-- <div v-if="validation.tanggal_masuk" class="mt-2 alert alert-danger">
                                    {{
                                            validation.tanggal_masuk[0]
                                    }}
                                </div> -->
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Tanggal Keluar</label>
                                <div class="input-group mb-3">
                                    <input type="text" class="form-control" id="datepicker2"
                                        v-model="reservasis.tanggal_keluar">
                                    <span class="input-group-text bg-light d-block">
                                        <font-awesome-icon icon="fa-solid fa-calendar-alt" />
                                    </span>
                                </div>
                                <!-- <div v-if="validation.tanggal_keluar" class="mt-2 alert alert-danger">
                                    {{
        validation.tanggal_keluar[0]
                                    }}
                                </div> -->
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
// import moment from 'moment'
import $ from 'jquery'
import toastr from 'toastr'


export default {
    methods: {
        setDateValue1(value){
            this.reservasis.tanggal_masuk = value;
        },
        setDateValue2(value){
            this.reservasis.tanggal_keluar = value;
        },

    },
    mounted() {
        $('#datepicker').datepicker({
            dateFormat: "yy-mm-dd",
            onSelect : this.setDateValue1
        });
        $('#datepicker2').datepicker({
            dateFormat: "yy-mm-dd",
            onSelect : this.setDateValue2
        });
    },

    data() {
        return {
            user: {
                name: '',
                email: '',
                password: null,
            },
        }
    },
    setup() {
        //state departemen
        const router = useRouter()
        const route = useRoute()
        const id = route.params.id;
        console.log(id);
        console.log

        //state validation
        const validation = ref([])
        //vue route
        let reservasis = ref([])
        let users = ref([])
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
                    console.log(users.value.id)
                    axios.get('https://tubes-hotel-pw.herokuapp.com/api/reservasi/' + id)
                        .then(response => {
                            //assign state posts with response data
                            reservasis.value = response.data.data
                            console.log(reservasis.value)
                            // var filterData2 = reservasis.value.filter(function (el) {
                            //     return el.id == id
                            // })
                            // reservasis.value = filterData2
                            console.log(reservasis.value.id)
                        }).catch(error => {
                            console.log(error.response.data)
                        })
                }).catch(error => {
                    console.log(error.response.data.data)
                })
            })
            // function edit() {

            // }

        function put() {
            let tipe_kamar = reservasis.value.tipe_kamar
            let tanggal_masuk = reservasis.value.tanggal_masuk
            console.log(tanggal_masuk)
            let tanggal_keluar = reservasis.value.tanggal_keluar
            let status = "Occupied"

            axios.put('https://tubes-hotel-pw.herokuapp.com/api/reservasi/' + id, {
                tipe_kamar: tipe_kamar,
                nama_pemesan: localStorage.getItem('nama_user'),
                tanggal_masuk: tanggal_masuk,
                tanggal_keluar: tanggal_keluar,
                status: status
            }).then(() => {
                //redirect ke post index
                toastr.success("Data Reservasi Berhasil diedit !");
                router.push({
                    name: 'reservasi.index'
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
            users,
            reservasis,
            put
        }
    }
}
</script>

<style>

</style>