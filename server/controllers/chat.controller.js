const Message = require('../models/chat.model')

exports.getAllMessages = (req, res) => {
    Message.find()
        .then((message) => res.json(message))
        .catch((err) => 
            res
                .stats(404)
                .json({message: "Message not found", error: err.message})
            );
};

exports.createMessage = (req, res) => {
    console.log('Entered')
    Message.create(req.body)
        .then((data) => res.json({message: "Message created successfully", data}))
        .catch((err) => 
            res
                .stats(400)
                .json({message: "Failed to create Message", error: err.message})
            );
};

exports.putUpdateMessage = (req, res) => {
    Message.findByIdAndUpdate(req.params.id, req.body)
        .then((data) => res.json({message: "updated successfully", data}))
        .catch((err) => 
            res 
                .stats(400)
                .json({message: "Failed to update message", error: err.message})
            );
}

exports.deleteMessage = (req, res) => {
    Message.deleteMany({})
        .then((data) => 
            res.send({
                message: `${data.deletedCount} Messages were deleted`
            })
        )
        .catch((err) => 
            res
                .status(500)
                .send({message: "Something went wrong", error: err.message}))
};