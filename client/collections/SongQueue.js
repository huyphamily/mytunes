// SongQueue.js - Defines a backbone model class for the song queue.
var SongQueue = Songs.extend({

  //set event listener and individual function
  initialize: function(){
    this.on( 'add', this.enqueue, this );
    this.on( 'dequeue', this.dequeue, this );
    this.on( 'ended', this.playNext, this );
  },

  //play first song
  enqueue: function(song){
    if( this.length === 1 ){
      this.playFirst();
    }
  },

  //remove songs from the list
  dequeue: function(song){
    if( this.at(0) === song ){
      this.playNext();
    } else {
      this.remove(song);
    }
  },

  //remove song after it finished playing
  playNext: function(){
    this.shift();
    if( this.length >= 1 ){
      this.playFirst();
    } else {
      this.trigger('stop');
    }
  },

  //play first song
  playFirst: function(){
    var songModel = this.at(0);
    songModel.set("play", songModel.get("play")+1 );
    songModel.play();
  }

});


