<template>
    <v-app>
            <Header/>
                    <v-row class="mt-10 mb-10" justify="center" dense>
                        <v-col cols="8">
                            <v-card color="#2A3F54" elevation="10">
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
                        </v-col>                       
                    </v-row>
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

        }
    }
}
</script>