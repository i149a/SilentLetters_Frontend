import Client from './api'

// Create a new comment
export const CreateComment = async (data) => {
    try {
        const res = await Client.post('/comments/create-comment', data)
        return res.data
    } catch (error) {
        console.error({ msg: 'Create Comment Error:', error })
        throw error
    }
}

// Get all comments for a specific letter
export const GetCommentsByLetter = async (letterId) => {
    try {
        const res = await Client.get(`/comments/${letterId}`)
        return res.data
    } catch (error) {
        console.error({ msg: 'Get Comments Error:', error })
        throw error
    }
}

// Update a comment
export const UpdateComment = async (commentId, content) => {
    try {
        const res = await Client.put(`/comments/update-comment/${commentId}`, { content })
        return res.data
    } catch (error) {
        console.error({ msg: 'Update Comment Error:', error })
        throw error
    }
}

// Delete a comment
export const DeleteComment = async (commentId) => {
    try {
        const res = await Client.delete(`/comments/delete-comment/${commentId}`)
        return res.data
    } catch (error) {
        console.error({ msg: 'Delete Comment Error:', error })
        throw error
    }
}
