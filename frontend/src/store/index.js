import { createStore } from "vuex";
import api from "../services/api";

export default createStore({
  state: {
    products: [],
    orders: [],
    orderDetails: null,
    loading: false,
  },
  mutations: {
    setProducts(state, products) {
      state.products = products;
    },
    setOrders(state, orders) {
      state.orders = orders;
    },
    setOrderDetails(state, orderDetails) {
      state.orderDetails = orderDetails;
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

    async fetchOrders({ commit }) {
      commit("setLoading", true);
      try {
        const response = await api.get("/orders");
        console.log("Orders:", response.data);

        const orders = response.data.data.map((order) => {
          const totalItems =
            order.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;
          const totalPrice =
            order.items?.reduce(
              (sum, item) => sum + item.quantity * item.price,
              0
            ) || 0;

          return {
            ...order,
            total_items: totalItems,
            total_price: totalPrice,
          };
        });

        commit("setOrders", orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        commit("setLoading", false);
      }
    },

    async fetchOrderDetails({ commit }, orderId) {
      commit("setLoading", true);
      try {
        const orderResponse = await api.get(`/orders/${orderId}`);
        const orderData = orderResponse.data.data;
        const orderItems = orderData.items;

        const orderDetails = {
          ...orderData,
          items: orderItems,
        };

        commit("setOrderDetails", orderDetails);
      } catch (error) {
        console.error("Error fetching order details:", error);
      } finally {
        commit("setLoading", false);
      }
    },

    async createOrder({ commit, dispatch }, order) {
      try {
        const response = await api.post("/orders", order);
        dispatch("fetchOrders");
        return response;
      } catch (error) {
        console.error("Error creating order:", error);
        throw error;
      }
    },
  },
  getters: {
    products: (state) => state.products,
    orders: (state) => state.orders,
    loading: (state) => state.loading,
  },
});
