<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>TAMBAH RESERVASI</h4>
                        <hr>
                        <form @submit.prevent="store">
                            <div class="form-group mb-3">
                                <label class="form-label">Jenis Kamar</label>
                                <select label="Jenis Kamar" v-model="reservasi.jenis_kamar" class="form-control">
                                    <option value="" selected disabled hidden>Pilih Jenis Kamar</option>
                                    <option value="deluxe">Deluxe Room</option>
                                    <option value="presidential">Presidential Suite</option>
                                    <option value="superior">Superior Room</option>
                                    <option value="standard">Standard Room</option>
                                </select>
                                <!-- validation -->
                                <div v-if="validation.jenis_kamar" class="mt-2 alert alert-danger">
                                    {{
                                            validation.jenis_kamar[0]
                                    }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Tanggal Masuk</label>
                                <div class="input-group mb-3">
                                    <input type="text" class="form-control" id="datepicker"
                                        v-model="reservasi.tanggal_masuk">
                                        <span class="input-group-text bg-light d-block">
                                            <font-awesome-icon icon="fa-solid fa-calendar-alt" />
                                    </span>
                                </div>
                                <div v-if="validation.tanggal_masuk" class="mt-2 alert alert-danger">
                                    {{
                                            validation.tanggal_masuk[0]
                                    }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Tanggal Keluar</label>
                                <div class="input-group mb-3">
                                    <input type="text" class="form-control" id="datepicker2"
                                        v-model="reservasi.tanggal_keluar">
                                        <span class="input-group-text bg-light d-block">
                                            <font-awesome-icon icon="fa-solid fa-calendar-alt" />
                                    </span>
                                </div>
                                <div v-if="validation.tanggal_keluar" class="mt-2 alert alert-danger">
                                    {{
                                            validation.tanggal_keluar[0]
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
import $ from 'jquery'
import toastr from 'toastr'





export default {
    methods: {
        setDateValue1(value){
            this.reservasi.tanggal_masuk = value;
        },
        setDateValue2(value){
            this.reservasi.tanggal_keluar = value;
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
    setup() {
        //state departemen

        let users = ref([])
        // const picked = ref(new Date())
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
                }).catch(error => {
                    console.log(error.response.data.data)
                    router.push({
                        name: 'login'
                    })
                })
        })

        const user = reactive({
            name: '',
            email: '',
            password: ''
        })

        const reservasi = reactive({
            jenis_kamar: '',
            nama_pemesan:'',
            tanggal_masuk: '',
            tanggal_keluar:'',
            status:"Booked"
        })
        //state validation
        const validation = ref([])
        //vue router
        const router = useRouter()
        //method store
        function store() {
            console.log(reservasi)
            let jenis_kamar = reservasi.jenis_kama
            let tanggal_masuk = reservasi.tanggal_masuk
            let tanggal_keluar = reservasi.tanggal_keluar
            let status = reservasi.status
            axios.post('http://127.0.0.1:8000/api/reservasi', {
                jenis_kamar: jenis_kamar,
                nama_pemesan: users.value.name,
                tanggal_masuk:tanggal_masuk,
                tanggal_keluar:tanggal_keluar,
                status:status
            }).then(() => {
                //redirect ke post index
                toastr.success('Reservasi telah berhasil dibuat');
                router.push({
                    name: 'reservasi.index'
                })
            }).catch(error => {
                //assign state validation with error
                console.log(error)
                validation.value = error.response.data.data
            })
        }
        //return
        return {
            user,
            validation,
            router,
            reservasi,
            users,
            store
        }
    }
}
</script>


<style>

</style>