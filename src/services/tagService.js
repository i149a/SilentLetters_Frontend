import Client from './api'

// Create a new tag
export const CreateTag = async (tagData) => {
    try {
        const res = await Client.post('/tags/create-tag', tagData)
        return res.data
    } catch (error) {
        console.error({ msg: 'Create Tag Error:', error })
        throw error
    }
}

// Get tags created by the user
export const GetMyTags = async () => {
  try {
    const res = await Client.get('/tags/my-tags')
    return res.data
    } catch (error) {
        console.error({ msg: 'Get My Tags Error:', error })
        throw error
    }
}

// Get all tags
export const GetAllTags = async () => {
    try {
        const res = await Client.get('/tags/all-tags')
        return res.data
    } catch (error) {
        console.error({ msg: 'Get All Tags Error:', error })
        throw error
    }
}

// Update a tag
export const UpdateTag = async (id, updatedData) => {
    try {
        const res = await Client.put(`/tags/update-tag/${id}`, updatedData)
        return res.data
    } catch (error) {
        console.error({ msg: 'Update Tag Error:', error })
        throw error
    }
}

// Delete a tag
export const DeleteTag = async (id) => {
    try {
        const res = await Client.delete(`/tags/delete-tag/${id}`)
        return res.data
    } catch (error) {
        console.error({ msg: 'Delete Tag Error:', error })
        throw error
    }
}
