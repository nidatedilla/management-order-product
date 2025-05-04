<template>
  <div class="product-page">
    <h2 class="title">Daftar Produk</h2>
    <LoadingSpinner v-if="loading" />

    <table v-else class="product-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nama</th>
          <th>Harga</th>
          <th>Stok</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.id }}</td>
          <td>{{ product.name }}</td>
          <td>Rp{{ Number(product.price).toLocaleString("id-ID") }}</td>
          <td>{{ product.stock }}</td>
          <td>
            <button @click="openEditModal(product)" class="btn-icon edit-icon">
              <EditIcon />
            </button>
            <button
              @click="confirmDelete(product.id)"
              class="btn-icon delete-icon"
            >
              <Trash2Icon />
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <button @click="showAddModal = true" class="btn-add">
      <PlusCircleIcon /> Tambah Produk
    </button>

    <div v-if="showAddModal" class="modal-overlay">
      <div class="modal-content">
        <h3>Tambah Produk</h3>
        <form @submit.prevent="addProduct">
          <label>Nama Produk:</label>
          <input type="text" v-model="newProduct.name" required />
          <label>Harga:</label>
          <input type="number" v-model.number="newProduct.price" required />
          <label>Stok:</label>
          <input type="number" v-model.number="newProduct.stock" required />
          <div class="modal-footer">
            <button type="submit" class="btn-submit">Tambah Produk</button>
            <button
              type="button"
              @click="showAddModal = false"
              class="btn-cancel"
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>

    <div v-if="showEditModal" class="modal-overlay">
      <div class="modal-content">
        <h3>Edit Produk</h3>
        <label>Nama:</label>
        <input v-model="editingProduct.name" type="text" />
        <label>Harga:</label>
        <input v-model.number="editingProduct.price" type="number" />
        <label>Stok:</label>
        <input v-model.number="editingProduct.stock" type="number" />
        <div class="modal-footer">
          <button @click="saveEditedProduct" class="btn-submit">Simpan</button>
          <button @click="showEditModal = false" class="btn-cancel">
            Batal
          </button>
        </div>
      </div>
    </div>

    <div v-if="showDeleteModal" class="modal-overlay">
      <div class="modal-content">
        <h3>Konfirmasi Penghapusan</h3>
        <p>Apakah Anda yakin ingin menghapus produk ini?</p>
        <div class="modal-footer">
          <button
            @click="deleteProductHandler(deleteProductId)"
            class="btn-delete"
          >
            Ya, Hapus
          </button>
          <button @click="showDeleteModal = false" class="btn-cancel">
            Batal
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import LoadingSpinner from "../components/LoadingSpinner.vue";
import { useToast } from "vue-toastification";
import { EditIcon, Trash2Icon, PlusCircleIcon } from "lucide-vue-next";

export default {
  components: { LoadingSpinner, EditIcon, Trash2Icon, PlusCircleIcon },
  computed: {
    ...mapState(["products", "loading"]),
  },
  data() {
    return {
      newProduct: {
        name: "",
        price: 0,
        stock: 0,
      },
      showAddModal: false,
      showEditModal: false,
      editingProduct: {
        id: null,
        name: "",
        price: 0,
        stock: 0,
      },
      showDeleteModal: false,
      deleteProductId: null,
    };
  },
  created() {
    this.fetchProducts();
  },
  methods: {
    ...mapActions([
      "fetchProducts",
      "createProduct",
      "deleteProduct",
      "updateProduct",
    ]),
    addProduct() {
      const toast = useToast();

      if (this.newProduct.name.length < 3) {
        toast.error("Nama produk minimal 3 karakter.");
        return;
      }
      if (this.newProduct.price <= 0) {
        toast.error("Harga harus lebih dari 0.");
        return;
      }
      if (this.newProduct.stock < 0) {
        toast.error("Stok tidak boleh negatif.");
        return;
      }

      this.createProduct(this.newProduct)
        .then(() => {
          toast.success("Produk berhasil ditambahkan!");
          this.newProduct = { name: "", price: 0, stock: 0 };
          this.showAddModal = false;
        })
        .catch(() => {
          toast.error("Gagal menambahkan produk.");
        });
    },
    confirmDelete(productId) {
      this.deleteProductId = productId;
      this.showDeleteModal = true;
    },
    deleteProductHandler(id) {
      const toast = useToast();
      this.deleteProduct(id)
        .then(() => {
          toast.success("Produk berhasil dihapus!");
          this.showDeleteModal = false;
        })
        .catch(() => {
          toast.error("Gagal menghapus produk.");
        });
    },
    openEditModal(product) {
      this.editingProduct = { ...product };
      this.showEditModal = true;
    },
    saveEditedProduct() {
      const toast = useToast();

      if (this.editingProduct.name.length < 3) {
        toast.error("Nama produk minimal 3 karakter.");
        return;
      }
      if (this.editingProduct.price <= 0) {
        toast.error("Harga harus lebih dari 0.");
        return;
      }
      if (this.editingProduct.stock < 0) {
        toast.error("Stok tidak boleh negatif.");
        return;
      }

      this.updateProduct(this.editingProduct)
        .then(() => {
          toast.success("Produk berhasil diperbarui!");
          this.showEditModal = false;
        })
        .catch(() => {
          toast.error("Gagal memperbarui produk.");
        });
    },
  },
};
</script>

<style scoped>
.product-page {
  background-color: #222831;
  color: #eeeeee;
  padding: 2rem;
  font-family: "Segoe UI", sans-serif;
  overflow-x: auto;
}

.title {
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: #00adb5;
}

.product-table {
  width: 100%;
  border-collapse: collapse;
  background-color: #393e46;
  border-radius: 8px;
  overflow: hidden;
}

.product-table th,
.product-table td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #444;
}

.product-table th {
  background-color: #00adb5;
  color: #eeeeee;
  font-weight: bold;
}

.product-row:hover {
  background-color: #2c323a;
}

.product-name {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.actions {
  display: none;
  gap: 8px;
}

.product-row:hover .actions {
  display: flex;
}

.btn-icon {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
}

.btn-icon.edit-icon svg {
  color: #17a2b8;
}

.btn-icon.delete-icon svg {
  color: #dc3545;
}

.btn-icon svg {
  width: 20px;
  height: 20px;
}

td button.btn-icon {
  margin-left: 8px;
  vertical-align: middle;
}

.table-actions {
  text-align: right;
  white-space: nowrap;
}

.table-actions .btn-icon {
  margin-left: 8px;
}

.btn-add {
  margin-top: 20px;
  background-color: #00adb5;
  color: #eeeeee;
  border: none;
  padding: 10px 20px;
  font-size: 1rem;
  border-radius: 8px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.btn-submit {
  background-color: #00adb5;
  color: #eeeeee;
  padding: 10px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.btn-cancel,
.btn-delete {
  background-color: #dc3545;
  color: #eeeeee;
  padding: 10px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.6);
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background-color: #393e46;
  padding: 2rem;
  border-radius: 10px;
  width: 400px;
  color: #eeeeee;
}

.modal-content input {
  width: 100%;
  padding: 8px;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #555;
  border-radius: 6px;
  background-color: #222831;
  color: #eeeeee;
}

.modal-content h3 {
  margin-bottom: 1rem;
}

.modal-footer {
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

@media (max-width: 768px) {
  .product-table {
    min-width: 0;
  }
  .product-page {
    padding: 0;
    overflow-x: auto;
  }
  .product-table th,
  .product-table td {
    padding: 10px 10px;
    font-size: small;
  }
  .modal-content {
    margin: 20px;
  }
}
</style>
