

<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>EDIT PEGAWAI </h4>
                        <hr>
                        <form @submit.prevent="put">
                            <div class="form-group mb-3">
                                <label class="form-label">Nama Proyek</label>
                                <input type="text" class="form-control" v-model="proyeks.nama_proyek"
                                    placeholder="Masukkan nama proyek">
                                <!-- validation -->
                                <div v-if="validation.nama_proyek" class="mt-2 alert alert-danger">
                                    {{
                                            validation.nama_proyek[0]
                                    }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Departemen</label>
                                <div class="form-group mb-3">
                                    <select class="form-select" aria-label="Gender" v-model="proyeks.departemen_id">
                                        <option v-for="(departemen, id) in departemens" :key="id"
                                            :value="departemen.id">{{ departemen.nama_departemen }}</option>
                                    </select>
                                </div>
                                <!-- validation -->
                                <div v-if="validation.departemen_id" class="mt-2 alert alert-danger">
                                    {{
                                            validation.departemen_id[0]
                                    }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Waktu Mulai</label>
                                <div class="input-group mb-3">
                                    <input type="text" class="form-control" id="datepicker"
                                        v-model="proyeks.waktu_mulai">
                                    <span class="input-group-text bg-light d-block">
                                        <font-awesome-icon icon="fa-solid fa-calendar-alt" />
                                    </span>

                                </div>


                                <div v-if="validation.waktu_mulai" class="mt-2 alert alert-danger">
                                    {{
                                            validation.waktu_mulai[0]
                                    }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Waktu Selesai</label>
                                <div class="input-group mb-3">
                                    <input type="text" class="form-control" id="datepicker2"
                                        v-model="proyeks.waktu_selesai" @change="formatDate">
                                    <span class="input-group-text bg-light d-block">
                                        <font-awesome-icon icon="fa-solid fa-calendar-alt" />
                                    </span>

                                </div>
                                <div v-if="validation.waktu_selesai" class="mt-2 alert alert-danger">
                                    {{
                                            validation.waktu_selesai[0]
                                    }}
                                </div>
                            </div>



                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Status</label>
                                <div class="form-group mb-3">
                                    <select class="form-select" aria-label="Status" v-model="proyeks.status">

                                        <option value="1">Aktif</option>
                                        <option value="0">Tidak Aktif</option>
                                    </select>
                                </div>
                                <!-- validation -->
                                <div v-if="validation.status" class="mt-2 alert alert-danger">
                                    {{
                                        validation.status[0]
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
import moment from 'moment'
import $ from 'jquery'
import toastr from 'toastr'


export default {
    methods: {
        setDateValue1(value){
            this.proyeks.waktu_mulai = value;
        },
        setDateValue2(value){
            this.proyeks.waktu_selesai = value;
        },
        
    },
    mounted() {
        $('#datepicker').datepicker({
            dateFormat: "dd-mm-yy",
            onSelect : this.setDateValue1
        });
        $('#datepicker2').datepicker({
            dateFormat: "dd-mm-yy",
            onSelect : this.setDateValue2
        });
    },

    data() {
        return{
            departemen: {
                nama_departemen : '',
                nama_manager : '',
                jumlah_pegawai : null,
            }
        }
    },
    computed: {
        formatDate(){
            return (v)=>{
                return moment(String(v)).format('DD-MM-YYYY')
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
        let proyeks = ref([])
        let departemens = ref([])

        onMounted(() => {
            axios.get('http://localhost:8000/api/departemens')
            .then(response => {
                //assign state posts with response data
                departemens.value = response.data.data
            }).catch(error => {
                console.log(error.response.data.data)
            })

            axios.get('http://localhost:8000/api/proyeks/' + id)
                .then(response => {
                    //assign state posts with response data
                    proyeks.value = response.data.data
                    proyeks.value.waktu_mulai = moment(String(proyeks.value.waktu_mulai)).format('DD-MM-YYYY')
                    proyeks.value.waktu_selesai = moment(String(proyeks.value.waktu_selesai)).format('DD-MM-YYYY')
                    
                }).catch(error => {
                    console.log(error.response.data)
            })
        
        }),



        function edit() {
            
        }

        function put() {
            let nama_proyek = proyeks.value.nama_proyek
            let waktu_mulai = proyeks.value.waktu_mulai
            let waktu_selesai = proyeks.value.waktu_selesai
            let departemen_id = proyeks.value.departemen_id
            let status = proyeks.value.status
            


            axios.put('http://localhost:8000/api/proyeks/' + id, {
                nama_proyek: nama_proyek,
                departemen_id: departemen_id,
                waktu_mulai: waktu_mulai,
                waktu_selesai: waktu_selesai,
                status: status,
                
            }).then(() => {
                //redirect ke post index
                toastr.success("Data Proyek Berhasil diedit !");
                router.push({
                    name: 'proyek.index'
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
            departemens,
            proyeks,
            put
        }
    }
}
</script>

<style>

</style>