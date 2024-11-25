<template>
  <div class="jumbotron vertical-center">
    <div class="container">
      <div class="row">
        <div class="col-sm-12">
          <h1>Admin Login</h1>
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
          >
            Sign In
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
          title="Sign In"
          hide-backdrop
          hide-footer
      >
        <b-form @submit="onSubmit" class="w-100">
          <b-form-group
              id="form-name-group"
              label="Username:"
              label-for="form-username-input"
          >
            <b-form-input
                id="form-name-input"
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
  name: "AppAccounts",
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
      error: ""
    };
  },
  methods: {
    /***************************************************
     * RESTful requests
     ***************************************************/

    // POST function
    RESTsignIn(payload) {
      const path = `${process.env.VUE_APP_ROOT_URL}/sign-in`;
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
          })
          .catch((error) => {
            console.error(error);
            this.RESTgetAccounts();
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

    // Handle submit event for create account
    onSubmit(e) {
      e.preventDefault(); //prevent default form submit form the browser
      this.$refs.signInModal.hide(); //hide the modal when submitted
      const payload = {
        username: this.signInForm.username,
        password: this.signInForm.password,
      };
      this.RESTsignIn(payload);
      this.initForm();
    },
  },
};
</script>
