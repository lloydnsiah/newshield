<template>
  <div class="page">
    <div class="form" v-loading="loading">
      <el-descriptions
        class="margin-top"
        title="Appointment Details"
        :column="3"
        :size="size"
        border
      >
        <el-descriptions-item :span="3">
          <template #label>
            <div class="cell-item w-20">
              Patient Name
            </div>
          </template>
          <span>{{ details?.patientName || 'N/A' }}</span>
        </el-descriptions-item>
        <el-descriptions-item :span="3">
          <template #label>
            <div class="cell-item w-20">
              Patient Id
            </div>
          </template>
          <span>{{ details?.paitentId || 'N/A' }}</span>
        </el-descriptions-item>
        <el-descriptions-item :span="3">
          <template #label>
            <div class="cell-item w-20">
              Status
            </div>
          </template>
          <span>{{ details?.status || 'N/A' }}</span>
        </el-descriptions-item>
        <el-descriptions-item :span="3">
          <template #label>
            <div class="cell-item w-20">
              Diagnosis
            </div>
          </template>
          <span>{{ details?.diagnosis || 'N/A' }}</span>
        </el-descriptions-item>
        <el-descriptions-item :span="3">
          <template #label>
            <div class="cell-item w-20">
              Reason
            </div>
          </template>
          <span>{{ details?.reason || 'N/A' }}</span>
        </el-descriptions-item>
        <el-descriptions-item :span="3">
          <template #label>
            <div class="cell-item w-20">
              Created By
            </div>
          </template>
          <span>{{ details?.createdBy || 'N/A' }}</span>
        </el-descriptions-item>
        
      </el-descriptions>
      
      <el-button type="danger" class="mt-8" plain @click="emit('close')">Close</el-button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { watch } from "vue";
import { defineEmits } from "vue";
import { ElMessage } from "element-plus";

const loading = ref(false);
const patient = ref(null);
const details = ref(null);

const emit = defineEmits(["close"]);

const props = defineProps({
  selectedId: {
    type: String,
    required: true,
  },
});

let unsubscribeUser = null;

const loadAppointment = async (id) => {
  if (!id) return;

  loading.value = true;

  try {
    const docRef = doc(db, "appointments", id);
    const snap = await getDoc(docRef);

    if (snap.exists()) {
      details.value = {
        id: snap.id,
        ...snap.data(),
      };
      console.log("AppointmentData", details.value);
    } else {
      ElMessage.error("Appointment not found");
      details.value = null;
    }
  } catch (err) {
    console.error("Error loading appointment:", err);
    ElMessage.error("Failed to load appointment");
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  loadAppointment(props.selectedId);
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
  border-radius: 8px;
  font-family:
    Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
</style>
