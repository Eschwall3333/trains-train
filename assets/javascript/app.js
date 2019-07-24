//Intialize Firebase
var firebaseConfig = {
    apiKey: "AIzaSyB-fXRnIh0og9CT2gb51RmWi3dQe_b5mXY",
    authDomain: "traintime-51bc6.firebaseapp.com",
    databaseURL: "https://traintime-51bc6.firebaseio.com",
    projectId: "traintime-51bc6",
    storageBucket: "",
    messagingSenderId: "776180493193",
    appId: "1:776180493193:web:7070a932cd93834d"
  };

  firebase.initializeApp(firebaseConfig);
//Create a variable to reference the database
var database = firebase.database();

//Initial Values
var trainId = "";
var place = "";
var startTime = "";
var freq = "";

// Submit Button Click
$("#addtrains").on("click", function(event){
	event.preventDefault(); 
	
	// Code in the logic for storing and retrieving the most recent trains.
	trainId = $("#train-input").val().trim();
	place = $("#place-input").val().trim();
	startTime = $("#firsttrain-input").val().trim();
	freq = $("#freq-input").val().trim();


    
	$("#train-input").val("");
	$("#place-input").val("");
	$("#firsttrain-input").val("");
	$("#freq-input").val("");

	database.ref().push({
		trainId: trainId,
		place: place,
		startTime: startTime,
		freq: freq
	});


});

    database.ref().on("child_added", function(childSnapshot) {
      console.log(childSnapshot.val());

      trainId = childSnapshot.val().trainId;
      place = childSnapshot.val().place
      startTime = childSnapshot.val().startTime;
      freq = childSnapshot.val().freq;

      var firsttimeMoment = moment(startTime, "HH:mm");
      
      var currenttime = moment();

      var minuteArrival = currenttime.diff(firsttimeMoment, 'minutes');
      var minuteLast = minuteArrival % freq;
      var awayTrain = freq - minuteLast;

      var nextArrival = currenttime.add(awayTrain, 'minutes');
      var arrivaltime = nextArrival.format("HH:mm");
     
	$("#AddTrain").append("<tr><td>" + trainId + "</td><td>" + place + "</td><td>" + freq + "</td><td>" + arrivaltime + "</td><td>" + awayTrain + "</td>");

    }, function(errorObject) {
      
    });

