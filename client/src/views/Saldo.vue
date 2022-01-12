<template>
    <v-app>
            <Header/>
                <v-container>
                    <v-layout justify-center row wrap>
                        <v-flex xs12 sm12 md12 lg7>
                            <v-card class="mt-16" color="indigo darken-4" elevation="10">
                                <v-row >
                                    <v-col>
                                        <v-card-title class="white--text text-h4 mr-5">
                                            <v-icon class="mr-3" size="50px" color="white">
                                                mdi-currency-usd
                                            </v-icon>
                                            Gerir Saldo
                                        </v-card-title>
                                    </v-col>
                                </v-row>
                            </v-card>
                            <v-card class="mt-2" elevation="10" >
                                <v-form v-model="valid" ref="form">
                                    <v-row class="mb-5">
                                        <v-col cols="2">
                                            <h2 class="ml-5 mt-3">Saldo: {{saldo}} {{selectMoeda}}</h2>  
                                        </v-col>
                                        <v-col cols="4">
                                            <v-select class="ml-10 mt-5" v-model="selectMoeda" clear :items="tempos" label="Selecionar Moeda" dense/>
                                        </v-col>
                                       
                                    </v-row>
                                    <v-col cols="12" class="mb-5"><v-divider/></v-col>
                                     
                                    <v-row>
                                        <v-col cols="6">
                                            <h2 class="ml-5">Adicionar EUR </h2>
                                        </v-col>
                                        <v-col cols="6">
                                            <h2 >Levantar EUR </h2>
                                        </v-col>         
                                    </v-row>
                                    <v-row class="mb-5">
                                        <v-col cols="4">
                                            <v-text-field  class="ml-13" v-model="formData.addMoeda" label="Introduza Valor a Adicionar" dense/>
                                            
                                        </v-col>
                                        <v-col cols="2">
                                            
                                            <v-tooltip bottom>
                                                <template v-slot:activator="{ on, attrs }">    
                                                    <v-btn v-bind="attrs" v-on="on" color="#29E898" elevation="5" class="mb-3">
                                                        <h4 class="white--text mt-1">Adicionar</h4> 
                                                    </v-btn>                    
                                                </template>
                                                <span>Adicionar</span>
                                            </v-tooltip>
                                        </v-col>
                                        <v-col cols="4">
                                            <v-text-field  class="ml-5" v-model="formData.addMoeda" clear label="Introduza Valor a Levantar" dense/>
                                            
                                        </v-col>
                                        <v-col cols="2">
                                            
                                            <v-tooltip bottom>
                                                <template v-slot:activator="{ on, attrs }">    
                                                    <v-btn v-bind="attrs" v-on="on" color="#F0B62B" elevation="5" class="mb-3 mr-3" @click="cancelBtn">
                                                        
                                                        <h4 class="white--text mt-1">Levantar</h4> 
                                                    </v-btn>                    
                                                </template>
                                                <span>Levantar</span>
                                            </v-tooltip>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col class="ml-5 text--xs " >
                                            <p class="text-size">(*) Apenas são permitidos Depósitos e Levantamentos em Euros. Para a obtenção de Dólar Americano (USD), Libra Inglesa (GBP) e Cardano (ADA), faço um depósito de EUR e converta para a moeda que pretende obter.
                                            </p> 
                                        </v-col>
                                        
                                    </v-row>
                                </v-form>
                                <v-col>
                                    <v-divider/>
                                </v-col>
                                
                                <v-form v-model="valid" ref="form2">
                                    <v-row class="mt-2 ml-2">
                                        <h2 class="ml-5 mt-3 mb-5">Conversor de Moeda</h2>
                                    </v-row>
                                    <v-row class="mt-2 ml-2">
                                        <v-col cols="1" md="1" sm="1" xm="1"/>
                                        <h3 class="ml-5 mt-3">Selecionar Moeda a Converter</h3>
                                    </v-row>
                                    <v-row>
                                        <v-radio-group v-model="formData.coinToConvert" row mandatory >
                                            <v-col cols="4" md="4" sm="4" xm="4">
                                                
                                            </v-col>
                                            <v-col cols="2" md="2" sm="2" xm="1">
                                                <v-radio label="EUR" value="EUR"/>
                                            </v-col>
                                            <v-col cols="2" md="2" sm="2" xm="1">
                                                <v-radio label="USD" value="USD"/>
                                            </v-col>
                                            <v-col cols="2" md="2" sm="2" xm="1">
                                                <v-radio label="GBP" value="GBP"/>
                                            </v-col>
                                            <v-col cols="2" md="2" sm="2" xm="1">
                                                <v-radio label="ADA" value="ADA"/>
                                            </v-col>
                                        </v-radio-group>
                                        <v-col class="ml-9 mt-3" cols="3" md="3" sm="3" xm="3">
                                            <v-text-field label="Introduza Valor a Converter" dense/>
                                        </v-col>

                                        
                                    </v-row>

                                    <v-row class="mt-2 ml-2">
                                        <v-col cols="1" md="1" sm="1" xm="1"/>
                                        <h3 class="ml-5 mt-3">Selecionar Moeda Final</h3>
                                    </v-row>
                                    <v-row>
                                        <v-radio-group v-model="formData.coinConverted" row mandatory >
                                            <v-col cols="4" md="4" sm="4" xm="4">
                                                
                                            </v-col>
                                            <v-col cols="2" md="2" sm="2" xm="1">
                                                <v-radio label="EUR" value="EUR"/>
                                            </v-col>
                                            <v-col cols="2" md="2" sm="2" xm="1">
                                                <v-radio label="USD" value="USD"/>
                                            </v-col>
                                            <v-col cols="2" md="2" sm="2" xm="1">
                                                <v-radio label="GBP" value="GBP"/>
                                            </v-col>
                                            <v-col cols="2" md="2" sm="2" xm="1">
                                                <v-radio label="ADA" value="ADA"/>
                                            </v-col>
                                        </v-radio-group>
                                        <v-col class="ml-9 mt-3" cols="3" md="3" sm="3" xm="3">
                                            <v-text-field label="Valor Convertido" dense readonly/>
                                        </v-col>
                                        <v-col class="ml-9 mt-3" cols="3" md="3" sm="3" xm="3">
                                            <v-tooltip bottom>
                                                <template v-slot:activator="{ on, attrs }">    
                                                    <v-btn v-bind="attrs" v-on="on" color="#29E898" elevation="5" class="mb-3 mr-3 mt-5" @click="cancelBtn">
                                                        
                                                        <h4 class="white--text mt-1">Coverter</h4> 
                                                    </v-btn>                    
                                                </template>
                                                <span>Converter</span>
                                            </v-tooltip>
                                        </v-col>
                                    </v-row>
                                </v-form>
                            </v-card>
                           
                           
                        </v-flex>
                    </v-layout>
            </v-container>
        <Footer/>
    </v-app>
</template>
    
<script>

import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'

export default {
    components: { 
      Header,
      Footer
    },
     data(){
        return{
            saldo: '200',
            tempos: ['EUR','USD','GBP','ADA'],
            selectMoeda: '',
            formData:{
                addMoeda: '',
                moeda: '',
                coinToConvert: '',
                valueToConvert: '',
                coinConverted: '',
                valueConverted: ''
            }

        }
    }
}
</script>

<style scoped>
.text-size {
    font-size: 0.8em;
}
</style>

