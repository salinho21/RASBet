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
                            <v-data-table :headers="headers" :items="movimentos" :search="search" :single-expand="singleExpand" :expanded.sync="expanded" item-key="_id" show-expand class="elevation-1 mt-5">
                                <template v-slot:expanded-item="{ headers, item }">
                                <td :colspan="headers.length">
                                    <p class="mt-5" v-if="item.tipo=='Levantamento'">Valor de Levantamento: {{item.amountInicial}} <v-spacer class="mt-1"/> Saldo Final: {{item.saldo_final}}</p>
                                    <p class="mt-5" v-if="item.tipo=='Depósito'">Valor de Depósito: {{item.amountInicial}} <v-spacer class="mt-1"/> Saldo Final: {{item.saldo_final}}</p>
                                    <p class="mt-5" v-if="item.tipo=='Conversão'">Valor a Converter: {{item.amountInicial}} <v-spacer class="mt-1"/> Valor Obtido: {{item.amountFinal}} <v-spacer class="mt-1"/> Saldos Após Conversão: {{item.saldo_final}}</p>
                                </td>
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
                    text: 'ID de Movimento',
                    align: 'start',
                    filterable: false,
                    value: '_id'
                },
                { text: 'Tipo de Movimento', value: 'tipo' },
                { text: 'Data', value: 'data' },
                { text: '', value: 'data-table-expand' }
            ],
            bets: [],
        }
    },

    created(){
        if(localStorage.getItem('token') === null){
            this.$router.push('/authentication')
        }  
        axios.get('http://localhost:8001/bet', {headers: {token: localStorage.getItem('token')}})
            .then(res => {
                console.log(res)
                /*this.movimentos = res.data.user.balance_history,
                this.movimentos.forEach((obj)=>{
                    obj._id = '#' + obj._id
                })
                console.log(this.movimentos)*/
        })      
    },

    methods: {

    }
}
</script>