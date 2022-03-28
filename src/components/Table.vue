<template>
  <div>
    <q-table
      title="Data Mahasiswa"
      :rows="arrData"
      :columns="kolom"
      :filter="filter"
      row-key="nik"
    >
      <template v-slot:top-right>
        <q-input dense debounce="300" v-model="filter" placeholder="Pencarian">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="nik" :props="props">
            {{ props.row.nik }}
          </q-td>
          <q-td key="name" :props="props">
            {{ props.row.name }}
          </q-td>
          <q-td key="age" :props="props">
            {{ props.row.gender }}
          </q-td>
          <q-td key="gender" :props="props">
            {{ props.row.program }}
          </q-td>
          <q-td key="program" :props="props">
            {{ props.row.age }}
          </q-td>
          <q-td key="actions" :props="props">
            <q-btn
              color="negative"
              size="sm"
              class="q-mr-sm"
              rounded
              @click="removeData(props.row)"
              >Hapus</q-btn
            >
            <q-btn
              color="primary"
              size="sm"
              rounded
              @click="openDialog(props.row)"
              >Ubah</q-btn
            >
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <FormInput
      accessFor="edit"
      :dialog="dialog"
      @closeDialog="dialog = false"
      :dataSelected="dataMhs"
    />
  </div>
</template>

<script>
import { defineComponent, ref, computed, reactive } from "vue";
import { fasFont } from "@quasar/extras/fontawesome-v5";
import { useStore } from "vuex";

import FormInput from "./FormInput.vue";

export default defineComponent({
  name: "DataTable",
  components: { FormInput },

  setup() {
    const store = useStore();
    const dialog = ref(false);
    const dataMhs = ref({});
    const filter = ref("");
    const kolom = reactive([
      {
        name: "nik",
        label: "NIK",
        field: "nik",
        align: "left",
        sortable: true,
      },
      {
        name: "name",
        label: "Nama",
        field: "name",
        align: "left",
        sortable: true,
      },
      {
        name: "gender",
        label: "Jenis Kelamin",
        field: "gender",
        align: "left",
        sortable: true,
      },
      {
        name: "program",
        label: "Program Studi",
        field: "program",
        align: "left",
        sortable: true,
      },
      {
        name: "age",
        label: "Usia",
        field: "age",
        align: "left",
        sortable: true,
      },
      {
        name: "actions",
        label: "Aksi",
        field: "actions",
        align: "center",
      },
    ]);

    function removeData(item) {
      store.commit("removeData", item);
    }
    function openDialog(item) {
      dataMhs.value = item;
      dialog.value = true;
    }
    return {
      arrData: computed(() => store.state.arrData),
      kolom,
      dataMhs,
      openDialog,
      removeData,
      dialog,
      filter,
    };
  },
});
</script>
