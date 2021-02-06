  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCzBBysdaOeIc4eqt87nL1_biLCTXSl-xE",
    authDomain: "medcareahealthproject.firebaseapp.com",
    projectId: "medcareahealthproject",
    storageBucket: "medcareahealthproject.appspot.com",
    messagingSenderId: "308472038667",
    appId: "1:308472038667:web:2a8b5456c3ac7937054e0e"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  //make auth and firestore references
  const auth = firebase.auth();
  const database = firebase.firestore();


  /*SIGN UP AREA*/
  const signup = document.querySelector(".Signbtn");
  const username = document.querySelector(".signusername");
  const pnum = document.querySelector(".signphone");
  const email = document.querySelector(".signemail");
  const password = document.querySelector(".signpassword");
  
  signup.addEventListener('click', (e) => {
    const promise = auth.createUserWithEmailAndPassword(email.value, password.value);
    promise.catch(e => alert(e.message));

    alert("You're Signed up!");
    
    email.value = "";
    password.value = "";
  });


  /**LOG IN AREA */
  const signin = document.querySelector(".logbtn");
  
  const requestform = document.querySelector(".patientsform");
  const loginform = document.querySelector(".login");

  signin.addEventListener('click', (e) => {
    e.preventDefault();
    const promise = auth.signInWithEmailAndPassword(email.value, password.value);
    promise.catch(e => alert(e.message));
    
    if(email.value == "" || password.value == ""){
      alert("fillout the form");
      requestform.style.display = "none";
    }
    else if(auth.signInWithEmailAndPassword(email.value, password.value) === auth.createUserWithEmailAndPassword(email.value, password.value)){
      requestform.style.display = "block";
      loginform.style.display = "none";
    }
    else{
      requestform.style.display = "none";
    }

    lemail.value = "";
    lpassword.value = "";
  });


  //GOOGLE SIGN IN
  const whensignedin = document.getElementById("whensignedin"); /**log out link */

  const signingoogle = document.querySelector('.LogGoogle');
  const signoutgoogle = document.querySelector('.signoutbtn');

  //LOGIN TO GOOGLE
  const provider = new firebase.auth.GoogleAuthProvider();

  signingoogle.onclick = () => auth.signInWithPopup(provider);
  signoutgoogle.onclick = () => auth.signOut();
  const loginm = document.querySelector("#starthide");/*START BUTTON TO BE HIDE*/

  //STREAM CHANGES IN MY USER
  auth.onAuthStateChanged(user => {
    if(user){
      //signed in
      requestform.style.display = "block";
      whensignedin.hidden = false;
      loginform.style.display = "none";
      loginm.style.display = "none";
  
    }else{
      //signed out
      whensignedin.hidden = true;
      loginm.style.display = "block";
    }
  });


  /**CONTACTS DATABASE WHERE THE PATIENTS EMAIL WILL BE SEND TO THE MEDCARE
   * EMAIL ADDRESS AND SAVED IN FIREBASE REALTIME DATABASE FOR BACKUP*/
  let contacts = firebase.database().ref("WeCare"); /*FIRESTORE DB*/

  //listen to the submit

  let sendMessage = document.querySelector(".patientContacts");
  sendMessage.addEventListener('submit', submitMessage);

  function submitMessage(e){
    e.preventDefault();

    //get values of the form
    let contactName = document.querySelector(".contactName").value; 
    let contactEmail = document.querySelector(".contactEmail").value; 
    let contactMessage = document.querySelector(".contactMessage").value; 
    console.log(contactName, contactEmail, contactMessage);

    sendMessageToEmail(contactName, contactEmail, contactMessage);

    document.querySelector(".patientContacts").reset();

    saveMessageToDb(contactName, contactEmail, contactMessage);
  }

  //SAVE PATIENTS DATA TO DB
  function saveMessageToDb(contactName, contactEmail, contactMessage){
    let newContacts = contacts.push();

    newContacts.set({
      PatientName: contactName,
      PatientEmail: contactEmail,
      PatientMessage: contactMessage,
    })
  }

  function sendMessageToEmail(contactName, contactEmail, contactMessage){
      Email.send({
        Host : "smtp.gmail.com",
        Username : "abordajechristeljoy@gmail.com",
        Password : "ttmobdgahlzzemzh",
        To : 'abordajechristeljoy@gmail.com',
        From : `${contactEmail}`,
        Subject : "A patient sends you a message!",
        Body : `Patients' Name: ${contactName} <br/> Patients' Email Address: ${contactEmail} <br/> Patients' Message: ${contactMessage}`,
    }).then(
      message => alert("Message sent! Wait within 12hours and we will contact you. Thank you")
    );
  }


   //REQUEST form send to medcre email using realtime database
   let requests = firebase.database().ref("request");

   let submitreq = document.querySelector(".request");
   submitreq.addEventListener('submit', patientRequest);

   function patientRequest(e){
     e.preventDefault();

     let patient = document.querySelector(".pname").value;
     let birthday = document.querySelector(".bday").value;
     let civilStatus = document.querySelector(".status").value;
     let address = document.querySelector(".address").value;
     let emailadd = document.querySelector(".email").value;

     console.log(patient, birthday, civilStatus, address, emailadd);

     sendRequestToEmail(patient, birthday, civilStatus, address, emailadd);

     saveRequestToDatabase(patient, birthday, civilStatus, address, emailadd);

     document.querySelector(".request").reset();
   }

   //save req to db
   function saveRequestToDatabase(patient, birthday, civilStatus, address, emailadd){
     let newrequest = requests.push();

     newrequest.set({
        patientname: patient,
        birthday: birthday,
        status: civilStatus,
        addresss: address,
        email: emailadd,
     })
   }

   function sendRequestToEmail(patient, birthday, civilStatus, address, emailadd){
    Email.send({
      Host : "smtp.gmail.com",
      Username : "abordajechristeljoy@gmail.com",
      Password : "ttmobdgahlzzemzh",
      To : 'abordajechristeljoy@gmail.com',
      From : `${emailadd}`,
      Subject : "A patient sends a request for appointment!",
      Body : `Patients' Name: ${patient} <br/> Patients' Email Address: ${emailadd} <br/> Patients' birthday: ${birthday}, <br/> Patients' Status: ${civilStatus}`,
  }).then(
    message => alert("Message sent! Wait within 12hours and we will contact you. Thank you")
  );
}
