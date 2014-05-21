module.exports = {
  title: 'Advanced Arrays: forEach()',
  example: function () {
    var list = ['zed', 'bob', 'mary'];

    list.forEach(function (name, idx, all) {
      console.log(name + ' ' + idx + ' next: ' + all[idx + 1]);
    });

  },

  puzzles:[
    function () {
      // The array below contains a list of names.
      // Using the forEach() method, print each name followed by the next name.
      //
      // Expected output:
      //    Bob is related to Nancy
      //    Nancy is related to Zedd
      //    Zedd is related to Bob
      var names = ['Bob', 'Nancy', 'Zedd'];

    }
  ]
};
