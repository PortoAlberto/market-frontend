import React, { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import * as C from "./styles";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Logo from "./img/bf.png";
import { toast } from "react-toastify";

const Signup = () => {
  const { signup } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    setError("");

    if (!name || !email || !password) {
      setError("Preencha todos os campos");
      return;
    }

    const result = await signup(name, email, password);

    if (!result[0]) {
      toast.error(result[1]);
      return;
    }

    toast.success(result[1]);
    navigate("/");
  };

  return (
    <C.Container>
      <img src={Logo} alt="" name="Logo" />
      <C.Content>
        <Input
          type="text"
          placeholder="Digite seu Nome"
          value={name}
          onChange={(e) => [setName(e.target.value), setError("")]}
        />

        <Input
          type="email"
          placeholder="Digite seu E-mail"
          value={email}
          onChange={(e) => [setEmail(e.target.value), setError("")]}
        />
        <Input
          type="password"
          placeholder="Digite sua Senha"
          value={password}
          onChange={(e) => [setPassword(e.target.value), setError("")]}
        />
        <C.labelError>{error}</C.labelError>
        <Button Text="Inscrever-se" onClick={handleSignup} />
        <C.LabelSignin>
          Já tem uma conta?
          <C.Strong>
            <Link to="/">&nbsp;Entre</Link>
          </C.Strong>
        </C.LabelSignin>
      </C.Content>
    </C.Container>
  );
};

export default Signup;
