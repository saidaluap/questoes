import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

function LoginNew() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { login, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await login(email, password);
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.message || 'Erro ao fazer login');
    }
    
    setLoading(false);
  };

  return (
    <div className="login-page-new">
      <div className="login-container-new">
        {/* Seção de Boas-vindas */}
        <div className="welcome-section">
          <div className="welcome-content">
            <h1 className="welcome-title">Welcome to website</h1>
            <p className="welcome-description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod 
              tincidunt ut laoreet dolore magna aliquam erat volutpat.
            </p>
            
            {/* Elementos decorativos */}
            <div className="decorative-elements">
              <div className="shape shape-1"></div>
              <div className="shape shape-2"></div>
              <div className="shape shape-3"></div>
              <div className="shape shape-4"></div>
              <div className="shape shape-5"></div>
              <div className="shape shape-6"></div>
            </div>
          </div>
        </div>

        {/* Seção de Login */}
        <div className="login-section">
          <div className="login-form-container">
            <div className="login-header-new">
              <h2 className="login-title">USER LOGIN</h2>
            </div>

            {error && (
              <div className="error-message-new">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zM7 3v6h2V3H7zm0 8v2h2v-2H7z" fill="#ef4444"/>
                </svg>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="login-form-new">
              <div className="form-group-new">
                <div className="input-container-new">
                  <svg className="input-icon-new" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" fill="#9ca3af"/>
                  </svg>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-input-new"
                    placeholder=""
                    required
                  />
                </div>
              </div>

              <div className="form-group-new">
                <div className="input-container-new">
                  <svg className="input-icon-new" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" fill="#9ca3af"/>
                  </svg>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-input-new"
                    placeholder=""
                    required
                  />
                </div>
              </div>

              <div className="form-options-new">
                <label className="checkbox-container-new">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="checkbox-input-new"
                  />
                  <span className="checkbox-custom-new"></span>
                  <span className="checkbox-label-new">Remember</span>
                </label>
                <Link to="/recuperar-senha" className="forgot-password-new">
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="login-button-new"
              >
                {loading ? (
                  <div className="loading-spinner-new">
                    <svg className="spinner-new" width="20" height="20" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" strokeDasharray="32" strokeDashoffset="32">
                        <animate attributeName="stroke-dasharray" dur="2s" values="0 64;32 32;0 64" repeatCount="indefinite"/>
                        <animate attributeName="stroke-dashoffset" dur="2s" values="0;-32;-64" repeatCount="indefinite"/>
                      </circle>
                    </svg>
                    Entrando...
                  </div>
                ) : (
                  'LOGIN'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="footer-new">
        <p>designed by 🤖 freepik</p>
      </div>
    </div>
  );
}

export default LoginNew;

