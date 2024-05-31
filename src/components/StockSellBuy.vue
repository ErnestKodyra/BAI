<template>
  <div class="container-gridflex">
    <button @click="decrementQuantity" class="small-button">
      -
    </button>
    <input v-model.number="quantity" type="number" min="1" class="input-text" />
    <button @click="incrementQuantity" class="small-button">
      +
    </button>
    <button @click="sellStock" class="filled-button-red">
      SELL
    </button>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useStore } from '@/store';
import { updateStockHoldings } from '@/firestore';
import Swal from 'sweetalert2';

export default {
  props: {
    symbol: String,
    latestPrice: Number
  },
  setup(props) {
    const store = useStore();
    const quantity = ref(1);

    const stock = computed(() => {
      return store.userProfile.stocks.find(s => s.symbol === props.symbol);
    });

    onMounted(() => {
      if (stock.value) {
        quantity.value = stock.value.quantity;
      }
    });

    const sellStock = async () => {
      if (stock.value && stock.value.quantity >= quantity.value) {
        const totalValue = quantity.value * props.latestPrice;
        await updateStockHoldings(
          store.user.uid,
          props.symbol,
          quantity.value,
          store.userProfile.wallet + totalValue,
          'sell',
          props.latestPrice,
          new Date()
        );
        await store.fetchUserProfile();
        Swal.fire('Success!', `Transaction of selling ${props.symbol} shares has been successfully executed!`, 'success');
      } else {
        Swal.fire('Error!', 'Insufficient quantity of shares', 'error');
      }
    };

    const incrementQuantity = () => {
      quantity.value++;
    };

    const decrementQuantity = () => {
      if (quantity.value > 1) quantity.value--;
    };

    return {
      quantity,
      sellStock,
      incrementQuantity,
      decrementQuantity,
      stock
    };
  }
};
</script>

<style scoped>
.container-gridflex {
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}

.small-button {
  width: 25px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
}

.input-text {
  width: 40px;
  padding: 5px;
  text-align: center;
  font-size: 14px;
  line-height: 1.5;
}

.filled-button-red, .filled-button-green {
  background-color: var(--btn-bg-color);
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 14px;
  border-radius: 4px;
}

.filled-button-red {
  --btn-bg-color: red;
}

.filled-button-green {
  --btn-bg-color: green;
}

@media (max-width: 600px) {
  .container-gridflex {
    flex-direction: column;
  }

  .small-button, .filled-button-red, .filled-button-green, .disabled-button {
    width: 100%;
    margin-bottom: 5px;
  }

  .input-text {
    width: 100%;
  }
}
</style>
