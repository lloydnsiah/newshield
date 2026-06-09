<template>
  <div class="page">
    <div class="form" v-loading="loading">
      <el-descriptions
        class="margin-top"
        title="Patient Details"
        :column="3"
        :size="size"
        border
      >
        <el-descriptions-item :span="3">
          <template #label>
            <div class="cell-item w-20">
              First Name
            </div>
          </template>
          <span>{{ currentPatient?.firstName || 'N/A' }}</span>
        </el-descriptions-item>
        <el-descriptions-item :span="3">
          <template #label>
            <div class="cell-item w-20">
              Other Names
            </div>
          </template>
          <span>{{ currentPatient?.otherName || 'N/A' }}</span>
        </el-descriptions-item>
        <el-descriptions-item :span="3">
          <template #label>
            <div class="cell-item w-20">
              Age
            </div>
          </template>
          <span>{{ currentPatient?.age || 'N/A' }} yrs</span>
        </el-descriptions-item>
        <el-descriptions-item :span="3">
          <template #label>
            <div class="cell-item w-20">
              Gender
            </div>
          </template>
          <span>{{ currentPatient?.gender || 'N/A' }}</span>
        </el-descriptions-item>
        <el-descriptions-item :span="3">
          <template #label>
            <div class="cell-item w-20">
              Occupation
            </div>
          </template>
          <span>{{ currentPatient?.occupation || 'N/A' }}</span>
        </el-descriptions-item>
        <el-descriptions-item :span="3">
          <template #label>
            <div class="cell-item w-20">
              Date of Birth
            </div>
          </template>
          <span>{{ currentPatient?.dob || 'N/A' }}</span>
        </el-descriptions-item>
        <el-descriptions-item :span="3">
          <template #label>
            <div class="cell-item w-20">
              Phone number
            </div>
          </template>
          <span>{{ currentPatient?.phone || 'N/A' }}</span>
        </el-descriptions-item>
        <el-descriptions-item :span="3">
          <template #label>
            <div class="cell-item w-20">
              Email
            </div>
          </template>
          <span>{{ currentPatient?.email || 'N/A' }}</span>
        </el-descriptions-item>
        <el-descriptions-item :span="3">
          <template #label>
            <div class="cell-item w-20">
              Emergency Contact
            </div>
          </template>
          <span>{{ currentPatient?.emergencyContactName || 'N/A' }}</span>
        </el-descriptions-item>
        <el-descriptions-item :span="3">
          <template #label>
            <div class="cell-item w-20">
              Number
            </div>
          </template>
          <span>{{ currentPatient?.emergencyContact || 'N/A' }}</span>
        </el-descriptions-item>
        <el-descriptions-item :span="3">
          <template #label>
            <div class="cell-item w-20">
              Address
            </div>
          </template>
          <span>{{ currentPatient?.address || 'N/A' }}</span>
        </el-descriptions-item>
        <el-descriptions-item :span="3">
          <template #label>
            <div class="cell-item w-20">
              Allergies
            </div>
          </template>
          <span>{{ currentPatient?.allergies || 'N/A' }}</span>
        </el-descriptions-item>
        <el-descriptions-item :span="3">
          <template #label>
            <div class="cell-item w-20">
              Created By
            </div>
          </template>
          <span>{{ currentPatient?.createdBy || 'N/A' }}</span>
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
const currentPatient = ref(null);

const emit = defineEmits(["close"]);

const props = defineProps({
  selectedId: {
    type: String,
    required: true,
  },
});

let unsubscribeUser = null;

const loadPatient = async (id) => {
  if (!id) return;

  loading.value = true;

  try {
    const docRef = doc(db, "patients", id);
    const snap = await getDoc(docRef);

    if (snap.exists()) {
      currentPatient.value = {
        id: snap.id,
        ...snap.data(),
      };
      console.log("UserData", currentPatient.value);
    } else {
      ElMessage.error("Patient not found");
      currentPatient.value = null;
    }
  } catch (err) {
    console.error("Error loading patient:", err);
    ElMessage.error("Failed to load patient");
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  loadPatient(props.selectedId);
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
