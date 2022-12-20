

<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>TAMBAH PESANAN</h4>
                        <hr>
                        <form @submit.prevent="store">
                            
                            <div class="form-group mb-3">
                                <label class="form-label">Nama Pesanan</label>
                                <input type="text" class="form-control" v-model="pesanan_makanan.nama_pesanan"
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
                                <input type="text" class="form-control" v-model="pesanan_makanan.harga"
                                    placeholder="Masukkan nama proyek">
                                <!-- validation -->
                                <div v-if="validation.harga" class="mt-2 alert alert-danger">
                                    {{
                                            validation.harga[0]
                                    }}
                                </div>
                            </div>

                            <div class="form-group mb-3">
                                <label for="content" class="form-label">NAMA PEMESAN</label>
                                <div class="form-group mb-3">
                                    <select class="form-select" aria-label="Gender" v-model="pesanan_makanan.user_id">
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

                            <button type="submit"  class="btn btn-primary">SIMPAN</button>
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
// import $ from 'jquery'
import toastr from 'toastr'





export default {

    setup() {
        //state departemen

        let users = ref([])
        // const picked = ref(new Date())

        onMounted(() => {
            //get API from Laravel Backend
            axios.get('https://gentle-scrubland-87023.herokuapp.com/api/users')
                .then(response => {
                    //assign state posts with response data
                    users.value = response.data.data
                }).catch(error => {
                    console.log(error.response.data.data)
                })
        })

        const user = reactive({
            name: '',
            email: '',
            password: ''
        })

        const pesanan_makanan = reactive({
            nama_pesanan: '',
            harga: '',
            user_id: '',
        })
        //state validation
        const validation = ref([])
        //vue router
        const router = useRouter()
        //method store
        function store() {
            console.log(pesanan_makanan)
            let nama_pesanan = pesanan_makanan.nama_pesanan
            let harga = pesanan_makanan.harga
            let user_id = pesanan_makanan.user_id

            axios.post('https://tubes-hotel-pw.herokuapp.com/api/pesanan-makanan/', {
                nama_pesanan: nama_pesanan,
                harga: harga,
                user_id: user_id,
            }).then(() => {
                //redirect ke post index
                toastr.success('Pesanan telah berhasil dibuat');
                router.push({
                    name: 'pesanan_makanan.index'
                })
            }).catch(error => {
                //assign state validation with error
                console.log(error)
                validation.value = error.response.data
            })
        }
        //return
        return {
            user,
            validation,
            router,
            pesanan_makanan,
            users,
            store
        }
    }
}
</script>


<style>

</style>