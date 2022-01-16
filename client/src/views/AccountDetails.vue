<template>
    <v-app class="stickypage">
        <Header/>
        <v-container>
            <v-layout justify-center row wrap>
                <v-flex xs12 sm12 md12 lg6>
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
                       <v-form v-model="valid" ref="form">
                        <v-row class="pb-16">
                            <v-col cols="5" class="mr-10">
                                <v-row class="mb-4" justify="center">
                                    <v-avatar class="ml-16" size="250">
                                        <v-img src="../assets/defaultuser.jpg"/>
                                    </v-avatar>
                                </v-row>
                                <v-row justify="center">
                                    <v-btn class="mt-5 ml-16" rounded >
                                        <h4> Alterar Imagem</h4> 
                                    </v-btn>
                                </v-row>
                                
                            </v-col>
                            <v-col cols="6" class="mt-10">
                                <v-row>
                                    <v-col cols="10">
                                        <h4 class="mb-3">Nome:</h4>
                                        <v-text-field v-model="formData.name" filled placeholder="Nome" :readonly="notEditing" :rules="rules.required"/>
                                    </v-col>
                                </v-row>
                                <v-row>
                                   
                                    <v-col cols="10">
                                         <h4 class="mb-3">Email:</h4>
                                        <v-text-field v-model="formData.email" filled placeholder="Email" :readonly="notEditing" :rules="rules.email"/>
                                    </v-col>
                                </v-row>
                                <v-row justify="end">
                                    <v-col cols="5">
                                         <v-tooltip bottom>
                                            <template v-slot:activator="{ on, attrs }">   
                                                <v-btn v-bind="attrs" v-on="on" color="#29E898" @click="passwordBtn" elevation="5" rounded class="mr-3">
                                                    <h4>Alterar Password</h4>  
                                                </v-btn>                     
                                            </template>
                                            <span>Alterar Password</span>
                                        </v-tooltip>

                                    </v-col>
                                    <v-col cols="7">

                                        <v-tooltip bottom>
                                            <template v-slot:activator="{ on, attrs }">   
                                            <v-btn v-bind="attrs" v-on="on" color="#F0B62B" @click="editBtn" elevation="5" rounded class="ml-5 pr-10 pl-10">
                                                <h4 v-if="notEditing">Editar Perfil</h4>
                                                <h4 v-else>Confirmar Edição</h4>
                                            </v-btn>                     
                                            </template>
                                            <span>Sair</span>
                                        </v-tooltip>
                                     </v-col>
                                </v-row>
                            </v-col>
                        </v-row>
                       </v-form>
                    </v-card>
                    <v-dialog v-model="openPassword" max-width="500px">
                        <v-card>
                            <v-app-bar color="indigo darken-4" >
                                <div class="d-flex align-center">
                                    <h3 width="40" class="white--text"> Alteração de Password</h3>
                                </div>
                            </v-app-bar>                        
                            <v-container>
                                <v-form v-model="valid" ref="form2">
                                    <h4 class="red--text" v-if="showError">Erro na submissão. Por favor corrija os erros e tente novamente!</h4>
                                    <v-row>
                                        <v-col cols="9">
                                            <h4 class="ml-10 mt-7">Password Actual:</h4>
                                            <v-text-field v-model="passwordData.oldPassword" class="ml-10 mt-3" filled :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, rules.min]"
                                                :type="show1 ? 'text' : 'password'" hint="At least 8 characters" counter @click:append="show1 = !show1"/>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="9">
                                            <h4 class="ml-10 mt-7">Nova Password:</h4>
                                            <v-text-field v-model="passwordData.password" class="ml-10 mt-3" filled :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, rules.min, equalPasswords]"
                                                :type="show3 ? 'text' : 'password'" hint="At least 8 characters" counter @click:append="show3 = !show3"/>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="9">
                                            <h4 class="ml-10 mt-7">Repetir Nova Password:</h4>
                                            <v-text-field v-model="repeatPassword" class="ml-10 mt-3" filled :append-icon="show5 ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, rules.min, matchingPasswords]"
                                                :type="show5 ? 'text' : 'password'" hint="At least 8 characters" counter @click:append="show5 = !show5"/>
                                        </v-col>
                                    </v-row>
                                </v-form>
                                
                                <v-row >
                                    <v-col class="text-right">
                                        <v-tooltip bottom>
                                            <template v-slot:activator="{ on, attrs }">    
                                                <v-btn v-bind="attrs" v-on="on" color="#F0B62B" elevation="5" class="mb-3 mr-3" @click="cancelBtn">
                                                    <v-icon class="mr-2" color="white">mdi-checkbox-marked-outline</v-icon>
                                                    <h4 class="white--text mt-1">Cancelar</h4> 
                                                </v-btn>                    
                                            </template>
                                            <span>Cancelar</span>
                                        </v-tooltip>

                                        <v-tooltip bottom>
                                            <template v-slot:activator="{ on, attrs }">    
                                                <v-btn v-bind="attrs" v-on="on" color="#29E898" elevation="5" class="mb-3 mr-3" @click="changePassword">
                                                    <v-icon class="mr-2" color="white">mdi-checkbox-marked-outline</v-icon>
                                                    <h4 class="white--text mt-1">Confirmar</h4> 
                                                </v-btn>                    
                                            </template>
                                            <span>Confirmar</span>
                                        </v-tooltip>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card>
                    </v-dialog>
                    <!-- Janela de Mudança de Password Bem-Sucedida -->
                    <v-dialog v-model="openConfirmSubmit" max-width="500px">
                        <v-card>
                            <v-app-bar color="indigo darken-4" >
                            <div class="d-flex align-center">
                                <h3 width="40" class="white--text"> Mudança de Password</h3>
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
                                    <h3 class="ml-5 mt-5">Mudança de Password efetuada com Sucesso!</h3>
                                    </v-col>
                                </v-row>
                            </v-container>
                            <v-card-actions>
                                <v-container>
                                    <v-row >
                                        <v-col class="text-right">
                                        <v-tooltip bottom>
                                            <template v-slot:activator="{ on, attrs }">   
                                            <v-btn v-bind="attrs" v-on="on" color="#29E898" @click="closeConfirmSubmit" elevation="5" class="mt-5">
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
                    <!-- Janela de Mudança de Detalhes Bem-Sucedida -->
                    <v-dialog v-model="openConfirmSubmitv2" max-width="500px">
                        <v-card>
                            <v-app-bar color="indigo darken-4" >
                            <div class="d-flex align-center">
                                <h3 width="40" class="white--text"> Mudança de Detalhes do Perfil</h3>
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
                                    <h3 class="ml-5 mt-5">Mudança de Detalhes de Perfil efetuada com Sucesso!</h3>
                                    </v-col>
                                </v-row>
                            </v-container>
                            <v-card-actions>
                                <v-container>
                                    <v-row >
                                        <v-col class="text-right">
                                        <v-tooltip bottom>
                                            <template v-slot:activator="{ on, attrs }">   
                                            <v-btn v-bind="attrs" v-on="on" color="#29E898" @click="closeConfirmSubmitv2" elevation="5" class="mt-5">
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
            showError: false,
            notEditing: true,
            editing: false,
            openPassword: false,
            show1: false,
            show2: true,
            show3: false,
            show4: true,
            show5: false,
            show6: true,
            openConfirmSubmit: false,
            openConfirmSubmitv2: false,
            id: '',
            password: '',
            newPassword: '',
            repeatPassword: '',
            formData:{
                _id: '',
                name: '',
                email: ''
            },
            passwordData:{
                _id: '',
                oldPassword:'',
                password: ''
            },
            rules: {
                required: [(v) => !!v || "Field is required"],
                email: [v => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'],
                min: v => v.length >= 4 || 'Min 8 characters',
            }
        }
    },
    created(){
        if(localStorage.getItem('token') === null){
            this.$router.push('/authentication')
        }  
        axios.get('http://localhost:8001/user', {headers: {token: localStorage.getItem('token')}})
            .then(res => {
                this.formData._id = res.data.user._id,
                this.passwordData._id = res.data.user._id,
                this.formData.name = res.data.user.name,
                this.formData.email = res.data.user.email 
        })      
    },
    mounted(){
              
    },
    methods: {
        editBtn(){
            if(this.notEditing){
                this.notEditing=false
            }else{
                this.notEditing=true
                axios.put(`http://localhost:8001/user`, this.formData)
                    .then(function(response){
                        console.log(response)
                    },(error) =>{
                        console.log(error);
                }); 
                this.openConfirmSubmitv2 = true
            }
        },

        passwordBtn(){
            this.openPassword = true
        },
        cancelBtn(){
            this.openPassword = false
        },
        matchingPasswords(){
            if (this.passwordData.password === this.repeatPassword) {
                return true;
            } else {
                return 'Password does not match.';
            }
        },
        equalPasswords(){
            if (this.passwordData.oldPassword === this.passwordData.password) {
                return 'New password must be different from the old one.'
            } else {
                return true
            }
        },
        changePassword(){
           if(this.$refs.form2.validate()){

                axios.put(`http://localhost:8001/user`, this.passwordData)
                    .then(function(response){
                        console.log(response)
                        
                    },(error) =>{
                        console.log(error);
                });
                this.openPassword = false
                this.openConfirmSubmit = true
                
           }else{
               this.showError = true
               console.log('Campos Inválidos!')
           }
        },

        closeConfirmSubmit(){
            this.openConfirmSubmit = false
        },

        closeConfirmSubmitv2(){
            this.openConfirmSubmitv2 = false
        }
       
    }
}
</script>

