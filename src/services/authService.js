import Client from './api'

// Register Function
export const Register = async (data) => {
    try {
        const res = await Client.post('/auth/register', data)
        return res.data
    } catch (error) {
        console.error('Error registering user:', error)
        throw error
    }
}

// Log in a user
export const Login = async (data) => {
    try {
        const res = await Client.post('/auth/login', data)
        return res.data
    } catch (error) {
        console.error('Error logging in:', error)
        throw error
    }
}

// Sign out the user 
export const SignOutUser = () => {
    localStorage.removeItem('token')
}

// Update user password
export const UpdatePassword = async (data) => {
    try {
        const res = await Client.put('/auth/update-password', data)
        return res.data
    } catch (error) {
        console.error('Error updating password:', error)
        throw error
    }
}

// Send password reset link or code
export const ForgetPassword = async (data) => {
    try {
        const res = await Client.post('/auth/forget-password', data)
        return res.data
    } catch (error) {
        console.error('Error updating forgetten password:', error)
        throw error
    }
}

// Check session
export const CheckSession = async () => {
    try {
        const response = await Client.get('/auth/check-session')
        return response.data
    } catch (error) {
        console.error('Error checking session:', error)
        throw error
    }
}
