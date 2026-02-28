<template>
  <div class="page">
    <div class="form">
      <h2 class="text-2xl font-light text-center mb-4">Update Appointment</h2>
      <el-form :model="form" label-width="auto" style="max-width: 600px">
        <div class="mb-4 px-5 flex items-center justify-between">
            <span class="flex gap-2 text-sm text-gray-500 items-center">Patient Name: <p class="text-lg">{{ form.patientName }}</p></span>
            <span class="flex gap-2 text-sm text-gray-500 items-center">Appointment Time: <p class="text-lg">{{ form.visitDate }}</p></span>
        </div>
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
        <el-form-item label="diagnosis">
          <el-input v-model="form.diagnosis" type="textarea" />
        </el-form-item>
        <el-form-item label="Notes">
          <el-input v-model="form.notes" type="textarea" />
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
          <el-button type="success" @click.prevent="onSubmit">Update</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { reactive, watch } from "vue";
import { serverTimestamp, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { defineEmits } from "vue";
import { ElMessage } from "element-plus";
import { useStore } from "vuex";
const store = useStore();

const props = defineProps({
  appointment: {
    type: Object,
    required: true,
  },
});
const emit = defineEmits(["close"]);

const form = reactive({
  patientName: "",
  patientId: "",
  visitDate: new Date().toLocaleDateString(),
  status: "",
  reason: "",
  diagnosis: "",
  notes: "",
  createdAt: new Date().toLocaleDateString(),
});

watch(
  () => props.appointment,
  (appointment) => {
    if (appointment) {
      Object.assign(form, appointment);
    }
  },
  { immediate: true },
);

const onSubmit = async () => {
  try {
    await updateDoc(doc(db, "appointments", props.appointment.id), {
      diagnosis: form.diagnosis,
      notes: form.notes,
      status: form.status,
      reason: form.reason,
      updatedAt: new Date().toLocaleDateString(),
      updatedBy: store.state.username,
    });

    emit("close");
    ElMessage.success("Appointment created successfully");
  } catch (error) {
   ElMessage.error("Failed to create Appointment");
  }
};
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
  border-radius: 8px;
  font-family:
    Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
</style>
