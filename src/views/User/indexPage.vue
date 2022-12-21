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
                        <form class="row g-3 ">
                            <br>
                            <div class="col-md-12">
                                <br>
                                <label for="name" class="form-label">Nama User</label>
                                <input disabled v-model="users.name" type="text" class="form-control" id="name"
                                    name="name">
                            </div>
                            <div class="col-md-12">
                                <label for="email" class="form-label">Email</label>
                                <input disabled v-model="users.email" type="text" class="form-control" id="email"
                                    name="email">
                            </div>
                            <div class="col-md-12">
                                <label for="jenis_kelamin" class="form-label">Jenis Kelamin</label>
                                <input disabled v-model="users.jenis_kelamin" type="text" class="form-control"
                                    id="jenis_kelamin" name="jenis_kelamin">
                            </div>
                            <div class="col-md-12">
                                <label for="phonennum" class="form-label">Tanggal lahir</label>
                                <div class="input-group mb-3">
                                    <input disabled type="text" class="form-control" id="datepicker"
                                        v-model="users.tanggal_lahir">
                                    <span class="input-group-text bg-light d-block">
                                        <font-awesome-icon icon="fa-solid fa-calendar-alt" />
                                    </span>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <label for="wilayah" class="form-label">Wilayah</label>
                                <input disabled v-model="users.wilayah" type="text" class="form-control" id="wilayah"
                                    name="wilayah">
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
import { useRouter } from 'vue-router'
// import toastr from 'toastr'
export default {
    setup() {
        //reactive state
        const router = useRouter()
        let users = ref([])
        // let token = localStorage.getItem('token')
        //mounted
        onMounted(() => {
            let token = localStorage.getItem('token')
            console.log(token)
            let config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            axios.get('https://tubes-hotel-pw.herokuapp.com/api/user', config)
                .then(response => {
                    //assign state posts with response data
                    users.value = response.data
                    console.log(users.value)

                }).catch(error => {
                    console.log(error.response.data.data)
                    router.push({
                        name: 'login'
                    })
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