module.exports = {
  title: 'Arrays: adding',
  example: function () {
    // Creating arrays
    var list = ['blue', 'green', 'red', 'purple', 'pink'];

    // Accessing items in arrays
    equal(list[1], 'green');

    // Add items to end of array
    var count = list.push('teal', 'violet');
    deepEqual(list, ['green', 'red', 'purple', 'orange', 'teal', 'violet']);
    equal(count, 6);

    // Add items to front of the array
    var count = list.unshift('pink');
    deepEqual(list, ['pink', 'green', 'red', 'purple', 'orange', 'teal', 'violet']);
    equal(count, 7);

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
