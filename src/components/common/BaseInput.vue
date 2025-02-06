<script lang="ts" setup>
defineProps<{
    modelValue: string | number
    label: string
    type?: string
    error?: string
    required?: boolean
    disabled?: boolean
}>()

defineEmits<{
    (e: 'update:modelValue', value: string | number): void
}>()
</script>

<template>
    <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {{ label }}
            <span v-if="required" class="text-red-500">*</span>
        </label>
        <input
            v-if="type !== 'textarea'"
            :type="type || 'text'"
            :value="modelValue"
            :disabled="disabled"
            :class="['input w-full', disabled ? 'bg-gray-100' : '', error ? 'border-red-500' : '']"
            @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        />
        <textarea
            v-else
            rows="2"
            :value="modelValue"
            :disabled="disabled"
            :class="['input w-full', disabled ? 'bg-gray-100' : '', error ? 'border-red-500' : '']"
            @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
        />
        <p v-if="error" class="mt-1 text-sm text-red-500">{{ error }}</p>
    </div>
</template>
