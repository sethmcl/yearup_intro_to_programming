module.exports = {
  title: 'while loops',
  example: function () {
    var i = 0;

    while (i < 0) {
      // does not execute
      console.log(i);
      i++; // i = i + 1
    }

    while (i < 10) {
      console.log(i);
      i++; // i = i + 1
    }
  },

  puzzles:[
    function () {
      // Use a while loop to print each letter in the your name
      // For example, if your name is Patricia, the output should
      // be: P-a-t-r-i-c-i-a
    }
  ]
};
