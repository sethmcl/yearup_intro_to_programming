module.exports = {
  title: 'Array helpers',
  example: function () {
    var list = ['zed', 'bob', 'mary'];

    // Get number of items in the array
    var length = list.length;
    equal(length, 3);

    // Reverse the array
    list.reverse();
    deepEqual(list, ['mary', 'bob', 'zed']);

    // Sort the array
    list.sort();
    deepEqual(list, ['bob', 'mary', 'zed']);

    // Concatenate items in array
    var string = list.join(',');
    equal(string, 'bob, mary, zed');

    // Turn string in to array
    var input = 'A:B:C:D:E';
    var split = input.split(':');
    deepEqual(split, ['A', 'B', 'C', 'D', 'E']);

  },

  puzzles:[
    function () {
      // Sort the list of names below, and add 'YearUp' to the list.
      // Print the list using console.log()
      //
      // Output should be:
      //    ['Adam', 'Bob', 'Nancy', 'YearUp', 'Zedd']
      var list = ['Bob', 'Nancy', 'Zedd', 'Adam'];

    }
  ]
};
