import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckSession } from '../../services/authService'
import { UpdateProfilePicture } from '../../services/userService'
import "../../styling/User/UpdatePictureStyle.css"

const UpdatePictureForm = () => {
  const [currentPicture, setCurrentPicture] = useState('')
  const [pictureUrl, setPictureUrl] = useState('')
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCurrentPicture = async () => {
      try {
        const session = await CheckSession()
        setCurrentPicture(session.picture || '/images/Default_Logo/DefaultAvatar.jpg')
      } catch (error) {
        console.error('Error fetching current picture:', error)
      }
    }
    fetchCurrentPicture()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!pictureUrl) {
      setMessage('Please enter a valid image URL')
      setMessageType('error')
      return
    }

    setIsLoading(true)
    setMessage('')
    setMessageType('')

    try {
      await UpdateProfilePicture({ picture: pictureUrl })
      setMessage('Profile picture updated successfully!')
      setMessageType('success')
      setTimeout(() => {
        navigate('/profile', { state: { refresh: true } })
      }, 2000)
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to update profile picture')
      setMessageType('error')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="picture-form-container">
      <h2 className="form-title">Update Profile Picture</h2>
      
      <div className="picture-preview-container">
        <img 
          src={currentPicture} 
          alt="Profile Preview" 
          className="picture-preview"
          onError={(e) => {
            e.target.src = '/images/Default_Logo/DefaultAvatar.jpg'
          }}
        />
      </div>

      <form onSubmit={handleSubmit} className="picture-form">
        <div className="form-group">
          <input
            id="picture-url"
            type="url"
            value={pictureUrl}
            onChange={(e) => setPictureUrl(e.target.value)}
            placeholder="New Image URL"
            required
            className="form-input-url"
          />
        </div>

        <div className="form-actions">
          <button 
            type="submit" 
            disabled={isLoading || !pictureUrl} 
            className="submit-btn"
          >
            {isLoading ? 'Updating...' : 'Update Picture'}
          </button>
        </div>

        {message && (
          <div className={`message ${messageType}`}>
            {message}
            {messageType === 'success' && (
              <span className="redirect-message"> Redirecting back to profile...</span>
            )}
          </div>
        )}
      </form>
    </div>
  )
}

export default UpdatePictureForm