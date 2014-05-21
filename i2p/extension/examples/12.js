module.exports = {
  title: 'Array.splice',
  example: function () {
    var list = ['Seth', 'Michael', 'Lilly'];
    var removed = list.splice(1, 1, 'Mike');

    console.log(list);
    console.log(removed);

    // Modifies the array
    // Learn more: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
  },

  puzzles:[
    function () {
      var names = ['Seth', 'Richard', 'Seth', 'Pierre', 'Sara', 'Mary', 'Sara'];

      // your code here

      // remove duplicate names from the array
      // should print ['Seth', 'Richard', 'Pierre', 'Sara', 'Mary']
      console.log(names);
    }
  ]
};
