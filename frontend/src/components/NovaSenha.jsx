import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function NovaSenha() {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpar erro específico quando o usuário começar a digitar
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validatePassword = (password) => {
    const minLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    return {
      minLength,
      hasUpperCase,
      hasNumber,
      hasSpecialChar,
      isValid: minLength && hasUpperCase && hasNumber && hasSpecialChar
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = {};
    const passwordValidation = validatePassword(formData.password);

    if (!formData.password) {
      newErrors.password = 'Nova senha é obrigatória';
    } else if (!passwordValidation.isValid) {
      newErrors.password = 'A senha não atende aos requisitos mínimos';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirmação de senha é obrigatória';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Senhas não coincidem';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setErrors({});

    // Simular redefinição de senha
    setTimeout(() => {
      setSuccess(true);
      setLoading(false);
      
      // Redirecionar para login após 3 segundos
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }, 1500);
  };

  const passwordValidation = validatePassword(formData.password);

  if (success) {
    return (
      <div className="login-container">
        <div className="login-background">
          <div className="login-overlay">
            <div className="login-form-container">
              <div className="login-form">
                <h1 className="brand-title">Aprova Ortopedia</h1>
                <div className="success-message">
                  <h2>Senha redefinida com sucesso!</h2>
                  <p>Você será redirecionado para a página de login em alguns segundos...</p>
                </div>
                <div className="login-links">
                  <Link to="/" className="link">Ir para Login</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="login-container">
      <div className="login-background">
        <div className="login-overlay">
          <div className="login-form-container">
            <div className="login-form">
              <h1 className="brand-title">Aprova Ortopedia</h1>
              <h2 className="form-subtitle">Nova Senha</h2>
              
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="password">Nova Senha *</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  {errors.password && <div className="field-error">{errors.password}</div>}
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirmar Nova Senha *</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                  {errors.confirmPassword && <div className="field-error">{errors.confirmPassword}</div>}
                </div>

                <div className="password-requirements">
                  <h4>Requisitos da senha:</h4>
                  <ul>
                    <li className={passwordValidation.minLength ? 'valid' : 'invalid'}>
                      Mínimo 8 caracteres
                    </li>
                    <li className={passwordValidation.hasUpperCase ? 'valid' : 'invalid'}>
                      Pelo menos uma letra maiúscula
                    </li>
                    <li className={passwordValidation.hasNumber ? 'valid' : 'invalid'}>
                      Pelo menos um número
                    </li>
                    <li className={passwordValidation.hasSpecialChar ? 'valid' : 'invalid'}>
                      Pelo menos um caractere especial
                    </li>
                  </ul>
                </div>

                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? 'Redefinindo...' : 'Redefinir Senha'}
                </button>
                
                <div className="login-links">
                  <Link to="/" className="link">Voltar ao Login</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NovaSenha;

