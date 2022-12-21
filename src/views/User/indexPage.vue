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
                        <router-link :to="{ name: 'user.edit' }" class="btn btn-md btn-success">UPDATE
                            PROFILE USER
                        </router-link>
                        <br>
                        <form class="row g-3 " >
                            <br>
                            <div class="col-md-12">
                                <br>
                                <label for="name" class="form-label">Nama User</label>
                                <input type="text" class="form-control" id="name" name="name">
                            </div>
                            <div class="col-md-12">
                                <label for="email" class="form-label">Email</label>
                                <input type="text" class="form-control" id="email" name="email" >
                            </div>
                            <div class="col-md-12">
                                <label for="jenis_kelamin" class="form-label">Jenis Kelamin</label>
                                <input type="text"  class="form-control" id="jenis_kelamin" name="jenis_kelamin" >
                            </div>
                            <div class="col-md-12">
                                <label for="phonennum" class="form-label">Tanggal lahir</label>
                                <div class="input-group mb-3">
                                    <input type="text" class="form-control" id="datepicker"
                                        v-model="users.tanggal_lahir">
                                    <span class="input-group-text bg-light d-block">
                                        <font-awesome-icon icon="fa-solid fa-calendar-alt" />
                                    </span>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <label for="wilayah" class="form-label">Wilayah</label>
                                <input type="text"  class="form-control" id="wilayah" name="wilayah" >
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import { onMounted, ref } from 'vue'
// import toastr from 'toastr'
export default {
    setup() {
        //reactive state
        let users = ref([])
        //mounted
        onMounted(() => {
            //get API from Laravel Backend
            axios.get('https://tubes-hotel-pw.herokuapp.com/api/user')
                .then(response => {
                    //assign state posts with response data
                    users.value = response.data.data
                }).catch(error => {
                    console.log(error.response.data)
                })
        })
        
        //return
        return {
            users
        }
    }
}
</script>

<style>
</style>