const polka = require('polka');
const send = require('@polka/send-type');
const bcrypt = require('bcryptjs');

const router = polka();

const User = require('../../models/User');

const createUser = (req, res) => {
  const newUser = new User({
    handle: req.body.handle,
    password: req.body.password
  });

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser.save()
        .then(user => {
          const { handle, _id } = user;
          send(res, 201, { user: { handle, _id }});
        })
        .catch(err => {
          console.log(err);
          res.end();
        });
    })
  })
}

// const genToken = (user, res) => {
//   const { handle, _id, } = user;
//   jwt.sign(
//     { _id, handle },
//     'aSuperSecretKey',
//     // { expiresIn: 3600 },
//     (err, token) => send(res, 201, { success: true, token: token, user: { _id, handle } })
//   )
// };

// TEST
router.get('/test', (req, res) => send(res, 200, { msg: "The users route." }));


// POST
//register
router.post('/register', (req, res) => {
  if (req.body.handle.length < 2 || req.body.password < 2) {
    send(res, 400, { err: "Handle must have a length of at least 2.  Password must have a length of at least two"})
    return;
  };

  User.findOne({ handle: req.body.handle })
    .lean()
    .then(user => {
      if (user) {
        if (user.handle === req.body.handle) send(res, 400, {
          err: "Handle already registered"
        })
      } else createUser(req, res);
    })

})

//login
router.post('/login', (req, res) => {
  const handle = req.body.handle;
  const password = req.body.password;

  User.findOne({ handle })
    .lean()
    .then(user => {
      if (!user) send(res, 404, { err: "User handle or password incorrect" });
      else {
        bcrypt
          .compare(password, user.password)
          .then(isMatch => {
            if (isMatch) {
              const { handle, _id } = user;
              send(res, 201, { user: { handle, _id }});
            }
            else send(res, 400, { err: "User handle or password incorrect" });
          })
      }
    })
})

// GET
router.get('/', (req, res) => {
  User.getAll()
    .then(users => send(res, 200, { users }))
    .catch(err => {
      console.log(err);
      res.end();
    });
})

router.get('/handle', (req, res) => {
  User.findOne({ handle: req.body.handle })
    .lean()
    .then(user => {
      if (!user) send(res, 404, { err: "User handle not found"})
      else send(res, 200, { user }); 
    })
    .catch(err => {
      console.log(err);
      res.end();
    })
})

module.exports = router;