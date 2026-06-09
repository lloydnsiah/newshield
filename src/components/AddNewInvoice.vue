<template>
  <div class="relative page">
    <div class="form">
      <h2 class="text-2xl font-light text-center mb-4">Add New Invoice</h2>
      <el-form
        ref="formRef"
        style="max-width: 600px"
        :model="dynamicValidateForm"
        label-width="auto"
        class="demo-dynamic"
      >
        <el-form-item prop="email" label="Patient Name">
          <el-autocomplete
            v-model="state1"
            :fetch-suggestions="querySearch"
            clearable
            class="w-50"
            placeholder="Search patient"
            @select="handleSelect"
          />
        </el-form-item>
        <div class="flex justify-between items-center my-4">
          <p class="text-sm ml-7 text-gray-500">Add Services Rendered</p>
          <el-button @click="addDomain"> Add new Service</el-button>
        </div>
        <el-form-item
          v-for="(domain, index) in dynamicValidateForm.domains"
          :key="domain.key"
          :label="`Service ${index}`"
          :prop="'domains.' + index + '.value'"
        >
          <div class="flex w-full gap-4 items-center">
            <el-autocomplete
              v-model="domain.value"
              :fetch-suggestions="querySearchService"
              clearable
              class="w-50"
              placeholder="Search service"
              @select="(item) => handleSelectService(item, index)"
            />
            <el-button type="danger" @click.prevent="removeDomain(domain)">
              Delete
            </el-button>
          </div>
        </el-form-item>
        <el-form-item label="Payment Method">
          <el-select
            v-model="dynamicValidateForm.paymentmethod"
            placeholder="please select payment method"
          >
            <el-option label="Cash" value="cash" />
            <el-option label="Mobile Money" value="momo" />
          </el-select>
        </el-form-item>
        <el-form-item label="Payment Status">
          <el-select
            v-model="dynamicValidateForm.paymentstatus"
            placeholder="please select payment status"
          >
            <el-option label="Paid" value="paid" />
            <el-option label="Unpaid" value="unpaid" />
            <el-option label="Draft" value="draft" />
          </el-select>
        </el-form-item>
        <el-form-item prop="comment" label="Comment">
          <el-input v-model="dynamicValidateForm.comment" />
        </el-form-item>

        <div class="my-4 flex items-center justify-between px-5">
          <span class="text-sm text-gray-500">Total</span>
          <span class="text-xl ml-7 text-gray-800">
            {{ dynamicValidateForm.total.toFixed(2) }} GHC</span
          >
        </div>

        <el-form-item>
          <el-button @click="emit('close')">Close</el-button>
          <el-button type="primary" @click="submitForm(formRef)"
            >Submit</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, computed, onMounted, onBeforeMount } from "vue";
import { defineEmits } from "vue";
import { useStore } from "vuex";
import type { FormInstance } from "element-plus";
import { ElMessage } from "element-plus";
import { collection, addDoc, serverTimestamp, onSnapshot, } from "firebase/firestore";
import { db } from "../firebase";

const patientsData = ref([]);
const store = useStore();
const state1 = ref("");
const state2 = ref("");
const emit = defineEmits(["close"]);
const loadingP = ref(null)
const loadingS = ref(null)

const invoiceServices = ref([]);

const selectedPatient = reactive({
  id: "",
  name: "",
  phone: "",
  email: "",
  gender: "",
  age: "",
  address: "",
});

const patients = ref([]);
const services = ref([]);
const currentUsername = computed(() => store.state.username);

const querySearch = (queryString, cb) => {
  const results = patients.value
    .map((p) => ({
      value: `${p.firstName} ${p.otherName}`, // what shows in dropdown
      id: p.id,
      phone: p.phone,
      email: p.email,
      gender: p.gender,
      age: p.age,
      address: p.address,
    }))
    .filter((item) =>
      item.value.toLowerCase().includes(queryString.toLowerCase()),
    );

  cb(results);
};
const querySearchService = (queryString, cb) => {
  const results = services.value
    .map((p) => ({
      value: p.name,
      price: p.price,
    }))
    .filter((item) =>
      item.value.toLowerCase().includes(queryString.toLowerCase()),
    );

  cb(results);
};

// const handleSelectService = (item) => {
//   const service = {
//     name: item.value,
//     price: item.price,
//   };

//   invoiceServices.value.push(service);

//   // reset autocomplete input
//   state2.value = "";
// };

const handleSelectService = (item, index: number) => {
  const service = {
    name: item.value,
    price: item.price,
    qty: 1,
    total: item.price,
  };

  // attach service data to THIS domain row
  dynamicValidateForm.domains[index].service = service;

  calculateTotal();
};

const selectedService = reactive({
  name: "",
  price: 0,
});

const calculateTotal = () => {
  dynamicValidateForm.total = dynamicValidateForm.domains.reduce(
    (sum, d) => sum + (d.service?.total || 0),
    0,
  );
};

const handleSelect = (item) => {
  selectedPatient.id = item.id;
  selectedPatient.name = item.value;
  selectedPatient.phone = item.phone;
  selectedPatient.email = item.email;
  selectedPatient.gender = item.gender;
  selectedPatient.age = item.age;
  selectedPatient.address = item.address;
};

const formRef = ref<FormInstance>();
const dynamicValidateForm = reactive<{
  domains: DomainItem[];
  name: string;
  paymentmethod: string;
  paymentstatus: string;
  comment: string;
  total: number;
}>({
  domains: [
    {
      key: 1,
      value: "",
    },
  ],
  name: "",
  paymentmethod: "",
  paymentstatus: "",
  comment: "",
  total: 0,
});

interface DomainItem {
  key: number;
  value: string;
  service?: {
    name: string;
    price: number;
    qty: number;
    total: number;
  };
}

const removeDomain = (item: DomainItem) => {
  const index = dynamicValidateForm.domains.indexOf(item);
  if (index !== -1) {
    dynamicValidateForm.domains.splice(index, 1);
  }
};

const addDomain = () => {
  dynamicValidateForm.domains.push({
    key: Date.now(),
    value: "",
  });
};

const buildInvoicePayload = () => {
  return {
    patientId: selectedPatient.id,
    patient: {
      name: selectedPatient.name,
      phone: selectedPatient.phone,
      email: selectedPatient.email,
      gender: selectedPatient.gender,
      age: selectedPatient.age,
      address: selectedPatient.address,
    },
    services: dynamicValidateForm.domains
      .filter((d) => d.service)
      .map((d) => ({
        name: d.service!.name,
        price: d.service!.price,
        qty: d.service!.qty,
        total: d.service!.total,
      })),
    paymentMethod: dynamicValidateForm.paymentmethod,
    paymentStatus: dynamicValidateForm.paymentstatus,
    comment: dynamicValidateForm.comment,
    totalAmount: dynamicValidateForm.total,
    createdAt: new Date().toLocaleDateString(),
  };
};

const validateInvoice = () => {
  if (!selectedPatient.id) {
    ElMessage.error("Please select a patient");
    return false;
  }

  const services = dynamicValidateForm.domains.filter((d) => d.service);
  if (services.length === 0) {
    ElMessage.error("Please add at least one service");
    return false;
  }

  if (!dynamicValidateForm.paymentmethod) {
    ElMessage.error("Select payment method");
    return false;
  }

  if (!dynamicValidateForm.paymentstatus) {
    ElMessage.error("Select payment status");
    return false;
  }

  return true;
};

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;

  if (!validateInvoice()) return;

  const invoice = buildInvoicePayload();
  try {
    await addDoc(collection(db, "invoices"), {
      ...invoice,
      createdBy: store.state.username,
      createdAt: new Date().toLocaleDateString(),
    });
    emit("close");
    ElMessage.success("Invoice created successfully");
  } catch (error) {
    ElMessage.error("Failed to create invoice");
    return;
  }

  formEl.resetFields();
  dynamicValidateForm.domains = [{ key: Date.now(), value: "" }];
};

const loadPatient = () =>{
  loadingP.value = true;
  const usersCollection = collection(db, "patients");

  onSnapshot(usersCollection, (snapshot) => {
    patients.value = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    loadingP.value = false;
     store.commit("SET_PATIENTS", patients.value);
  });

 
  loadingP.value = false;
}
const loadServices = () =>{
  loadingS.value = true;
  const usersCollection = collection(db, "services");

  onSnapshot(usersCollection, (snapshot) => {
    services.value = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    loadingS.value = false;
  });
}

onMounted(() => {
  loadPatient();
  loadServices();
});


</script>

<style scoped>
.page {
  position: fixed;
  top: 0;
  left: 0;
  background: #000000b9;
  z-index: 50;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: #fff;
  padding: 30px;
  width: 40rem;
  max-height: 90vh;
  border-radius: 8px;
  overflow: auto;
  font-family:
    Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
</style>
