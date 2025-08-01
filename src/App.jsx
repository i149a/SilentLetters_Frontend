import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

// Layout Components
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import PrivateRoute from './components/layout/PrivateRoute'

// Auth Pages
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import ForgetPasswordPage from './pages/auth/ForgetPasswordPage'
import { AuthProvider } from './components/auth/authContext'

// User Pages
import ProfilePage from './pages/user/ProfilePage'
import UpdatePasswordPage from './pages/user/UpdatePasswordPage'
import UpdatePicturePage from './pages/user/UpdatePicturePage'

// Tag Pages
import TagFormPage from './pages/tag/TagFormPage'
import TagListPage from './pages/tag/TagListPage'

// Letter Pages
import LetterCardPage from './pages/letters/LetterCardPage'
import LetterListPage from './pages/letters/LetterListPage'
import LetterFormPage from './pages/letters/LetterFormPage'
import LetterPage from './pages/letters/LetterPage'
import TagLetters from './components/letters/TagLetters';

// Comment Pages
import CommentCardPage from './pages/comment/CommentCardPage'
import CommentListPage from './pages/comment/CommentListPage'
import CommentFormPage from './pages/comment/CommentFormPage'

function App() {
  return (
    <AuthProvider>

    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-6">
        <Routes>
          {/* Auth Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forget-password" element={<ForgetPasswordPage />} />
          <Route path="/letters" element={<LetterListPage />} />

          {/* User Routes */}
          <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
          <Route path="/update-password" element={<PrivateRoute><UpdatePasswordPage /></PrivateRoute>} />
          <Route path="/update-picture" element={<PrivateRoute><UpdatePicturePage /></PrivateRoute>} />

          {/* Tag Routes */}
          <Route path="/tags" element={<PrivateRoute><TagListPage /></PrivateRoute>} />
          <Route path="/tags/create" element={<PrivateRoute><TagFormPage /></PrivateRoute>} />
          <Route path="/tags/:id/edit" element={<PrivateRoute><TagFormPage /></PrivateRoute>} />

          {/* Letter Routes */}
          <Route path="/letters/create" element={<PrivateRoute><LetterFormPage /></PrivateRoute>} />
          <Route path="/letters/:id" element={<PrivateRoute><LetterPage /></PrivateRoute>} />
          <Route path="/letters/:id/edit" element={<PrivateRoute><LetterFormPage /></PrivateRoute>} />
          <Route path="/tags/:tagId" element={<PrivateRoute><TagLetters /></PrivateRoute>} />

          {/* Comment Routes */}
          <Route path="/comments" element={<PrivateRoute><CommentListPage /></PrivateRoute>} />
          <Route path="letters/:id/comments/new" element={<PrivateRoute><CommentFormPage /></PrivateRoute>} />
          <Route path="/comments/:id" element={<PrivateRoute><CommentCardPage /></PrivateRoute>} />
          <Route path="/comments/:id/edit" element={<PrivateRoute><CommentFormPage /></PrivateRoute>} />
          <Route path="comments/:commentId/edit" element={<PrivateRoute><CommentFormPage /></PrivateRoute>} />


          {/* Default Redirect */}
          <Route path="/" element={<Navigate to="/letters" replace />} />
          <Route path="*" element={<Navigate to="/letters" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  </AuthProvider> 

  )
}

export default App