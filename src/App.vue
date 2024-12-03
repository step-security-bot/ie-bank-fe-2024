<template>
  <div id="app">
    <div>
      <b-navbar toggleable="lg" type="dark" variant="info">
        <b-navbar-brand href="#">IE Bank Corp</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item href="accounts">Accounts</b-nav-item>
            <b-nav-item href="transactions">Transactions</b-nav-item>
            <b-nav-item href="users">Users</b-nav-item>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-button href="login">Log In</b-button>

            <b-nav-item-dropdown right>
              <!-- Using 'button-content' slot -->
              <template #button-content>
                <em>User</em>
              </template>
              <b-dropdown-item @click="signOutUser">Sign out user</b-dropdown-item>
              <b-dropdown-item @click="signOutAdmin">Sign out admin</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {

}
</style>
<script>
export default {
  methods: {
    signOutAdmin() {
      this.$cookies.set('admin', 'false')
      location.reload();
    },
    signOutUser(){
      this.$cookies.set('user', '-1')
      location.reload();
    }
  },
created() {
  if (!this.$cookies.get('admin'))
    this.$cookies.set('admin', 'false');
  if (!this.$cookies.get('user'))
    this.$cookies.set('user', '-1');
}
};
</script>