module.exports = {
  title: 'Array Equality',
  example: function () {
    var listA = [0];
    var listB = [0];

    var isEqual = (listA === listB);

    console.log(isEqual);
  },

  puzzles:[
    function () {
      function isEqual(i, j) {
        // your code here
      }

      var listA = [3, 8, 9, 2];
      var listB = [3, 8, 2, 2];
      var listC = [3, 8, 2, 2];

      console.log('listA is equal to listB: ' + isEqual(listA, listB));
      console.log('listB is equal to listC: ' + isEqual(listB, listC));
    }
  ]
};
