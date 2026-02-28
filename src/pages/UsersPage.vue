<script setup>
import AddUserPage from "../components/AddUserPage.vue";
import { ref, onMounted } from "vue";
import { collection, getDocs, onSnapshot, doc, deleteDoc } from "firebase/firestore";
import UpdateUser from "../components/UpdateUser.vue";
import { db } from "../firebase";

const showAddUser = ref(false);
const modaldelete = ref(false);
const modalupdate = ref(false);
const selectedUser = ref(null);
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
  const usersCollection = collection(db, "users");

  onSnapshot(usersCollection, (snapshot) => {
    tableData.value = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    loading.value = false;
  });
});

const deleteUser = (user) => {
//   selectedInvoice.value = user;
  selectedUser.value = user;
  modaldelete.value = true;
};

const confirmDelete = async () => {
  if (!selectedUser.value) return
  await deleteDoc(doc(db, 'users', selectedUser.value.id))
  modaldelete.value = false
  selectedUser.value = null
}

const updateUser = (user) => {
    selectedUser.value = user;
    modalupdate.value = true;
}   


</script>

<template>
  <div class="relative">
    <div class="grow flex flex-col w-full gap-4">
      <div
        class="flex justify-between items-center bg-white py-2 px-4 rounded-lg shadow"
      >
        <h1 class="text-xl font-medium">Users</h1>
        <button
          @click="showAddUser = true"
          class="text-primary text-sm px-4 py-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-all hover:translate-x-1 duration-300 flex items-center"
        >
          Add User +
        </button>
      </div>
      <div
        class="grow bg-white rounded-lg overflow-auto max-h-[81vh] px-2 py-3"
      >
        <el-table v-loading="loading"  :data="tableData" style="width: 98%; margin-bottom: 20px">
          <el-table-column prop="name" label="Name" />
          <el-table-column prop="email" label="Email" />
          <el-table-column prop="role" label="Role" />
          <el-table-column prop="status" label="Status" />
          <el-table-column prop="createdBy" label="Create By" />
          <!-- <el-table-column prop="createdAt" label="Created At"
        /> -->
          <el-table-column fixed="right" label="Actions" class="actions">
            <template #default="scope">
              <el-button link type="primary" size="small" @click="updateUser(scope.row)"> Edit </el-button>
              <el-button link type="danger" size="small" @click="deleteUser(scope.row)"> Delete </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <div v-if="modaldelete"
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
  </div>
  </div>

  <AddUserPage v-if="showAddUser" @close="showAddUser = false"  />
  <UpdateUser v-if="modalupdate" @close="modalupdate = false" :user="selectedUser" />
</template>
