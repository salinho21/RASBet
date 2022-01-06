<template>
    <v-app class="stickypage">
        <Header/>
        <v-container>
            <v-layout justify-center row wrap>
                <v-flex xs10 sm10 md9 lg6>
                    <v-card class="mt-16" color="indigo darken-4" elevation="10">
                        <v-row >
                            <v-col>
                                <v-card-title class="white--text text-h4 mr-5">
                                    <v-icon class="mr-3" size="50px" color="white">
                                        mdi-cog
                                    </v-icon>
                                    Detalhes de Conta
                                </v-card-title>
                            </v-col>
                        </v-row>
                    </v-card>
                     <v-card class="mt-2" elevation="10" >
                       <v-form v-model="valid" ref="form" >
                        <v-row class="pb-16">
                            <v-col cols="5" class="mr-10">
                                <v-row class="mb-4" justify="center">
                                    <v-avatar class="ml-16" size="250">
                                        <v-img src="../assets/defaultuser.jpg"/>
                                    </v-avatar>
                                </v-row>
                                <v-row justify="center">
                                    <v-btn class="mt-5 ml-16" rounded >
                                    Alterar Imagem
                                </v-btn>
                                </v-row>
                                
                            </v-col>
                            <v-col cols="5" class="mt-13">
                                <v-row>
                                    <v-text-field v-model="formData.name" placeholder="Nome">
                                    </v-text-field>
                                </v-row>
                                <v-row>
                                   <v-text-field v-model="formData.email" placeholder="Email">
                                    </v-text-field>
                                </v-row>
                                <v-row>
                                    <v-text-field v-model="formData.password" placeholder="Password">
                                    </v-text-field>
                                </v-row>
                                <v-row justify="end">
                                    <v-btn class="mt-7" rounded @click="print">
                                        Editar Perfil
                                    </v-btn>
                                </v-row>
                            </v-col>
                        </v-row>
                       </v-form>
                    </v-card>
                </v-flex>
            </v-layout>
            </v-container>
        <Footer/>
    </v-app>
</template>
    
<script>
import axios from 'axios';
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'

export default {
    components: { 
      Header,
      Footer
    },
     data(){
        return{
            formData:{
                name: '',
                email: '',
                password: ''
            }

        }
    },
    created(){
        if(localStorage.getItem('token') === null){
            this.$router.push('/authentication')
        }  
        axios.get('http://localhost:8001/user', {headers: {token: localStorage.getItem('token')}})
            .then(res => {
                this.name = res.data.user.name,
                this.email = res.data.user.email,
                this.password = res.data.user.password
        })      
    },
    mounted(){
              
    },
    methods: {
        print(){
            console.log(this.name)
            console.log(this.email)
            console.log(this.password)

        }
    }
}
</script>

