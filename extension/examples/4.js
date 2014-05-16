module.exports = {
  title: 'Arrays',
  example: function () {
    // Creating arrays
    var list = ['blue', 'green', 'red', 'purple', 'pink'];

    // Getting the length of the array
    console.log(list.length);

  },

  puzzles:[
    function () {
      var list = ['maine', 'michigan', 'texas', 'florida'];

      // Get the last item in the `list` array
      var last;

      equal(last, 'florida');
    }
  ]
};
