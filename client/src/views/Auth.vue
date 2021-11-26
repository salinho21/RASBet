<template>

  <div>
    NAME: <input type="text" v-model="name"> <br/>
    EMAIL: <input type="text" v-model="email"> <br/>
    PASSWORD: <input type="text" v-model="password"> <br/>
    <v-btn @click="signup">signup</v-btn>
  </div>

</template>

<script>
export default {
  name: 'Auth',
  data(){
    return{
      name: '',
      email: '',
      password: ''
    }
  },
  methods: {
    signup(){
      console.log(this.name);
      console.log(this.email);
      console.log(this.password);
    }
  }
}
</script>
