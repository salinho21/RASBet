<template>
    <v-app-bar app color="indigo darken-4" height="90" clipped-left>
        <v-avatar color="indigo" size="75" class="mr-5">
            <v-img 
                src="../assets/logotipo.png"
            ></v-img>
        </v-avatar>
        <h1 class="white-text">RASBet</h1>
        <div class="spacer"></div>
        

        <v-text-field
            placeholder="Search"
            prepend-inner-icon="mdi-magnify"
            dense
            solo
            class="mt-7"
        ></v-text-field>
       <div class="spacer"></div>

       <v-tooltip v-if="logged" bottom>
            <template v-slot:activator="{ on, attrs }"> 
                    <v-btn v-bind="attrs" v-on="on" color="white" text rounded>
                        <v-icon size="28px" class="mr-1">
                            mdi-plus-circle
                        </v-icon>
                         0.00€ 
                    </v-btn>                   
            </template>
            <span>Apostas</span>
        </v-tooltip>

        <v-tooltip v-if="logged" bottom>
            <template v-slot:activator="{ on, attrs }">    
                <v-btn v-bind="attrs" v-on="on" color="white" text rounded>
                    <v-icon size="28px">
                        mdi-view-list-outline
                    </v-icon>
                    Apostas
                </v-btn>                    
            </template>
            <span>Apostas</span>
        </v-tooltip>

        <v-btn v-if="logged"
          class="mx-4"
          dark
          icon
        >
          <v-icon size="28px">
            mdi-bell
          </v-icon>
        </v-btn>

        <v-tooltip v-if="!logged" bottom>
            <template v-slot:activator="{ on, attrs }">    
                <v-btn v-bind="attrs" v-on="on" color="white" text rounded>
                    Iniciar Sessão
                </v-btn>                    
            </template>
            <span>Iniciar Sessão</span>
        </v-tooltip>

        <v-tooltip v-if="!logged" bottom>
            <template v-slot:activator="{ on, attrs }">    
                <v-btn v-bind="attrs" v-on="on" color="white" text rounded>
                    Registar
                </v-btn>                    
            </template>
            <span>Registar Utilizador</span>
        </v-tooltip>

        <v-menu v-if="logged">
            <template v-slot:activator="{ on: menu }">
                <v-tooltip bottom>
                    <template v-slot:activator="{ on: tooltip }">
                        <v-btn
                        fab
                        v-on="{ ...tooltip, ...menu }"
                        >
                            <v-avatar>
                                <v-img src="../assets/defaultuser.jpg"/>
                            </v-avatar>
                        </v-btn>
                    </template>
                    <span>

                    </span>
                </v-tooltip>
            </template>
            <v-list>
                <v-list-item link :to="asd">
                    <v-list-item-title>Página para mudar</v-list-item-title>
                </v-list-item>
                <!-- Se se quiser fazer logout -->
                <v-list-item @click="logout" text>

                </v-list-item>
            </v-list>
        </v-menu>
    </v-app-bar>

     
</template>

<script>

export default {
    data() {
        return{
            logged: true
        }
    },
    methods:{
        logout: function(){
            //Função de logout
        }
    }
};
</script>

<style scoped>
/* css do cabeçalho */
.v-toolbar__content, .v-toolbar__extension{
    position: relative;
}
.spacer{
    flex-grow: 1;
}
h1{
    color:white;
    text-align:center;
}
#rounded-card {
  border-radius: 50%; 
  min-height: 500px;
  min-width: 500px;
}
</style>