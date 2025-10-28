import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
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

    const result = await login(formData);

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
              <h2 className="neon-text">Welcome Back</h2>
              <p>Enter the encrypted realm</p>
            </div>

            {error && (
              <div className="error-message">
                <span>⚠️</span> {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="auth-form">
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
                  'Access System'
                )}
              </button>
            </form>

            <div className="auth-footer">
              <p>
                New to RTCA?{' '}
                <Link to="/register" className="link-text">
                  Create Account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
