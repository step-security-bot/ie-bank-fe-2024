<template>
  <div class="jumbotron vertical-center">
    <div class="container">
      <div class="row">
        <div class="col-sm-12">
          <h1>Transactions</h1>
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
              v-b-modal.transaction-modal
          >
            Make Transaction
          </button>
          <br /><br />
          <table class="table table-hover">
            <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Sending Account</th>
              <th scope="col">Receiving Account</th>
              <th scope="col">Amount</th>
              <th scope="col">Actions</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="transaction in transactions" :key="transaction.id">
              <td>{{transaction.id}}</td>
              <td>{{ transaction.account_from }}</td>
              <td>{{ transaction.account_to }}</td>
              <td>{{ transaction.amount }}</td>
              <td>
                <div class="btn-group" role="group">
                  <button
                      type="button"
                      class="btn btn-info btn-sm"
                      v-b-modal.edit-transaction-modal
                      @click="editTransaction(transaction)"
                  >
                    Edit
                  </button>
                  <button
                      type="button"
                      class="btn btn-danger btn-sm"
                      @click="deleteTransaction(transaction)"
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
          ref="addTransactionModal"
          id="transaction-modal"
          title="Create a new transaction"
          hide-backdrop
          hide-footer
      >
        <b-form @submit="onSubmit" class="w-100">
          <b-form-group
              id="form-from-group"
              label="Sending Account Number:"
              label-for="form-from-input"
          >
            <b-form-input
                id="form-from-input"
                type="number"
                v-model="createTransactionForm.from"
                placeholder="Account number"
                required
            >
            </b-form-input>
          </b-form-group>
          <b-form-group
              id="form-to-group"
              label="Recipient Account Number:"
              label-for="form-to-input"
          >
            <b-form-input
                id="form-to-input"
                type="number"
                v-model="createTransactionForm.to"
                placeholder="Account number"
                required
            >
            </b-form-input>
          </b-form-group>
          <b-form-group
              id="form-amount-group"
              label="Amount:"
              label-for="form-amount-input"
          >
            <b-form-input
                id="form-amount-input"
                type="number"
                v-model="createTransactionForm.amount"
                placeholder="Amount"
                required
            >
            </b-form-input>
          </b-form-group>

          <b-button type="submit" variant="outline-info">Submit</b-button>
        </b-form>
      </b-modal>
      <!-- End of Modal for Create Transaction-->
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  username: "AppUsers",
  data() {
    return {
      transactions: [],
      createTransactionForm: {
        account: "",
        amount: "",
      },
      showMessage: false,
      message: "",
      showError: false,
      error: "",
      admin: false,
      user: 0,
    };
  },
  methods: {
    /***************************************************
     * RESTful requests
     ***************************************************/

    //GET function
    RESTgetTransactions() {
      if (this.$cookies.get('user') === '-1'){
        this.error = "Please log in and try again.";
        this.showError = true;
      }
      else{
        const path = `${process.env.VUE_APP_ROOT_URL}/transactions/`+ Number(this.$cookies.get('user'));
        axios
            .get(path)
            .then((response) => {
              this.transactions = response.data.transactions;
            })
            .catch((error) => {
              console.error(error);
            });
      }
    },

    // POST function
    RESTcreateTransaction(payload) {
      const path = `${process.env.VUE_APP_ROOT_URL}/transactions`;
      console.log("USER:" + this.$cookies.get('user'));
      axios
          .post(path, payload)
          .then((response) => {
            this.RESTgetTransactions();
            if (response.data.valid){
              this.message = response.data.message;
              this.showMessage = true;
              setTimeout(() => {
                this.showMessage = false;
              }, 3000);
            }
            else{
              this.error = response.data.message;
              this.showError = true;
              setTimeout(() => {
                this.showError = false;
              }, 3000);
            }
          })
          .catch((error) => {
            console.error(error);
            this.RESTgetTransactions();
          });
    },

    // Delete transaction
    RESTdeleteTransaction(transactionId) {
      const path = `${process.env.VUE_APP_ROOT_URL}/transactions/${transactionId}`;
      axios
          .delete(path)
          .then((response) => {
            this.RESTgetTransactions();
            this.message = response.data.message;
            this.showMessage = true;
            setTimeout(() => {
              this.showMessage = false;
            }, 3000);
          })
          .catch((error) => {
            console.error(error);
            this.RESTgetTransactions();
          });
    },

    /***************************************************
     * FORM MANAGEMENT
     * *************************************************/

    // Initialize forms empty
    initForm() {
      this.createTransactionForm.from = "";
      this.createTransactionForm.to = "";
      this.createTransactionForm.amount = "";
    },

    // Handle submit event for create transaction
    onSubmit(e) {
      e.preventDefault(); //prevent default form submit form the browser
      this.$refs.addTransactionModal.hide(); //hide the modal when submitted
      const payload = {
        user_from: this.$cookies.get('user'),
        account_from: this.createTransactionForm.from,
        account_to: this.createTransactionForm.to,
        amount: this.createTransactionForm.amount,
      };
      this.RESTcreateTransaction(payload);
      this.initForm();
    },

    // Handle Delete button
    deleteTransaction(transaction) {
      this.RESTdeleteTransaction(transaction.id);
    },
  },

  /***************************************************
   * LIFECYClE HOOKS
   ***************************************************/
  created() {
    this.RESTgetTransactions();
  },
  mounted() {
    this.admin = this.$cookies.get('admin') === 'true';
  }
};
</script>
