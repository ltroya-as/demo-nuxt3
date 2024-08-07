<template>
  <table
    data-testid="un-auth-sustainability-index-table"
    class="w-full table-fixed border-separate border-spacing-0 overflow-hidden rounded-xl"
    aria-describedby="table"
  >
    <thead data-testid="un-auth-sustainability-index-table-head">
      <tr class="text-base font-bold">
        <th></th>
        <th
          class="border-b border-r border-solid border-b-white border-r-white bg-[#003A1E] pb-9 pl-16 pr-3 pt-2.5 text-end text-white"
        >
          Environment
        </th>
        <th
          class="border-b border-r border-solid border-b-white border-r-white bg-[#E25100] pb-9 pl-16 pr-3 pt-2.5 text-end text-white"
        >
          Social
        </th>
        <th
          class="rounded-tr-xl border-b border-r border-solid border-b-white border-r-white bg-[#192E5B] pb-9 pl-16 pr-3 pt-2.5 text-end text-white"
        >
          Governance
        </th>
      </tr>
    </thead>
    <tbody data-testid="un-auth-sustainability-index-table-body">
      <tr v-for="(item, index) in items" :key="item.company" class="text-xs">
        <td
          class="border-b border-solid border-b-white pb-2 pl-3 pr-6 pt-2"
          :class="[index % 2 === 0 ? '' : 'bg-s-200']"
        >
          {{ item.company }}
        </td>
        <td
          class="border-b border-r border-solid border-b-white border-r-white pb-2 pl-16 pr-3 pt-2 text-end"
          :class="[index % 2 === 0 ? 'bg-s-50' : 'bg-s-200']"
        >
          {{ item.environment }}
        </td>
        <td
          class="border-b border-r border-solid border-b-white border-r-white pb-2 pl-16 pr-3 pt-2 text-end"
          :class="[index % 2 === 0 ? 'bg-s-50' : 'bg-s-200']"
        >
          {{ item.social }}
        </td>
        <td
          class="border-b border-r border-solid border-b-white border-r-white pb-2 pl-16 pr-3 pt-2 text-end"
          :class="[index % 2 === 0 ? 'bg-s-50' : 'bg-s-200']"
        >
          {{ item.governance }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
}
</script>
