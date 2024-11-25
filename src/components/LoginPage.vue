<template>
  <div class="jumbotron vertical-center">
    <div class="container">
      <div class="row">
        <div class="col-sm-12">
          <h1>Login</h1>
          <hr />
          <br />
          <!-- Allert Message -->
          <b-alert v-if="showMessage" variant="success" show>{{
              message
            }}</b-alert>
          <b-alert v-if="showError" variant="danger" show>{{ error }}</b-alert>

          <button
              type="button"
              class="btn btn-success btn-sm"
              v-b-modal.signin-modal
              @click="setMode('login-admin')"
          >
            Admin Login
          </button>
          <button
              type="button"
              class="btn btn-success btn-sm"
              v-b-modal.signin-modal
              style="margin: 0 20px;"
              @click="setMode('login-user')"
          >
            User Login
          </button>
          <button
              type="button"
              class="btn btn-success btn-sm"
              v-b-modal.signin-modal
              @click="setMode('create-user')"
          >
            Create User Account
          </button>
          <br /><br />
          <footer class="text-center">
            Copyright &copy; All Rights Reserved.
          </footer>
        </div>
      </div>
      <b-modal
          ref="signInModal"
          id="signin-modal"
          :title="this.mode"
          hide-backdrop
          hide-footer
      >
        <b-form @submit="onSubmit" class="w-100">
          <b-form-group
              id="form-username-group"
              label="Username:"
              label-for="form-username-input"
          >
            <b-form-input
                id="form-username-input"
                type="text"
                v-model="signInForm.username"
                placeholder="Enter your username"
                required
            >
            </b-form-input>
          </b-form-group>
          <b-form-group
              id="form-password-group"
              label="Password:"
              label-for="form-password-input"
          >
            <b-form-input
                id="form-password-input"
                type="text"
                v-model="signInForm.password"
                placeholder="Type your password here"
                required
            >
            </b-form-input>
          </b-form-group>

          <b-button type="submit" variant="outline-info">Submit</b-button>
        </b-form>
      </b-modal>
      <!-- End of Modal for Create Account-->
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  username: "AppAccounts",
  data() {
    return {
      accounts: [],
      signInForm: {
        username: "",
        password: "",
      },
      showMessage: false,
      message: "",
      showError: false,
      error: "",
      mode: "",
    };
  },
  methods: {
    /***************************************************
     * RESTful requests
     ***************************************************/

    // POST function
    RESTsignIn(payload) {
      const path = `${process.env.VUE_APP_ROOT_URL}/admin`;
      axios
          .post(path, payload)
          .then((response) => {
            if(response.data.result){
              this.message = "Login successful!";
              this.showMessage = true;
              setTimeout(() => {
                this.showMessage = false;
              }, 3000);
            }
            else{
              this.error = "Login failed. Please check your credentials and try again.";
              this.showError = true;
              setTimeout(() => {
                this.showError = false;
              }, 3000);
            }

            this.$cookies.set("admin", response.data.result, "3h");
          })
          .catch((error) => {
            console.error(error);
          });
    },
    // POST function
    RESTcreateUser(payload) {
      const path = `${process.env.VUE_APP_ROOT_URL}/users`;
      axios
          .post(path, payload)
          .then((response) => {
            // For message alert
            this.message = "User Created succesfully!";
            // To actually show the message
            this.showMessage = true;
            // To hide the message after 3 seconds
            setTimeout(() => {
              this.showMessage = false;
            }, 3000);
          })
          .catch((error) => {
            console.error(error);
          });
    },

    /***************************************************
     * FORM MANAGEMENT
     * *************************************************/

    // Initialize forms empty
    initForm() {
      this.signInForm.username = "";
      this.signInForm.password = "";
    },

    setMode(mode){
      this.mode = mode;
    },

    // Handle submit event for create account
    onSubmit(e) {
      e.preventDefault(); //prevent default form submit form the browser
      this.$refs.signInModal.hide(); //hide the modal when submitted
      const payload = {
        username: this.signInForm.username,
        password: this.signInForm.password,
      };
      switch(this.mode){
        case 'login-admin':
          this.RESTsignIn(payload);
          break;
        case 'create-user':
          this.RESTcreateUser(payload);
          break;
        case 'login-user':
          // TODO: user login
          break;
      }
      this.initForm();
    },
  },
};
</script>
