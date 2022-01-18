<template>
    <v-app>
        <Header/>
            <v-layout justify-center row wrap>
                <v-flex xs12 sm12 md12 lg7>
                    <v-card class="mt-12" color="indigo darken-4" elevation="10">
                        <v-row >
                            <v-col>
                                <v-card-title class="white--text text-h4 mr-5">
                                    <v-icon class="mr-3" size="50px" color="white">
                                        mdi-plus
                                    </v-icon>
                                    Adicionar Evento
                                </v-card-title>
                            </v-col>
                         </v-row>
                    </v-card>

                    <v-card class="mt-2" elevation="10" >
                        <v-form v-model="valid" ref="form">
                            <v-row class="ml-4">
                                <v-col
                                    cols="8"
                                >
                                    <v-select
                                    v-model="formData.sport"
                                    :items="desportos"
                                    label="Desporto"
                                    ></v-select>
                                </v-col>
                            </v-row>
                             <v-col cols="12" class="mb-5"><v-divider/></v-col>  
                            <v-row  class="ml-4">
                                <v-col cols="4">
                                    <v-text-field v-model="formData.team1" label="Equipa visitada"/>
                                </v-col>
                                <v-col cols="4">
                                    <v-text-field v-model="formData.team2" label="Equipa visitante"/>
                                </v-col>
                            </v-row>
                            <v-div v-if="formData.sport===  'Basquetebol' || formData.sport===  'MMA' || formData.sport===  'Voleibol' || formData.sport===  'Ténis' ||formData.sport=== 'Snooker'  ">
                             <v-row class="ml-4">
                                <v-col cols="2">
                                    <v-text-field v-model="formData.home" label="Odd home"/>
                                </v-col>
                                <v-col cols="2">
                                    <v-text-field v-model="formData.away" label="Odd away"/>
                                </v-col>
                            </v-row>
                            </v-div>
                            <v-div v-else>
                            <v-row class="ml-4">
                                <v-col cols="2">
                                    <v-text-field v-model="formData.home" label="Odd home"/>
                                </v-col>
                                <v-col cols="2">
                                    <v-text-field v-model="formData.tie" label="Odd tie"/>
                                </v-col>
                                <v-col cols="2">
                                    <v-text-field v-model="formData.away" label="Odd away"/>
                                </v-col>
                            </v-row>
                            </v-div>
                            <v-row justify="end">
                                <v-btn class="white--text text-h6 mr-12 mb-8" dense color="indigo darken-4" @click="inserir">
                                    Adicionar
                                </v-btn>
                            </v-row>
                            
                        </v-form>
                    </v-card>
                </v-flex>
            </v-layout>
        <Footer/>
    </v-app>
</template>
    
<script>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import axios from 'axios'
export default {
    components: { 
      Header,
      Footer
    },
     data(){
        return{
            formData:{
                sport:'',
                team1:'',
                team2:'',
                home:'',
                tie:'',
                away: '',
                state: 'Aberto'
            },
            desportos:['Futebol', 'Basquetebol','Hoquei no Gelo', 'Andebol','Ténis', 'Voleibol', 'MMA', 'Snooker'],
            user_type: '',
            valid: true
        }
    },

    created(){
        if(localStorage.getItem('token')===null){
            this.$router.push('/authentication')
        }
        
        axios.get('http://localhost:8001/user', {headers: {token: localStorage.getItem('token')}})
            .then(res => {
                this.user_type = res.data.user.user_type
                console.log(res.data.user.user_type)
                if(this.user_type != 'Admin')
                    this.$router.push('/authentication')    
        })      
    },
    methods:{
        inserir(){
            axios.post(`http://localhost:8001/evento`, this.formData)
                .then((response)=>{
                    console.log(response)
                    this.formData.tie = ''
                }).catch((error)=>{
                    console.log(error)
                })
                
        }
    }
}
</script>