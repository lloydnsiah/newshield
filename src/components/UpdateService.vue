<template>
  <div class="page">
    <div class="form">
      <h2 class="text-2xl font-light text-center mb-4 ">Update Service</h2>
      <el-form :model="form" label-width="auto" style="max-width: 600px">
    <el-form-item label="Service Name">
      <el-input v-model="form.name" />
    </el-form-item>
    <el-form-item label="Price">
      <el-input v-model.number="form.price" />
    </el-form-item>
    <el-form-item style="margin-top: 40px; margin-left: 30px; align-content: center; align-items: center; width: 100%; display: flex;">
      <el-button @click="emit('close')">Cancel</el-button>
      <el-button type="success" @click.prevent="onSubmit">Update</el-button>
    </el-form-item>
  </el-form>
    </div>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue'
import { serverTimestamp, updateDoc, doc } from 'firebase/firestore'
import { db } from '../firebase'
import { defineEmits } from 'vue'
import { ElMessage } from "element-plus";


const props = defineProps({
  service: {
    type: Object,
    required: true
  }
})

import { useStore } from "vuex";
const store = useStore();
const emit = defineEmits(['close'])

const form = reactive({
  name: '',
  price: '',
})

watch(
  () => props.service,
  (service) => {
    if (service) {
      Object.assign(form, service)
    }
  },
  { immediate: true }
)

const onSubmit = async () => {
  try{
    await updateDoc(doc(db, 'services', props.service.id), {
        name: form.name,
        price: form.price,
        updatedBy: store.state.username,
        updatedAt: new Date().toLocaleDateString(),
      })
        
    emit('close')
    ElMessage.success("Service updated successfully");
  } catch (error) {
    ElMessage.error("Failed to update service");
  }
}



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
  background-color: #FFF;
  padding: 30px;
  width: 40rem;
  border-radius: 8px;
  font-family:
    Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
</style>
