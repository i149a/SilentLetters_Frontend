import Client from './api'

// Create a new letter
export const CreateLetter = async (data) => {
    try {
        const res = await Client.post('/letters/create-letter', data)
        return res.data
    } catch (error) {
        console.error({ msg: 'Create Letter Error:', error })
        throw error
    }
}

// Get all public letters
export const GetPublicLetters = async () => {
    try {
        const res = await Client.get('/letters/public-letters')
        return res.data
    } catch (error) {
        console.error({ msg: 'Get Public Letters Error:', error })
        throw error
    }
}

// Get letter by ID
export const GetLetterById = async (id) => {
    try {
        const res = await Client.get(`/letters/public-letter/${id}`)
        return res.data
    } catch (error) {
        console.error({ msg: 'Get Letter By ID Error:', error })
        throw error
    }
}

// Get user's letters
export const GetMyLetters = async () => {
    try {
        const res = await Client.get('/letters/my-letters')
        return res.data
    } catch (error) {
        console.error({ msg: 'Get My Letters Error:', error })
        throw error
    }
}

// Update an existing letter
export const UpdateLetter = async (id, updatedData) => {
    try {
        const res = await Client.put(`/letters/update-letter/${id}`, updatedData)
        return res.data
    } catch (error) {
        console.error({ msg: 'Update Letter Error:', error })
        throw error
    }
}

// Delete a letter
export const DeleteLetter = async (id) => {
    try {
        const res = await Client.delete(`/letters/delete-letter/${id}`)
        return res.data
    } catch (error) {
        console.error({ msg: 'Delete Letter Error:', error })
        throw error
    }
}
