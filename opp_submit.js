var dataSubmit = {
  wallSubmit: function(wall){
    axios.post('/data/wallhistory', {
      "wall": wall
    })
    .then(
      function(res){
        console.log(res.data);
      }
    );
  },
  rowSubmit: function(row){
    axios.post('/data/rowhistory', {
      "row": row
    })
    .then(
      function(res){
        console.log(res.data);
      }
    );
  }
};

export default dataSubmit;
