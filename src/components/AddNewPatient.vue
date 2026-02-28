<template>
  <body>
    <div class="form">
      <h2 class="text-2xl font-light text-center mb-4">Add New Patient</h2>
      <el-form :model="form" label-width="auto" style="width: 700px">
        <el-form-item label="First Name">
          <el-input v-model="form.firstName" />
        </el-form-item>
        <el-form-item label="Other Names">
          <el-input v-model="form.otherName" />
        </el-form-item>
        <el-form-item label="Phone Number">
          <el-input v-model="form.phone" />
        </el-form-item>
        <el-form-item label="Email">
          <el-input v-model="form.email" />
        </el-form-item>
        <el-form-item label="Gender">
          <el-select v-model="form.gender" placeholder="please select gender">
            <el-option label="Male" value="male" />
            <el-option label="Female" value="female" />
          </el-select>
        </el-form-item>
        <el-form-item label="Age">
          <el-col :span="9">
            <el-input v-model.number="form.age" />
          </el-col>
          <el-col :span="6" class="text-center">
            <span class="text-gray-500">Date Of Birth</span>
          </el-col>
          <el-col :span="9">
            <el-date-picker
              v-model="form.dob"
              type="date"
              placeholder="Pick a date"
              style="width: 100%"
              format="DD/MM/YYYY"
              value-format="DD/MM/YYYY"
            />
          </el-col>
        </el-form-item>
        <el-form-item label="Nationality">
          <el-input v-model="form.nationality" />
        </el-form-item>
        <el-form-item label="Occupation">
          <el-input v-model="form.occupation" />
        </el-form-item>
        <el-form-item label="Emergency Contact Name">
          <el-input v-model="form.emergencyContactName" />
        </el-form-item>
        <el-form-item label="Emergency Contact Number">
          <el-input v-model="form.emergencyContact" />
        </el-form-item>
        <el-form-item label="Allergies">
          <el-input-tag v-model="form.allergies" placeholder="Please known Allergies" aria-label="Please click the Enter key after input"/>
        </el-form-item>
        <el-form-item label="Address">
          <el-input v-model="form.address" type="textarea" />
        </el-form-item>
        <el-form-item label="Physical Consent">
          <el-switch v-model="form.consent" />
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="emit('close')">Cancel</el-button>
          <el-button type="primary" @click="onSubmit">Create</el-button>
        </el-form-item>
      </el-form>
    </div>
  </body>
</template>

<script setup>
import { reactive, computed } from "vue";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { defineEmits } from "vue";
import { ElMessage } from "element-plus";

import { useStore } from "vuex";
const store = useStore();
const emit = defineEmits(["close"]);

const currentUsername = computed(() => store.state.username);

// do not use same name with ref
const form = reactive({
  firstName: "",
  otherName: "",
  phone: "",
  email: "",
  gender: "",
  nationality: "",
  age: "",
  address: "",
  emergencyContact: "",
  emergencyContactName: "",
  occupation: "",
  consent: null,
  dob: "",
  allergies: null,
  createdAt: new Date().toLocaleDateString(),
  lastVisitAt: "",
  createdBy: currentUsername.value
});

const onSubmit = async () => {
    try {
      await addDoc(collection(db, "patients"), {
        ...form,
        createdBy: store.state.username,
      });
      emit("close");
      ElMessage.success("Patient created successfully");
    } catch (error) {
      ElMessage.error("Failed to create Patient");
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
  border-radius: 8px;
  font-family:
    Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
</style>
