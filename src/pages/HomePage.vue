<script setup>
import { Icon } from "@iconify/vue";
import SideBar from "../components/SideBar.vue";
import LogoutDialog from "../components/LogoutDialog.vue";
import {
  collection,
  getDocs,
  onSnapshot,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { ref, onBeforeMount, computed, onMounted } from "vue";
import { db } from "../firebase";
import { useStore } from 'vuex';
const servicesData = ref([]);
const store = useStore();


onMounted(() => {
  loadService();
  loadPatients();
})

const loadService = async () => {
  const servicesCollection = collection(db, "services");
  const snapshot = await getDocs(servicesCollection);

  servicesData.value = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  store.commit("SET_SERVICES", servicesData.value);
};

const loadPatients = async () => {
  const patientsCollection = collection(db, "patients");
  const snapshot = await getDocs(patientsCollection);

  const patientsData = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  store.commit("SET_PATIENTS", patientsData);
};

</script>

<template>
  <body class="w-screen h-screen flex flex-col gap-8 bg-[#F1F5F9]">
    <!-- navbar -->
    <div class="w-screen flex items-center justify-between px-12 py-2 bg-white">
      <div class="flex items-center gap-4">
        <Icon
          icon="material-symbols:menu-rounded"
          width="24"
          height="24"
          style="color: #717171"
        />
        <img src="../images/shield_logo.png" alt="" class="size-10" />
      </div>
      <div class="flex space-x-5 items-center">
        <button
          class="w-7 h-7 rounded-full bg-green flex items-center justify-center transition-all hover:translate-y-1 duration-300" 
        >
          <Icon
            icon="material-symbols:add-2-rounded"
            width="16"
            height="16"
            style="color: #fff"
          />
        </button>
        <button
          class="w-7 h-7 rounded-full bg-purple flex items-center justify-center transition-all hover:translate-y-1 duration-300"
        >
          <Icon
            icon="material-symbols:add-2-rounded"
            width="16"
            height="16"
            style="color: #fff"
          />
        </button>
        <button
          class="w-7 h-7 rounded-full bg-orange flex items-center justify-center transition-all hover:translate-y-1 duration-300"
        >
          <Icon
            icon="material-symbols:add-2-rounded"
            width="16"
            height="16"
            style="color: #fff"
          />
        </button>
        <Icon
          icon="material-symbols:settings-outline-rounded"
          width="32"
          height="32"
          style="color: #8a8a8a"
        />
        <Icon
          icon="material-symbols:supervised-user-circle"
          width="32"
          height="32"
          style="color: #8a8a8a"
        />
      </div>
    </div>

    <div class="w-screen grow flex px-12 gap-8">
      <SideBar />
      <div class="grow mb-4 rounded-lg maxhight-[80vh] overflow-hidden">
        <router-view />
      </div>
    </div>
  </body>
  <LogoutDialog v-if="$store.state.modalLogout" />
</template>


