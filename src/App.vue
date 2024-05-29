<template>
  <div id="app">
    <nav>
      <div class="navbar">
        <span class="stylized-text" @click="console.log(store.userID)">FinManager</span>
        <div>
          <button class="filled-button-green">
            <router-link class="button-text" to="/portfolio">Wallet</router-link>
          </button>
        </div>
        <div>
          <button class="filled-button-green">
            <router-link class="button-text" to="/stock">Trading</router-link>
          </button>
        </div>
        <div>
          <button class="filled-button-green">
            <router-link class="button-text" to="/profile">Profile</router-link>
          </button>
        </div>
        <div v-if="store.userID == null">
          <button class="filled-button-green">
            <router-link class="button-text" to="/login">Login</router-link>
          </button>
        </div>
        <div v-if="store.userID == null">
          <button class="filled-button-green">
            <router-link class="button-text" to="/register">Register</router-link>
          </button>
        </div>
        <div v-if="store.userID !== null">
          <button class="filled-button-green" @click="store.signUserOut()">
            <router-link class="button-text" to="/">Log out</router-link>
          </button>
        </div>
    </div>
    </nav>
    <router-view/>
  </div>
</template>

<script setup>
import useStore from './store';
const store = useStore();
</script>

<style>
@import './assets/base.css';

.navbar {
  background-color: #90C38F;
  padding-top: 10px;
  padding-bottom: 10px;
  display: flex;
  justify-content: right;
}

span.stylized-text {
  font-family: 'Newsreader';
  color: black;
  font-size: 2em;
  position: absolute;
  left: 10px;
  top: 0;
  overflow: hidden;
}
</style>