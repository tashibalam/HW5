let Deck = {

   cardArray: [],

   loadDeck: function ( ){
      let i = 0;
      let j = 0;
      for ( i = 1; i <= 4; i++ ) {
         for ( j = 1; j <= 13; j++ ) {

            this.cardArray.push(new Card(i,j+1));
         }
      }     
   }
}