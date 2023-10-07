import React, { useCallback, useEffect, useState } from "react";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import {
  Container,
  ProductsArea,
  BodyStyle,
  ContainerHeader,
  LogoutButton,
  H1,
  Img,
} from "./HomeStyles";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import api from "../../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { signout, createProduct, getProducts } = useAuth();
  const [error, setError] = useState("");
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [showCreateProduct, setShowCreateProduct] = useState(false);
  const navigate = useNavigate();

  const fetchProducts = useCallback(async () => {
    const response = await getProducts();
    console.log(response);
    if (!response[0]) {
      toast.error(response[1]);
      return;
    }
    setProducts(response[1].data);
  }, [getProducts]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleSubmitProduct = async (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const price = e.target.price.value;
    const thumbnail = e.target.thumbnail.value;

    if (!name || !price || !thumbnail) {
      console.log(name, price, thumbnail);
      setError("Preencha todos os campos corretamente.");
      toast.error("Preencha todos os campos corretamente.");
      return;
    }

    const result = await createProduct({
      name,
      price,
      thumbnail_url: thumbnail,
    });
    if (!result[0]) {
      toast.error(result[1]);
      return;
    }
    toast.success(result[1]);
    fetchProducts();
  };

  const handleOnclick = (product) => {
    const element = cart.find((e) => e.id === product.id);
    if (element) {
      const arrFilter = cart.filter((e) => e.id !== product.id);
      setCart(arrFilter);
    } else {
      setCart([...cart, product]);
    }
  };
  const handleLogout = () => {
    signout();
    navigate("/");
  };

  return (
    <BodyStyle>
      <Container>
        <LogoutButton onClick={() => handleLogout()}>Logout</LogoutButton>

        <H1>Produtos</H1>
        <button onClick={() => setShowCreateProduct(!showCreateProduct)}>
          {showCreateProduct ? "Ocultar Formulário" : "Criar Produto"}
        </button>

        {showCreateProduct && (
          <div>
            <h2>Criar Novo Produto</h2>
            <form onSubmit={(e) => handleSubmitProduct(e)}>
              <div>
                <label htmlFor="name">Título (até 50 caracteres):</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  maxLength="50"
                  required
                />
              </div>
              <div>
                <label htmlFor="price">Preço:</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  maxLength="5"
                  required
                />
              </div>
              <div>
                <label htmlFor="thumbnail">URL da Imagem: (1:1)</label>
                <input type="url" id="thumbnail" name="thumbnail" required />
              </div>
              <button type="submit">Criar Produto</button>
            </form>
          </div>
        )}

        <ProductsArea>
          {products.map((product) => (
            <div key={product.id} className="product">
              <h4>{product.name}</h4>
              <Img src={product.thumbnail_url} alt={product.name} />
              <p>R$ {product.price}</p>
              <button onClick={() => handleOnclick(product)}>
                {cart.some((itemCart) => itemCart.id === product.id) ? (
                  <AiFillMinusCircle />
                ) : (
                  <AiFillPlusCircle />
                )}
              </button>
            </div>
          ))}
        </ProductsArea>
      </Container>
    </BodyStyle>
  );
};

export default Home;
