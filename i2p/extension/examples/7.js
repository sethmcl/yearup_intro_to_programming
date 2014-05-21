module.exports = {
  title: 'Array helpers',
  example: function () {
    var list, length, string, input, split;

    list = ['zed', 'bob', 'mary'];

    // Get number of items in the array
    length = list.length;
    console.log(length);

    // Reverse the array
    list.reverse();
    console.log(list);

    // Sort the array
    list.sort();
    console.log(list);

    // Concatenate items in array
    string = list.join(',');
    console.log(string);

    // Turn string in to array
    input = 'A:B:C:D:E';
    split = input.split(':');
    console.log(split);

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
