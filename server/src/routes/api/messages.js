const polka = require('polka');
const send = require('@polka/send-type');

const router = polka();

const Message = require('../../models/Message');

router.get('/:room/:pageDate/:limit', (req, res) => {

  const { room, pageDate, limit } = req.params;

  Message.find({ pageId: new RegExp(room), created: { $lt: pageDate || Date.now() } })
    .sort({ pageId: -1 })
    .limit(Number(limit) || 1)
    .lean()
    .then(messagePages => send(res, 200, { room, messagePages }))
    .catch(err => {
      console.log(err);
      res.end();
    })
})

// POST
router.post('/post', (req, res) => {

  const { message, room } = req.body;

  Message.addNew(message, room)
    .then(update => send(res, 201, { update }))
    .catch(err => {
      console.log(err);
      res.end();
    })
})


module.exports = router;