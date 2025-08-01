import Client from './api'

// Create a new comment
export const CreateComment = async (data) => {
    try {
        const res = await Client.post(`/letters/${data.letterId}/comments`, data)
        return res.data
    } catch (error) {
        console.error({ msg: 'Create Comment Error:', error })
        throw error
    }
}

// Get all comments for a specific letter
export const GetCommentsByLetter = async (letterId) => {
    console.log(letterId)
    try {
        const res = await Client.get(`/letters/${letterId}/comments`)
        return res.data
    } catch (error) {
        console.error('Get Comments Error:', error)
        throw error
    }
}

// Update a comment
export const UpdateComment = async (commentId, content) => {
    try {
        const res = await Client.put(`/letters/${commentId}`, { content })
        return res.data
    } catch (error) {
        console.error({ msg: 'Update Comment Error:', error })
        throw error
    }
}

// Delete a comment
export const DeleteComment = async (commentId) => {
    try {
        const res = await Client.delete(`/letters/${commentId}`)
        return res.data
    } catch (error) {
        console.error({ msg: 'Delete Comment Error:', error })
        throw error
    }
}

// Get specific comment
export const GetCommentById = async (id) => {
    try {
        const res = await Client.get(`/comments/${id}`)
        return res.data
    } catch (error) {
        throw error
    }
}