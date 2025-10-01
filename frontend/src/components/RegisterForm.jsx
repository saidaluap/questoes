import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Mail, Lock, User, Building } from 'lucide-react';
import { useAuth } from './AuthContext';

const RegisterForm = ({ onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    nome: '',
    hospital: '',
    tipo_usuario: '',
  });
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();

  const tiposUsuario = [
    { value: 'R1', label: 'R1 - Primeiro Ano' },
    { value: 'R2', label: 'R2 - Segundo Ano' },
    { value: 'R3', label: 'R3 - Terceiro Ano' },
    { value: 'R4', label: 'R4 - Quarto Ano' },
    { value: 'R5', label: 'R5 - Quinto Ano' },
    { value: 'Ortopedista', label: 'Ortopedista' },
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors([]);
  };

  const handleSelectChange = (value) => {
    setFormData({
      ...formData,
      tipo_usuario: value,
    });
    setErrors([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors([]);

    // Validação local
    if (formData.password !== formData.confirmPassword) {
      setErrors([{ field: 'confirmPassword', message: 'As senhas não coincidem' }]);
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setErrors([{ field: 'password', message: 'A senha deve ter pelo menos 6 caracteres' }]);
      setLoading(false);
      return;
    }

    const { confirmPassword, ...userData } = formData;
    const result = await register(userData);

    if (!result.success) {
      setErrors(result.errors || [{ message: result.message }]);
    }

    setLoading(false);
  };

  const getFieldError = (fieldName) => {
    return errors.find(error => error.field === fieldName)?.message;
  };

  const getGeneralError = () => {
    return errors.find(error => !error.field)?.message;
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">Cadastro</CardTitle>
        <CardDescription className="text-center">
          Crie sua conta para acessar o sistema de questões
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {getGeneralError() && (
            <Alert variant="destructive">
              <AlertDescription>{getGeneralError()}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="nome">Nome Completo</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="nome"
                name="nome"
                type="text"
                placeholder="Dr. João Silva"
                value={formData.nome}
                onChange={handleChange}
                className="pl-10"
                required
              />
            </div>
            {getFieldError('nome') && (
              <p className="text-sm text-destructive">{getFieldError('nome')}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="seu@email.com"
                value={formData.email}
                onChange={handleChange}
                className="pl-10"
                required
              />
            </div>
            {getFieldError('email') && (
              <p className="text-sm text-destructive">{getFieldError('email')}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="hospital">Hospital</Label>
            <div className="relative">
              <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="hospital"
                name="hospital"
                type="text"
                placeholder="Hospital das Clínicas"
                value={formData.hospital}
                onChange={handleChange}
                className="pl-10"
                required
              />
            </div>
            {getFieldError('hospital') && (
              <p className="text-sm text-destructive">{getFieldError('hospital')}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="tipo_usuario">Tipo de Usuário</Label>
            <Select onValueChange={handleSelectChange} required>
              <SelectTrigger>
                <SelectValue placeholder="Selecione seu tipo" />
              </SelectTrigger>
              <SelectContent>
                {tiposUsuario.map((tipo) => (
                  <SelectItem key={tipo.value} value={tipo.value}>
                    {tipo.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {getFieldError('tipo_usuario') && (
              <p className="text-sm text-destructive">{getFieldError('tipo_usuario')}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Mínimo 6 caracteres"
                value={formData.password}
                onChange={handleChange}
                className="pl-10"
                required
              />
            </div>
            {getFieldError('password') && (
              <p className="text-sm text-destructive">{getFieldError('password')}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirmar Senha</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirme sua senha"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="pl-10"
                required
              />
            </div>
            {getFieldError('confirmPassword') && (
              <p className="text-sm text-destructive">{getFieldError('confirmPassword')}</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Cadastrando...
              </>
            ) : (
              'Criar Conta'
            )}
          </Button>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Já tem uma conta?{' '}
              <button
                type="button"
                onClick={onSwitchToLogin}
                className="text-primary hover:underline font-medium"
              >
                Faça login aqui
              </button>
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default RegisterForm;

