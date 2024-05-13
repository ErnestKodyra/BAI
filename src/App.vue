<template>
  <div id="app">
    <nav>
      <div class="navbar">
        <span class="stylized-text">FinManager</span>
        <button class="filled-button-green">
        <router-link class="button-text" to="/portfolio">Testing space</router-link>
        </button>
        <button class="filled-button-green">
        <router-link class="button-text" to="/profile">Profile</router-link>
        </button>
        <button class="filled-button-green">
        <router-link class="button-text" to="/register">Register</router-link>
        </button>
    </div>
    </nav>
    <router-view/>
  </div>
</template>

<script setup>

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