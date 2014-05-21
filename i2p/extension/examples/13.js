module.exports = {
  title: 'Array.slice',
  example: function () {
    var list  = ['Seth', 'Michael', 'Lilly'];
    var last2 = list.slice(1);

    console.log(list);
    console.log(last2);

    // Does not alter the original array
    // Learn more: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
  },

  puzzles:[
    function () {
      var states = ['Maine', 'Florida', 'California', 'Texas'];

      // make two new arrays.
      // the first should contain the first half of the states array ['Maine', 'Florida']
      // the second should contain the second half ['California', 'Texas']
    }
  ]
};
