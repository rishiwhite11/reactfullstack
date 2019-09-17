var express = require('express');
var router = express.Router();
const passport = require('passport');


router.get('/facebook', passport.authenticate('facebook'));
router.get('/facebook/callback',
  passport.authenticate('facebook'), (req, res) => {
    console.log("The callback is reaching finally!!!!!")
    res.redirect('/')
  })

router.get('/user', (req, res) => {
    console.log("This is the data user!!!!");
    console.log(req);
    res.send({data:req.user});
});

router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/')
})

module.exports = router;