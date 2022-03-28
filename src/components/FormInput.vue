<template>
  <q-dialog v-model="openDialog">
    <q-card style="width: 700px; max-width: 80vw">
      <q-card-section>
        <div class="text-h6">{{ title }}</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          outlined
          v-model="dataMhs.nik"
          label="NIK"
          class="q-pb-sm"
          dense
          :readonly="accessFor === 'edit'"
        />
        <q-input
          outlined
          v-model="dataMhs.name"
          label="Nama"
          class="q-pb-sm"
          dense
        />

        <q-select
          outlined
          v-model="dataMhs.gender"
          label="Jenis Kelamin"
          class="q-pb-sm"
          dense
          :options="optionsGender"
        />

        <q-select
          outlined
          v-model="dataMhs.program"
          label="Program Studi"
          class="q-pb-sm"
          dense
          :options="optionsProgram"
        />

        <q-input
          outlined
          v-model="dataMhs.age"
          label="Usia"
          class="q-pb-sm"
          dense
        />
      </q-card-section>

      <q-card-actions align="right" class="bg-white text-teal">
        <q-btn
          color="white"
          text-color="black"
          label="Batal"
          @click="closeDialog"
        />
        <q-btn color="primary" :label="btnName" @click="addNewData" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent, watch, ref, reactive, computed } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "FormInput",
  props: {
    accessFor: String,
    dialog: Boolean,
    dataSelected: Object,
  },
  setup(props, { emit }) {
    watch(
      () => props.dataSelected,
      (data) => {
        dataMhs.value = data;
      }
    );
    const store = useStore();
    const dataMhs = ref({});
    const optionsGender = reactive(["Laki -laki", "Perempuan"]);
    const optionsProgram = reactive([
      "Akutansi",
      "Kedokteran",
      "Psikologi",
      "Sastra Inggris",
      "Sistem Informasi",
    ]);

    const title = computed(() => {
      return props.accessFor == "create" ? "Masukkan Data" : "Ubah Data";
    });
    const btnName = computed(() => {
      return props.accessFor == "create" ? "Tambah" : "Ubah";
    });
    const openDialog = computed(() => props.dialog);
    const dataFromChild = computed(() => props.dataSelected);

    function addNewData() {
      if (props.accessFor == "create") {
        store.commit("addNewData", dataMhs.value);
      } else {
        store.dispatch("editData", dataMhs.value);
      }

      closeDialog();
    }

    function closeDialog() {
      emit("closeDialog");
      if (props.accessFor == "create") dataMhs.value = {};
    }

    return {
      dataMhs,
      addNewData,
      openDialog,
      closeDialog,
      title,
      dataFromChild,
      optionsGender,
      optionsProgram,
      btnName,
    };
  },
});
</script>
