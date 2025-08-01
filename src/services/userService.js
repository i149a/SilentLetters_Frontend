import Client from './api'

// Get logged-in user's profile
export const GetMyProfile = async () => {
    try {
        const res = await Client.get('/profile/user-profile')
        return res.data
    } catch (error) {
        console.error('Error fetching your profile:', error)
        throw error
    }
}

// Update user's profile picture
export const UpdateProfilePicture = async (pictureUrl) => {
    try {
        const res = await Client.put('/profile/update-picture', pictureUrl)
        return res.data
    } catch (error) {
        console.error('Error updating profile picture:', error)
        throw error
    }
}