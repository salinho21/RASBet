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
                                    <v-col cols="5">
                                        <v-tooltip bottom>
                                            <template v-slot:activator="{ on, attrs }">    
                                                <v-btn v-bind="attrs" v-on="on" color="#29E898" elevation="5" class="mt-3 ml-5" @click="trocarMoeda">
                                                    
                                                    <h4 class="white--text mt-1">Selecionar Moeda</h4> 
                                                </v-btn>                    
                                            </template>
                                            <span>Selecionar Moeda</span>
                                        </v-tooltip>
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
                                        <v-text-field  class="ml-13" v-model="addMoeda" label="Introduza Valor a Adicionar" :rules="rules.number" dense/>
                                    </v-col>
                                    <v-col cols="2">
                                        
                                        <v-tooltip bottom>
                                            <template v-slot:activator="{ on, attrs }">    
                                                <v-btn v-bind="attrs" v-on="on" color="#29E898" elevation="5" class="mb-3" @click="openDepositar">
                                                    <h4 class="white--text mt-1">Depositar</h4> 
                                                </v-btn>                    
                                            </template>
                                            <span>Depositar</span>
                                        </v-tooltip>
                                    </v-col>
                                    <v-col cols="4">
                                        <v-text-field  class="ml-5" v-model="takeMoeda" clear label="Introduza Valor a Levantar" :rules="rules.number" dense/>
                                        
                                    </v-col>
                                    <v-col cols="2">
                                        
                                        <v-tooltip bottom>
                                            <template v-slot:activator="{ on, attrs }">    
                                                <v-btn v-bind="attrs" v-on="on" color="#F0B62B" elevation="5" class="mb-3 mr-3" @click="openLevantar">
                                                    
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
                                    <h2 class="ml-5 mt-3 ">Conversor de Moeda</h2>
                                </v-row>
                                <v-row class="ml-2">
                                    <v-col cols="10">
                                        <h3 class="ml-5 mt-3">Selecionar Moeda a Converter</h3>
                                    </v-col>
                                    
                                    <v-col cols="2" md="2" sm="2" xm="2"/>
                                    <p class="ml-16 ex">{{erroConverter}}</p>
                                    <p class="ml-16 ex">{{erroConversao}}</p>
                                </v-row>
                                <v-row dense>
                                    <v-radio-group v-model="coinToConvert" row mandatory >
                                        <v-col cols="3" md="3" sm="3" xm="3">
                                            
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
                                    <v-col class="mt-3" cols="3" md="3" sm="3" xm="3">
                                        <v-text-field class="mt-3" v-model="valueToConvert" v-on:input="calculateConversion" label="Introduza Valor a Converter" dense/>
                                    </v-col>                                
                                </v-row>

                                <v-row class="mt-2 ml-2">  
                                    <v-col cols="10">
                                        <h3 class="ml-5 ">Selecionar Moeda Final</h3>
                                    </v-col>    
                                </v-row>
                                      
                                <v-row dense>
                                    <v-radio-group v-model="coinConverted" row mandatory >
                                        <v-col cols="3" md="3" sm="3" xm="3"/>  
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
                                    <v-col class=" mt-3" cols="3" md="3" sm="3" xm="3">
                                        <v-text-field class="mt-3" v-model="valueConverted" label="Valor Convertido" dense readonly/>
                                    </v-col>
                                    <v-col class="ml-9 mt-3" cols="3" md="3" sm="3" xm="3">
                                        <v-tooltip bottom>
                                            <template v-slot:activator="{ on, attrs }">    
                                                <v-btn v-bind="attrs" v-on="on" color="#29E898" elevation="5" class="mb-3 mr-3 mt-5" @click="openConverter">
                                                    <h4 class="white--text mt-1">Converter</h4> 
                                                </v-btn>                    
                                            </template>
                                            <span>Converter</span>
                                        </v-tooltip>
                                    </v-col>
                                </v-row>
                            </v-form>
                        </v-card>

                        <!-- Janela para Confirmação da Submissão -->
                        <v-dialog v-model="openSubmit" max-width="500px">
                            <v-card>
                                <v-app-bar color="#2A3F54" >
                                <div class="d-flex align-center">
                                    <h3 width="40" class="white--text"> Confirmar Conversão</h3>
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
                                        <h3 v-if="isDeposito" class="ml-5 mt-5">Pretende efetuar um depósito de {{addMoeda}} EUR? Esta acção é irreversível.</h3>
                                        <h3 v-if="isLevantamento" class="ml-5 mt-5">Pretende efetuar um levantamento de {{takeMoeda}} EUR? Esta acção é irreversível.</h3>
                                        <h3 v-if="isConversao" class="ml-5 mt-5">Pretende confirmar a conversão de {{valueToConvert}} {{coinToConvert}} para {{valueConverted}} {{coinConverted}}? Esta acção é irreversível.</h3>
                                    </v-col>
                                </v-row>
                                </v-container>
                                <v-card-actions>
                                <v-container>
                                    <v-row >
                                        <v-col class="text-right">
                                        <v-tooltip v-if="isDeposito" bottom>
                                            <template v-slot:activator="{ on, attrs }">   
                                                <v-btn v-bind="attrs" v-on="on" color="#29E898" @click="depositar" elevation="5" class="mt-5 mr-3">
                                                    <v-icon color="white">mdi-checkbox-marked-outline</v-icon>
                                                </v-btn>                     
                                            </template>
                                            <span>Depositar</span>
                                        </v-tooltip>
                                        <v-tooltip v-if="isLevantamento" bottom>
                                            <template v-slot:activator="{ on, attrs }">   
                                                <v-btn v-bind="attrs" v-on="on" color="#29E898" @click="levantar" elevation="5" class="mt-5 mr-3">
                                                    <v-icon color="white">mdi-checkbox-marked-outline</v-icon>
                                                </v-btn>                     
                                            </template>
                                            <span>Levantar</span>
                                        </v-tooltip>
                                        <v-tooltip v-if="isConversao" bottom>
                                            <template v-slot:activator="{ on, attrs }">   
                                                <v-btn v-bind="attrs" v-on="on" color="#29E898" @click="converter" elevation="5" class="mt-5 mr-3">
                                                    <v-icon color="white">mdi-checkbox-marked-outline</v-icon>
                                                </v-btn>                     
                                            </template>
                                            <span>Converter</span>
                                        </v-tooltip>

                                        <v-tooltip bottom>
                                            <template v-slot:activator="{ on, attrs }">   
                                            <v-btn v-bind="attrs" v-on="on" color="#F0B62B" @click="closeSubmit" elevation="5" class="mt-5">
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
                        <!-- Janela de Mudança Bem-Sucedida -->
                        <v-dialog v-model="openConfirmSubmit" max-width="500px">
                            <v-card>
                                <v-app-bar color="#2A3F54" >
                                <div class="d-flex align-center">
                                    <h3 width="40" class="white--text"> Submissão de Questão</h3>
                                </div>
                                </v-app-bar>
                                <v-container>
                                <v-row>
                                    <v-col cols="3">
                                    <v-card class="ml-4 mt-1" color="white" flat height="100px" width="110px" >
                                        <v-img src="@/assets/check.png"/>
                                    </v-card>
                                    </v-col>
                                    <v-col cols="9">
                                    <h3 class="ml-5 mt-5">Conversão efetuada com Sucesso!</h3>
                                    </v-col>
                                </v-row>
                                </v-container>
                                <v-card-actions>
                                <v-container>
                                    <v-row >
                                        <v-col class="text-right">
                                        <v-tooltip bottom>
                                            <template v-slot:activator="{ on, attrs }">   
                                            <v-btn v-bind="attrs" v-on="on" color="#29E898" @click="closeConfirmSubmit" elevation="5" class="mt-5">
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
                },
                balance_history: [{}]
            }, 
            rules: {
                number: [v => !v || /^\d*(\.\d{1,2})?$/.test(v) || 'Introduza um valor válido. Máximo de 2 casas decimais.']
            },
            addMoeda: '',
            takeMoeda: '',
            coinToConvert: '',
            valueToConvert: '',
            coinConverted: '',
            valueConverted: '',
            finalToConvert: '',
            finalConverted: '',
            saldoFinal: '',
            erroLevantamento: '',
            erroDeposito: '',
            erroConverter: '',
            erroConversao: '',
            openSubmit: false,
            openConfirmSubmit: false,
            openError: false,
            isDeposito: false,
            isLevantamento: false,
            isConversao: false,
            saldoNegativo: false
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
                this.formData.balance_history = res.data.user.balance_history
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
        trocarMoeda(){
            axios.put(`http://localhost:8001/user`, this.formData)
                .then(function(response){
                    console.log(response)
                    location.reload()
                },(error) =>{
                    console.log(error);
            });
        },
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
            this.valueConverted = (temp*0.97).toFixed(2)

        },
        
        depositar(){
            if(this.$refs.form.validate()){
                let x = parseFloat(this.formData.balance.EUR)
                let y = parseFloat(this.addMoeda)
                let sum = x + y
                if(y<=0){
                    this.erroDeposito = 'Quantia a Depositar Inválida. Tente novamente.'
                }else{
                    this.formData.balance.EUR = sum.toFixed(2)

                    let movimento ={
                        tipo: 'Depósito',
                        amountInicial: this.addMoeda + ' EUR',
                        amountFinal: 'N/a',
                        data: new Date().toLocaleString(),
                        saldo_final: this.formData.balance.EUR + ' EUR'
                    }
                    console.log(movimento)
                    
                   /* this.formData.balance_history.push(movimento)*/

                    axios.put(`http://localhost:8001/user`, this.formData)
                        .then(function(response){
                            console.log(response)
                            location.reload()
                        },(error) =>{
                            console.log(error);
                    });
                }
            }
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
                        this.formData.balance.EUR = sub.toFixed(2)
                        this.erroLevantamento = ''
                    }

                    let movimento ={
                        tipo: 'Levantamento',
                        amountInicial: this.takeMoeda + ' EUR',
                        amountFinal: 'N/a',
                        data: new Date().toLocaleString(),
                        saldo_final: this.formData.balance.EUR + ' EUR'
                    }

                    this.formData.balance_history.push(movimento)

                    axios.put(`http://localhost:8001/user`, this.formData)
                        .then(function(response){
                            console.log(response)
                            location.reload()
                        },(error) =>{
                            console.log(error);
                    });
                } 
            }
        },

        converter(){
            if(this.coinToConvert===this.coinConverted){
                this.erroConverter = 'Não podem ser convertidas moedas do mesmo tipo.'
            }else{
                let tempCoinToConvert
                let tempCoinConverted
                if(this.coinToConvert==='EUR'){
                    tempCoinToConvert = parseFloat(this.formData.balance.EUR)
                    this.formData.balance.EUR = (tempCoinToConvert-parseFloat(this.valueToConvert)).toFixed(2)
                    this.finalToConvert = this.formData.balance.EUR
                }
                if(this.coinToConvert==='USD'){
                    tempCoinToConvert = parseFloat(this.formData.balance.USD)
                    this.formData.balance.USD = (tempCoinToConvert-parseFloat(this.valueToConvert)).toFixed(2)
                    this.finalToConvert = this.formData.balance.USD
                }
                if(this.coinToConvert==='GBP'){
                    tempCoinToConvert = parseFloat(this.formData.balance.GBP)
                    this.formData.balance.GBP = (tempCoinToConvert-parseFloat(this.valueToConvert)).toFixed(2)
                    this.finalToConvert = this.formData.balance.GBP
                }
                if(this.coinToConvert==='ADA'){
                    tempCoinToConvert = parseFloat(this.formData.balance.ADA)
                    this.formData.balance.ADA = (tempCoinToConvert-parseFloat(this.valueToConvert)).toFixed(2)
                    this.finalToConvert = this.formData.balance.ADA
                }
                if(this.coinConverted==='EUR'){
                    tempCoinConverted = parseFloat(this.formData.balance.EUR)
                    this.formData.balance.EUR = (tempCoinConverted+parseFloat(this.valueConverted)).toFixed(2)
                    this.finalConverted = this.formData.balance.EUR
                }
                if(this.coinConverted==='USD'){
                    tempCoinConverted = parseFloat(this.formData.balance.USD)
                    this.formData.balance.USD = (tempCoinConverted+parseFloat(this.valueConverted)).toFixed(2)
                    this.finalConverted = this.formData.balance.USD
                }
                if(this.coinConverted==='GBP'){
                    tempCoinConverted = parseFloat(this.formData.balance.GBP)
                    this.formData.balance.GBP = (tempCoinConverted+parseFloat(this.valueConverted)).toFixed(2)
                    this.finalConverted = this.formData.balance.GBP
                }
                if(this.coinConverted==='ADA'){
                    tempCoinConverted = parseFloat(this.formData.balance.ADA)
                    this.formData.balance.ADA = (tempCoinConverted+parseFloat(this.valueConverted)).toFixed(2)
                    this.finalConverted = this.formData.balance.ADA
                }

                let movimento ={
                    tipo: 'Conversão',
                    amountInicial: this.valueToConvert + ' ' + this.coinToConvert,
                    amountFinal: this.valueConverted + ' ' + this.coinConverted,
                    data: new Date().toLocaleString(),
                    saldo_final: this.finalToConvert + ' ' + this.coinToConvert + ' - ' + this.finalConverted + ' ' + this.coinConverted
                }

                this.formData.balance_history.push(movimento)

                axios.put(`http://localhost:8001/user`, this.formData)
                    .then(function(response){
                        console.log(response)
                    },(error) =>{
                        console.log(error);
                });
                this.openSubmit = false
                this.openConfirmSubmit = true
            }
        },

        openConverter(){
            if(this.coinToConvert==='EUR'){
                if(parseFloat(this.formData.balance.EUR) - parseFloat(this.valueToConvert)<=0){
                    this.saldoNegativo = true
                }else{
                    this.saldoNegativo = false
                }
            }
            if(this.coinToConvert==='USD'){
                if(parseFloat(this.formData.balance.USD) - parseFloat(this.valueToConvert)<=0){
                    this.saldoNegativo = true
                }else{
                    this.saldoNegativo = false
                }
            }
            if(this.coinToConvert==='GBP'){
                if(parseFloat(this.formData.balance.GBP) - parseFloat(this.valueToConvert)<=0){
                    this.saldoNegativo = true
                }else{
                    this.saldoNegativo = false
                }
            }
            if(this.coinToConvert==='ADA'){
                if(parseFloat(this.formData.balance.ADA) - parseFloat(this.valueToConvert)<=0){
                    this.saldoNegativo = true
                }else{
                    this.saldoNegativo = false
                }
            }

            if(!this.saldoNegativo&&(this.coinToConvert!=this.coinConverted)){
                this.erroConverter = ''
                this.erroConversao = ''
                this.openSubmit=true
                this.isConversao=true
            }else{
                if(this.saldoNegativo && (this.coinToConvert===this.coinConverted)){
                    this.erroConverter = 'Não podem ser convertidas moedas do mesmo tipo.'
                    this.erroConversao = 'Saldo insuficiente para realizar esta conversão.'
                }
                if(this.saldoNegativo && (this.coinToConvert!=this.coinConverted)){
                    this.erroConverter = ''
                    this.erroConversao = 'Saldo insuficiente para realizar esta conversão.'
                }
                if(!this.saldoNegativo && (this.coinToConvert===this.coinConverted)){
                    this.erroConverter = 'Não podem ser convertidas moedas do mesmo tipo.'
                    this.erroConversao = ''
                }
            }

        },
        

        openDepositar(){
            this.isDeposito = true
            this.openSubmit = true
        },

        openLevantar(){
            this.isLevantamento = true
            this.openSubmit = true
        },

        closeSubmit() {
            this.openSubmit = false
        },

        closeConfirmSubmit() {
            this.openConfirmSubmit = false
            location.reload()
        },

        closeError() {
            this.openError = false
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

