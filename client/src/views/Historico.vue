<template>
    <v-app class="stickypage">
        <Header/>
        <v-content>
            <v-container>
            <v-layout justify-center row wrap>
                <v-flex xs12 sm12 md12 lg6>
                    <v-card color="indigo darken-4" elevation="10">
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
                        <v-data-table :headers="headers" :items="bets" :search="search" single-expand :expanded.sync="expanded" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" item-key="_id" show-expand class="elevation-1 mt-5">
                            <template v-slot:expanded-item="{ headers,item }">
                                <tr :colspan="headers.length" v-for="i in bets.filter(bet=> !bet._id.indexOf(item._id))" :key="i.user_id">
                                    <div v-for="a in i.events" :key="a.eventID">
                                        <p class="mt-5 ml-7 ">
                                            <b>Desporto:</b> {{a.sport}}
                                            <v-spacer class="ml-2"/> 
                                            <b>Evento: </b> {{a.evento}}
                                            <v-spacer class="ml-2"/> 
                                            <b>Aposta Em: </b> {{a.aposta}}
                                            <v-spacer class="ml-2"/> 
                                            <b>Estado: </b> {{a.estado}}
                                            <v-spacer class="ml-2"/> 
                                            <b>Odd:</b> {{a.odd}}
                                        </p> 
                                    </div>
                                </tr>
                            </template>
                        </v-data-table>
                    </v-card>
                </v-flex>
            </v-layout>
            </v-container>
            </v-content>
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
                { text: 'Valor', value: 'bet_ammount' },
                { text: 'Valor a Ganhar', value: 'ganhos' },
                { text: 'Data', value: 'date' },
                { text: '', value: 'data-table-expand' }
            ],
            bets: [],
            sortBy: 'date',
            sortDesc: true
        }
    },

    created(){
        if(localStorage.getItem('token') === null){
            this.$router.push('/authentication')
        }  
        axios.get('http://localhost:8001/bet', {headers: {token: localStorage.getItem('token')}})
            .then(res => {
                /*res.data.bets.forEach((obj)=>{
                    this.bets.push(obj)
                })*/
                this.bets = res.data.bets
                console.log(this.bets)
        })      
    },

    methods: {

    }
}
</script>