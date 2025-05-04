<template>
  <div class="order-form">
    <h2 class="form-title">Tambah Pesanan</h2>

    <LoadingSpinner v-if="loading" />

    <form @submit.prevent="handleCreateOrder" class="form-container">
      <div class="form-group">
        <label for="customer_name">Nama Pelanggan:</label>
        <input type="text" v-model="order.customer_name" required />
      </div>

      <div class="form-group">
        <label for="order_date">Tanggal Pesanan:</label>
        <input type="date" v-model="order.order_date" required />
      </div>

      <div v-for="(item, index) in order.items" :key="index" class="item-group">
        <div class="form-inline">
          <select v-model="item.product_id" required>
            <option disabled value="">-- Pilih Produk --</option>
            <option
              v-for="product in products"
              :value="product.id"
              :key="product.id"
            >
              {{ product.name }}
            </option>
          </select>

          <input
            type="number"
            v-model="item.quantity"
            min="1"
            placeholder="Jumlah"
            required
          />

          <button @click.prevent="removeItem(index)" class="btn-delete">
            Hapus
          </button>
        </div>
      </div>

      <button @click.prevent="addItem" class="btn-add">+ Tambah Item</button>
      <button type="submit" class="btn-submit">Buat Pesanan</button>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import LoadingSpinner from "../components/LoadingSpinner.vue";
import { useToast } from "vue-toastification";

export default {
  components: { LoadingSpinner },
  computed: {
    ...mapState(["products", "loading"]),
  },
  data() {
    return {
      order: {
        customer_name: "",
        order_date: "",
        items: [
          {
            product_id: null,
            quantity: 1,
          },
        ],
      },
    };
  },
  methods: {
    ...mapActions(["createOrder"]),
    addItem() {
      this.order.items.push({
        product_id: null,
        quantity: 1,
      });
    },
    removeItem(index) {
      this.order.items.splice(index, 1);
    },
    getProductStock(productId) {
      const product = this.products.find((p) => p.id === productId);
      return product ? product.stock : 0;
    },
    async handleCreateOrder() {
      const toast = useToast();

      for (const item of this.order.items) {
        const product = this.products.find((p) => p.id === item.product_id);
        if (!product) {
          toast.error("Produk tidak ditemukan.");
          return;
        }
        if (item.quantity > product.stock) {
          toast.error(
            `Jumlah untuk produk "${product.name}" melebihi stok (${product.stock}).`
          );
          return;
        }
        if (item.quantity <= 0) {
          toast.error(
            `Jumlah untuk produk "${product.name}" harus lebih dari 0.`
          );
          return;
        }
      }

      try {
        await this.createOrder(this.order);
        toast.success("Pesanan berhasil dibuat!");
        this.order = {
          customer_name: "",
          order_date: "",
          items: [{ product_id: null, quantity: 1 }],
        };
      } catch (err) {
        toast.error("Terjadi kesalahan saat membuat pesanan.");
      }
    },
  },
};
</script>

<style scoped>
.order-form {
  max-width: 600px;
  margin: 40px auto;
  padding: 24px;
  background: #393e46;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  color: #eeeeee;
}

.form-title {
  text-align: center;
  margin-bottom: 24px;
  font-size: 24px;
  color: #00adb5;
  font-weight: bold;
}

.form-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-group {
  max-width: 580px;
  width: 100%;
}

.form-group label {
  font-weight: 600;
  margin-bottom: 6px;
  display: block;
  color: #eeeeee;
}

input[type="text"],
input[type="date"],
input[type="number"],
select {
  width: 100%;
  padding: 10px;
  background-color: #222831;
  color: #eeeeee;
  border: 1px solid #00adb5;
  border-radius: 6px;
  font-size: 14px;
}

input::placeholder {
  color: #cccccc;
}

select option {
  background-color: #222831;
  color: #eeeeee;
}

.form-inline {
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 8px;
}

.btn-add {
  background-color: #00adb5;
  color: #eeeeee;
  border: none;
  padding: 10px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  width: 100%;
}

.btn-add:hover {
  background-color: #019aa2;
}

.btn-delete {
  background-color: #eeeeee;
  color: #222831;
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
}

.btn-delete:hover {
  background-color: #dddddd;
}

.btn-submit {
  background-color: #00adb5;
  color: #eeeeee;
  border: none;
  padding: 12px;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  width: 100%;
}

.btn-submit:hover {
  background-color: #019aa2;
}
</style>
