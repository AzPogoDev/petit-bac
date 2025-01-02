<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-8 text-center">
      Petit bac by Henri
    </h1>
    
    <div class="max-w-2xl mx-auto">
      <div class="flex gap-4 mb-8">
        <UInput
          v-model="letter"
          placeholder="Entrez une lettre..."
          class="w-full"
          maxlength="1"
        />
        
        <UButton
          :loading="loading"
          @click="generateResults"
        >
          Générer
        </UButton>
      </div>

      <UTable
        v-if="results"
        :columns="columns"
        :rows="[results]"
        class="mt-4"
      />
    </div>
  </div>
</template>

<script setup>
const letter = ref('')
const loading = ref(false)
const results = ref(null)

const columns = [
  {
    key: 'prenom',
    label: 'Prénom'
  },
  {
    key: 'legume',
    label: 'Légume'
  },
  {
    key: 'pays',
    label: 'Pays'
  },
  {
    key: 'objet',
    label: 'Objet'
  },
  {
    key: 'animal',
    label: 'Animal'
  },
  {
    key: 'personnality',
    label: 'Personnalité'
  }
]

async function generateResults() {
  if (!letter.value || letter.value.length !== 1) {
    return
  }

  loading.value = true
  
  try {
    const response = await $fetch('/api/generate', {
      method: 'POST',
      body: {
        letter: letter.value.toUpperCase()
      }
    })
    
    results.value = response
  } catch (error) {
    console.error('Erreur:', error)
  } finally {
    loading.value = false
  }
}
</script>