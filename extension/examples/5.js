module.exports = {
  title: 'Arrays: adding',
  example: function () {
    var list, count;

    // Creating arrays
    list = ['blue', 'green', 'red', 'purple', 'pink'];

    // Add items to end of array
    count = list.push('teal', 'violet');
    console.log(list);
    console.log(count);

    // Add items to front of the array
    count = list.unshift('pink');
    console.log(list);
    console.log(count);

  },

  puzzles:[
    function () {
      // Create an array containing the even numbers 0 - 10
      // How many numbers are in the array? Print the count
    }
  ]
};
