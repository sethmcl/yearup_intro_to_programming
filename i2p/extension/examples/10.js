module.exports = {
  title: 'Advanced Arrays: filter()',
  example: function () {
    var list = ['zed', 'bob', 'mary'];

    var newNames = list.filter(function (name) {
      return name.length > 3;
    });

    console.log(list);
    console.log(newNames);

  },

  puzzles:[
    function () {
      // Print the even numbers
      // HINT: the modulo operator will help, ex: `4 % 2 === 0`
      var numbers = [9, 10, 4, 8, 2, 1, 342, 99];

      // your code
    },

    function () {
      // Remove extra whitespace from string below
      // HINT: this requires combining several concepts
      var extra = 'Hello, it    is  nice              to meet you';
      var clean;

      // your code

      equal(clean, 'Hello, it is nice to meet you');
    }

  ]
};
