<template>
  <div class="jumbotron vertical-center">
    <div v-if="admin" class="container">
      <div class="row">
        <div class="col-sm-12">
          <h1>Users</h1>
          <hr />
          <br />
          <!-- Allert Message -->
          <b-alert v-if="showMessage" variant="success" show>{{
              message
            }}</b-alert>
          <!-- b-alert v-if="error" variant="danger" show>{{ error }}</b-alert-->

          <button
              type="button"
              class="btn btn-success btn-sm"
              v-b-modal.user-modal
          >
            Create User
          </button>
          <br /><br />
          <table class="table table-hover">
            <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Username</th>
              <th scope="col">Actions</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="user in users" :key="user.id">
              <td>{{user.id}}</td>
              <td>{{ user.username }}</td>
              <td>
                <div class="btn-group" role="group">
                  <button
                      type="button"
                      class="btn btn-info btn-sm"
                      v-b-modal.edit-user-modal
                      @click="editUser(user)"
                  >
                    Edit
                  </button>
                  <button
                      type="button"
                      class="btn btn-danger btn-sm"
                      @click="deleteUser(user)"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
            </tbody>
          </table>
          <footer class="text-center">
            Copyright &copy; All Rights Reserved.
          </footer>
        </div>
      </div>
      <b-modal
          ref="addUserModal"
          id="user-modal"
          title="Create a new user"
          hide-backdrop
          hide-footer
      >
        <b-form @submit="onSubmit" class="w-100">
          <b-form-group
              id="form-name-group"
              label="User Name:"
              label-for="form-name-input"
          >
            <b-form-input
                id="form-name-input"
                type="text"
                v-model="createUserForm.name"
                placeholder="User Name"
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
                v-model="createUserForm.password"
                placeholder="password"
                required
            >
            </b-form-input>
          </b-form-group>

          <b-button type="submit" variant="outline-info">Submit</b-button>
        </b-form>
      </b-modal>
      <!-- End of Modal for Create User-->
      <!-- Start of Modal for Edit User-->
      <b-modal
          ref="editUserModal"
          id="edit-user-modal"
          title="Edit the user"
          hide-backdrop
          hide-footer
      >
        <b-form @submit="onSubmitUpdate" class="w-100">
          <b-form-group
              id="form-edit-name-group"
              label="User Name:"
              label-for="form-edit-name-input"
          >
            <b-form-input
                id="form-edit-name-input"
                type="text"
                v-model="editUserForm.name"
                placeholder="User Name"
                required
            >
            </b-form-input>
          </b-form-group>
          <b-button type="submit" variant="outline-info">Update</b-button>
        </b-form>
      </b-modal>
      <!-- End of Modal for Edit User-->
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "AppUsers",
  data() {
    return {
      users: [],
      createUserForm: {
        name: "",
        password: "",
      },
      editUserForm: {
        id: "",
        name: "",
      },
      showMessage: false,
      message: "",
      admin: false,
    };
  },
  methods: {
    /***************************************************
     * RESTful requests
     ***************************************************/

    //GET function
    RESTgetUsers() {
      const path = `${process.env.VUE_APP_ROOT_URL}/users`;
      axios
          .get(path)
          .then((response) => {
            this.users = response.data.users;
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
            this.RESTgetUsers();
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
            this.RESTgetUsers();
          });
    },

    // Update function
    RESTupdateUser(payload, userId) {
      const path = `${process.env.VUE_APP_ROOT_URL}/users/${userId}`;
      axios
          .put(path, payload)
          .then((response) => {
            this.RESTgetUsers();
            // For message alert
            this.message = "User Updated succesfully!";
            // To actually show the message
            this.showMessage = true;
            // To hide the message after 3 seconds
            setTimeout(() => {
              this.showMessage = false;
            }, 3000);
          })
          .catch((error) => {
            console.error(error);
            this.RESTgetUsers();
          });
    },

    // Delete user
    RESTdeleteUser(userId) {
      const path = `${process.env.VUE_APP_ROOT_URL}/users/${userId}`;
      axios
          .delete(path)
          .then((response) => {
            this.RESTgetUsers();
            // For message alert
            this.message = "User Deleted succesfully!";
            // To actually show the message
            this.showMessage = true;
            // To hide the message after 3 seconds
            setTimeout(() => {
              this.showMessage = false;
            }, 3000);
          })
          .catch((error) => {
            console.error(error);
            this.RESTgetUsers();
          });
    },

    /***************************************************
     * FORM MANAGEMENT
     * *************************************************/

    // Initialize forms empty
    initForm() {
      this.createUserForm.name = "";
      this.createUserForm.password = "";
      this.editUserForm.id = "";
      this.editUserForm.name = "";
    },

    // Handle submit event for create user
    onSubmit(e) {
      e.preventDefault(); //prevent default form submit form the browser
      this.$refs.addUserModal.hide(); //hide the modal when submitted
      const payload = {
        name: this.createUserForm.name,
        password: this.createUserForm.password,
      };
      this.RESTcreateUser(payload);
      this.initForm();
    },

    // Handle submit event for edit user
    onSubmitUpdate(e) {
      e.preventDefault(); //prevent default form submit form the browser
      this.$refs.editUserModal.hide(); //hide the modal when submitted
      const payload = {
        name: this.editUserForm.name,
      };
      this.RESTupdateUser(payload, this.editUserForm.id);
      this.initForm();
    },

    // Handle edit button
    editUser(user) {
      this.editUserForm = user;
    },

    // Handle Delete button
    deleteUser(user) {
      this.RESTdeleteUser(user.id);
    },
  },

  /***************************************************
   * LIFECYClE HOOKS
   ***************************************************/
  created() {
    this.RESTgetUsers();
  },
  mounted() {
    this.admin = this.$cookies.get('admin') === 'true';
  }
};
</script>
