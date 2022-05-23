import http from '../http-common'

const getAll = () => {
    return http.get('/messages')
}
const create = data => {
    return http.post('/messages', data)
} 

const update = (id, data) => {
    return http.put(`/messages/${id}`, data)
}

const remove = () => {
    return http.delete('/messages')
}

const ChatService = {
    getAll,
    create,
    update,
    remove
}

export default ChatService;