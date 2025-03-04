import { ref } from 'vue'

export const useModalsState = () => {
  const isDeleteModalOpen = ref(false)
  const isUpdateModalOpen = ref(false)
  const isCreateModalOpen = ref(false)

  const openDeleteModal = () => {
    isDeleteModalOpen.value = true
  }

  const closeDeleteModal = () => {
    isDeleteModalOpen.value = false
  }

  const openUpdateModal = () => {
    isUpdateModalOpen.value = true
  }

  const closeUpdateModal = () => {
    isUpdateModalOpen.value = false
  }

  const openCreateModal = () => {
    isCreateModalOpen.value = true
  }

  const closeCreateModal = () => {
    isCreateModalOpen.value = false
  }

  return {
    isDeleteModalOpen,
    isUpdateModalOpen,
    isCreateModalOpen,
    openDeleteModal,
    closeDeleteModal,
    openUpdateModal,
    closeUpdateModal,
    openCreateModal,
    closeCreateModal,
  }
}
