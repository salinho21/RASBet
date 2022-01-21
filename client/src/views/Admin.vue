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
                                    :rules="rules.required"
                                    ></v-select>
                                </v-col>
                            </v-row>
                             <v-col cols="12" class="mb-5"><v-divider/></v-col>  
                            <v-row  class="ml-4">
                                <v-col cols="4">
                                    <v-text-field v-model="formData.team1" label="Equipa visitada" :rules="rules.required"/>
                                </v-col>
                                <v-col cols="4">
                                    <v-text-field v-model="formData.team2" label="Equipa visitante" :rules="rules.required"/>
                                </v-col>
                            </v-row>
                            <v-div v-if="formData.sport===  'Basquetebol' || formData.sport===  'MMA' || formData.sport===  'Voleibol' || formData.sport===  'Ténis' ||formData.sport=== 'Snooker'  ">
                             <v-row class="ml-4">
                                <v-col cols="2">
                                    <v-text-field v-model="formData.home" label="Odd home" :rules="rules.required"/>
                                </v-col>
                                <v-col cols="2">
                                    <v-text-field v-model="formData.away" label="Odd away" :rules="rules.required"/>
                                </v-col>
                            </v-row>
                            <v-row no-gutters class="ml-5 mt-7">
                                <h4 class="red--text" v-if="showError">Erro na inserção de Evento. Por favor verifique os campos e tente novamente!</h4>
                            </v-row>
                            </v-div>
                            <v-div v-else>
                            <v-row class="ml-4">
                                <v-col cols="2">
                                    <v-text-field v-model="formData.home" label="Odd home" :rules="rules.required"/>
                                </v-col>
                                <v-col cols="2">
                                    <v-text-field v-model="formData.tie" label="Odd tie" :rules="rules.required"/>
                                </v-col>
                                <v-col cols="2">
                                    <v-text-field v-model="formData.away" label="Odd away" :rules="rules.required"/>
                                </v-col>
                            </v-row>
                            <v-row no-gutters class="ml-5 mt-7">
                                <h4 class="red--text" v-if="showError">Erro na inserção de Evento. Por favor verifique os campos e tente novamente!</h4>
                            </v-row>
                            </v-div>
                            <v-row justify="end">
                                <v-btn class="white--text text-h6 mr-12 mb-8" dense color="indigo darken-4" @click="inserir">
                                    Adicionar
                                </v-btn>
                            </v-row>
                        </v-form>
                    </v-card>
                    <!-- Janela de Mudança de Password Bem-Sucedida -->
                    <v-dialog v-model="openConfirmSubmit" max-width="500px">
                        <v-card>
                            <v-app-bar color="indigo darken-4" >
                            <div class="d-flex align-center">
                                <h3 width="40" class="white--text"> Inserção de Evento</h3>
                            </div>
                            </v-app-bar>
                            <v-container>
                                <v-row>
                                    <v-col cols="3">
                                    <v-card class="ml-4 mt-1" color="white" flat height="100px" width="110px" >
                                        <v-img src="@/assets/check.png"/>
                                    </v-card>
                                    </v-col>
                                    <v-col cols="9">
                                    <h3 class="ml-5 mt-5">Inserção de Evento efetuada com Sucesso!</h3>
                                    </v-col>
                                </v-row>
                            </v-container>
                            <v-card-actions>
                                <v-container>
                                    <v-row >
                                        <v-col class="text-right">
                                        <v-tooltip bottom>
                                            <template v-slot:activator="{ on, attrs }">   
                                            <v-btn v-bind="attrs" v-on="on" color="#29E898" @click="closeSubmit" elevation="5" class="mt-5">
                                                <v-icon color="white">mdi-door-open</v-icon>
                                            </v-btn>                     
                                            </template>
                                            <span>Sair</span>
                                        </v-tooltip>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card-actions>
                        </v-card>
                    </v-dialog> 
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
                state: 'Aberto',
            },
            desportos:['Futebol', 'Basquetebol','Hoquei no Gelo', 'Andebol','Ténis', 'Voleibol', 'MMA', 'Snooker'],
            user_type: '',
            valid: true,
            openConfirmSubmit: false,
            showError: false,
            rules: {
                required: [(v) => !!v || "Field is required"]
            }
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
            if(this.$refs.form.validate()){
                axios.post(`http://localhost:8001/evento`, this.formData)
                .then((response)=>{
                    console.log(response)
                    this.formData.tie = ''
                }).catch((error)=>{
                    console.log(error)
                })
                this.openConfirmSubmit = true
                this.showError = false
           }else{
               this.showError = true
               console.log(this.showError)
               console.log('Campos Inválidos!')
           }
        },

        closeSubmit(){
            location.reload()
        }
    }
}
</script>