module.exports = {
  title: 'Arrays: removing',
  example: function () {
    var list = ['blue', 'green', 'red', 'purple', 'pink'];

    // Remove the last item in the array
    var last = list.pop();
    equal(last, 'pink');
    deepEqual(list, ['blue', 'green', 'red', 'purple']);

    // Remove the first item from the array
    var first = list.shift();
    equal(first, 'blue');
    deepEqual(list, ['green', 'red', 'purple']);

  },

  puzzles:[
    function () {
      // Add the even numbers 0 - 10 to an array
      // How many numbers are in the array? Print the count
      var evenNumbers;
      var count;

      // your code here

      equal(count, 5);
    }
  ]
};
