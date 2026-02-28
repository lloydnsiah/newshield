<template>
  <body>
    <div class="form">
      <h2 class="text-2xl font-light text-center mb-4">Add New Appointment</h2>
      <el-form :model="form" label-width="auto" style="max-width: 600px">
        <el-form-item label="Patients Name">
          <el-autocomplete
            v-model="state1"
            :fetch-suggestions="querySearch"
            clearable
            class="w-50"
            placeholder="Search patient"
            @select="handleSelect"
          />
        </el-form-item>

        <el-form-item label="Status">
          <el-select
            v-model="form.status"
            placeholder="please select visit status"
          >
            <el-option label="Waiting" value="Waiting" />
            <el-option label="Cancelled" value="Cancelled" />
            <el-option label="Completed" value="Completed" />
          </el-select>
        </el-form-item>
        <el-form-item label="Reason">
          <el-input v-model="form.reason" type="textarea" />
        </el-form-item>
        <el-form-item
          style="
            margin-top: 40px;
            margin-left: 30px;
            align-content: center;
            align-items: center;
            width: 100%;
            display: flex;
          "
        >
          <el-button @click="emit('close')">Cancel</el-button>
          <el-button type="primary" @click.prevent="onSubmit">Create</el-button>
        </el-form-item>
      </el-form>
    </div>
  </body>
</template>

<script setup>
import { reactive, ref, computed, onMounted } from "vue";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { defineEmits } from "vue";
import { useStore } from "vuex";
import { ElMessage } from "element-plus";

const state1 = ref("");
const store = useStore();
const emit = defineEmits(["close"]);

const selectedPatient = reactive({
  id: "",
  name: "",
});

const patients = computed(() => store.state.patients);

const querySearch = (queryString, cb) => {
  const results = patients.value
    .map((p) => ({
      value: `${p.firstName} ${p.otherName}`, // what shows in dropdown
      id: p.id,
      phone: p.phone,
    }))
    .filter((item) =>
      item.value.toLowerCase().includes(queryString.toLowerCase()),
    );

  cb(results);
};

const handleSelect = (item) => {
  selectedPatient.id = item.id;
  selectedPatient.name = item.value;
  form.paitentId = item.id;
  form.patientName = item.value;
};

// do not use same name with ref
const form = reactive({
  patientName: "",
  paitentId: "",
  visitDate: new Date().toLocaleDateString(),
  status: "",
  reason: "",
  diagnosis: "",
  notes: "",
  status: "",
  createdAt: new Date().toLocaleDateString(),
});

const onSubmit = async () => {
  try {
    await addDoc(collection(db, "appointments"), {
      ...form,
      createdBy: store.state.username,
      createdAt: serverTimestamp(),
    });
    emit("close");
    ElMessage.success("Visit created successfully");
  } catch (error) {
    ElMessage.error("Failed to create Appointment");
  }

  // console.log("Data", form));
};

onMounted(() => {
  const patients = computed(() => store.state.patients);
});
</script>

<style scoped>
body {
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
  border-radius: 8px;
  font-family:
    Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
</style>
