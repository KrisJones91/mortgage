<template>
  <nav class="navbar navbar-expand-lg ">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="d-flex flex-column align-items-center">
        <img
          alt="logo"
          src="../assets/img/MB.png"
          height="45"
        />
      </div>
    </router-link>
    <button
      class="navbar-toggler bg-box"
      type="button"
      data-toggle="collapse"
      data-target="#navbarText"
      aria-controls="navbarText"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <p class=" mb-0 pb-0">
        <i class="sym far fa-caret-square-down fa-2x"></i>
      </p>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link :to="{ name: 'Home' }" class="nav-link">
            Home
          </router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{ name: 'Goals' }" class="nav-link">
            Goals
          </router-link>
        </li>
      </ul>
      <span class="navbar-text">
        <button
          class="btn btn-outline-dark text-uppercase"
          @click="login"
          v-if="!user.isAuthenticated"
        >
          Login
        </button>

        <div class="dropdown" v-else>
          <div
            class="dropdown-toggle"
            @click="state.dropOpen = !state.dropOpen"
          >
            <img
              :src="user.picture"
              alt="user photo"
              height="40"
              class="rounded"
            />
            <span class="mx-3">{{ user.name }}</span>
          </div>
          <div
            class="dropdown-menu p-0 list-group w-100"
            :class="{ show: state.dropOpen }"
            @click="state.dropOpen = false"
          >
            <router-link :to="{ name: 'Account' }">
              <div class="list-group-item list-group-item-action hoverable">
                Account
              </div>
            </router-link>
            <div
              class="list-group-item list-group-item-action hoverable"
              @click="logout"
            >
              logout
            </div>
          </div>
        </div>
      </span>
    </div>
  </nav>
</template>

<script>
import { AuthService } from '../services/AuthService'
import { AppState } from '../AppState'
import { computed, reactive } from 'vue'
export default {
  name: 'Navbar',
  setup() {
    const state = reactive({
      dropOpen: false
    })
    return {
      state,
      user: computed(() => AppState.user),
      async login() {
        AuthService.loginWithPopup()
      },
      async logout() {
        AuthService.logout({ returnTo: window.location.origin })
      }
    }
  }
}
</script>

<style scoped>
.dropdown-menu {
  user-select: none;
  display: block;
  transform: scale(0);
  transition: all 0.15s linear;
}
.dropdown-menu.show {
  transform: scale(1);
}
.hoverable {
  cursor: pointer;
}
a:hover {
  text-decoration: none;
}
.nav-link{
  text-transform: uppercase;
  color: purple;
}
.nav-item .nav-link.router-link-exact-active{
  color: rgb(255, 255, 255);
  transform: scale(1.11);
  padding-left: 5%;
}
.navbar{
  background-color: rgba(76, 76, 76, 0.341);
  color: black;
}
.far{
  animation: pulse 4s infinite;
}
  @keyframes pulse {
    0% { color: rgb(212, 183, 255); }
    50% { color: rgb(142, 66, 255); }
    100% { color: rgb(212, 183, 255); }
  }
  .bg-box{
    background-image: linear-gradient(310deg, rgb(255, 255, 255), rgb(197, 197, 197));
    box-shadow: 1px 3px 8px gray;
    transition: .5s;
  }
  .bg-box:hover{
    transform: scale(1.1);
  }
</style>
