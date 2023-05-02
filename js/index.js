
const firebaseConfig = {
    apiKey: "AIzaSyCplUOR6881EEeII9GUnFOz-DzFkhFvCbQ",
    authDomain: "puzzle-application-62e4d.firebaseapp.com",
    databaseURL: "https://puzzle-application-62e4d-default-rtdb.firebaseio.com",
    projectId: "puzzle-application-62e4d",
    storageBucket: "puzzle-application-62e4d.appspot.com",
    messagingSenderId: "867529672472",
    appId: "1:867529672472:web:aa4a7272b97b27c0af806d",
    measurementId: "G-H7MQ54LLTS"
  };
  firebase.initializeApp(firebaseConfig);
  
  const auth = firebase.auth()
  const database = firebase.database()
  
  
  function register() {
      // Get all our input fields
      email = document.getElementById('email').value
      password = document.getElementById('password').value
      full_name = document.getElementById('full_name').value
      console.log(email);
      console.log(password);
      // favourite_song = document.getElementById('favourite_song').value
      // milk_before_cereal = document.getElementById('milk_before_cereal').value
  
      // Validate input fields
      if (validate_email(email) == false || validate_password(password) == false) {
          alert('Email or Password is Outta Line!!')
          return
          // Don't continue running the code
      }
      if (validate_field(full_name) == false ) {
          alert('One or More Extra Fields is Outta Line!!')
          return
      }
  
      // Move on with Auth
      auth.createUserWithEmailAndPassword(email, password)
          .then(function () {
              // Declare user variable
              var user = auth.currentUser
  
              // Add this user to Firebase Database
              var database_ref = database.ref()
  
              // Create User data
              var user_data = {
                  email: email,
                  full_name: full_name,
                  last_login: Date.now()
              }
  
              // Push to Firebase Database
              database_ref.child('users/' + user.uid).set(user_data)
  
              // DOne
              alert('User Created!!')
              window.location.hash = "#login";
          })
          .catch(function (error) {
              // Firebase will use this to alert of its errors
              var error_code = error.code
              var error_message = error.message
  
              alert(error_message)
          })
  }
  // Set up our login function
  function login() {
      // Get all our input fields
      email = document.getElementById('loginemail').value
      password = document.getElementById('loginpassword').value
  
      // Validate input fields
      if (validate_email(email) == false || validate_password(password) == false) {
          alert('Email or Password is Outta Line!!')
          return
          // Don't continue running the code
      }
  
      auth.signInWithEmailAndPassword(email, password)
          .then(function () {
              // Declare user variable
              var user = auth.currentUser
              var uid = user.uid;
  
              // Add this user to Firebase Database
              var database_ref = database.ref()
  
              // Create User data
              var user_data = {
                  last_login: Date.now()
              }
  
              // Push to Firebase Database
              database_ref.child('users/' + user.uid).update(user_data)
  
              // DOne
              // alert('User Logged In!!')
  
              // logic.nextButton.addEventListener("click", onNextButtonClick);
              // logic.showChallenge();
              console.log("done");
              window.location.href="logic.html";
              
  
          })
          .catch(function (error) {
              // Firebase will use this to alert of its errors
              var error_code = error.code
              var error_message = error.message
  
              alert(error_message)
          })
  }
  
  
  
  
  // Validate Functions
  function validate_email(email) {
      expression = /^[^@]+@\w+(\.\w+)+\w$/
      if (expression.test(email) == true) {
          // Email is good
          return true
      } else {
          // Email is not good
          return false
      }
  }
  
  function validate_password(password) {
      // Firebase only accepts lengths greater than 6
      if (password < 6) {
          return false
      } else {
          return true
      }
  }
  
  function validate_field(field) {
      if (field == null) {
          return false
      }
  
      if (field.length <= 0) {
          return false
      } else {
          return true
      }
  }
  