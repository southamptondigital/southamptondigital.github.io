// app js

function guidGenerator() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

var config = {
      apiKey: "AIzaSyDUinSVgzS-Q2YWIV7lvrCEHutxgi7skWc",
      authDomain: "southampton-digital.firebaseapp.com",
      databaseURL: "https://southampton-digital.firebaseio.com",
      storageBucket: "southampton-digital.appspot.com",
      messagingSenderId: "963546359470",
    };
    firebase.initializeApp(config);
    var eventsRef = firebase.database().ref('events')

new Vue({
  el: '#app',

  data: {
    order: 1,
    event: { name: '', description: '', date: '' },
    events: [],
  },

  mounted: function() {


    // this.fetchEvents();
  },

  firebase: {
    events: eventsRef,
  },

  methods: {
    fetchEvents: function() {
      firebase.database().ref('/events/').once('value').then((snapshot) => {
        console.log(snapshot.val());
        this.$set(this, 'events', snapshot.val());
      });
    },

    addEvent: function() {
      console.log(this.event);
      if(this.event.name) {
        console.log(this.event.name);
        var id = guidGenerator();
        firebase.database().ref('/events/' + id).set({
          name: this.event.name,
          description: this.event.description,
          date: this.event.date,
        });
      }
    },
  },
});
