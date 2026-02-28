<template>
  <body>
    <div class="form">
      <h2 class="text-2xl font-light text-center mb-4">Add New User</h2>
      <el-form :model="form" label-width="auto" style="max-width: 600px">
        <el-form-item label="Username">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="Email">
          <el-input v-model="form.email" />
        </el-form-item>
        <el-form-item label="Role">
          <el-select
            v-model="form.role"
            placeholder="please select user's role"
          >
            <el-option label="Administrator" value="Administrator" />
            <el-option label="Doctor" value="Doctor" />
            <el-option label="Staff" value="Staff" />
            <el-option label="Other" value="Other" />
          </el-select>
        </el-form-item>
        <el-form-item label="Status">
          <el-select
            v-model="form.status"
            placeholder="please select user's status"
          >
            <el-option label="Active" :value="true" />
            <el-option label="Disabled" :value="false" />
          </el-select>
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
import { reactive } from "vue";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { defineEmits } from "vue";
import { ElMessage } from "element-plus";

import { useStore } from "vuex";
const store = useStore();

const emit = defineEmits(["close"]);

// do not use same name with ref
const form = reactive({
  name: "",
  email: "",
  role: "",
  status: null,
});

const onSubmit = async () => {
  try {
    await addDoc(collection(db, "users"), {
      ...form,
      createdAt: serverTimestamp(),
      createdBy: store.state.username,
    });
    emit("close");
    ElMessage.success("User created successfully");
  } catch (error) {
    ElMessage.error("Failed to create User");
  }
};
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
