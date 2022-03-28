<template>
  <div>
    <q-layout view="lHh Lpr lFf">
      <q-page-container class="q-pa-xl">
        <q-btn
          label="Tambah Data Mahasiswa"
          color="primary"
          @click="openDialog"
          class="q-mb-md"
        />
        <Table />
      </q-page-container>
    </q-layout>
    <FormInput
      accessFor="create"
      :dialog="dialog"
      @closeDialog="dialog = false"
    />
  </div>
</template>

<script>
import { defineComponent, ref, computed } from "vue";
import { useStore } from "vuex";
import { Table, FormInput } from "../components";

export default defineComponent({
  name: "MainLayout",

  components: { Table, FormInput },
  setup() {
    const store = useStore();
    const dialog = ref(false);
    function openDialog() {
      dialog.value = true;
    }
    return {
      openDialog,
      dialog,
    };
  },
});
</script>
