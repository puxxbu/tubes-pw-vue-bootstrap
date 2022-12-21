<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>UPDATE DATA USER</h4>
                        <hr>
                        <form @submit.prevent="put">
                            <div class="form-group mb-3">
                                <label class="form-label">Nama
                                    User</label>
                                <input type="text" class="form-control" v-model="users.name"
                                    placeholder="Masukkan nama user">
                                <!-- validation -->
                                <div v-if="validation.name" class="mt-2 alert alert-danger">
                                    {{
                                            validation.name[0]
                                    }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Email</label>
                                <input class="form-control" v-model="users.nama_manager"
                                    placeholder="Masukkan nama manager">
                                <!-- validation -->
                                <div v-if="validation.email" class="mt-2 alert alert-danger">
                                    {{ validation.email[0]
                                    }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Jenis Kelamin</label>
                                <input class="form-control" type="number" v-model="users.jenis_kelamin"
                                    placeholder="Masukkan jenis kelamin">
                                <!-- validation -->
                                <div v-if="validation.jenis_kelamin" class="mt-2 alert alert-danger">
                                    {{
                                    validation.jenis_kelamin[0]
                                    }}
                                </div>
                            </div>

                            <div class="form-group mb-3">
                                <label class="form-label">Tanggal Lahir</label>
                                <div class="input-group mb-3">
                                    <input type="text" class="form-control" id="datepicker"
                                        v-model="users.tanggal_lahir">
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
                                <label for="content" class="form-label">Wilayah</label>
                                <input class="form-control" type="number" v-model="users.wilayah"
                                    placeholder="Masukkan alamat wilayah">
                                <!-- validation -->
                                <div v-if="validation.wilayah" class="mt-2 alert alert-danger">
                                    {{
                                    validation.wilayah[0]
                                    }}
                                </div>
                            </div>
                            <button type="submit" class="btn btn-primary">UPDATE DATA</button>
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
import $ from 'jquery'
import toastr from 'toastr'
export default {
    methods: {
        setDateValue1(value) {
            this.users.tanggal_lahir = value;
        },

    },
    mounted() {
        $('#datepicker').datepicker({
            dateFormat: "dd-mm-yy",
            onSelect: this.setDateValue1
        });
    },

    data() {
        return{
            user: {
                name : '',
                email : '',
                jenis_kelamin : '',
                tanggal_lahir : '',
                wilayah : '',
            }
        }
    },
   
    setup() {
        //state departemen
        const router = useRouter()
        const route = useRoute()
        const id = route.params.id;
        console.log(id);
        
        //state validation
        const validation = ref([])
        //vue route
        let users = ref([])
        onMounted(() => {
            axios
            .get('http://localhost:8000/api/departemens/' + id )
            .then( response => (users.value = response.data.data))
            // this.departemen.nama_departemen = departemens.value.nama_departemen;
            // this.departemen.nama_manager = departemens.value.nama_manager;
            // this.departemen.jumlah_pegawai = departemens.value.jumlah_pegawai;
            
        }),
        function edit() {
            
        }
        function put() {
            let name = users.value.name
            let email = users.value.email
            let jenis_kelamin = users.value.jenis_kelamin
            let tanggal_lahir = users.value.tanggal_lahir
            let wilayah = users.value.wilayah
            axios.put('https://tubes-hotel-pw.herokuapp.com/api/user/' + id, {
                name: name,
                email: email,
                jenis_kelamin: jenis_kelamin,
                tanggal_lahir: tanggal_lahir,
                wilayah: wilayah
            }).then(() => {
                //redirect ke post index
                toastr.success("Data User Berhasil diupdate!")
                router.push({
                    name: 'user.edit'
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
            put
        }
    }
}
</script>

<style>
</style>