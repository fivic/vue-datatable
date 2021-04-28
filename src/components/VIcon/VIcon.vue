<template>
  <div class="flex justify-center items-center">
    <component
      :is="svgLoader"
      :class="{
        'h-1 w-1': xxs,
        'h-2 w-2': xs,
        'h-4 w-4': sm,
        'h-6 w-6': md || (!sm && !lg),
        'h-16 w-16': lg,
        'h-32 w-32': xl
      }"
    >
      <title>{{ title }}</title>
    </component>
  </div>
</template>

<script>
export default {
  name: "VIcon",
  props: {
    /** Icon name, svg file in 'components/VIcon/svg/' */
    icon: {
      type: String,
      default: "Government"
    },
    /** Extra extra small size */
    xxs: {
      type: Boolean,
      default: false
    },
    /** Extra small size */
    xs: {
      type: Boolean,
      default: false
    },
    /** Small size */
    sm: {
      type: Boolean,
      default: false
    },
    /** Medium size */
    md: {
      type: Boolean,
      default: false
    },
    /** Large size */
    lg: {
      type: Boolean,
      default: false
    },
    /** Extra large size */
    xl: {
      type: Boolean,
      default: false
    },
    /** Title, shown on hover */
    title: {
      type: String,
      default: null
    }
  },
  computed: {
    svgLoader() {
      return () => import(`@/components/VIcon/svg/${this.icon}.svg?inline`);
    }
  }
};
</script>

<style scoped>
.h-4 {
  height: 4rem;
}

.w-4 {
  width: 4rem;
}
</style>
