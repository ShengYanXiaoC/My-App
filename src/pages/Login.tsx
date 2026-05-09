import { useState, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'

interface LoginFormData {
    username: string
    password: string
}

function Login(): React.ReactElement {
    const navigate = useNavigate()
    const [formData, setFormData] = useState<LoginFormData>({
        username: '',
        password: ''
    })
    const [error, setError] = useState<string>('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
        setError('')
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault()

        if (!formData.username.trim() || !formData.password.trim()) {
            setError('Please enter both username and password')
            return
        }

        console.log('Login attempt:', { username: formData.username })
        // Navigate to home page after successful login
        navigate('/home')
    }

    return (
        <div className="login-container">
            <div className="login-card">
                <h1>Sign In</h1>
                <p className="login-subtitle">Welcome back! Please enter your credentials.</p>

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Enter your username"
                            autoComplete="username"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            autoComplete="current-password"
                        />
                    </div>

                    {error && <div className="error-message">{error}</div>}

                    <button type="submit" className="login-button">
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login
