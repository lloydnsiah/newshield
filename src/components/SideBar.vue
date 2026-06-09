<template>
  <div v-if="$store.state.modalSidebar">
    <div class="sidebar">
      <div class="head">
        <div class="user-img">
          <img src="../images/shield_logo.png" alt="logo" />
        </div>
        <div class="user-details">
          <p class="name">{{ $store.state.username }}</p>
          <p class="title">{{ $store.state.userrole }}</p>
        </div>
      </div>
      <div class="nav grow flex flex-col">
        <div class="menu grow">
          <p class="title">Main</p>
          <ul>
            <li class="active">
              <router-link
                :to="{ name: 'DashboardPage' }"
                class="flex items-center gap-2 p-3 rounded-lg hover:bg-[#f6f6f6] hover:text-red-500 transition-all duration-300"
              >
                <Icon
                  class="icon"
                  icon="material-symbols:home-outline-rounded"
                  width="24"
                  height="24"
                />
                <span class="text">Dashboard</span>
              </router-link>
            </li>
            <li v-if="$store.state.userrole == 'Administrator' || $store.state.userrole == 'Doctor' || $store.state.userrole == 'Staffs'">
              <router-link
                :to="{ name: 'AppointmentsPage' }"
                class="flex items-center gap-2 p-3 rounded-lg hover:bg-[#f6f6f6] hover:text-red-500 transition-all duration-300"
              >
                <Icon
                  class="icon"
                  icon="ic:baseline-alarm"
                  width="24"
                  height="24"
                />
                <span class="text">Appointments</span>
              </router-link>
            </li>
            <li v-if="$store.state.userrole == 'Administrator' || $store.state.userrole == 'Doctor' || $store.state.userrole == 'Staffs'">
              <router-link
                :to="{ name: 'PatientsPage' }"
                class="flex items-center gap-2 p-3 rounded-lg hover:bg-[#f6f6f6] hover:text-red-500 transition-all duration-300"
              >
                <Icon
                  class="icon"
                  icon="material-symbols:patient-list-outline-rounded"
                  width="24"
                  height="24"
                />
                <span class="text">Patients</span>
              </router-link>
            </li>
            <li v-if="$store.state.userrole == 'Administrator' || $store.state.userrole == 'Doctor' || $store.state.userrole == 'Staffs'">
              <router-link
                :to="{ name: 'InvoicesPage' }"
                class="flex items-center gap-2 p-3 rounded-lg hover:bg-[#f6f6f6] hover:text-red-500 transition-all duration-300"
              >
                <Icon
                  class="icon"
                  icon="material-symbols:receipt-outline-rounded"
                  width="24"
                  height="24"
                />
                <span class="text">Invoices</span>
              </router-link>
            </li>

            <li v-if="$store.state.userrole == 'Administrator' || $store.state.userrole == 'Staffs'">
              <router-link
                :to="{ name: 'ServicesPage' }"
                class="flex items-center gap-2 p-3 rounded-lg hover:bg-[#f6f6f6] hover:text-red-500 transition-all duration-300"
              >
                <Icon
                  class="icon"
                  icon="ic:baseline-alarm"
                  width="24"
                  height="24"
                />
                <span class="text">Services</span>
              </router-link>
            </li>
            <li v-if="$store.state.userrole == 'Administrator'">
              <router-link
                :to="{ name: 'UsersPage' }"
                class="flex items-center gap-2 p-3 rounded-lg hover:bg-[#f6f6f6] hover:text-red-500 transition-all duration-300"
              >
                <Icon
                  class="icon"
                  icon="material-symbols:user-attributes-outline-rounded"
                  width="24"
                  height="24"
                />
                <span class="text">Users</span>
              </router-link>
            </li>
          </ul>
        </div>

        <button
          @click="toggleLogoutModal()"
          class="flex items-center gap-2 mt-auto mb-0 p-3 rounded-lg hover:bg-[#f6f6f6] hover:text-red-500 transition-all duration-300"
        >
          <Icon
            icon="material-symbols:logout"
            width="24"
            height="24"
            style="color: #fb2c36"
          />
          <span class="text-red-500">Logout</span>
        </button>
      </div>
    </div>
  </div>
  <div v-else>
    <div class="sidebar_mini">
      <Icon
        icon="material-symbols:supervised-user-circle"
        width="48"
        height="48"
        style="color: #8a8a8a"
      />

      <div class="nav grow flex flex-col">
        <div class="menu grow">
          <p class="title text-center">Main</p>
          <ul class="mt-8 flex flex-col gap-5">
            <li>
              <router-link
                :to="{ name: 'DashboardPage' }"
                class="flex items-center gap-2 p-3 rounded-lg hover:bg-[#f6f6f6] hover:text-red-500 transition-all duration-300"
              >
                <Icon
                  class="icon"
                  icon="material-symbols:home-outline-rounded"
                  width="24"
                  height="24"
                />
              </router-link>
            </li>
            <li>
              <router-link
                :to="{ name: 'AppointmentsPage' }"
                class="flex items-center gap-2 p-3 rounded-lg hover:bg-[#f6f6f6] hover:text-red-500 transition-all duration-300"
              >
                <Icon
                  class="icon"
                  icon="ic:baseline-alarm"
                  width="24"
                  height="24"
                />
              </router-link>
            </li>
            <li>
              <router-link
                :to="{ name: 'PatientsPage' }"
                class="flex items-center gap-2 p-3 rounded-lg hover:bg-[#f6f6f6] hover:text-red-500 transition-all duration-300"
              >
                <Icon
                  class="icon"
                  icon="material-symbols:patient-list-outline-rounded"
                  width="24"
                  height="24"
                />
              </router-link>
            </li>
            <li>
              <router-link
                :to="{ name: 'InvoicesPage' }"
                class="flex items-center gap-2 p-3 rounded-lg hover:bg-[#f6f6f6] hover:text-red-500 transition-all duration-300"
              >
                <Icon
                  class="icon"
                  icon="material-symbols:receipt-outline-rounded"
                  width="24"
                  height="24"
                />
              </router-link>
            </li>

            <li>
              <router-link
                :to="{ name: 'ServicesPage' }"
                class="flex items-center gap-2 p-3 rounded-lg hover:bg-[#f6f6f6] hover:text-red-500 transition-all duration-300"
              >
                <Icon
                  class="icon"
                  icon="ic:baseline-alarm"
                  width="24"
                  height="24"
                />
              </router-link>
            </li>
            <li>
              <router-link
                :to="{ name: 'UsersPage' }"
                class="flex items-center gap-2 p-3 rounded-lg hover:bg-[#f6f6f6] hover:text-red-500 transition-all duration-300"
              >
                <Icon
                  class="icon"
                  icon="material-symbols:user-attributes-outline-rounded"
                  width="24"
                  height="24"
                />
              </router-link>
            </li>
          </ul>
        </div>

        <button
          @click="toggleLogoutModal()"
          class="flex items-center gap-2 mt-auto mb-0 p-3 rounded-lg hover:bg-[#f6f6f6] transition-all duration-300"
        >
          <Icon
            icon="material-symbols:logout"
            width="24"
            height="24"
            style="color: #fb2c36"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import { useStore } from "vuex";

const store = useStore();

const toggleLogoutModal = () => {
  store.commit("TOGGLE_LOGOUT");
};
</script>

<style scoped>
.sidebar {
  width: 326px;
  min-height: 98%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 24px;
  border-radius: 20px;
  margin-bottom: 20px;
  transition: all 0.3s ease-out;
}

.sidebar_mini {
  width: 100px;
  min-height: 98%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 24px;
  border-radius: 10px;
  margin-bottom: 20px;
  transition: all 0.3s ease-out;
  align-items: center;
}

.sidebar .head {
  display: flex;
  gap: 20px;
  align-items: center;
  border-bottom: 1px solid #f6f6f6;
}

.user-img {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  margin-bottom: 15px;
}

.user-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-details .title,
.menu .title {
  font-size: 10px;
  font-weight: 500;
  color: #757575;
  text-transform: uppercase;
  margin-bottom: 10px;
}

.user-details .name {
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 2px;
}

.menu ul li {
  list-style-type: none;
  margin-bottom: 12px;
}

.menu ul li router-link {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  font-weight: 500;
  color: #757575;
  text-decoration: none;
  padding: 12px 8px;
  border-radius: 8px;
  transition: all 0.3s;
}

.menu ul li:hover router-link {
  background-color: #f6f6f6;
  color: #000;
}

.menu ul li .active router-link {
  background-color: #f6f6f6;
  color: #000;
}

.menu ul li .icon {
  font-size: 20px;
}
</style>
