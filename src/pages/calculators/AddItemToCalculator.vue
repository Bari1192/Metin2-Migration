<template>
    <div class="mt-8 w-full h-full mx-auto">

        <table class="w-full mt-8 border-collapse border border-gray-300 text-black">
            <thead class="bg-gray-200">
                <tr>
                    <th class="border border-gray-300 px-4 py-2 text-left">Tétel neve</th>
                    <th class="border border-gray-300 px-4 py-2 text-right">Vásárlási ár</th>
                    <th class="border border-gray-300 px-4 py-2 text-right">Mennyiség</th>
                    <th class="border border-gray-300 px-4 py-2 text-right">Összeg</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in itemList" :key="index">
                    <td class="border border-gray-300 bg-slate-400 font-semibold px-4 py-2 text-left">{{ item.name }}</td>
                    <td class="border border-gray-300 bg-slate-400 font-semibold px-4 py-2 text-right">{{ formatPrice(item.price) }}</td>
                    <td class="border border-gray-300 bg-slate-400 font-semibold px-4 py-2 text-right">{{ item.quantity }} db</td>
                    <td class="border border-gray-300 bg-slate-400 font-semibold px-4 py-2 text-right">
                        {{ formatPrice(item.price * item.quantity) }}
                    </td>
                </tr>
                <!-- Összegzés sora -->
                <tr class="font-bold bg-yellow-100">
                    <td class="border border-gray-300 px-4 py-2 text-left">Összesen:</td>
                    <td class="border border-gray-300 px-4 py-2 text-right"></td>
                    <td class="border border-gray-300 px-4 py-2 text-right"></td>
                    <td class="border border-gray-300 px-4 py-2 text-right">{{ formatTotal(totalAmount) }}</td>
                </tr>
            </tbody>
        </table>

    </div>
</template>
<script setup>
defineProps(["itemList", "totalAmount"]);
function formatPrice(price) {
  return price < 1 ? `${(price * 100).toFixed(0)}m` : `${price.toFixed(2)}w`;
}
function formatTotal(total) {
  const wons = Math.floor(total);
  const millions = ((total - wons) * 100).toFixed(0);
  return `${wons} w ${millions} m`;
}
</script>