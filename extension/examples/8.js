module.exports = {
  title: 'Advanced Arrays: forEach()',
  example: function () {
    var list = ['zed', 'bob', 'mary'];

    list.forEach(function (name, idx, all) {
      console.log(name, idx, 'next:', all[idx + 1]);
    });

  },

  puzzles:[
    function () {
      // The array below contains a list of names.
      // Create a new array by adding last names to each name in the original list.
      // If the first letter of the name is A - J, the last name is 'Smith'
      // If the first letter of the name is K - S, the last name is 'Bustos'
      // If the first letter of the name is T - Z, the last name is 'Wu'
      var names = ['Bob', 'Nancy', 'Zedd', 'Adam', 'Katie', 'Wendy'];
      var fullNames;

      deepEqual(fullNames, ['Bob Smith', 'Nancy Bustos', 'Zedd Wu', 'Adam Smith', 'Katie Bustos', 'Wendy Wu']);
    }
  ]
};
