<template>
  <div class="order-container">
    <h2 class="title">Daftar Pesanan</h2>
    <LoadingSpinner v-if="loading" />
    <table v-else class="order-table">
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Nama Pelanggan</th>
          <th>Tanggal</th>
          <th>Total Items</th>
          <th>Total Harga</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="order in orders"
          :key="order.id"
          @click="fetchOrderDetails(order.id)"
          class="order-row"
        >
          <td>{{ order.id }}</td>
          <td>{{ order.customer_name }}</td>
          <td>{{ order.order_date }}</td>
          <td>{{ order.total_items }}</td>
          <td>Rp{{ order.total_price.toLocaleString("id-ID") }}</td>
        </tr>
      </tbody>
    </table>

    <div v-if="orderDetails" class="details-section">
      <h3 class="subtitle">Rincian Item Pesanan</h3>
      <table class="details-table">
        <thead>
          <tr>
            <th>Nama Produk</th>
            <th>Jumlah</th>
            <th>Harga</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in orderDetails.items" :key="item.product_id">
            <td>{{ item.product.name }}</td>
            <td>{{ item.quantity }}</td>
            <td>Rp{{ Number(item.price).toLocaleString("id-ID") }}</td>
            <td>
              Rp{{ (item.quantity * item.price).toLocaleString("id-ID") }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import LoadingSpinner from "../components/LoadingSpinner.vue";

export default {
  components: { LoadingSpinner },
  computed: {
    ...mapState(["orders", "loading", "orderDetails"]),
  },
  created() {
    this.fetchOrders();
  },
  methods: {
    ...mapActions(["fetchOrders", "fetchOrderDetails"]),
  },
};
</script>

<style scoped>
.order-container {
  background-color: #222831;
  color: #eeeeee;
  padding: 2rem;
  border-radius: 8px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.title,
.subtitle {
  color: #00adb5;
  text-align: center;
  margin-bottom: 1rem;
}

.order-table,
.details-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
  background-color: #393e46;
  border-radius: 8px;
  overflow: hidden;
}

th,
td {
  padding: 0.8rem;
  text-align: left;
  border-bottom: 1px solid #222831;
}

th {
  background-color: #00adb5;
  color: #222831;
  font-weight: bold;
}

.order-row {
  cursor: pointer;
  transition: background-color 0.3s;
}

.order-row:hover {
  background-color: #00adb5;
  color: #222831;
}

.details-section {
  margin-top: 2rem;
}

@media (max-width: 768px) {
  .order-container {
    padding: 0%;
  }

  .order-table,
  .details-table {
    width: 100%;
  }

  th,
  td {
    padding: 0.5rem;
    font-size: small;
  }
}

@media (max-width: 320px) {
  th,
  td {
    font-size: x-small;
  }
}
</style>
