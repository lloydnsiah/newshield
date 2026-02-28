<template>
  <body
    class="fixed top-0 left-0 z-20 w-full h-full flex items-center justify-center bg-[#63636380]"
  >
    <div
      class="w-[400px] h-[200px] bg-white rounded-2xl p-8 flex flex-col gap-8"
    >
      <span class="text-2xl text-center text-gray-700">
        Do you want to log out this system?
      </span>
      <div class="flex items-center justify-center gap-4">
        <el-button @click="toggleLogoutModal">Cancel</el-button>
        <el-button type="danger" @click="logout">SignOut</el-button>
      </div>
    </div>
  </body>
</template>

<script setup>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { getAuth, signOut } from "firebase/auth";

const auth = getAuth();

const logout = () => {
  signOut(auth)
    .then(() => {
      toggleLogoutModal();
    })
    .catch((error) => {
      alert(error.message);
    });
};

const router = useRouter();
const store = useStore();

const toggleLogoutModal = () => {
  store.commit("TOGGLE_LOGOUT");
};
</script>
