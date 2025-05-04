import { createStore } from "vuex";
import api from "../services/api";

export default createStore({
  state: {
    products: [],
    loading: false,
  },
  mutations: {
    setProducts(state, products) {
      state.products = products;
    },
    setLoading(state, loading) {
      state.loading = loading;
    },
  },
  actions: {
    async fetchProducts({ commit }) {
      commit("setLoading", true);
      try {
        const response = await api.get("/products");
        commit("setProducts", response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        commit("setLoading", false);
      }
    },
    async createProduct({ commit, dispatch }, product) {
      try {
        const response = await api.post("/products", product);
        await dispatch("fetchProducts");
        return response;
      } catch (error) {
        throw error;
      }
    },
    async updateProduct({ commit, dispatch }, product) {
      try {
        const response = await api.put(`/products/${product.id}`, product);
        await dispatch("fetchProducts");
        return response;
      } catch (error) {
        throw error;
      }
    },
    async deleteProduct({ commit, dispatch }, productId) {
      try {
        const response = await api.delete(`/products/${productId}`);
        await dispatch("fetchProducts");
        return response;
      } catch (error) {
        throw error;
      }
    },
  },
  getters: {
    products: (state) => state.products,
    loading: (state) => state.loading,
  },
});
