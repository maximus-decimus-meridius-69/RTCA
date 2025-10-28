import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    const result = await register({
      username: formData.username,
      email: formData.email,
      password: formData.password,
    });

    if (result.success) {
      navigate('/chat');
    } else {
      setError(result.error);
    }

    setLoading(false);
  };

  return (
    <div className="auth-container animated-bg">
      <div className="auth-grid">
        <div className="auth-left">
          <div className="brand-section">
            <div className="glitch-wrapper">
              <h1 className="glitch" data-text="RTCA">
                RTCA
              </h1>
            </div>
            <p className="brand-tagline">Real-Time Encrypted Communication</p>
            <div className="feature-list">
              <div className="feature-item">
                <div className="feature-icon">🔒</div>
                <span>End-to-End Encrypted</span>
              </div>
              <div className="feature-item">
                <div className="feature-icon">⚡</div>
                <span>Real-Time Messaging</span>
              </div>
              <div className="feature-item">
                <div className="feature-icon">📁</div>
                <span>Secure File Sharing</span>
              </div>
            </div>
          </div>
        </div>

        <div className="auth-right">
          <div className="auth-card neon-glow">
            <div className="auth-header">
              <h2 className="neon-text">Join RTCA</h2>
              <p>Create your encrypted account</p>
            </div>

            {error && (
              <div className="error-message">
                <span>⚠️</span> {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Choose a username"
                  required
                  minLength={3}
                  maxLength={30}
                  className="neon-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  required
                  className="neon-input"
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
                  placeholder="••••••••"
                  required
                  minLength={6}
                  className="neon-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  minLength={6}
                  className="neon-input"
                />
              </div>

              <button
                type="submit"
                className="neon-button"
                disabled={loading}
              >
                {loading ? (
                  <span className="loading-spinner"></span>
                ) : (
                  'Create Account'
                )}
              </button>
            </form>

            <div className="auth-footer">
              <p>
                Already have an account?{' '}
                <Link to="/login" className="link-text">
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
