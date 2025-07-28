import Client from './api'

// Fetch the user's profile data
export const getProfile = async () => {
    try {
        const response = await Client.get('/profile/user-profile')
        return response.data
    } catch (error) {
        console.error('Error fetching profile:', error)
        throw error
    }
}

// Update the user's profile picture
export const UpdateProfilePicture = async (picture) => {
    try {
        const response = await Client.put('/profile/update-picture', { picture })
        return response.data
    } catch (error) {
        console.error('Error updating profile picture:', error)
        throw error
    }
}