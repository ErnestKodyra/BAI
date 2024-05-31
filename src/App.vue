<template>
  <div id="app">
    <nav v-if="store.user !== null">
      <div class="navbar">
        <router-link to="/portfolio" class="logo-link">
          <span class="stylized-text" @click="console.log(store.user.uid)">FinManager
            <img src="./assets/money.png" class="money-logo">
          </span>
        </router-link>
        <div :class="['nav-links', { open: menuOpen }]">
          <button class="filled-button-green">
            <router-link class="button-text" to="/portfolio">Wallet</router-link>
          </button>
          <button class="filled-button-green">
            <router-link class="button-text" to="/stock">Trading</router-link>
          </button>
          <button class="filled-button-green">
            <router-link class="button-text" to="/profile">Profile</router-link>
          </button>
          <button class="filled-button-green" @click="store.logoutUser()">
            <router-link class="button-text" to="/">Log out</router-link>
          </button>
        </div>
        <button class="menu-toggle" @click="toggleMenu">☰</button>
      </div>
    </nav>
    <router-view/>
  </div>
</template>

<script setup>
import useStore from './store';
import { ref } from 'vue';

const store = useStore();
const menuOpen = ref(false);

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};
</script>

<style>
@import './assets/base.css';

#app {
  display: flex;
  flex-direction: column;
}

.navbar {
  background-color: #90C38F;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  position: relative;
}

.logo-link {
  display: flex;
  align-items: center;
  text-decoration: none;
}

span.stylized-text {
  font-family: 'Newsreader';
  color: black;
  font-size: 2em;
  display: flex;
  align-items: center;
}

.money-logo {
  margin-left: 5px;
  height: 40px;
}

.nav-links {
  display: flex;
  gap: 10px;
}

.filled-button-green {
  background-color: green;
  border: none;
  color: white;
  padding: 10px;
  cursor: pointer;
  font-size: 14px;
  border-radius: 4px;
}

.button-text {
  text-decoration: none;
  color: white;
}

.menu-toggle {
  display: none;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: black;
}

@media (max-width: 600px) {
  .navbar {
    flex-direction: column;
    align-items: flex-start;
  }

  .nav-links {
    flex-direction: column;
    width: 100%;
    display: none;
  }

  .nav-links.open {
    display: flex;
  }

  .menu-toggle {
    display: block;
  }

  .filled-button-green {
    width: 100%;
    text-align: left;
  }
}
</style>
