<template>
  <body>
    <div class="w-[100vw] h-[100vh] bg-[#00000050]">
      <div class="container">
        <div class="flex flex-col">
          <div
            class="flex px-[8%] h-[350px] pb-[8%] pt-[30px] gap-4 bg-linear-to-r from-[#853a96] to-[#ef3f41] text-white"
          >
            <div class="flex flex-[49%]">
              <div class="flex w-full gap-8">
                <img
                  src="../images/shield_logo.png"
                  class="w-[80px] h-[80px]"
                />
                <div class="flex flex-col justify-between">
                  <div class="mt-4">
                    <span class="text-3xl font-bold">SHIELD</span>
                    <p class="text-sm">Medical Center</p>
                  </div>
                  <div>
                    <span class="text-2xl font-bold">INVOICE</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex flex-col flex-[51%]">
              <div class="">
                <span class="text-[12px]">Date Information:</span>
                <p class="font-bold text-gray-100">{{ invoice.createdAt }}</p>
              </div>
              <div class="">
                <span class="text-[12px]">Invoice Number:</span>
                <p class="font-bold text-gray-100">{{ invoice.id }}</p>
              </div>
              <div class="">
                <span class="text-[12px]">Invoice To:</span>
                <p class="font-bold text-gray-100">
                  {{ invoice.patient.name }}
                </p>
              </div>
              <div class="">
                <span class="text-[12px]">Invoice From:</span>
                <p class="font-bold text-gray-100">Sheild Medical Center</p>
                <p class="font-bold text-gray-100">TC New Building Koforidua</p>
              </div>
              <div class="">
                <span class="text-[12px]">Payment Method:</span>
                <p class="font-bold text-gray-100">
                  GHC {{ invoice.paymentMethod }}
                </p>
              </div>
            </div>
          </div>
          <div
            class="mx-12 flex flex-col h-full -mt-8 rounded-l-3xl grow rounded-r-3xl z-10 bg-[#f4f5f7]"
          >
            <div class="p-5 max-h-77.5 h-77 overflow-auto">
              <el-table :data="invoice.services" style="width: 100%">
                <el-table-column
                  prop="name"
                  label="Item Name"
                  style="width: 50%"
                />
                <el-table-column label="Cost">
                  <template #default="scope">
                    <span> GHC {{ scope.row.total }}</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>

            <div class="flex justify-between px-4">
              <div class="space-y-2">
                <div>
                  <span class="text-sm">Thank you for your business </span>
                  <p class="text-sm font-bold">(+233) 0243957770</p>
                </div>
                <div>
                  <span class="text-sm"> Terms and Conditions </span>
                  <p class="text-sm font-bold">
                    All payment are final. No refunds.
                  </p>
                </div>
              </div>
              <div
                class="flex flex-col gap-1 h-[80px] w-[280px] justify-center items-center px-12 rounded-2xl bg-linear-to-r from-[#853a96] to-[#ef3f41] text-white"
              >
              <div class="flex gap-2"><span>Status:</span> <p class="uppercase font-bold">{{ invoice.paymentStatus }}</p> </div>
              <div class="flex items-center gap-4">
                <span class="text-xl">Total: ghc</span>
                <p class="text-2xl font-bold"> {{ invoice.totalAmount }}</p>
                </div>
              </div>
            </div>

            
            <div class="mt-10 flex items-center justify-center">
              <el-button type="danger" plain @click="$emit('close')"
                >Close</el-button
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
</template>

<script setup>
const props = defineProps({
  invoice: {
    type: Object,
    required: true,
  },
});

const tableData = [
  {
    date: "2016-05-03",
    name: "Ovarian Scan",
    address: "200.00",
  },
  {
    date: "2016-05-02",
    name: "Pelvic Scan",
    address: "150.00",
  },
  {
    date: "2016-05-04",
    name: "Consultation",
    address: "100.00",
  },
];

//   export default {
//     props: {
//       invoice: {
//         type: Object,
//         required: true,
//       },
//     },
//   };
</script>

<style scoped lang="scss">
body {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
}
.container {
  position: fixed;
  height: 95vh;
  width: 40vw;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #f4f5f7;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}
</style>
