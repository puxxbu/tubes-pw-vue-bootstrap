

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
                                <label class="form-label">Nama Pesanan</label>
                                <input type="text" class="form-control" v-model="pesanan_makanans.nama_pesanan"
                                    placeholder="Masukkan nama makanan">
                                <!-- validation -->
                                <div v-if="validation.nama_pesanan" class="mt-2 alert alert-danger">
                                    {{
                                            validation.nama_pesanan[0]
                                    }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label class="form-label">Harga</label>
                                <input type="text" class="form-control" v-model="pesanan_makanans.harga"
                                    placeholder="Masukkan harga">
                                <!-- validation -->
                                <div v-if="validation.harga" class="mt-2 alert alert-danger">
                                    {{
                                            validation.harga[0]
                                    }}
                                </div>
                            </div>
                            
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Nama Pemesan</label>
                                <div class="form-group mb-3">
                                    <select class="form-select" aria-label="Gender" v-model="pesanan_makanans.user_id">
                                        <option v-for="(user, id) in users" :key="id"
                                            :value="user.id">{{ user.name }}</option>
                                    </select>
                                </div>
                                <!-- validation -->
                                <div v-if="validation.user_id" class="mt-2 alert alert-danger">
                                    {{
                                            validation.user_id[0]
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
// import moment from 'moment'
// import $ from 'jquery'
import toastr from 'toastr'


export default {
    // methods: {
    //     setDateValue1(value){
    //         this.pesanan_makanans.waktu_mulai = value;
    //     },
    //     setDateValue2(value){
    //         this.proyeks.waktu_selesai = value;
    //     },
        
    // },
    // mounted() {
    //     $('#datepicker').datepicker({
    //         dateFormat: "dd-mm-yy",
    //         onSelect : this.setDateValue1
    //     });
    //     $('#datepicker2').datepicker({
    //         dateFormat: "dd-mm-yy",
    //         onSelect : this.setDateValue2
    //     });
    // },

    data() {
        return{
            user: {
                name : '',
                email : '',
                password : null,
            }
        }
    },
    // computed: {
    //     formatDate(){
    //         return (v)=>{
    //             return moment(String(v)).format('DD-MM-YYYY')
    //         }
    //     }


    // },
   
    setup() {
        //state departemen
        const router = useRouter()
        const route = useRoute()
        const id = route.params.id;
        console.log(id);
        
        //state validation
        const validation = ref([])
        //vue route
        let pesanan_makanans = ref([])
        let users = ref([])

        onMounted(() => {
            axios.get('https://gentle-scrubland-87023.herokuapp.com/api/users')
            .then(response => {
                //assign state posts with response data
                users.value = response.data.data
            }).catch(error => {
                console.log(error.response.data.data)
            })

            axios.get('https://tubes-hotel-pw.herokuapp.com/api/pesanan-makanan/' + id)
                .then(response => {
                    //assign state posts with response data
                    pesanan_makanans.value = response.data.data
                    
                }).catch(error => {
                    console.log(error.response.data)
            })
        
        }),



        function edit() {
            
        }

        function put() {
            let nama_pesanan = pesanan_makanans.value.nama_pesanan
            let harga = pesanan_makanans.value.harga
            let user_id = pesanan_makanans.value.user_id
            


            axios.put('https://tubes-hotel-pw.herokuapp.com/api/pesanan-makanan/' + id, {
                nama_pesanan: nama_pesanan,
                harga: harga,
                user_id: user_id,
                
            }).then(() => {
                //redirect ke post index
                toastr.success("Data Pesanan Berhasil diedit !");
                router.push({
                    name: 'pesanan_makanan.index'
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
            pesanan_makanans,
            put
        }
    }
}
</script>

<style>

</style>