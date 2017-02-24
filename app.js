// app js
//

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
  el: '#events',

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
      if(this.event.name) {
        this.events.push(this.event);
        this.event = { name: '', description: '', date: '' };
      }
    },

    deleteEvent: function(index) {
      if (confirm('Are you sure you want to delete this event?')) {
        this.events.splice(index,1);
      }
    },
  },
});
