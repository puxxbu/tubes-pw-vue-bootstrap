

<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>TAMBAH PROYEK</h4>
                        <hr>
                        <form @submit.prevent="store">
                            <div class="form-group mb-3">
                                <label class="form-label">Nama Proyek</label>
                                <input type="text" class="form-control" v-model="proyek.nama_proyek"
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
                                    <select class="form-select" aria-label="Gender" v-model="proyek.departemen_id">
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
                                        v-model="proyek.waktu_mulai">
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
                                        v-model="proyek.waktu_selesai">
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
                                    <select class="form-select" aria-label="Status" v-model="proyek.status">

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
import $ from 'jquery'
import toastr from 'toastr'





export default {
    methods: {
        setDateValue1(value){
            this.proyek.waktu_mulai = value;
        },
        setDateValue2(value){
            this.proyek.waktu_selesai = value;
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


        let departemens = ref([])
        // const picked = ref(new Date())



        onMounted(() => {
            //get API from Laravel Backend
            axios.get('http://localhost:8000/api/departemens')
                .then(response => {
                    //assign state posts with response data
                    departemens.value = response.data.data
                }).catch(error => {
                    console.log(error.response.data.data)
                })
        })

        const departemen = reactive({
            nama_departemen: '',
            nama_manager: '',
            jumlah_pegawai: ''
        })

        const proyek = reactive({
            nama_proyek: '',
            departemen_id: '',
            waktu_mulai: '',
            waktu_selesai: '',
            status: '',
        })
        //state validation
        const validation = ref([])
        //vue router
        const router = useRouter()
        //method store
        function store() {
            console.log(proyek)
            let nama_proyek = proyek.nama_proyek
            let waktu_mulai = proyek.waktu_mulai
            let departemen_id = proyek.departemen_id
            let waktu_selesai = proyek.waktu_selesai
            let status = proyek.status

            axios.post('http://localhost:8000/api/proyeks/', {
                nama_proyek: nama_proyek,
                departemen_id: departemen_id,
                waktu_mulai: waktu_mulai,
                waktu_selesai: waktu_selesai,
                status: status
            }).then(() => {
                //redirect ke post index
                toastr.success('Proyek telah berhasil dibuat');
                router.push({
                    name: 'proyek.index'
                })
            }).catch(error => {
                //assign state validation with error
                console.log(error)
                validation.value = error.response.data
            })
        }
        //return
        return {
            departemen,
            validation,
            router,
            proyek,
            departemens,
            store
        }
    }
}
</script>


<style>

</style>