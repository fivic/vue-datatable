<template>
  <table>
    <thead>
      <tr>
        <th v-for="key in columns" :key="key.label">
          <div class="flex items-center">
            {{ key.label }}
            <div @click="sort(key.name)">
              <VIcon
                v-if="key.label != ''"
                icon="arrow-up"
                :class="{
                  'icon-rotate': 1,
                  'rotate-up': key.name == sortColumn && sortDir == 'asc',
                  'rotate-down': key.name == sortColumn && sortDir == 'desc'
                }"
                xxs
                style="padding: 0 5px;"
              ></VIcon>
            </div>
          </div>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in getSortedItems" :key="item.Num">
        <td>{{ item.documentNumber }}</td>
        <td>{{ item.documentType }}</td>
        <td>
          <div
            :class="{
              status: 1,
              'bg-orange': item.documentStatus === 'On hold',
              'bg-blue': item.documentStatus === 'In process',
              'bg-green': item.documentStatus === 'Done',
              'bg-purple': item.documentStatus === 'Pending'
            }"
          >
            {{ item.documentStatus }}
          </div>
        </td>
        <td>{{ item.fiscalYear }}</td>
        <td>
          <p style="font-weight: 600;">
            {{ item.company }}
          </p>
          <p style="margin-top: 10px;">{{ item.customer }}</p>
        </td>
        <td>
          <VIcon :icon="item.service" xs></VIcon>
        </td>
        <td>{{ item.bank }}</td>
        <td>{{ item.documentDate }}</td>
        <td style="text-align: right;">
          {{ item.ammount }} &nbsp;<b>{{ item.currency }}</b>
        </td>
        <td>{{ item.dueIn }}</td>
        <td class="justify-center">
          <VIcon :icon="item.isPaid.toString()" xs></VIcon>
        </td>
        <td>
          <VIcon icon="pencil" xs></VIcon>
        </td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <td colspan="30">
          <div class="table-footer">
            <div @click="fistPage">
              <VIcon
                icon="fast-forward"
                xxs
                class="self-align-cenetr icon-first"
              />
            </div>
            <div @click="prevPage">
              <VIcon icon="arrow-up" xxs class="self-align-cenetr icon-left" />
            </div>
            <input
              v-model="currentPage"
              type="text"
              style="background-color: #e6ebef; width: 30px; padding: 5px; border-radius: 2px; border: none;"
              class="self-align-cenetr"
            />
            <p class="self-align-cenetr">
              /{{ getTotalPages }} (Total {{ getItemsCount }})
            </p>
            <div @click="nextPage">
              <VIcon icon="arrow-up" xxs class="self-align-cenetr icon-right" />
            </div>
            <div @click="lastPage">
              <VIcon icon="fast-forward" xxs class="self-align-cenetr" />
            </div>
            <div style="width: 100px;">
              <VSelect
                class="style-chooser"
                :options="displayNumbers"
                v-model="selectedPageSize"
                :clearable="false"
                :searchable="false"
              ></VSelect>
            </div>
          </div>
        </td>
      </tr>
    </tfoot>
  </table>
</template>

<script>
import VIcon from "../components/VIcon/VIcon";
import VSelect from "vue-select";
import "vue-select/dist/vue-select.css";
export default {
  components: {
    VIcon,
    VSelect
  },
  data: function() {
    return {
      selectedPageSize: { label: 25 },
      displayNumbers: [{ label: 25 }, { label: 50 }, { label: 100 }],
      sortColumn: null,
      sortDir: "desc",
      currentPage: 1,
      columns: [
        { label: "Num", name: "documentNumber" },
        { label: "Type", name: "documentType" },
        { label: "Status", name: "documentStatus" },
        { label: "Year", name: "fiscalYear" },
        { label: "Company", name: "company" },
        { label: "Service", name: "service" },
        { label: "Bank", name: "bank" },
        { label: "Date", name: "documentDate" },
        { label: "Ammount", name: "ammount" },
        { label: "Due in", name: "dueIn" },
        { label: "Paid", name: "isPaid" },
        { label: "", name: "" }
      ],
      openModal: false
    };
  },
  props: {
    /* Items displayed per table page */
    pageSize: {
      type: Number,
      default: 25
    },
    /* Items to display */
    items: {
      type: Array,
      default: null
    }
  },
  methods: {
    sort(column) {
      if (column === this.sortColumn) {
        this.sortDir = this.sortDir === "asc" ? "desc" : "asc";
      }
      this.sortColumn = column;
    },
    nextPage() {
      if (this.currentPage * this.selectedPageSize.label < this.items.length)
        this.currentPage++;
    },
    prevPage() {
      if (this.currentPage > 1) this.currentPage--;
    },
    fistPage() {
      this.currentPage = 1;
    },
    lastPage() {
      this.currentPage = this.getTotalPages;
    }
  },
  computed: {
    getSortedItems() {
      return this.items
        .filter((row, index) => {
          let start = (this.currentPage - 1) * this.selectedPageSize.label;
          let end = this.currentPage * this.selectedPageSize.label;
          if (index >= start && index < end) return true;
        })
        .sort((a, b) => {
          let modifier = 1;
          if (this.sortDir === "desc") modifier = -1;
          if (a[this.sortColumn] < b[this.sortColumn]) return -1 * modifier;
          if (a[this.sortColumn] > b[this.sortColumn]) return 1 * modifier;
          return 0;
        });
    },
    getKeys() {
      return Object.keys(this.items[0]);
    },
    getItemsCount() {
      return this.items.length;
    },
    getTotalPages() {
      return Math.round(this.items.length / this.selectedPageSize.label);
    }
  }
};
</script>

<style lang="scss" scoped>
table tr:first-child th:first-child {
  border-top-left-radius: 10px;
}

table tr:first-child th:last-child {
  border-top-right-radius: 10px;
}

tfoot tr:last-child td:first-child {
  border-bottom-left-radius: 10px;
}

tfoot tr:last-child td:last-child {
  border-bottom-right-radius: 10px;
}

table {
  border-collapse: collapse;
  border-radius: 10px;
}

th,
td {
  border-bottom: 1px solid #dddddd;
  padding: 10px;
  background-color: #25456b;
  text-align: left;
  color: #9eb7c7;
  max-width: 180px;
}

th {
  color: #a0aec0;
  border-right: 1px solid #dddddd;
  position: relative;
  div {
    cursor: pointer;
  }
}
th:last-child {
  border-right: none;
}

.icon-rotate {
  -webkit-transition-duration: 0.5s;
  -moz-transition-duration: 0.5s;
  -o-transition-duration: 0.5s;
  transition-duration: 0.5s;
  -webkit-transition-property: -webkit-transform;
  -moz-transition-property: -moz-transform;
  -o-transition-property: -o-transform;
  transition-property: transform;
}

.rotate-down {
  transform: rotate(180deg);
  -webkit-transform: rotate(180deg);
  -ms-transform: rotate(180deg);
}
.rotate-up {
  transform: rotate(0);
  -webkit-transform: rotate(0);
  -ms-transform: rotate(0);
}

.icon-left {
  :first-child {
    transform: rotate(-90deg);
    -webkit-transform: rotate(-90deg);
    -ms-transform: rotate(-90deg);
  }
}

.icon-right {
  :first-child {
    transform: rotate(90deg);
    -webkit-transform: rotate(90deg);
    -ms-transform: rotate(90deg);
  }
}

.icon-first {
  padding-left: 20px;
  :first-child {
    transform: rotate(-180deg);
    -webkit-transform: rotate(-180deg);
    -ms-transform: rotate(-180deg);
  }
}

.table-footer {
  display: flex;
  justify-content: center;

  > div:not(:last-child) {
    display: flex;
    align-content: center;
    min-width: 50px;
    justify-content: center;
  }

  > div:hover:not(:last-child) {
    background-color: #3b4b5a;
    :first-child {
      color: #3b4b5a;
    }
  }
}
</style>
