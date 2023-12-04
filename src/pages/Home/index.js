import React, { useCallback, useEffect, useState } from "react";
import {
  Container,
  ProductsArea,
  BodyStyle,
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
  const [selectedProduct] = useState(null);
  const [editedProduct, setEditedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { signout, createProduct, getProducts, editProduct } = useAuth();
  const [error, setError] = useState("");
  const [products, setProducts] = useState([]);

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
    const quantity = parseInt(e.target.quantity.value, 10);

    if (!name || !price || !thumbnail || isNaN(quantity)) {
      setError("Preencha todos os campos corretamente.");
      toast.error("Preencha todos os campos corretamente.");
      return;
    }

    const result = await createProduct({
      name,
      price,
      thumbnail_url: thumbnail,
      quantity,
    });

    if (!result[0]) {
      toast.error(result[1]);
      return;
    }

    toast.success(result[1]);
    fetchProducts();
  };

  const handleLogout = () => {
    signout();
    navigate("/");
  };

  const filterProducts = (term) => {
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(term.toLowerCase())
    );
    return filteredProducts;
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts = filterProducts(searchTerm);

  const handleSubmitEdit = async (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const price = e.target.price.value;
    const thumbnail = e.target.thumbnail.value;
    const quantity = e.target.quantity.value;
    const result = await editProduct({
      name,
      price,
      thumbnail_url: thumbnail,
      quantity,
      id: editedProduct.id,
    });

    if (!result[0]) {
      toast.error(result[1]);
      return;
    }

    toast.success(result[1]);
    fetchProducts();
  };

  const handleEdit = (product) => {
    setEditedProduct(product);
  };

  return (
    <BodyStyle>
      <Container>
        <LogoutButton onClick={() => handleLogout()}>Logout</LogoutButton>
        <input
          type="text"
          placeholder="Pesquisar por nome..."
          value={searchTerm}
          onChange={handleSearch}
        />

        <H1>Controle de Estoque</H1>
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
                <label htmlFor="quantity">Quantidade:</label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
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
          {filteredProducts.map((product) => (
            <div key={product.id} className="product">
              <h4>{product.name}</h4>
              <Img src={product.thumbnail_url} alt={product.name} />
              <p>R$ {product.price}</p>
              <p>Quantidade: {product.quantity}</p>
              <button onClick={() => handleEdit(product)}>Editar</button>
            </div>
          ))}
        </ProductsArea>
        {editedProduct && (
          <div>
            <h2>Editar Produto</h2>
            <form onSubmit={handleSubmitEdit}>
              <div>
                <label htmlFor="name">Título (até 50 caracteres):</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  maxLength="50"
                  defaultValue={editedProduct.name || ""}
                />
              </div>
              <div>
                <label htmlFor="price">Preço:</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  maxLength="5"
                  defaultValue={editedProduct.price || ""}
                />
              </div>
              <div>
                <label htmlFor="quantity">Quantidade:</label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  maxLength="5"
                  defaultValue={editedProduct.quantity || ""}
                />
              </div>
              <div>
                <label htmlFor="thumbnail">URL da Imagem: (1:1)</label>
                <input
                  type="url"
                  id="thumbnail"
                  name="thumbnail"
                  required
                  defaultValue={editedProduct.thumbnail_url || ""}
                />
              </div>
              <button type="submit">Atualizar Produto</button>
            </form>
          </div>
        )}
      </Container>
    </BodyStyle>
  );
};

export default Home;
