<template>
    <v-app>
        <Header/>
            <v-container>
                <v-layout justify-center row wrap>
                    <v-flex xs12 sm12 md12 lg7>
                        <v-card class="mt-12" color="indigo darken-4" elevation="10">
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
                                <v-row>
                                    <v-col cols="3">
                                        <h2 class="ml-5 mt-3">Saldo: {{saldoFinal}} {{formData.currentCoin}}</h2>  
                                    </v-col>
                                    <v-col cols="4">
                                        <v-select class="mt-5" v-on:change="changeCoin" v-model="formData.currentCoin" clear :items="coins" label="Selecionar Moeda" dense/>
                                    </v-col>
                                    
                                </v-row>
                                <v-col cols="12" class="mb-5"><v-divider/></v-col>
                                    
                                <v-row>
                                    <v-col cols="6">
                                        <h2 class="ml-5">Adicionar EUR </h2>
                                    </v-col>
                                    <v-col cols="6">
                                        <h2 >Levantar EUR </h2> <p class="ex">{{erroLevantamento}}</p>
                                    </v-col>         
                                </v-row>
                                <v-row class="mb-5">
                                    <v-col cols="4">
                                        <v-text-field  class="ml-13" v-model="addMoeda" label="Introduza Valor a Adicionar" dense/>
                                    </v-col>
                                    <v-col cols="2">
                                        
                                        <v-tooltip bottom>
                                            <template v-slot:activator="{ on, attrs }">    
                                                <v-btn v-bind="attrs" v-on="on" color="#29E898" elevation="5" class="mb-3" @click="depositar">
                                                    <h4 class="white--text mt-1">Depositar</h4> 
                                                </v-btn>                    
                                            </template>
                                            <span>Depositar</span>
                                        </v-tooltip>
                                    </v-col>
                                    <v-col cols="4">
                                        <v-text-field  class="ml-5" v-model="takeMoeda" clear label="Introduza Valor a Levantar" dense/>
                                        
                                    </v-col>
                                    <v-col cols="2">
                                        
                                        <v-tooltip bottom>
                                            <template v-slot:activator="{ on, attrs }">    
                                                <v-btn v-bind="attrs" v-on="on" color="#F0B62B" elevation="5" class="mb-3 mr-3" @click="levantar">
                                                    
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
                                    <v-radio-group v-model="coinToConvert" row mandatory >
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
                                        <v-text-field v-model="valueToConvert" v-on:change="calculateConversion" label="Introduza Valor a Converter" dense/>
                                    </v-col>

                                    
                                </v-row>

                                <v-row class="mt-2 ml-2">
                                    <v-col cols="1" md="1" sm="1" xm="1"/>
                                    <h3 class="ml-5 mt-3">Selecionar Moeda Final</h3>
                                </v-row>
                                <v-row>
                                    <v-radio-group v-model="coinConverted" row mandatory >
                                        <v-col cols="4" md="4" sm="4" xm="4"/>  
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
                                        <v-text-field v-model="valueConverted" label="Valor Convertido" dense readonly/>
                                    </v-col>
                                    <v-col class="ml-9 mt-3" cols="3" md="3" sm="3" xm="3">
                                        <v-tooltip bottom>
                                            <template v-slot:activator="{ on, attrs }">    
                                                <v-btn v-bind="attrs" v-on="on" color="#29E898" elevation="5" class="mb-3 mr-3 mt-5" @click="converter">
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
            coins: ['EUR','USD','GBP','ADA'],
            formData:{
                _id: '',
                currentCoin: '',
                balance:{
                    EUR: '',
                    USD: '',
                    GBP: '',
                    ADA: ''
                }
            },
            addMoeda: '',
            takeMoeda: '',
            coinToConvert: '',
            valueToConvert: '',
            coinConverted: '',
            valueConverted: '',
            saldoFinal: '',
            erroLevantamento: '',
            erroDeposito: '',
            erroConverter: ''
        }
    },
    created(){
        if(localStorage.getItem('token') === null){
            this.$router.push('/authentication')
        }  
        axios.get('http://localhost:8001/user', {headers: {token: localStorage.getItem('token')}})
            .then(res => {
                this.formData._id = res.data.user._id
                this.formData.currentCoin = res.data.user.currentCoin
                this.formData.balance.EUR = res.data.user.balance.EUR
                this.formData.balance.USD = res.data.user.balance.USD
                this.formData.balance.GBP = res.data.user.balance.GBP
                this.formData.balance.ADA = res.data.user.balance.ADA
                if(this.formData.currentCoin==='EUR'){
                    this.saldoFinal=this.formData.balance.EUR
                }
                if(this.formData.currentCoin==='USD'){
                    this.saldoFinal=this.formData.balance.USD
                }
                if(this.formData.currentCoin==='GBP'){
                    this.saldoFinal=this.formData.balance.GBP
                }
                if(this.formData.currentCoin==='ADA'){
                    this.saldoFinal=this.formData.balance.ADA
                }
        })      
    },
    methods: {
        changeCoin(){
            if(this.formData.currentCoin==='EUR'){
                this.saldoFinal=this.formData.balance.EUR
            }
            if(this.formData.currentCoin==='USD'){
                this.saldoFinal=this.formData.balance.USD
            }
            if(this.formData.currentCoin==='GBP'){
                this.saldoFinal=this.formData.balance.GBP
            }
            if(this.formData.currentCoin==='ADA'){
                this.saldoFinal=this.formData.balance.ADA
            }
        },
        calculateConversion(){
            let temp
            temp = parseFloat(this.valueToConvert)
            this.valueConverted = temp*0.97.toString()

            
        },
        
        depositar(){
            let x = parseFloat(this.formData.balance.EUR)
            let y = parseFloat(this.addMoeda)
            let sum = x + y
            if(y<=0){
                this.erroDeposito = 'Quantia a Depositar Inválida. Tente novamente.'
            }else{
                this.formData.balance.EUR = sum.toString()
                axios.put(`http://localhost:8001/user`, this.formData)
                    .then(function(response){
                        console.log(response)
                    },(error) =>{
                        console.log(error);
                });
            }

            axios.put(`http://localhost:8001/user`, this.formData)
                .then(function(response){
                    console.log(response)
                },(error) =>{
                    console.log(error);
            }); 
        },
        levantar(){
            if(parseInt(this.formData.balance.EUR)>0){
                let x = parseFloat(this.formData.balance.EUR)
                let y = parseFloat(this.takeMoeda)
                if(y>x){
                    this.erroLevantamento = 'Quantia a Levantar superior ao Saldo. Introduza novo valor.'
                }else{
                    let sub = x - y
                
                    if(sub==0){
                        this.formData.balance.EUR = '0.00'
                        this.erroLevantamento = ''
                    }else{
                        this.formData.balance.EUR = sub.toString()
                        this.erroLevantamento = ''
                    }
                    axios.put(`http://localhost:8001/user`, this.formData)
                        .then(function(response){
                            console.log(response)
                        },(error) =>{
                            console.log(error);
                    });
                } 
            }
        },
        converter(){
            if(this.coinToConvert==this.coinConverted){
                this.erroConverter = 'Não podem ser convertidas moedas do mesmo tipo'
                console.log('1º if')
            }else{
                let tempCoinToConvert
                let tempCoinConverted
                if(this.coinToConvert==='EUR'){
                    tempCoinToConvert = parseFloat(this.formData.balance.EUR)
                    this.formData.balance.EUR = (tempCoinToConvert-parseFloat(this.valueToConvert)).toString()
                }
                if(this.coinToConvert==='USD'){
                    tempCoinToConvert = parseFloat(this.formData.balance.USD)
                    this.formData.balance.EUR = (tempCoinToConvert-parseFloat(this.valueToConvert)).toString()
                }
                if(this.coinToConvert==='GBP'){
                    tempCoinToConvert = parseFloat(this.formData.balance.GBP)
                    this.formData.balance.EUR = (tempCoinToConvert-parseFloat(this.valueToConvert)).toString()
                }
                if(this.coinToConvert==='ADA'){
                    tempCoinToConvert = parseFloat(this.formData.balance.ADA)
                    this.formData.balance.EUR = (tempCoinToConvert-parseFloat(this.valueToConvert)).toString()
                }
                if(this.coinConverted==='EUR'){
                    tempCoinConverted = parseFloat(this.formData.balance.EUR)
                    this.formData.balance.EUR = (tempCoinConverted+parseFloat(this.valueToConvert)).toString()
                }
                if(this.coinConverted==='USD'){
                    tempCoinConverted = parseFloat(this.formData.balance.USD)
                    this.formData.balance.USD = (tempCoinConverted+parseFloat(this.valueToConvert)).toString()
                }
                if(this.coinConverted==='GBP'){
                    tempCoinConverted = parseFloat(this.formData.balance.GBP)
                    this.formData.balance.GBP = (tempCoinConverted+parseFloat(this.valueToConvert)).toString()
                }
                if(this.coinConverted==='ADA'){
                    tempCoinConverted = parseFloat(this.formData.balance.ADA)
                    this.formData.balance.ADA = (tempCoinConverted-parseFloat(this.valueToConvert)).toString()
                }
                console.log(this.formData.balance.EUR)
                console.log(this.formData.balance.ADA)
            }
        }
    }
}
</script>

<style scoped>
.text-size {
    font-size: 0.8em;
}
.ex {
  color: rgb(255, 17, 0);
}
</style>

