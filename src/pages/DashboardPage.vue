<template>
  <body class="flex flex-col gap-3 h-full">
    <!-- top -->
    <div
      class="grid grid-cols-4 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4"
    >
      <div class="bg-white rounded-lg p-4">
        <div class="mb-0">
          <div class="flex justify-between mb-4">
            <div>
              <span class="block text-lg mb-4">Total Patients</span>
              <div
                class="text-surface-900 dark:text-surface-0 font-medium text-4xl"
              >
                {{ $store.state.patientsSize }}
              </div>
            </div>
            <div
              class="flex items-center justify-center bg-blue-100 rounded-border"
              style="width: 2.5rem; height: 2.5rem"
            >
              <Icon
                icon="material-symbols:patient-list-outline-rounded"
                width="24"
                height="24"
                style="color: #193cb8"
                class="icon"
              />
            </div>
          </div>
          <span class="text-primary font-light"
            >Total number of Registered Patients
          </span>
        </div>
      </div>
      <div class="bg-white rounded-lg p-4">
        <div class="mb-0">
          <div class="flex justify-between mb-4">
            <div>
              <span class="block text-lg mb-4">Total Invoices</span>
              <div
                class="text-surface-900 dark:text-surface-0 font-medium text-4xl"
              >
                {{ tableDataInvoices.length }}
              </div>
            </div>
            <div
              class="flex items-center justify-center bg-purple-100 rounded-border"
              style="width: 2.5rem; height: 2.5rem"
            >
              <Icon
                icon="material-symbols:receipt-outline-rounded"
                width="24"
                height="24"
                style="color: #7c5dfa"
                class="icon"
              />
            </div>
          </div>
          <span class="text-primary font-light"
            >Total invoices generated.
          </span>
        </div>
      </div>
      <div class="bg-white rounded-lg p-4">
        <div class="mb-0">
          <div class="flex justify-between mb-4">
            <div>
              <span class="block text-lg mb-4">Total Services</span>
              <div class="text-surface-900 font-medium text-4xl">
                {{ $store.state.servicesSize }}
              </div>
            </div>
            <div
              class="flex items-center justify-center bg-orange-100 rounded-border"
              style="width: 2.5rem; height: 2.5rem"
            >
              <Icon
                icon="material-symbols:patient-list-outline-rounded"
                width="24"
                height="24"
                style="color: #ff8f00"
                class="icon"
              />
            </div>
          </div>
          <span class="text-primary font-light">Total number of Services </span>
        </div>
      </div>
      <div class="bg-white rounded-lg p-4">
        <div class="mb-0">
          <div class="flex justify-between mb-4">
            <div>
              <span class="block text-lg mb-4">Total Appointments</span>
              <div
                class="text-surface-900 dark:text-surface-0 font-medium text-4xl"
              >
                {{ tableDataAppointments.length }}
              </div>
            </div>
            <div
              class="flex items-center justify-center bg-gray-100 rounded-border"
              style="width: 2.5rem; height: 2.5rem"
            >
              <Icon
                icon="material-symbols:patient-list-outline-rounded"
                width="24"
                height="24"
                style="color: #000000"
                class="icon"
              />
            </div>
          </div>
          <span class="text-primary font-light"
            >Total number of Appointments
          </span>
        </div>
      </div>
    </div>

    <div class="bg-white p-4 h-[39%] flex flex-col overflow-auto gap-2 ">
      <span>Appointments</span>

      <el-table
        v-loading="loadingP"
        :data="tableDataAppointments"
        :border="parentBorder"
        :preserve-expanded-content="preserveExpanded"
        style="width: 98%; margin-bottom: 20px"
      >
        <el-table-column prop="patientName" label="Patient Name" />
        <el-table-column prop="paitentId" label="Patient Id" />
        <el-table-column prop="visitDate" label="Visit Date" />
        <el-table-column prop="status" label="Status" />
        <el-table-column fixed="right" label="Actions" class="actions" v-if="$store.state.userrole == 'Administrator' || $store.state.userrole == 'Doctor' || $store.state.userrole == 'Staffs'">
          <template #default="scope">
            <el-button
              link
              type="success"
              size="small"
              @click="viewApp(scope.row.id)"
            >
              View
            </el-button>
            <el-button
              link
              type="primary"
              size="small"
              @click="updateApp(scope.row)"
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
                <span class="w-48">Reason:</span> {{ props.row.reason }} yrs
              </p>
              <p class="flex w-full">
                <span class="w-48">Diagnosis:</span>
                {{ props.row.diagnosis }}
              </p>
              <p class="flex w-full">
                <span class="w-48">Notes:</span> {{ props.row.notes }}
              </p>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="bg-white p-4 h-[39%] flex flex-col overflow-auto gap-2 ">
      <span>Invoices</span>
      <el-table v-loading="loading" :data="tableDataInvoices" style="width: 98%; margin-bottom: 20px">
          <el-table-column prop="patient.name" label="Name" />
          <el-table-column prop="patient.phone" label="Phonenumber" />
          <el-table-column prop="patient.age" label="Age">
          <template #default="scope">
              {{ scope.row.patient.age }} years
            </template>
          </el-table-column>
          <el-table-column label="Services">
            <template #default="scope">
              {{ scope.row.services.length }} 
            </template>
          </el-table-column>
          <el-table-column label="Total Price">
            <template #default="scope">
              <span>Ghc {{ scope.row.totalAmount?.toFixed(2) || '0.00'}}</span>
            </template> 
          </el-table-column>
          <el-table-column prop="createdAt" label="Created At"
        />

        <el-table-column label="Status">
            <template #default="scope">
              {{ scope.row.paymentStatus }} 
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="Actions" class="actions" v-if="$store.state.userrole == 'Administrator' || $store.state.userrole == 'Doctor' || $store.state.userrole == 'Staffs'">
            <template #default="scope">
              <el-button link type="primary" size="small" @click="viewInvoice(scope.row)"> View </el-button>
            </template>
          </el-table-column>
        </el-table>
    </div>
  </body>
  <UpdateAppointment v-if="modalupdateApp" @close="modalupdateApp = false" :appointment="selectedItem" />
  <InvoiceDetailsView v-if="modalview" @close="modalview = false" :invoice="selectedItem"/>
  <ViewAppointment v-if="modalviewApp" @close="modalviewApp = false" :selectedId="selectedItem"/>
</template>

<script setup>
import UpdateAppointment from "../components/UpdateAppointment.vue";
import InvoiceDetailsView from "../components/InvoiceDetailsView.vue";
import { Icon } from "@iconify/vue";
import { ref, onMounted, onUnmounted } from "vue";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";
import ViewAppointment from "../components/ViewAppointment.vue";

const loadingP = ref(false);
const loadingI = ref(false);
const modalupdateApp = ref(false);
const modalview = ref(false);
const modalviewApp = ref(false);
const tableDataAppointments = ref([]);
const tableDataInvoices = ref([]);
const selectedItem = ref(null);

let unsubscribeAppointments = null;
let unsubscribeInvoices = null;

const updateApp = (item) => {
  selectedItem.value = item;
  modalupdateApp.value = true;
};

const viewApp = (item) => {
  selectedItem.value = item;
  modalviewApp.value = true;
};

const viewInvoice = (user) => {
  selectedItem.value = user;
  modalview.value = true;
};

const loadAppointments = () => {
  loadingP.value = true;
  const q = collection(db, "appointments");

  unsubscribeAppointments = onSnapshot(
    q,
    (snapshot) => {
      tableDataAppointments.value = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("Appointments:", tableDataAppointments.value);
      loadingP.value = false;
    },
    (err) => console.error("Appointment Listener Error:", err)
  );
};

const loadInvoices = () => {
  loadingI.value = true;
  const q = collection(db, "invoices");

  unsubscribeInvoices = onSnapshot(
    q,
    (snapshot) => {
      tableDataInvoices.value = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      loadingI.value = false;
    },
    (err) => console.error("Invoice Listener Error:", err)
  );
};

onMounted(() => {
  loadAppointments();
  loadInvoices();
});

onUnmounted(() => {
  unsubscribeAppointments?.();
  unsubscribeInvoices?.();
});
</script>