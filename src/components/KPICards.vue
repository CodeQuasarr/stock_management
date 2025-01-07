<script lang="ts" setup>
import {computed} from 'vue'
import {ArrowPathIcon, ArrowTrendingUpIcon, CurrencyEuroIcon, ExclamationTriangleIcon} from '@heroicons/vue/24/outline'

const props = defineProps<{
    data: {
        stock_value: number
        change_stock_value: number
        stock_rotation: number
        change_stock_rotation: number
        monthly_flow_rate: number
        change_monthly_flow_rate: number
        unsold_items: number
        change_unsold_items: number
    }
}>()

const cards = computed(() => [
    {
        title: 'Valeur totale des stocks',
        value: new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'EUR'
        }).format(props.data.stock_value),
        change: props.data.change_stock_value,
        icon: CurrencyEuroIcon,
        color: 'indigo'
    },
    {
        title: 'Rotation des stocks',
        value: props.data.stock_rotation,
        change: props.data.change_stock_rotation,
        icon: ArrowPathIcon,
        color: 'gray'
    },
    {
        title: 'Articles invendus',
        value: props.data.unsold_items,
        suffix: 'x',
        change: props.data.change_unsold_items,
        icon: ExclamationTriangleIcon,
        color: 'orange'
    }
])
</script>

<template>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
            v-for="card in cards"
            :key="card.title"
            class="bg-white rounded-lg shadow p-6"
        >
            <div class="flex items-center justify-between">
                <div>
                    <p class="text-sm font-medium text-gray-600">
                        {{ card.title }}
                    </p>
                    <p :class="`text-2xl font-bold text-${card.color}-600 mt-2`">
                        {{ card.value }}{{ card.suffix || '' }}
                    </p>
                </div>

                <!-- Icons -->
                <div :class="`p-3 rounded-full bg-${card.color}-100`">
                    <!-- Box icon -->
                    <component
                        :is="card.icon"
                        v-if="card.icon"
                        :class="`w-6 h-6 text-${card.color}-600`"
                    />
                </div>
            </div>
            <div v-if="card.change !== undefined" class="mt-4">
          <span :class="[
                'text-sm font-medium',
                card.change >= 0 ? 'text-success' : 'text-danger'
              ]"
          >
            {{ card.change >= 0 ? '+' : '' }}{{ card.change }}%
          </span>
                <span class="text-gray-500 text-sm ml-1">par rapport au mois dernier</span>
            </div>
        </div>
    </div>
</template>
