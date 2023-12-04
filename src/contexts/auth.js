import { createContext, useEffect, useState } from "react";
import axios from "axios";
import api from "../services/api";
import { toast } from "react-toastify";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  useEffect(() => {
    const userToken = localStorage.getItem("user_token");
    const usersStorage = localStorage.getItem("users_bd");

    if (userToken && usersStorage) {
      setUser(JSON.parse(usersStorage));
    }
  }, []);

  const signin = async (email, password) => {
    const response = await api
      .post("/login", { email, password })
      .catch((err) => {
        console.log(err);
      });

    if (!response) {
      return [false, "Não conseguimos logar, tente novamente mais tarde!"];
    }
    setUser({ email });
    const { access_token } = response.data;
    console.log(access_token);
    localStorage.setItem("user_token", JSON.stringify({ access_token }));
    localStorage.setItem("users_bd", JSON.stringify({ email }));

    return [true, "Logado com sucesso :)!"];
  };

  const signup = async (name, email, password) => {
    return await api
      .post("/user", {
        name,
        email,
        password,
      })
      .then((response) => {
        if (!response) {
          return [
            false,
            "Ocorreu um problema no servidor, tente novamente mais tarde!",
          ];
        }
        return [true, "Usuário registrado com sucesso!"];
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 500) {
          return [false, "Email já existe, por favor mude-o ou faça o Login!"];
        }
      });
  };

  const signout = () => {
    setUser(null);
    localStorage.removeItem("user_token");
    localStorage.removeItem("users_bd");
  };

  const createProduct = async ({ name, price, thumbnail_url, quantity }) => {
    const storagedToken = localStorage.getItem("user_token");
    const { access_token } = JSON.parse(storagedToken);
    console.log(name, price, thumbnail_url);
    const response = await api
      .post(
        "/product",
        {
          name,
          price: parseFloat(price),
          thumbnail_url,
          quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      )
      .catch((error) => {
        console.log(error);
      });

    if (!response) {
      return [
        false,
        "Ocorreu um problema no servidor, tente novamente mais tarde!",
      ];
    }

    return [true, "Produto criado com sucesso!"];
  };

  const editProduct = async ({ name, price, thumbnail_url, quantity, id }) => {
    const storagedToken = localStorage.getItem("user_token");
    const { access_token } = JSON.parse(storagedToken);
    const response = await api
      .put(
        `/product/${id}`,
        {
          name,
          price: parseFloat(price),
          thumbnail_url,
          quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      )
      .catch((error) => {
        console.log(error);
      });

    if (!response) {
      return [
        false,
        "Ocorreu um problema no servidor, tente novamente mais tarde!",
      ];
    }

    return [true, "Produto editado com sucesso!"];
  };

  const getProducts = async () => {
    const storagedToken = localStorage.getItem("user_token");
    const { access_token } = JSON.parse(storagedToken);
    const response = await api
      .get("/products", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .catch((error) => {
        console.log(error);
      });

    if (!response) {
      return [false, "Produtos não encontrados, tente novamente mais tarde!"];
    }

    return [true, response.data];
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        signed: !!user,
        signin,
        signup,
        signout,
        createProduct,
        getProducts,
        editProduct,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// teste commit
