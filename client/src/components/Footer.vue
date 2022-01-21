<template>
  <v-footer
    color="primary indigo darken-4"
    padless
    bottom
  >
    <v-row
      justify="center"
      no-gutters
    >
      <v-btn
        v-for="link in links"
        :key="link"
        color="white"
        text
        rounded
        class="my-2"
      >
        {{ link }}
      </v-btn>
      <v-col
        class="grey darken-4 text-center white--text"
        cols="12"
      >
        {{ new Date().getFullYear() }} — <strong>RASBet</strong>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
  export default {
    data: () => ({
      icons: [
        'mdi-facebook',
        'mdi-twitter',
        'mdi-instagram',
      ],
      links: [
        'Home',
        'About Us',
        'Team',
        'Contact Us',
      ],
    }),
  }
</script>

