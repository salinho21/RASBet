<template>
    <v-app>
        <Header/>
        <v-row>
            <v-col cols="3">
                <v-card
                    class="ml-16 mt-6 sticky-card"
                    height="350"
                    width="350"
                    
                >
                    
                 <v-navigation-drawer permanent width="100%">
                    <v-list-item>
                        <v-list-item-content>
                        <v-list-item-title class="text-h6">
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
                <v-row v-for="item in items" :key="item.message" dense>
                   <v-card class="mt-7" width="1000">
                       <v-card-title height="2">
                           <v-icon class="mr-1">mdi-soccer</v-icon>
                           <h6>{{item.message}}</h6>
                       </v-card-title>
                       <h4 class="ml-3 mb-2">Real Madrid - Barcelona</h4> 
                   </v-card>
                </v-row>
            </v-col>
            <v-col cols="3">
                 <v-card
                    class="ml-16 mt-6 sticky-card"
                    height="400"
                    width="340"
            >
                <v-card-title>
                    <v-icon color="indigo darken-4" dense>
                        mdi-cart
                    </v-icon>
                    <h4 class="indigo--text darken-4--text" dense>Boletim de Apostas  </h4>  
                </v-card-title>

                <v-divider></v-divider>
               
                    <div class="pa-2">
                    <v-btn block rounded>
                        Confirmar Aposta
                    </v-btn>
                    </div>

            </v-card>
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
                { message: 'Espanha - La Liga' },
                { message: 'Espanha - La Liga' },
                { message: 'Espanha - La Liga' },
                { message: 'Espanha - La Liga' },
                { message: 'Espanha - La Liga' },
                { message: 'Espanha - La Liga' },
                { message: 'Espanha - La Liga' },
                { message: 'Espanha - La Liga' },
                { message: 'Espanha - La Liga' },
                { message: 'Espanha - La Liga' },
                { message: 'Espanha - La Liga' },
                { message: 'Espanha - La Liga' },
                { message: 'Espanha - La Liga' },
            ],
            desportos: [
                {nome: 'Futebol', icon: 'mdi-soccer' },
                {nome: 'Basquetebol', icon: 'mdi-basketball'},
                {nome: 'Hóquei no Gelo', icon: 'mdi-hockey-sticks'},
                {nome: 'Andebol', icon: 'mdi-handball'},
                {nome: 'Ténis', icon: 'mdi-tennis-ball'},
                {nome: 'Voleibol', icon: 'mdi-volleyball'}
            ]
        }
    },
    created(){
        if(localStorage.getItem('token')===null){
            this.$router.push('/auth')
        }
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
</style>

