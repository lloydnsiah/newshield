<template>
  <!-- From Uiverse.io by vishalmet -->
  <body
    class="flex flex-col items-center justify-center relative min-h-screen gap-5"
  >
    <div
      class="absolute top-5 left-5 right-5 text-gray-500 font-medium text-lg text-center"
    >
      <span>Welcome </span>
      <span class="font-bold ml-4 text-2xl text-[#956afa] uppercase">
        {{ name }}
      </span>
    </div>

    <div class="w-32 h-32 relative flex items-center justify-center">
      <div
        class="absolute inset-0 rounded-xl bg-blue-500/20 blur-xl animate-pulse"
      ></div>

      <div class="w-full h-full relative flex items-center justify-center">
        <div
          class="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 animate-spin blur-sm"
        ></div>

        <div
          class="absolute inset-1 bg-gray-900 rounded-lg flex items-center justify-center overflow-hidden"
        >
          <div class="flex gap-1 items-center">
            <div
              class="w-1.5 h-12 bg-cyan-500 rounded-full animate-[bounce_1s_ease-in-out_infinite]"
            ></div>
            <div
              class="w-1.5 h-12 bg-blue-500 rounded-full animate-[bounce_1s_ease-in-out_infinite_0.1s]"
            ></div>
            <div
              class="w-1.5 h-12 bg-indigo-500 rounded-full animate-[bounce_1s_ease-in-out_infinite_0.2s]"
            ></div>
            <div
              class="w-1.5 h-12 bg-purple-500 rounded-full animate-[bounce_1s_ease-in-out_infinite_0.3s]"
            ></div>
          </div>

          <div
            class="absolute inset-0 bg-gradient-to-t from-transparent via-blue-500/10 to-transparent animate-pulse"
          ></div>
        </div>
      </div>

      <div
        class="absolute -top-1 -left-1 w-2 h-2 bg-blue-500 rounded-full animate-ping"
      ></div>
      <div
        class="absolute -top-1 -right-1 w-2 h-2 bg-purple-500 rounded-full animate-ping delay-100"
      ></div>
      <div
        class="absolute -bottom-1 -left-1 w-2 h-2 bg-cyan-500 rounded-full animate-ping delay-200"
      ></div>
      <div
        class="absolute -bottom-1 -right-1 w-2 h-2 bg-blue-500 rounded-full animate-ping delay-300"
      ></div>
    </div>

    <div class="card">
      <div class="loader">
        <p>loading</p>
        <div class="words">
          <span class="word">PATIENTS</span>
          <span class="word">APPOINTMENTS</span>
          <span class="word">INVOICES</span>
          <span class="word">SERVICES</span>
          <span class="word">USERS</span>
        </div>
      </div>
    </div>
  </body>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref, onMounted, onUnmounted } from "vue";
import { getAuth, onAuthStateChanged,} from "firebase/auth";
import {  signOut } from "firebase/auth";
import {
  collection,
  query,
  where,
  limit,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase";
import { ElMessage } from "element-plus";
import { useStore } from "vuex";

const router = useRouter();
const store = useStore();

const name = ref("");
const email = ref("");
const currentUserData = ref(null);
const currentUserStatus = ref(null);
 const auth = getAuth();

let unsubscribeUser = null;

onMounted(() => {


  onAuthStateChanged(auth, (user) => {
    if (user) {
      name.value = user.email.split("@")[0];
      email.value = user.email;

      loadUser(user.email); // ✅ pass string
    } else {
      currentUserData.value = null;
    }
  });
});

const loadUser = (email) => {
  console.log("load user starting");
  console.log("email:", email);

  // cleanup old listener
  if (unsubscribeUser) unsubscribeUser();

  const q = query(
    collection(db, "users"),
    where("email", "==", email),
    limit(1),
  );

  unsubscribeUser = onSnapshot(
    q,
    (querySnapshot) => {
      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        currentUserData.value = {
          id: userDoc.id,
          ...userDoc.data(),
        };
        store.commit("SET_USERDATA", currentUserData.value);
        console.log("UserData",currentUserData.value);
        currentUserStatus.value = currentUserData.value.status;
        setTimeout(() => {
          move()
        }, 5000);
      } else {
        ElMessage.error("No user document found for this email.");
        currentUserData.value = null;
      }
    },
    (error) => {
      console.error("Error loading user:", error);
    },
  );
};

const move = () => {

  if(currentUserStatus.value){
     router.push({ name: "DashboardPage"})
  }else{
   logout();
  }
  console.log("move called")
 
};

const logout = () => {
  signOut(auth)
    .then(() => {
      toggleLogoutModal();
    })
    .catch((error) => {
      alert(error.message);
    });
};

onUnmounted(() => {
  if (unsubscribeUser) unsubscribeUser();
});
</script>

<style scoped>
/* From Uiverse.io by kennyotsu */
.card {
  margin-left: 80px;
  border-radius: 1.25rem;
}
.loader {
  color: rgb(124, 124, 124);
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-size: 25px;
  -webkit-box-sizing: content-box;
  box-sizing: content-box;
  height: 40px;
  padding: 10px 10px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  border-radius: 8px;
}

.words {
  overflow: hidden;
  position: relative;
}
.words::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    var(--bg-color) 10%,
    transparent 30%,
    transparent 70%,
    var(--bg-color) 90%
  );
  z-index: 20;
}

.word {
  display: block;
  height: 100%;
  padding-left: 6px;
  color: #956afa;
  animation: spin_4991 8s infinite;
}

@keyframes spin_4991 {
  10% {
    -webkit-transform: translateY(-102%);
    transform: translateY(-102%);
  }

  25% {
    -webkit-transform: translateY(-100%);
    transform: translateY(-100%);
  }

  35% {
    -webkit-transform: translateY(-202%);
    transform: translateY(-202%);
  }

  50% {
    -webkit-transform: translateY(-200%);
    transform: translateY(-200%);
  }

  60% {
    -webkit-transform: translateY(-302%);
    transform: translateY(-302%);
  }

  75% {
    -webkit-transform: translateY(-300%);
    transform: translateY(-300%);
  }

  85% {
    -webkit-transform: translateY(-402%);
    transform: translateY(-402%);
  }

  100% {
    -webkit-transform: translateY(-400%);
    transform: translateY(-400%);
  }
}
</style>
