<template>
    <v-app>
        <Header/>
        <v-row class="mt-4">
            <v-col cols="3">
                <v-card
                    class="ml-16 sticky-card"
                    height="350"
                    width="350"                  
                >
                    
                 <v-navigation-drawer permanent width="100%">
                    <v-list-item class="title">
                        <v-list-item-content>
                        <v-list-item-title class="text-h6 title white--text">
                            Desportos
                        </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    

                    <v-divider></v-divider>

                    <v-list
                        dense
                        nav
                    >
                        <v-list-item
                        v-for="item in desportos"
                        :key="item.nome"
                        link
                        >
                        <v-list-item-icon>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                            <v-list-item-title><h3>{{ item.nome }}</h3></v-list-item-title>
                        </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-navigation-drawer>
             </v-card>
            </v-col>
            <v-col cols="6">
                <v-row dense>
                    <v-card width="1000" class="mb-4" >
                        <v-card-title>
                            <v-icon>mdi-soccer</v-icon>
                            <h6>Futebol</h6>
                        </v-card-title>              
                    </v-card>
                </v-row>
               
                <v-row v-for="item in items" :key="item.message" dense>
                    
                    <v-card class="mb-3" width="1000">
                        <v-row>
                            <v-card-title height="2">
                            <v-icon class="mr-1">mdi-soccer</v-icon>
                            <h6>{{item.message}}</h6>
                        </v-card-title>
                        </v-row>
                        <v-row>
                            <v-col cols="4">
                                <h4 class="ml-3 mb-2">Real Madrid - Barcelona</h4> 
                            </v-col>
                            <v-col cols="8">
                            <v-tooltip bottom>
                                    <template v-slot:activator="{ on, attrs }"> 
                                            <v-btn v-bind="attrs" v-on="on" class="mr-5 mb-5 white--text" color="indigo darken-4" large>
                                                <h3 color="white--text ">1.2</h3> 
                                            </v-btn>                   
                                    </template>
                                    <span>Home Team</span>
                                </v-tooltip>
                            <v-tooltip bottom>
                                    <template v-slot:activator="{ on, attrs }"> 
                                            <v-btn v-bind="attrs" v-on="on" class="mr-5 mb-5 white--text" color="indigo darken-4" large>
                                                <h3>1.82</h3>
                                            </v-btn>                   
                                    </template>
                                    <span>Draw</span>
                                </v-tooltip>    
                            <v-tooltip bottom>
                                    <template v-slot:activator="{ on, attrs }"> 
                                            <v-btn v-bind="attrs" v-on="on" class="mr-5 mb-5 white--text" color="indigo darken-4" large>
                                                <h3>3.35</h3>
                                            </v-btn>                   
                                    </template>
                                    <span>Away Team</span>
                                </v-tooltip>
                            </v-col>
                        </v-row>
                   </v-card>
                </v-row>
            </v-col>




















            <v-col cols="3">

                <v-row>
                   <v-card
                        class="ml-14 sticky-card1"
                        width="350"
                        height="80"
                        outlined
                    >
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
                                            <v-btn v-bind="attrs" v-on="on" rounded small color="grey darken-3" class="white--text mb-5 ml-5">
                                                Aposta Simples
                                            </v-btn>                    
                                        </template>
                                        <span>Aposta Simples</span>
                                    </v-tooltip>
                                </v-col>
                                <v-col cols="6">
                                    <v-tooltip bottom>
                                        <template v-slot:activator="{ on, attrs }">    
                                            <v-btn v-bind="attrs" v-on="on" rounded small color="grey darken-3" class="white--text">
                                                Aposta Múltipla
                                            </v-btn>                    
                                        </template>
                                        <span>Aposta Múltipla</span>
                                    </v-tooltip>
                                    
                                </v-col>
                            </v-row>   
                                    
                        </v-card>
                </v-row>
                    
                <v-row>
                    <v-card class="mx-auto sticky-card2" max-width="350" height="590" outlined
                    >
                        <v-list-item three-line>
                        <v-list-item-content>
                            <div class="text-overline mb-4">
                            OVERLINE
                            </div>
                            <v-list-item-title class="text-h5 mb-1">
                            Headline 5
                            </v-list-item-title>
                            <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
                        </v-list-item-content>

                        <v-list-item-avatar
                            tile
                            size="80"
                            color="grey"
                        ></v-list-item-avatar>
                        </v-list-item>

                        <v-card-actions>
                        <v-btn
                            outlined
                            rounded
                            text
                        >
                            Button
                        </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-row>

                <v-row> 
                   <v-card class="mx-auto sticky-card3" max-width="350" height="150" outlined
                    >
                        fsddf
                    </v-card>
                </v-row>

                    <!--<v-card class="ml-15 sticky-card">
                        <v-card-title>
                            <v-row>
                                <v-col cols="1">
                                    <v-icon color="indigo darken-4" dense>mdi-cart</v-icon>
                                </v-col>
                                <v-col cols="8">
                                    <h4 class="indigo--text darken-4--text" dense>Boletim de Apostas  </h4>  
                                </v-col>
                                <v-col cols="3">
                                    <v-tooltip bottom>
                                        <template v-slot:activator="{ on, attrs }">    
                                            <v-btn v-bind="attrs" v-on="on" rounded icon right>
                                            <v-icon>mdi-delete</v-icon>
                                            </v-btn>                    
                                        </template>
                                        <span>Apagar Boletim</span>
                                    </v-tooltip>
                                </v-col>
                            </v-row>     
                            <v-row dense>
                                <v-col cols="6">
                                    <v-tooltip bottom>
                                        <template v-slot:activator="{ on, attrs }">    
                                            <v-btn v-bind="attrs" v-on="on" rounded small color="grey darken-3" class="white--text">
                                                Aposta Simples
                                            </v-btn>                    
                                        </template>
                                        <span>Aposta Simples</span>
                                    </v-tooltip>
                                </v-col>
                                <v-col cols="6">
                                    <v-tooltip bottom>
                                        <template v-slot:activator="{ on, attrs }">    
                                            <v-btn v-bind="attrs" v-on="on" rounded small color="grey darken-3" class="white--text">
                                                Aposta Múltipla
                                            </v-btn>                    
                                        </template>
                                        <span>Aposta Múltipla</span>
                                    </v-tooltip>
                                    
                                </v-col>
                            </v-row>   
                                    
                        </v-card-title>
                        <v-divider></v-divider>
                        <v-row v-for="item in items" :key="item.message" dense>
                                    <v-card>
                                        <v-card-title>
                                            {{item.home}} vs {{item.away}}
                                        </v-card-title>
                                        
                                    </v-card>
                                </v-row>>

                        <v-divider></v-divider>
                            <v-card>
                                <v-btn class="boletimbtn mb-5" block rounded color="green">
                                Confirmar Aposta
                            </v-btn>
                            </v-card>
            
                            
                            
                          
                    </v-card>-->
                
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
                {nome: 'Voleibol', icon: 'mdi-volleyball'}
            ],
            events: []
        }
    },
    created(){
        if(localStorage.getItem('token')===null){
            this.$router.push('/authentication')
        }
        axios.get(`http://localhost:8001/events`)
            .then((response)=>{
                response.data.forEach((obj) =>{
                this.events.push(obj)
                });
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

        }
    }

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
  top:185px;
  left:1489px
} 

.sticky-card3 {
  position: fixed;
  top:774px;
  left:1489px
} 

.boletimbtn {
  position: absolute;
  bottom: 0;
}

.title {
    background-color: rgb(26, 35, 126)

}
</style>

