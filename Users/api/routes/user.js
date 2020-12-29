const express = require("express");
require('express-async-errors');

const router = express.Router();
const model = require('../utils/sql_command');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');


/* GET users listing. */
router.get('/', async (req, res) => {
  const user = await model.getUserByID(req.user.user[0].ID);
  res.send(user);
});

router.post('/changeinfo/', async (req, res) => {
  const user = req.user.user[0];
  const input = req.user.input;
  // check same gmail
  if (user.email !== input.newEmail) {
    const check1 = await model.getUserByEmail(input.newEmail);
    if (check1.length > 0) {
      return res.status(400).send({
        message: 'Email đã tồn tại!'
      });
    }
  }

  // check same username
  if (user.username !== input.newUsername) {
    const check2 = await model.getUserByUsername(input.newUsername);
    if (check2.length > 0) {
      return res.status(400).send({
        message: 'Username đã tồn tại!'
      });
    }
  }

  user.username = input.newUsername;
  user.fullname = input.newFullname;
  user.email = input.newEmail;

  await model.updateUser(user);
  res.sendStatus(200)
});

router.post('/changepass/', async (req, res) => {
  const user = req.user.user[0];
  const input = req.user.input;
  // check same old password
  if (bcrypt.compareSync(input.oldPass, user.password)) {
    const hash = bcrypt.hashSync(input.newPass, 10);
    user.password = hash;
    await model.updateUser(user);
    res.sendStatus(200)
  }
  else {
    res.status(401).send({
      message: 'Old password is wrong!'
    });
  }
});

router.post("/room/create/", async (req, res) => {
  const user = req.user.user[0];
  const roomID = uuidv4();
  await model.createRoom([roomID, user.ID, null])
    .then(() => {
      res.status(200).send({
        ID: roomID,
      });
    });
});

router.post("/room/joinRequest/player", async (req, res) => {
  const user = req.user.user[0];
  const roomID = req.user.input.roomId;
  const room = await model.getRoomByID(roomID);
  console.log(roomID)
  if (room && room.length === 0) {                                // wrong id room
    res.status(400).send({ message: "Room not found" });
  }
  else if (room[0].idUser1 === user.ID) {                              // player 1 rejoin
    res.status(200).send({ ID: roomID });
  }
  else if (!room[0].idUser2) {                                    // update db when no player 2
    await model.joinRoomAsPlayer(roomID, user);
    res.status(200).send({ ID: roomID });
  }
  else if (room[0].idUser2 && room[0].idUser2 != user.ID) {       /// player 2 rejoin
    res.status(400).send({ message: "Room already had enough player" });
  }
});

router.post("/room/joinRequest/viewer", async (req, res) => {
  const roomID = req.user.input.roomId;
  const room = await model.getRoomByID(roomID);
  if (room && room.length === 0) {
    res.status(400).send({ message: "Room not found" });
  }
  else {
    res.status(200).send({ ID: roomID });
  }
});

router.post('/forgotPass/', async (req, res) => {
  const user = req.user.user[0];
  const input = req.user.input;
  const hash = bcrypt.hashSync(input.newPass, 10);
  user.password = hash;
  await model.updateUser(user);
  res.sendStatus(200);
});

module.exports = router;
