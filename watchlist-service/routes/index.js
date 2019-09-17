var express = require('express');
var router = express.Router();
var axios = require('axios');
/* GET home page. */
router.get('/:symbol', function(req, res, next) {
  const symbol = req.params.symbol;
  axios.get(`${process.env.IEX_API}/stable/stock/${symbol}/quote?token=${process.env.token}`).then((response) => {
    console.log(response.data.companyName);
    res.send({data: response.data})
  }).catch(err => {
    throw err;
  })
});

router.get('/readinessProbe/health', (req, res) => {
  console.log("Health check test")
  res.send({data:"App is up and running"})
})

module.exports = router;
