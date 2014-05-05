module.exports = {
  title: 'Working with Arrays',
  example: function () {
    // Creating arrays
    var list1 = new Array('blue', 'green', 'red');
    var list2 = ['blue', 'green', 'red']; // Array literal (shortcut)

    // Accessing items in arrays
    console.log(list2[0]); // 'blue'

    // Remove the last item in the array
    var lastItem = list2.pop();
    assertEqual(lastItem, 'pink');
    list2; // ['blue', 'green']
    console.log(list2); // ['blue', 'green']

    // Add an item to the end of the array
    list2.push(lastItem);
    console.log(list2); // ['blue', 'green', 'red']

    // Add multiple items
    var count = list2.push('foo', 'bar');
    console.log(list2); // ['blue', 'green', 'red', 'foo', 'bar']
    console.log(count); // 5

    // Remove the first item from the array
    var firstItem = list2.shift();
    console.log(firstItem); // 'blue'
    console.log(list2); // ['green', 'red', 'foo', 'bar']

    // Add items to front of the array
    var count = list2.unshift('pink', 'purple');
    console.log(list2); // ['pink', 'purple', 'green', 'red', 'foo', 'bar']
    console.log(count); // 6

    // Get number of items in the array
    var length = list2.length;
    console.log(length); // 6

    // Reverse the array
    list2.reverse();
    console.log(list2); // ['bar', 'foo', 'red', 'green', 'purple', 'pink']

    // Sort the array
    list2.sort();
    console.log(list2); // ['bar', 'foo', 'green', 'pink', 'purple', 'red']

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
