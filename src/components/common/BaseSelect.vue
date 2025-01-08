<script lang="ts" setup>
defineProps<{
    modelValue: string
    label: string
    options: { value: string; label: string }[]
    error?: string
    required?: boolean
}>()

defineEmits<{
    (e: 'update:modelValue', value: string): void
}>()
</script>

<template>
    <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {{ label }}
            <span v-if="required" class="text-red-500">*</span>
        </label>
        <select
            :class="{ 'border-red-500': error }"
            :value="modelValue"
            class="input w-full"
            @input="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
        >
            <option value="">Select an option</option>
            <option v-for="option in options" :key="option.value" :value="option.value">
                {{ option.label }}
            </option>
        </select>
        <p v-if="error" class="mt-1 text-sm text-red-500">{{ error }}</p>
    </div>
</template>
