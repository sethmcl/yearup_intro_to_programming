module.exports = {
  title: 'Arrays: removing',
  example: function () {
    var list, last, count;

    list = ['blue', 'green', 'red', 'purple', 'pink'];

    // Remove the last item in the array
    last = list.pop();
    console.log(last);
    console.log(list);

    // Remove the first item from the array
    first = list.shift();
    console.log(first);
    console.log(last);

  },

  puzzles:[
  ]
};
