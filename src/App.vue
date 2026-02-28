<script setup>
import { onBeforeMount } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const router = useRouter();
const route = useRoute();
const auth = getAuth();

// onBeforeMount(() => {
//   // const user = firebase.auth().currentUser;
//   // if (!user) {
//   //   router.push({ name: 'LoginPage' });
//   // }

//   firebase.auth().onAuthStateChanged((user) => {
//     if (!user) {
//       router.replace({ name: 'DefaultPage' });
//     }else if(route.name === 'DefaultPage') {
//       router.replace({ name: 'LoadingPage' });
//     }
//   });

// });

onBeforeMount(() => {
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      router.replace({ name: 'DefaultPage' })
    } else if (route.name === 'DefaultPage') {
      router.replace({ name: 'LoadingPage' })
    }
  })
})

</script>

<template>
  <div>
    <router-view />
  </div>
</template>

