import styled from "styled-components";

export const BodyStyle = styled.body`
  margin: 0;
  padding: 0;
  min-height: 100vh;
  button {
    display: block;
    padding: 10px 10px;
    outline: none;
    border: none;
    border-radius: 5px;
    width: 100%;
    cursor: pointer;
    background-color: #228b22;
    color: white;
    font-weight: 600;
    font-size: 16px;
    max-width: 300px;
  }

  input {
    display: block;
    outline: none;
    padding: 5px 5px;
    margin-bottom: 10px;
    width: 100%;
    border-radius: 5px;
    font-size: 16px;
    background-color: #f0f2f5;
    border: none;
  }
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  gap: 10px;
  background-color: #bcc8c4;
  position: relative;
  min-height: 100vh;
`;
export const H1 = styled.h1`
  margin-top: 15px;
`;
export const Img = styled.img`
  width: 100px;
  height: 100px;
`;

export const LogoutButton = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: block;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  width: 100%;
  cursor: pointer;
  background-color: red;
  color: white;
  font-weight: 600;
  font-size: 16px;
  max-width: 100px;
  text-align: center;
`;

export const ProductsArea = styled.div`
  display: flex;
  gap: 50px;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-bottom: 70px;
  margin-top: 30px;

  > div {
    height: 320px;
    width: 230px;
    border: 5px solid rgb(194, 193, 193);
    border-image: linear-gradient(#034b19, #09ba85) 1;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75);
    -webkit-box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.75);
    text-align: center;
    background-color: white;
    transition: transform 0.3s ease-in-out;
    overflow: hidden;

    &:hover {
      transform: scale(1.1);
    }
  }

  button {
    font-size: 25px;
    background: transparent;
    border: none;
    color: green;
    cursor: pointer;
  }
`;
