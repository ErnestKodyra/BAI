<template>
  <div id="app">
    <nav v-if="store.user !== null">
      <div class="navbar">
        <router-link to="/home">
        <span class="stylized-text" @click="console.log(store.user.uid)">FinManager
        <img src="./assets/money.png" class="money-logo"> </span>
        </router-link>
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
        <div>
          <button class="filled-button-green" @click="store.logoutUser()">
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
  display: flex;
  align-items: center;
}
.money-logo {
  margin-left: 5px;
  margin-right: 5px;
  margin-bottom: 10px;
  height: 40px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
</style>