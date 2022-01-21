<template>
    <v-app class="stickypage">
        <Header/>
        <v-content class="mb-10">
        <v-container>
            <v-layout justify-center row wrap>
                <v-flex xs12 sm12 md12 lg6>
                    <v-card color="indigo darken-4" elevation="10">
                        <v-row >
                            <v-col>
                                <v-card-title class="white--text text-h4 mr-5">
                                    <v-icon class="mr-3" size="50px" color="white">
                                        mdi-cash-multiple
                                    </v-icon>
                                    Movimentos de Conta
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
                            <v-data-table :headers="headers" :items="movimentos" :search="search" :single-expand="singleExpand" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" :expanded.sync="expanded" item-key="_id" show-expand class="elevation-1 mt-5">
                                <template v-slot:expanded-item="{ headers, item }">
                                <td :colspan="headers.length">
                                    <p class="mt-5" v-if="item.tipo=='Levantamento'">Valor de Levantamento: {{item.amountInicial}} <v-spacer class="mt-1"/> Saldo Final: {{item.saldo_final}}</p>
                                    <p class="mt-5" v-if="item.tipo=='Depósito'">Valor de Depósito: {{item.amountInicial}} <v-spacer class="mt-1"/> Saldo Final: {{item.saldo_final}}</p>
                                    <p class="mt-5" v-if="item.tipo=='Conversão'">Valor a Converter: {{item.amountInicial}} <v-spacer class="mt-1"/> Valor Obtido: {{item.amountFinal}} <v-spacer class="mt-1"/> Saldos Após Conversão: {{item.saldo_final}}</p>
                                    <p class="mt-5" v-if="item.tipo=='Aposta'">Saldo Inicial: {{item.amountInicial}} <v-spacer class="mt-1"/>Valor da Aposta: {{item.amountFinal}} <v-spacer class="mt-1"/> Saldo Final: {{item.saldo_final}}</p>
                                    <p class="mt-5" v-if="item.tipo=='Aposta Ganha'"> Saldo Inicial: {{item.amountInicial}}<v-spacer class="mt-1"/>Ganhos de Aposta: {{item.amountFinal}}<v-spacer class="mt-1"/> Saldo Final: {{item.saldo_final}}</p>
                                </td>
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
                    text: 'ID de Movimento',
                    align: 'start',
                    filterable: false,
                    value: '_id'
                },
                { text: 'Tipo de Movimento', value: 'tipo' },
                { text: 'Data', value: 'data' },
                { text: '', value: 'data-table-expand' }
            ],
            movimentos: [],
            sortBy: 'data',
            sortDesc: true
        }
    },

    created(){
        if(localStorage.getItem('token') === null){
            this.$router.push('/authentication')
        }  
        axios.get('http://localhost:8001/user', {headers: {token: localStorage.getItem('token')}})
            .then(res => {
                this.movimentos = res.data.user.balance_history,
                this.movimentos.forEach((obj)=>{
                    obj._id = '#' + obj._id
                })
        })      
    },

    methods: {

    }
}
</script>