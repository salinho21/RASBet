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
                            <v-icon >mdi-soccer</v-icon>
                            <h6>Futebol</h6>
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
                        <v-col cols="2" align="center">
                           <h4 class="mt-7">Empate</h4> 
                        </v-col>
                        <v-col cols="2" align="center">
                            <h4 class="mt-7" >{{event.team2}}</h4>
                        </v-col>
                    </v-row>
                    <v-row no-gutters>
                        <v-col cols="5">
                            <h4 class="pt-5 pl-10">{{event.date}}</h4>
                        </v-col>
                        <v-col cols="2" align="center">
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }"> 
                                    <v-btn v-bind="attrs" v-on="on" class="mt-3 white--text" width="100px" color="indigo darken-4" dense @click="addBoletim(event)">
                                        <h3 color="white--text "> {{event.result_odd.home}}</h3> 
                                    </v-btn>                   
                                </template>
                                <span>Home Team</span>
                            </v-tooltip>
                        </v-col>
                        <v-col cols="2" align="center">
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }"> 
                                    <v-btn v-bind="attrs" v-on="on" class="mt-3 mb-4 white--text" width="100px" color="indigo darken-4" dense @click="addBoletim(event)">
                                        <h3>{{event.result_odd.tie}}</h3>
                                    </v-btn>                   
                                </template>
                                <span>Draw</span>
                            </v-tooltip> 
                        </v-col>  
                        <v-col cols="2" align="center">
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }"> 
                                    <v-btn v-bind="attrs" v-on="on" class="mt-3 white--text" width="100px" color="indigo darken-4" dense @click="addBoletim(event)">
                                        <h3>{{event.result_odd.away}}</h3>
                                    </v-btn>                   
                                </template>
                                <span>Away Team</span>
                            </v-tooltip>
                        </v-col >
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
                                        <v-btn v-bind="attrs" v-on="on" rounded icon right>
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
                        <v-card class="mx-auto sticky-card2" width="350" height="590" outlined>
                        <v-card v-for="aposta in apostas" :key="aposta.sport" class="ml-2 mr-2 mt-1 mb-5">
                            <v-row no-gutters class="">
                                <v-col cols="12">
                                     <span class="ml-2 grey--text">{{aposta.team1}} x {{aposta.team2}}</span>
                                </v-col>
                                <v-col cols="12">
                                    <p class="ml-2"><b>Vitória: {{aposta.team1}} x {{aposta.team2}}</b> </p> 
                                </v-col>
                                <v-row no-gutters>
                                    <v-col cols="7">
                                        <span class="ml-2">Odd: <b>{{aposta.result_odd.home}}</b></span>
                                        <span class="ml-2">Ganhos: <b>{{aposta.result_odd.home}}</b></span>
                                    </v-col>
                                    <v-col cols="4">
                                        <v-text-field class="" label="Montante"></v-text-field>
                                    </v-col>
                                </v-row>
                                
                                  
                            </v-row>
                                
                        </v-card>
                        <!--<v-list-item three-line>
                            <v-list-item-content>
                                <div class="text-overline mb-4">
                                OVERLINE
                                </div>
                                <v-list-item-title class="text-h5 mb-1">
                                Headline 5
                                </v-list-item-title>
                                <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
                            </v-list-item-content>
                            <v-list-item-avatar tile size="80" color="grey"/>
                        </v-list-item>
                        <v-card-actions>
                            <v-btn outlined rounded text>
                                Button
                            </v-btn>
                        </v-card-actions>-->
                    </v-card>
                    </v-col>
                    
                </v-row>
                <!--Aposta Multipla-->
                <!--3º Card-->
                <v-row v-if="isMultiple"> 
                    <v-card class="mx-auto sticky-card3" width="350" height="150" outlined>
                        <v-row no-gutters class="mt-3">
                            <v-col cols="6">
                                <v-text-field v-model="montante" filled dense rounded label="Montante" class="mr-5 ml-1" @input="updateGanhos"  />
                            </v-col>
                            <v-col cols="6">
                                <b class="mt-5 ml-2">Odd Total</b> <span class="ml-5">{{totalOdd}}</span> 
                                <v-spacer></v-spacer>
                                <b class="ml-2">Ganhos </b> {{ganhos}}
                            </v-col>
                        </v-row>
                        <v-row no-gutters class="mb-5">
                            <v-col cols="12">
                                <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">    
                                    <v-btn v-bind="attrs" v-on="on" color="#29E898" rounded elevation="2" class="ml-3 mt-1" width="320px" @click="printGanhos">
                                        <h4 class="white--text mt-1">Efetuar Aposta!</h4> 
                                    </v-btn>                    
                                </template>
                                <span>Efetuar Aposta</span>
                            </v-tooltip>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-row>
                <!--Aposta Simples-->
                <v-row v-if="isSimple"> 
                    <v-card class="mx-auto sticky-card3" width="350" height="150" outlined>
                        <v-row no-gutters class="mt-3">
                            <v-col cols="12">
                                
                                <b class="ml-2">Número de Apostas</b><span class="num">{{totalOdd}}</span>
                                <v-spacer></v-spacer>
                                <b class="ml-2">Montante Total</b><span class="odd">{{totalOdd}}</span>
                                <v-spacer></v-spacer>
                                <b class="ml-2">Ganhos Totais</b><span class="ganhos">{{totalOdd}}</span>
                            </v-col>
                        </v-row>
                        <v-row no-gutters class="mb-5 mt-3">
                            <v-col cols="12">
                                <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">    
                                    <v-btn v-bind="attrs" v-on="on" color="#29E898" rounded elevation="2" class="ml-3" width="320px" @click="printGanhos">
                                        <h4 class="white--text mt-1">Efetuar Aposta!</h4> 
                                    </v-btn>                    
                                </template>
                                <span>Efetuar Aposta</span>
                            </v-tooltip>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-row>
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
            items: [
                { message: 'Espanha - La Liga', home: 'Real Madrid', away: 'Barcelona' },
                { message: 'Espanha - La Liga', home: 'Real Madrid', away: 'Barcelona' },
                { message: 'Espanha - La Liga', home: 'Real Madrid', away: 'Barcelona' },
                { message: 'Espanha - La Liga', home: 'Real Madrid', away: 'Barcelona' },
                { message: 'Espanha - La Liga', home: 'Real Madrid', away: 'Barcelona' },
                { message: 'Espanha - La Liga', home: 'Real Madrid', away: 'Barcelona' },
                { message: 'Espanha - La Liga', home: 'Real Madrid', away: 'Barcelona' },
                { message: 'Espanha - La Liga', home: 'Real Madrid', away: 'Barcelona' },
                { message: 'Espanha - La Liga', home: 'Real Madrid', away: 'Barcelona' },
                { message: 'Espanha - La Liga', home: 'Real Madrid', away: 'Barcelona' },
                { message: 'Espanha - La Liga', home: 'Real Madrid', away: 'Barcelona' },
                { message: 'Espanha - La Liga', home: 'Real Madrid', away: 'Barcelona' },
                { message: 'Espanha - La Liga', home: 'Real Madrid', away: 'Barcelona' }
            ],
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
            isMultiple: true,
            montante: '',
            ganhos: '',
            totalOdd: '3.25',
            formData:{
                sportType: 'Futebol'
            }
            

        }
    },
    created(){
        if(localStorage.getItem('token')===null){
            this.$router.push('/authentication')
        }

        axios.get(`http://localhost:8001/evento`, {headers: {sportType: this.formData.sportType}})
            .then((response)=>{
                this.events = response.data.events
                console.log(this.events)
            },(error) =>{
                console.log(error);
        });

    },
    mounted(){
        axios.get('http://localhost:8001/user', {headers: {token: localStorage.get('token')}})
            .then(function(response){
              console.log(response)
            },(error) =>{
                console.log(error);
            }); 
    },
    methods: {
        logout() {
            localStorage.clear();
            this.$router.push('/auth')
        },
        deleteBoletim(){

        },
        apostaSimples(){
            this.isSimple = true
            this.isMultiple = false
        },

        apostaMultipla(){
            this.isSimple = false
            this.isMultiple = true
        },
        updateGanhos(){
            if(isNaN(parseFloat(this.totalOdd)*parseFloat(this.montante))){
                this.ganhos=''
            }else{
                this.ganhos = (parseFloat(this.totalOdd)*parseFloat(this.montante)).toFixed(2) + ' EUR'
            }
            
           
        },
        printGanhos(){
            console.log(this.ganhos)
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
        addBoletim(item){
            console.log(item)
            this.apostas.push(item)
            console.log(this.apostas)
        }
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
  left:1489px
} 

.sticky-card3 {
  position: fixed;
  top:695px;
  left:1489px
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



</style>

