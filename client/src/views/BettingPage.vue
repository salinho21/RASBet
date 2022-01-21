<template>
    <v-app>
        <Header/>
        <v-row class="mt-4">
            <v-col cols="3">
                <v-card class="ml-16 sticky-card" height="420" width="350">
                 <v-navigation-drawer permanent width="100%">
                    <v-list-item class="title">
                        <v-list-item-content>
                            <v-list-item-title class="text-h6 title white--text">
                                Desportos
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-list dense nav>
                        <v-list-item v-for="item in desportos" :key="item.nome" link>
                            <v-list-item-icon>
                                <v-icon>{{ item.icon }}</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title @click="pickDesporto(item.nome)"><h3>{{ item.nome }}</h3></v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-navigation-drawer>
             </v-card>
            </v-col>

            <v-col cols="6">
                <v-row no-gutters>
                    <v-card width="1000" class="mb-4" >
                        <v-card-title>
                            <h6 v-if="formData.sportType=='Futebol'" class="ml-2"><v-icon class="mr-2">mdi-soccer</v-icon>{{formData.sportType}}</h6>
                            <h6 v-if="formData.sportType=='Basquetebol'" class="ml-2"><v-icon class="mr-2">mdi-basketball</v-icon>{{formData.sportType}}</h6>
                            <h6 v-if="formData.sportType=='Hóquei no Gelo'" class="ml-2"><v-icon class="mr-2">mdi-hockey-sticks</v-icon>{{formData.sportType}}</h6>
                            <h6 v-if="formData.sportType=='Andebol'" class="ml-2"><v-icon class="mr-2">mdi-handball</v-icon>{{formData.sportType}}</h6>
                            <h6 v-if="formData.sportType=='Ténis'" class="ml-2"><v-icon class="mr-2">mdi-tennis-ball</v-icon>{{formData.sportType}}</h6>
                            <h6 v-if="formData.sportType=='Voleibol'" class="ml-2"><v-icon class="mr-2">mdi-volleyball</v-icon>{{formData.sportType}}</h6>
                            <h6 v-if="formData.sportType=='MMA'" class="ml-2"><v-icon class="mr-2">mdi-mixed-martial-arts</v-icon>{{formData.sportType}}</h6>
                            <h6 v-if="formData.sportType=='Snooker'" class="ml-2"><v-icon class="mr-2">mdi-billiards-rack</v-icon>{{formData.sportType}}</h6>
                        </v-card-title>              
                    </v-card>
                </v-row>

                <v-card v-for="event in events" :key="event.sport" class="mb-5">
                    <v-row no-gutters>
                        <v-col cols="12">
                            <v-card-title class="white--text cardtitle">
                                <v-icon class="mr-1" color="white">mdi-soccer</v-icon>
                                <h6>{{event.team1}} x {{event.team2}}</h6>
                            </v-card-title>
                        </v-col>
                    </v-row>
                    <v-row no-gutters>
                        <v-col cols="5">
                            <h3 class="pt-5 pl-5">{{event.team1}} x {{event.team2}}</h3>  
                        </v-col>
                        <v-col cols="2" align="center">
                            <h4 class="mt-7">{{event.team1}}</h4>
                        </v-col>
                        <v-col v-if="event.result_odd.tie=='0'" cols="1" align="center">
                           
                        </v-col>
                        <v-col v-if="event.result_odd.tie!='0'" cols="2" align="center">
                           <h4 class="mt-7">Empate</h4> 
                        </v-col>
                        <v-col cols="2" align="center">
                            <h4 class="mt-7" >{{event.team2}}</h4>
                        </v-col>
                    </v-row>
                    <v-row no-gutters>
                        <v-col cols="2">
                            <h4 class="pt-5 pl-5">{{event.date}}</h4>
                        </v-col>
                        <v-col cols="3">
                            <h4 class="pt-5 pl-10">Estado: {{event.state}}</h4>
                        </v-col>
                        
                        <v-col cols="2" align="center">
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }"> 
                                    <v-btn v-bind="attrs" v-on="on" class="mt-3 white--text" width="100px" color="indigo darken-4" dense @click="addBoletim(event,event.result_odd.home,event.team1)">
                                        <h3 color="white--text "> {{event.result_odd.home}}</h3> 
                                    </v-btn>                   
                                </template>
                                <span>Home Team</span>
                            </v-tooltip>
                        </v-col>
                        <v-col v-if="event.result_odd.tie=='0'" cols="1" align="center">
                        </v-col>  
                        <v-col v-if="event.result_odd.tie!='0'" cols="2" align="center">
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }"> 
                                    <v-btn  v-bind="attrs" v-on="on" class="mt-3 mb-4 white--text" width="100px" color="indigo darken-4" dense @click="addBoletim(event,event.result_odd.tie,'Empate')">
                                        <h3>{{event.result_odd.tie}}</h3>
                                    </v-btn>                   
                                </template>
                                <span>Draw</span>
                            </v-tooltip> 
                        </v-col>  
                        <v-col cols="2" align="center">
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }"> 
                                    <v-btn v-bind="attrs" v-on="on" class="mt-3 white--text mb-5 ml" width="100px" color="indigo darken-4" dense @click="addBoletim(event,event.result_odd.away,event.team2)">
                                        <h3>{{event.result_odd.away}}</h3>
                                    </v-btn>                   
                                </template>
                                <span>Away Team</span>
                            </v-tooltip>
                        </v-col >
                        <v-col cols="1">
                            <v-tooltip bottom>
                                <template v-if="user_type=='Admin'" v-slot:activator="{ on, attrs }">
                                    <v-icon v-bind="attrs" v-on="on" class="ml-5 mt-4" @click="openEdit(event)">mdi-pencil</v-icon>
                                </template>
                                <span>Editar</span>
                            </v-tooltip>
                        </v-col>
                    </v-row>          
                </v-card>
            </v-col>

            <!-- Boletim-->
            <v-col cols="3" class="mt-2">
                <v-row>
                   <!--1º Card-->
                   <v-card class="ml-14 sticky-card1" width="350" height="90" outlined>
                        <v-row>
                            <v-col cols="1">
                                <v-icon class ="ml-2 mt-3" color="indigo darken-4" dense>mdi-playlist-plus</v-icon>
                            </v-col>
                            <v-col cols="8">
                                <h4 class="indigo--text darken-4--text mt-3" dense>Boletim de Apostas  </h4>  
                            </v-col>
                            <v-col cols="3">
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on, attrs }">    
                                        <v-btn v-bind="attrs" v-on="on" rounded icon right @click="clearBoletim">
                                            <v-icon class ="ml-2 mt-3">mdi-delete</v-icon>
                                        </v-btn>                    
                                    </template>
                                    <span>Apagar Boletim</span>
                                </v-tooltip>
                            </v-col>
                        </v-row>     
                        <v-row dense>
                            <v-col cols="6" >
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on, attrs }">    
                                        <v-btn v-bind="attrs" v-on="on" rounded small color="grey darken-3" class="white--text mb-5 ml-5" @click="apostaSimples">
                                            Aposta Simples
                                        </v-btn>                    
                                    </template>
                                    <span>Aposta Simples</span>
                                </v-tooltip>
                            </v-col>
                            <v-col cols="6">
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on, attrs }">    
                                        <v-btn v-bind="attrs" v-on="on" rounded small color="grey darken-3" class="white--text" @click="apostaMultipla">
                                            Aposta Múltipla
                                        </v-btn>                    
                                    </template>
                                    <span>Aposta Múltipla</span>
                                </v-tooltip>
                            </v-col>
                        </v-row>       
                    </v-card>
                </v-row>  
                <!--2º Card-->
                <v-row>
                    <v-col>
                        <!-- Simples -->
                        <v-card v-if="isSimple" class="mx-auto sticky-card2" width="350" height="590" outlined>
                            <v-card v-for="aposta in betData.events" :key="aposta.sport" elevation="6" class="mb-2">
                                <v-row no-gutters class="">
                                    <v-col cols="12">
                                        <span class="ml-2 grey--text">{{aposta.evento}}</span>
                                    </v-col>
                                    <v-col cols="12">
                                        <p class="ml-2"><b>Aposta em: {{aposta.aposta}}</b> </p> 
                                    </v-col>
                                    <v-row no-gutters>
                                        <v-col cols="6">
                                            <v-text-field v-model="betData.bet_ammount" dense rounded solo-inverted label="Montante" class="mr-5 ml-5" @input="updateGanhosSimples"  />
                                        </v-col>
                                        <v-col cols="6">
                                            <b class="mt-5 ml-2">Odd Total</b> <span class="ml-5">{{aposta.odd}}</span> 
                                            <v-spacer></v-spacer>
                                            <b class="ml-2">Ganhos </b> {{betData.ganhos}}
                                        </v-col>
                                    </v-row>   
                                </v-row>      
                            </v-card>
                        </v-card>
                        <!-- Multipla -->
                        <v-card v-if="isMultiple" class="mx-auto sticky-card2" width="350" height="590" outlined >
                            <v-card v-for="aposta in betData.events" :key="aposta.sport" elevation="6" class="mb-1">
                                <v-row no-gutters class="">
                                    <v-col cols="12">
                                        <span class="ml-2 grey--text">{{aposta.evento}}</span>
                                    </v-col>
                                    <v-col cols="12">
                                        <p class="ml-2"><b>Aposta em: {{aposta.aposta}}</b> </p> 
                                    </v-col>
                                    <v-row no-gutters>
                                        <v-col cols="12">
                                            <span class="ml-2">Odd <b class="ganhos2 ml-16">{{aposta.odd}}</b></span>
                                        </v-col>
                                    </v-row>    
                                </v-row>      
                            </v-card>
                        </v-card>
                    </v-col>
                </v-row>
                <!--Aposta Multipla-->
                <!--3º Card-->
                <v-row v-if="isMultiple"> 
                    <v-card class="mx-auto sticky-card3" width="350" height="150" outlined>
                        <v-row no-gutters class="mt-3">
                            <v-col cols="6">
                                <v-text-field v-model="betData.bet_ammount" filled solo-inverted dense rounded label="Montante" class="mr-5 ml-5" @input="updateGanhos"  />
                            </v-col>
                            <v-col cols="6">
                                <b class="mt-5 ml-2">Odd Total</b> <span class="ml-5">{{betData.total_odd}}</span> 
                                <v-spacer></v-spacer>
                                <b class="ml-2">Ganhos </b> {{betData.ganhos}}
                            </v-col>
                        </v-row>
                        <v-row no-gutters class="mb-5">
                            
                            <v-col cols="12">
                                <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">    
                                    <v-btn v-bind="attrs" v-on="on" color="#29E898" rounded elevation="2" class="ml-3 mt-1" width="320px" @click="openEfetuarAposta">
                                        <h4 class="white--text mt-1">Efetuar Aposta!</h4> 
                                    </v-btn>                    
                                </template>
                                <span>Efetuar Aposta</span>
                            </v-tooltip>
                            </v-col>
                            <span class="ex ml-6 mt-1">{{erroSaldo}}</span>
                        </v-row>
                    </v-card>
                </v-row>
                <!--Aposta Simples-->
                <v-row v-if="isSimple"> 
                    <v-card class="mx-auto sticky-card3" width="350" height="150" outlined>
                        <v-row no-gutters class="mt-3">
                            <v-col cols="12">
                                
                                <b class="ml-2">Número de Apostas</b><span class="num">{{numApostas}}</span>
                                <v-spacer></v-spacer>
                                <b class="ml-2">Montante Total</b><span class="odd">{{betData.bet_ammount}}</span>
                                <v-spacer></v-spacer>
                                <b class="ml-2">Ganhos Totais</b><span class="ganhos">{{betData.ganhos}}</span>
                            </v-col>
                        </v-row>
                        <v-row no-gutters class="mb-5 mt-3">
                            <span class="ex">{{erroSaldo}}</span>
                            <v-col cols="12">
                                <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">    
                                    <v-btn v-bind="attrs" v-on="on" color="#29E898" rounded elevation="2" class="ml-3" width="320px" @click="openEfetuarAposta">
                                        <h4 class="white--text mt-1">Efetuar Aposta!</h4> 
                                    </v-btn>                    
                                </template>
                                <span>Efetuar Aposta</span>
                            </v-tooltip>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-row>
                <!-- Janela para Confirmação da Submissão -->
                <v-dialog v-model="openSubmit" max-width="500px">
                    <v-card>
                        <v-app-bar color="indigo darken-4" >
                        <div class="d-flex align-center">
                            <h3 width="40" class="white--text"> Confirmar Aposta</h3>
                        </div>
                        </v-app-bar>
                        <v-container>
                        <v-row>
                            <v-col cols="3">
                            <v-card class="ml-4 mt-1" color="white" flat height="100px" width="110px" >
                                <v-img src="@/assets/questionmark.png"/>
                            </v-card>
                            </v-col>
                            <v-col cols="9">
                                <h3 class="ml-5 mt-5">Pretende efetuar Aposta? Esta acção é irreversível.</h3>
                            </v-col>
                        </v-row>
                        </v-container>
                        <v-card-actions>
                        <v-container>
                            <v-row >
                                <v-col class="text-right">
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on, attrs }">   
                                        <v-btn v-bind="attrs" v-on="on" color="#29E898" @click="submitBet" elevation="5" class="mt-5 mr-3">
                                            <v-icon color="white">mdi-checkbox-marked-outline</v-icon>
                                        </v-btn>                     
                                    </template>
                                    <span>Confirmar Aposta</span>
                                </v-tooltip>
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on, attrs }">   
                                    <v-btn v-bind="attrs" v-on="on" color="#F0B62B" @click="closeEfetuarAposta" elevation="5" class="mt-5">
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
                <!-- Edit Dialog -->
                <v-dialog v-model="dialog" persistent max-width="600px">
                    <v-card>
                        <v-card-title>
                            <span class="text-h5">Editar Evento</span>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field label="Equipa 1" readonly :value="editedItem.team1"/>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field label="Empate" readonly value="             X"/>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field label="Equipa 2" readonly :value="editedItem.team2"/>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field label="Odd Home" v-model="editedItem.result_odd.home"> 
                                            {{editedItem.result_odd.home}}
                                        </v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field label="Odd Tie" v-model="editedItem.result_odd.tie"> 
                                            {{editedItem.result_odd.tie}}
                                        </v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field label="Odd Away" v-model="editedItem.result_odd.away"> 
                                            {{editedItem.result_odd.away}}
                                        </v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field label="Resultado Home" v-model="editedItem.result1"> 
                                            {{editedItem.result1}}
                                        </v-text-field>
                                    </v-col>
                                    <v-col cols="2"></v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field label="Resultado Away" v-model="editedItem.result2"> 
                                            {{editedItem.result2}}
                                        </v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-select label="Estado da Aposta" :items="estados" v-model="editedItem.state"/>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="close">
                                Close
                            </v-btn>
                            <v-btn color="blue darken-1" text @click="save">
                                Save
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-col>
        </v-row>  
        <Footer/>
    </v-app>
</template>

<script>
import axios from 'axios'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'

export default {
    components: { 
      Header,
      Footer
    },
    data(){
        return{
            name: '',
            email: '',
            desportos: [
                {nome: 'Futebol', icon: 'mdi-soccer' },
                {nome: 'Basquetebol', icon: 'mdi-basketball'},
                {nome: 'Hóquei no Gelo', icon: 'mdi-hockey-sticks'},
                {nome: 'Andebol', icon: 'mdi-handball'},
                {nome: 'Ténis', icon: 'mdi-tennis-ball'},
                {nome: 'Voleibol', icon: 'mdi-volleyball'},
                {nome: 'MMA', icon: 'mdi-mixed-martial-arts'},
                {nome: 'Snooker', icon: 'mdi-billiards-rack'}
            ],
            events: [],
            apostas: [],
            isSimple: true,
            isMultiple: false,
            montante: '',
            ganhos: '',
            totalOdd: '3.25',
            numApostas: 0,
            openSubmit: false,
            formData:{
                sportType: 'Futebol'
            },
            betData:{
                user_id: '',
                type: '',
                events: [],
                total_odd: '1',
                bet_ammount: '',
                ganhos: '',
                state: 'Aberto',
                date: new Date().toLocaleString()
            },
            userData:{
                _id: '',
                currentCoin: '',
                balance:{
                    EUR: '',
                    USD: '',
                    GBP: '',
                    ADA: ''
                },
                balance_history: [{}]
            }, 
            saldo: '',
            saldoFinal: '',
            erroSaldo: '',
            editedItem:{
                _id: null,
                result_odd:{
                    home: '',
                    tie: '',
                    away: ''
                },
                sport:'',
                team1:'',
                team2:'',
                result1:'',
                result2:'',
                state:'',
                winner: ''
            },
            estados: ['Aberto','A decorrer','Terminado'],
            dialog: false,
            user_type:'',
            bets: [], //Contem todas as bets do Sistema que estejam abertas
            betsEditadas: [],
            users: [], //Contem todos os users do Sistema
            usersEditados: []
        }
    },
    created(){
        if(localStorage.getItem('token')===null){
            this.$router.push('/authentication')
        }

        axios.get('http://localhost:8001/user', {headers: {token: localStorage.getItem('token')}})
            .then(res => {
                this.betData.user_id = res.data.user._id
                this.userData._id = res.data.user._id
                this.user_type= res.data.user.user_type
                this.userData.currentCoin = res.data.user.currentCoin
                this.userData.balance.EUR = res.data.user.balance.EUR
                this.userData.balance.USD = res.data.user.balance.USD
                this.userData.balance.GBP = res.data.user.balance.GBP
                this.userData.balance.ADA = res.data.user.balance.ADA
                this.userData.balance_history = res.data.user.balance_history
                if(this.userData.currentCoin==='EUR'){
                    this.saldo=this.userData.balance.EUR
                }
                if(this.userData.currentCoin==='USD'){
                    this.saldo=this.userData.balance.USD
                }
                if(this.userData.currentCoin==='GBP'){
                    this.saldo=this.userData.balance.GBP
                }
                if(this.userData.currentCoin==='ADA'){
                    this.saldo=this.userData.balance.ADA
                }
                
        })    

        axios.get(`http://localhost:8001/evento`, {headers: {sportType: this.formData.sportType}})
            .then((response)=>{
                this.events = response.data.events
            },(error) =>{
                console.log(error);
        });

        axios.get('http://localhost:8001/allBets', {headers: {state: 'Aberto'}})
            .then(res => { 
                this.bets = res.data.bets
            },(error) =>{
                console.log(error);
        })    

        axios.get('http://localhost:8001/allUsers', {headers: {user_type: 'User'}})
            .then(res => { 
                this.users = res.data.users
            },(error) =>{
                console.log(error);
        }) 


    },
    
    methods: {
        logout() {
            localStorage.clear();
            this.$router.push('/auth')
        },

        openEdit(event){
            console.log(event)
            this.editedItem._id=event._id
            this.editedItem.sport=event.sport
            this.editedItem.team1=event.team1
            this.editedItem.team2=event.team2
            this.editedItem.result_odd.home=event.result_odd.home
            this.editedItem.result_odd.tie=event.result_odd.tie
            this.editedItem.result_odd.away=event.result_odd.away
            this.editedItem.data
            this.editedItem.result1=event.result1
            this.editedItem.result2=event.result2
            this.editedItem.winner= ''
            this.editedItem.state=event.state
            this.dialog=true
        },
        close(){
            this.editedItem._id=null,
            this.editedItem.team1='',
            this.editedItem.team2='',
            this.editedItem.sport='',
            this.editedItem.state='',
            this.editedItem.result_odd.home='',
            this.editedItem.result_odd.tie='',
            this.editedItem.result_odd.away='',
            this.editedItem.result1='', 
            this.editedItem.result2='',
            this.dialog=false

        },

        save(){
            if(this.editedItem.state=='Aberto'||this.editedItem.state=='A decorrer'){
                axios.put(`http://localhost:8001/evento`, this.editedItem)
                    .then((response)=>{
                        console.log(response)
                    },(error) =>{
                        console.log(error);
                });
            }else{

                let resultHome, resultAway
                resultHome = parseInt(this.editedItem.result1)
                resultAway = parseInt(this.editedItem.result2)
                if(resultHome>resultAway){
                    this.editedItem.winner = this.editedItem.team1
                }else if(resultHome<resultAway){
                    this.editedItem.winner = this.editedItem.team2
                }else{
                    this.editedItem.winner = 'Empate'
                }

                this.bets.forEach((obj) =>{ //Percorrer cada bet
                    let countAbertas = 0 
                    let apostaPerdida = false   
                    let editada = false                 		 		//Contar quantos eventos tem estado "Aberto"
                    obj.events.forEach((o) => {
                        if(o.estado=='Aberto'){
                            countAbertas++            				        //Se evento tem estado "Aberto", incrementa
                        }
                        
                        if(this.editedItem._id==o._id){   				    //Se evento corresponder ao evento que acabou de ser editado, 
                            if(o.aposta!=this.editedItem.winner){
                                apostaPerdida = true
                                o.estado = 'Terminado' 
                                obj.state = 'Aposta Perdida'
                                editada = true
                            }else{
                                o.estado = 'Terminado'    				//passar estado a terminado, decrementar e inserir bet 
                                countAbertas--  
                                editada = true       				    //em novo array para se fazer posteriormente o PUT em bet
                            }
                        }
                        if(apostaPerdida){
                            o.estado = 'Terminado'
                        }
                    })
                    
                    if(countAbertas==0 && !apostaPerdida){              
                        obj.state = 'Aposta Ganha'
                        
                        this.users.forEach((u)=>{
                            if(u._id == obj.user_id){
                                const myArray = obj.ganhos.split(" ");
                                let valor = myArray[0]
                                let moeda = myArray[1]
                                let amountFinal
                                if(moeda == 'EUR'){        
                                    u.balance.EUR = (parseFloat(u.balance.EUR)+parseFloat(valor)).toFixed(2)
                                    amountFinal = u.balance.EUR + ' EUR'
                                }
                                if(moeda == 'USD'){
                                    u.balance.USD = (parseFloat(u.balance.USD)+parseFloat(valor)).toFixed(2)
                                    amountFinal = u.balance.USD + ' USD'
                                }
                                if(moeda == 'GBP'){
                                    u.balance.GBP = (parseFloat(u.balance.GBP)+parseFloat(valor)).toFixed(2)
                                    amountFinal = u.balance.GBP + ' GBP'
                                }
                                if(moeda == 'ADA'){
                                    u.balance.ADA = (parseFloat(u.balance.ADA)+parseFloat(valor)).toFixed(2)
                                    amountFinal = u.balance.ADA + ' ADA'
                                }
                                let movimento = {
                                    tipo: 'Aposta Ganha',
                                    amountInicial: obj.ganhos,
                                    amountFinal: 'N/a',
                                    data: new Date().toLocaleString(),
                                    saldo_final: amountFinal
                                }
                                u.balance_history.push(movimento)
                                console.log(movimento)
                                this.usersEditados.push(u)
                            }
                        })
                        editada = true             
                    }
                    if(editada){
                        this.betsEditadas.push(obj)
                    }
                })

                axios.put(`http://localhost:8001/evento`, this.editedItem)
                    .then((response)=>{
                        console.log(response)
                    },(error) =>{
                        console.log(error);
                });

                axios.put(`http://localhost:8001/betsEditadas`, this.betsEditadas)
                    .then((response)=>{
                        console.log(response)
                    },(error) =>{
                        console.log(error);
                });

                axios.put(`http://localhost:8001/usersEditados`, this.usersEditados)
                    .then((response)=>{
                        console.log(response)
                    },(error) =>{
                        console.log(error);
                });
        }

        },

        deleteBoletim(){

        },
        apostaSimples(){
            if(this.isMultiple){
                this.apostas.splice(0)
                this.betData.events.splice(0)
                this.betData.total_odd = ''
                this.betData.bet_ammount = ''
            }
            this.isSimple = true
            this.isMultiple = false
        },

        apostaMultipla(){
            if(this.isSimple){
                this.apostas.splice(0)
                this.betData.events.splice(0)
                this.betData.total_odd = ''
                this.betData.bet_ammount = ''
            }
            this.isSimple = false
            this.isMultiple = true
        },
        updateGanhos(){
            let x = parseFloat(this.saldo)
            let y = parseFloat(this.betData.bet_ammount)
            let dif = x-y
            if(dif>=0){
                this.erroSaldo = ''
            }else{
                this.erroSaldo = 'Saldo insuficiente para realizar esta aposta'
            }
            if(isNaN(parseFloat(this.betData.bet_ammount)*parseFloat(this.betData.total_odd))){
                this.betData.ganhos = ''
            }else{
                this.betData.ganhos = (parseFloat(this.betData.bet_ammount)*parseFloat(this.betData.total_odd)).toFixed(2) + ' EUR'
            }
        },
        updateGanhosSimples(){
            let x = parseFloat(this.saldo)
            let y = parseFloat(this.betData.bet_ammount)
            let dif = x-y
            if(dif>=0){
                this.erroSaldo = ''
            }else{
                this.erroSaldo = 'Saldo insuficiente para realizar esta aposta'
            }

            if(isNaN(parseFloat(this.betData.bet_ammount)*parseFloat(this.betData.total_odd))){
                this.betData.ganhos = ''
            }else{
                this.betData.ganhos = (parseFloat(this.betData.bet_ammount)*parseFloat(this.betData.total_odd)).toFixed(2) + ' EUR'
            }
        },

        pickDesporto(item){
            this.formData.sportType = item

            axios.get(`http://localhost:8001/evento`, {headers: {sportType: this.formData.sportType}})
                .then((res)=>{
                    this.events = res.data.events
                },(error) =>{
                    console.log(error);
            });
        },

        addBoletim(item,odd,result){
            let e = {
                _id: item._id,
                sport: item.sport,
                evento: item.team1 + ' x ' + item.team2,
                aposta: result,
                estado: item.state,
                odd: odd
            }
            let repetido = false

            this.betData.events.forEach((obj)=>{
                if(obj._id==e._id)
                    repetido = true
            })

            if(!repetido){
                if(this.isSimple){
                this.betData.ganhos = ''
                this.numApostas = 0
                this.betData.events.splice(0)
                this.betData.events.push(e)
                this.betData.type = 'Simples'
                this.numApostas++
                this.betData.total_odd = odd
                this.betData.bet_ammount = item.valor

            }else{
                this.betData.type = 'Múltipla'
                this.betData.events.push(e)
                this.betData.total_odd = (parseFloat(odd)*parseFloat(this.betData.total_odd || '1')).toFixed(2) 
            }
        }
                    
        },
        clearBoletim(){
            this.betData.events.splice(0)
            this.numApostas = 0
            this.betData.ganhos = ''
            this.betData.bet_ammount = ''
            this.betData.total_odd = ''
        },

        openEfetuarAposta(){
            let x = parseFloat(this.saldo)
            let y = parseFloat(this.betData.bet_ammount)
            let dif = x-y
            if(dif>=0){
                this.erroSaldo = ''
                this.openSubmit = true
            }else{
                this.erroSaldo = 'Saldo insuficiente para realizar esta aposta'
            }
                
        },

        closeEfetuarAposta(){
            this.openSubmit = false
        },

        submitBet(){
            console.log(this.betData)
            axios.post(`http://localhost:8001/bet`, this.betData)
                .then(function(response){
                    console.log(response)
                },(error) =>{
                    console.log(error);
            });

            if(this.userData.currentCoin==='EUR'){
                this.userData.balance.EUR = (parseFloat(this.saldo)-parseFloat(this.betData.bet_ammount)).toFixed(2)
                this.saldoFinal = this.userData.balance.EUR
            }
            if(this.userData.currentCoin==='USD'){
                this.userData.balance.USD = (parseFloat(this.userData.balance.USD)-parseFloat(this.betData.bet_ammount)).toFixed(2)
                this.saldoFinal = this.userData.balance.USD
            }
            if(this.userData.currentCoin==='GBP'){
                this.userData.balance.GBP = (parseFloat(this.userData.balance.GBP)-parseFloat(this.betData.bet_ammount)).toFixed(2)
                this.saldoFinal = this.userData.balance.GBP
            }
            if(this.userData.currentCoin==='ADA'){
                this.userData.balance.ADA = (parseFloat(this.userData.balance.ADA)-parseFloat(this.betData.bet_ammount)).toFixed(2)
                this.saldoFinal = this.userData.balance.ADA
            }

            let movimento ={
                tipo: 'Aposta',
                amountInicial: this.saldo + ' ' + this.userData.currentCoin,
                amountFinal: 'N/a',
                data: new Date().toLocaleString(),
                saldo_final: this.userData.balance.EUR + ' ' + this.userData.currentCoin
            }

            this.userData.balance_history.push(movimento)

            axios.put(`http://localhost:8001/user`, this.userData)
                .then(function(response){
                    console.log(response)
                },(error) =>{
                    console.log(error);
            });
            location.reload()
        },
    },
}
</script>

<style scoped>

#app {

    background: rgb(250, 248, 248)
  
}
 
.sticky-card {
  position: fixed;
}   

.sticky-card1 {
  position: fixed;
} 

.sticky-card2 {
  position: fixed;
  top:195px;
  left:1489px;
  flex-grow: 1;
  overflow: auto;
} 

.sticky-card3 {
  position: fixed;
  top:695px;
  left:1489px;

  
} 

.boletimbtn {
  position: absolute;
  bottom: 0;
}

.title {
    background-color: rgb(26, 35, 126)
}

.cardtitle {
    background-color: rgb(26, 35, 126)
}

.num {
  padding-left: 100px;
}
.odd {
  padding-left: 133px;
}

.ganhos {
  padding-left: 139px;
}

.ganhos2 {
  padding-left: 180px;
}

.ex {
  color: rgb(255, 17, 0);
}

</style>

