<script setup>
import AddNewPatient from "../components/AddNewPatient.vue";
import { ref, onMounted } from "vue";
import {
  collection,
  getDocs,
  onSnapshot,
  doc,
  deleteDoc,
} from "firebase/firestore";
import UpdatePatient from "../components/UpdatePatient.vue";
import { useStore } from 'vuex';
import { db } from "../firebase";

const modalAdd = ref(false);
const modaldelete = ref(false);
const modalupdate = ref(false);
const selectedUser = ref(null);
const tableData = ref([]);
const loading = ref(false);
const store = useStore();

onMounted(() => {
  loading.value = true;
  const usersCollection = collection(db, "patients");

  onSnapshot(usersCollection, (snapshot) => {
    tableData.value = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    loading.value = false;
     store.commit("SET_PATIENTS", tableData.value);
  });

 
  loading.value = false;
});

const updateUser = (user) => {
  selectedUser.value = user;
  modalupdate.value = true;
};
</script>

<template>
  <div class="relative">
    <div class="grow flex flex-col w-full gap-4">
      <div
        class="flex justify-between items-center bg-white py-2 px-4 rounded-lg shadow"
      >
        <h1 class="text-xl font-medium">Patients</h1>
        <button
          @click="modalAdd = true"
          class="text-primary text-sm px-4 py-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-all hover:translate-x-1 duration-300 flex items-center"
        >
          Add Patient +
        </button>
      </div>
      <div
        class="grow bg-white rounded-lg overflow-auto max-h-[81vh] px-2 py-3"
      >
        <el-table
          v-loading="loading"
          :data="tableData"
          :border="parentBorder"
          :preserve-expanded-content="preserveExpanded"
          style="width: 98%; margin-bottom: 20px"
        >
          <el-table-column prop="firstName" label="First Name" />
          <el-table-column prop="otherName" label="Last Name" />
          <el-table-column prop="phone" label="Phone Number" />
          <el-table-column prop="gender" label="Gender" />
          <el-table-column prop="consent" label="Consent" />
          <el-table-column prop="lastVisitAt" label="Last Visit At" />
          <el-table-column fixed="right" label="Actions" class="actions" v-if="$store.state.userrole == 'Administrator' || $store.state.userrole == 'Staffs'">
            <template #default="scope">
              <el-button
                link
                type="primary"
                size="small"
                @click="updateUser(scope.row)"
              >
                Edit
              </el-button>
            </template>
          </el-table-column>

          <el-table-column type="expand">
            <template #default="props">
              <div class="m-4 flex flex-col gap-4">
                <h3>Other Details</h3>
                <p class="flex w-full">
                  <span class="w-48">Age:</span> {{ props.row.age }} yrs
                </p>
                <p class="flex w-full">
                  <span class="w-48">Date of Birth:</span> {{ props.row.dob }}
                </p>
                <p class="flex w-full">
                  <span class="w-48">Nationality:</span>
                  {{ props.row.nationality }}
                </p>
                <p class="flex w-full">
                  <span class="w-48">Address:</span> {{ props.row.address }}
                </p>
                <p class="flex w-full">
                  <span class="w-48">Emergency Contact Name:</span>
                  {{ props.row.emergencyContactName }}
                </p>
                <p class="flex w-full">
                  <span class="w-48">Emergency Contact Number:</span>
                  {{ props.row.emergencyContact }}
                </p>
                <p class="flex w-full">
                  <span class="w-48">Occupation:</span>
                  {{ props.row.occupation }}
                </p>
                <p class="flex w-full">
                  <span class="w-48">Allergies:</span> {{ props.row.allergies }}
                </p>
                <p class="flex w-full">
                  <span class="w-48">Patience ID:</span> {{ props.row.id }}
                </p>
                <p class="flex w-full">
                  <span class="w-48">Created By:</span> {{ props.row.createdBy }}
                </p>
                <p class="flex w-full">
                  <span class="w-48">Updated By:</span> {{ props.row.updateBy }}
                </p>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <div
      v-if="modaldelete"
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
          <el-button type="danger" @click="confirmDelete()"
            >Delete User</el-button
          >
        </div>
      </div>
    </div>
  </div>

  <AddNewPatient v-if="modalAdd" @close="modalAdd = false" />
  <UpdatePatient
    v-if="modalupdate"
    @close="modalupdate = false"
    :selectedItem="selectedUser"
  />
</template>
