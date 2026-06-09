<template>
  <body>
    <div class="form">
      <h2 class="text-2xl font-light text-center mb-4 ">Add New Service</h2>
      <el-form :model="form" label-width="auto" style="max-width: 600px">
    <el-form-item label="Service Name">
      <el-input v-model="form.name" />
    </el-form-item>
    <el-form-item label="Price">
      <el-input v-model.number="form.price" />
    </el-form-item>
    
    <el-form-item style="margin-top: 40px; margin-left: 30px; align-content: center; align-items: center; width: 100%; display: flex;">
      <el-button @click="emit('close')">Cancel</el-button>
      <el-button type="primary" @click.prevent="onSubmit">Create</el-button>
    </el-form-item>
  </el-form>
    </div>
  </body>
</template>

<script setup>
import { reactive } from 'vue'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase'
import { defineEmits } from 'vue'
import { ElMessage } from "element-plus";

import { useStore } from "vuex";
const store = useStore();
const emit = defineEmits(['close'])


// do not use same name with ref
const form = reactive({
  name: '',
  price: null,
})

const onSubmit = async () => {
  try{
    await addDoc(collection(db, 'services'), {
      ...form,
      createdAt: new Date().toLocaleDateString(),
      createdBy: store.state.username,
    })
    emit('close')
    ElMessage.success("Service created successfully");
  } catch (error) {
    ElMessage.error("Failed to create service");
  }
}



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
  background-color: #FFF;
  padding: 30px;
  width: 40rem;
  border-radius: 8px;
  font-family:
    Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
</style>
