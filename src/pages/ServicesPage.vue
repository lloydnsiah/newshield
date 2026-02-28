<script setup>
import AddService from "../components/AddService.vue";
import { ref, onMounted } from "vue";
import { collection, getDocs, onSnapshot, doc, deleteDoc } from "firebase/firestore";
import UpdateService from "../components/UpdateService.vue";
import { db } from "../firebase";

const modalAdd = ref(false);
const modaldelete = ref(false);
const modalupdate = ref(false);
const selectedItem = ref(null);
const tableData = ref([]);
const loading = ref(false);

// onMounted(async () => {
//   const usersCollection = collection(db, 'users')
//   const snapshot = await getDocs(usersCollection)

//   tableData.value = snapshot.docs.map(doc => ({
//     id: doc.id,
//     ...doc.data()
//   }))
// })

onMounted(() => {
  loading.value = true;
  const usersCollection = collection(db, "services");

  onSnapshot(usersCollection, (snapshot) => {
    tableData.value = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    loading.value = false;
  });
});

// const deleteUser = (user) => {
// //   selectedInvoice.value = user;
//   selectedItem.value = user;
//   modaldelete.value = true;
// };

const updateService = (user) => {
    selectedItem.value = user;
    modalupdate.value = true;
}   


</script>

<template>
  <div class="relative">
    <div class="grow flex flex-col w-full gap-4">
      <div
        class="flex justify-between items-center bg-white py-2 px-4 rounded-lg shadow"
      >
        <h1 class="text-xl font-medium">Services</h1>
        <button
          @click="modalAdd = true"
          class="text-primary text-sm px-4 py-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-all hover:translate-x-1 duration-300 flex items-center"
        >
          Add Service +
        </button>
      </div>
      <div
        class="grow bg-white rounded-lg overflow-auto max-h-[81vh] px-2 py-3"
      >
        <el-table v-loading="loading" :data="tableData" style="width: 95%; margin-bottom: 20px">
          <el-table-column prop="name" label="Name" />
          <el-table-column label="Price">
            <template #default="scope">
              <span>Ghc {{ scope.row.price }}</span>
            </template> 
          </el-table-column>
           <el-table-column prop="createdBy" label="Created By" />
          <!-- <el-table-column prop="createdAt" label="Created At"
        /> -->
          <el-table-column fixed="right" label="Actions" class="actions">
            <template #default="scope">
              <el-button link type="primary" size="small" @click="updateService(scope.row)"> Edit </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <!-- <div v-if="modaldelete"
    class="fixed top-0 left-0 z-20 w-full h-full flex items-center justify-center bg-[#63636380]"
  >
    <div
      class="w-[400px] h-[200px] bg-white rounded-2xl p-8 flex flex-col gap-8"
    >
      <span class="text-2xl text-center text-gray-700">
        Do you want to Delete this user?
      </span>
      <div class="flex items-center justify-center gap-4">
        <el-button @click="modaldelete = false">Cancel</el-button>
        <el-button type="danger" @click="confirmDelete()">Delete User</el-button>
      </div>
    </div>
  </div> -->
  </div>

  <AddService v-if="modalAdd" @close="modalAdd = false"  />
  <UpdateService v-if="modalupdate" @close="modalupdate = false" :service="selectedItem" />
</template>
