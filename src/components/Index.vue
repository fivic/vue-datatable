<template>
  <div class="wrapper">
    <div class="sidebar">
      <div>
        <label class="typo__label">Fiscal year:</label>
        <VSelect
          class="style-chooser"
          multiple
          :options="getFilterData('fiscalYear')"
          v-model="selectedYears"
        ></VSelect>
      </div>
      <div>
        <label class="typo__label">Customers:</label>
        <VSelect
          class="style-chooser"
          multiple
          :options="getFilterData('customer')"
          v-model="selectedCustomers"
        ></VSelect>
      </div>

      <div>
        <label class="typo__label">Document types:</label>
        <VSelect
          class="style-chooser"
          multiple
          :options="getFilterData('documentType')"
          v-model="selectedDocumentTypes"
        ></VSelect>
      </div>
      <div>
        <label class="typo__label">Company:</label>
        <VSelect
          class="style-chooser"
          multiple
          :options="getFilterData('company')"
          v-model="selectedCompanies"
        ></VSelect>
      </div>
      <div>
        <label>Service:</label>
        <VSelect
          class="style-chooser"
          multiple
          :options="getFilterData('service')"
          v-model="selectedServices"
        ></VSelect>
      </div>
      <div>
        <label>Document number:</label>
        <input class="sidebar_text" type="text" v-model="docNumber" />
      </div>
      <div>
        <label>Document status:</label>
        <VSelect
          class="style-chooser"
          multiple
          :options="getFilterData('documentStatus')"
          v-model="selectedStatuses"
        ></VSelect>
      </div>
      <div>
        <label>Bank:</label>
        <VSelect
          class="style-chooser"
          multiple
          :options="getFilterData('bank')"
          v-model="selectedBanks"
        ></VSelect>
      </div>
      <div>
        <label>Currency:</label>
        <VSelect
          class="style-chooser"
          multiple
          :options="getFilterData('currency')"
          v-model="selectedCurrencies"
        ></VSelect>
      </div>
      <div>
        <label>Due in:</label>
        <VSelect
          class="style-chooser"
          multiple
          :options="getFilterData('dueIn')"
          v-model="selectedDue"
        ></VSelect>
      </div>
      <div>
        <label>Paid:</label>
        <VSelect
          class="style-chooser"
          multiple
          :options="getFilterData('isPaid')"
          v-model="selectedIfPaid"
        ></VSelect>
      </div>
    </div>
    <div class="content">
      <VTable :items="filteredData"></VTable>
    </div>
    <VScroll></VScroll>
  </div>
</template>

<script>
import mockup from "../../data";
import "@/assets/styles.scss";
import VTable from "@/components/VTable";
import VScroll from "../components/VScrollToTop/VScrollToTop";
import VSelect from "vue-select";
import "vue-select/dist/vue-select.css";
export default {
  name: "Index",
  components: {
    VTable,
    VSelect,
    VScroll
  },
  data: function() {
    return {
      data: mockup,
      selectedDocumentTypes: [],
      selectedCustomers: [],
      selectedCompanies: [],
      selectedYears: [],
      selectedServices: [],
      selectedStatuses: [],
      selectedBanks: [],
      selectedCurrencies: [],
      selectedDue: [],
      selectedIfPaid: [],
      docNumber: ""
    };
  },
  props: {},
  computed: {
    getPageSize() {
      return this.selectedPageSize.label;
    },
    filteredData() {
      let data = this.data.filter(
        o =>
          this.filterDataBy(o.fiscalYear, "selectedYears") &&
          this.filterDataBy(o.company, "selectedCompanies") &&
          this.filterDataBy(o.customer, "selectedCustomers") &&
          this.filterDataBy(o.documentType, "selectedDocumentTypes") &&
          this.filterDataBy(o.documentNumber, "docNumber") &&
          this.filterDataBy(o.service, "selectedServices") &&
          this.filterDataBy(o.bank, "selectedBanks") &&
          this.filterDataBy(o.currency, "selectedCurrencies") &&
          this.filterDataBy(o.documentStatus, "selectedStatuses") &&
          this.filterDataBy(o.dueIn, "selectedDue") &&
          this.filterDataBy(o.isPaid, "selectedIfPaid")
      );
      return data;
    }
  },
  methods: {
    getFilterData(key) {
      let unique = [...new Set(this.filteredData.map(item => item[key]))];
      let arr = [];
      unique.forEach(element => {
        arr.push({ label: element });
      });
      return arr.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      });
    },
    filterDataBy(data, key) {
      if (this[key].length && key != "docNumber") {
        return this[key].filter(o => o.label == data).length !== 0;
      }

      if (key == "docNumber") {
        return data.toString().includes(this[key]);
      }
      return true;
    }
  }
};
</script>

<style scoped lang="scss">
.multiselect__option {
  font-size: 5px;
}

.vs__selected {
  background-color: red;
  color: green;
}

.sidebar_text {
  padding: 5px;
  outline: none;
  display: flex;
  padding: 10px;
  background: white;
  border: 1px solid rgba(60, 60, 60, 0.26);
  border-radius: 4px;
  white-space: normal;
  width: 100%;
}

.sidebar_text:focus {
  border: 1px solid #2d5fbb;
}
</style>
<style>
.style-chooser .vs__search::placeholder,
.style-chooser .vs__dropdown-toggle,
.style-chooser .vs__dropdown-menu {
  background: white;
  color: #394066;
}

.style-chooser .vs__clear,
.style-chooser .vs__open-indicator {
  fill: #394066;
}

.vs__selected {
  background: greenyellow;
}

label {
  font-weight: 500;
}
</style>
