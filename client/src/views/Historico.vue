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
                                        mdi-view-list-outline
                                    </v-icon>
                                    Histórico de Apostas
                                </v-card-title>
                            </v-col>
                        </v-row>
                    </v-card>
                    <v-card>
                        <v-card-title>
                            <v-spacer></v-spacer>
                            <v-text-field class="ml-16 mr-5"
                                v-model="search"
                                append-icon="mdi-magnify"
                                label="Search"
                                single-line
                                hide-details
                            ></v-text-field>
                        </v-card-title>
                        <v-data-table :headers="headers" :items="bets" :search="search" :single-expand="singleExpand" :expanded.sync="expanded" item-key="_id" show-expand class="elevation-1 mt-5">
                            <template v-slot:expanded-item="{ headers, item }">
                                <tr :colspan="headers.length" v-for="(i,index) in bets" :key="i.sport">
                                    <p class="mt-5 ml-5">
                                        <b>Desporto:</b> {{item.events[index].sport}} 
                                        <v-spacer class="ml-2"/> 
                                        <b>Evento: </b> {{item.events[index].evento}}
                                        <v-spacer class="ml-2"/> 
                                        <b>Aposta Em: </b> {{item.events[index].aposta}}
                                        <v-spacer class="ml-2"/> 
                                        <b>Estado: </b> {{item.events[index].estado}}
                                        <v-spacer class="ml-2"/> 
                                        <b>Odd:</b> {{item.events[index].odd}}
                                    </p>                            
                                </tr>
                            </template>
                        </v-data-table>
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
            search: '',
            expanded: [],
            singleExpand: false,
            headers: [
                {
                    text: 'Tipo de Aposta',
                    align: 'start',
                    filterable: false,
                    value: 'type'
                },
                { text: 'Estado', value: 'state' },
                { text: 'Odd', value: 'total_odd' },
                { text: 'Valor', value: 'bet_amount' },
                { text: 'Ganhos', value: 'ganhos' },
                { text: 'Data', value: 'date' },
                { text: '', value: 'data-table-expand' }
            ],
            bets: []
        }
    },

    created(){
        if(localStorage.getItem('token') === null){
            this.$router.push('/authentication')
        }  
        axios.get('http://localhost:8001/bet', {headers: {token: localStorage.getItem('token')}})
            .then(res => {
                res.data.bets.forEach((obj)=>{
                    this.bets.push(obj)
                })
                console.log(this.bets)
        })      
    },

    methods: {

    }
}
</script>