<template>
  <select
    :class="{
      'rounded focus:outline-none focus:border-gray-600': 1
    }"
    :value="value"
    :multiple="multiple"
    @input="$emit('input', $event.target.value)"
  >
    <!-- <option disabled>Please select one option</!-->
    <option
      v-for="item in items"
      :key="item.value"
      :class="{ '': 1 }"
      :value="item.value"
    >
      {{ item.label }}
    </option>
  </select>
</template>

<script>
export default {
  name: "VFormSelect",
  props: {
    items: { type: Array, default: null },
    value: { type: [String, Number], default: null },
    multiple: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss" scoped>
select {
  color: #4a5568;
  border: 1px solid #bee3f8;
  padding: 5px 10px;
  border-radius: 5px;
  outline: 2px solid transparent;
  outline-offset: 2px;
}
select:focus {
  // border-bottom-left-radius: 0px;
  // border-bottom-right-radius: 0px;
}

option {
  padding: 50px;
  width: 80%;
  border-radius: 10px;
}
</style>
