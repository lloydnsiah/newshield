<script setup>
import AddAppointment from "../components/AddAppointment.vue";
import UpdateAppointment from "../components/UpdateAppointment.vue";
import ViewPatient from "../components/ViewPatient.vue";
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
const modalview = ref(false);
const selectedItem = ref(null);
const selectedId = ref(null);
const tableData = ref([]);
const loading = ref(false);
const store = useStore();

onMounted(() => {
  loading.value = true;
  const usersCollection = collection(db, "appointments");

  onSnapshot(usersCollection, (snapshot) => {
    tableData.value = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    loading.value = false;
  });
});

const updateUser = (item) => {
  selectedItem.value = item;
  modalupdate.value = true;
};
const viewUser = (item) => {
  selectedId.value = item;
  modalview.value = true;
};
</script>

<template>
  <div class="relative">
    <div class="grow flex flex-col w-full gap-4">
      <div
        class="flex justify-between items-center bg-white py-2 px-4 rounded-lg shadow"
      >
        <h1 class="text-xl font-medium">Appointments</h1>
        <button
          @click="modalAdd = true"
          class="text-primary text-sm px-4 py-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-all hover:translate-x-1 duration-300 flex items-center"
        >
          Add Appointment +
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
          <el-table-column prop="patientName" label="Patient Name" />
          <el-table-column prop="paitentId" label="Paitent Id">
            <template #default ="scope">
              <el-link type="primary" @click="viewUser(scope.row.paitentId)">{{ scope.row.paitentId }}</el-link>
            </template>
          </el-table-column>
          <el-table-column prop="visitDate" label="Visit Date" />
          <el-table-column prop="status" label="Status" />
          <el-table-column fixed="right" label="Actions" class="actions">
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
                <h3 class="underline underline-offset-3">Other Details</h3>
                <p class="flex w-full">
                  <span class="w-48">Reason:</span> {{ props.row.reason }}
                </p>
                <p class="flex w-full">
                  <span class="w-48">Diagnosis:</span>
                  {{ props.row.diagnosis }}
                </p>
                <p class="flex w-full">
                  <span class="w-48">Notes:</span> {{ props.row.notes }}
                </p>
                <p class="flex w-full">
                  <span class="w-48">Created By:</span> {{ props.row.createdBy }}
                </p>
                <p class="flex w-full">
                  <span class="w-48">Updated By:</span> {{ props.row.updatedBy }}
                </p>
                <p class="flex w-full">
                  <span class="w-48">Updated At:</span> {{ props.row.updatedAt }}
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

  <AddAppointment v-if="modalAdd" @close="modalAdd = false" />
  <UpdateAppointment v-if="modalupdate" @close="modalupdate = false" :appointment="selectedItem" />
  <ViewPatient v-if="modalview" :selectedId="selectedId" @close="modalview = false"/>
</template>
