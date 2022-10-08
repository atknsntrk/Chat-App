const express = require('express');
const router = express.Router();

const {
    getAllMessages,
    createMessage,
    putUpdateMessage,
    deleteMessage,
} = require("../controllers/chat.controller.js");


router.get("/", getAllMessages);

router.post("/", createMessage);

router.put("/:id", putUpdateMessage);

router.delete("/:id", deleteMessage);

module.exports = router;