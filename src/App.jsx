import { useEffect, useState } from "react";
import styled from "styled-components";

const AppContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  background-color: #282c34;
  min-height: 100vh;
`;

const Card = styled.section`
  width: 35rem;
  padding: 1rem;
  border: 2px solid #fff;
  border-radius: 25px;
`;

const CardHeader = styled.header`
  border-bottom: 1px solid #fff;
  padding: 0 1rem 1rem 1rem;
`;

const CardTitle = styled.h2`
  color: #fff;
  font-weight: 700;
  text-align: center;
`;

const CardContent = styled.section`
  padding: 1rem 0;
`;

const List = styled.ul``;

const ListItem = styled.li`
  &:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

const ProductContainer = styled.section`
  display: flex;
`;

const ProductImage = styled.img`
  max-width: 20%;
`;

const ProductTitle = styled.h4`
  color: #fff;
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

const ProductStatus = styled.p`
  color: ${({ inStock }) => (inStock ? "green" : "red")};
  margin-bottom: 0.5rem;
`;

const ProductLink = styled.a``;

const ProductContentWrapper = styled.div`
  padding-left: 1rem;
`;

const renderProducts = (products) => {
  const companies = Object.keys(products);

  return companies.map((company) => (
    <Card key={company}>
      <CardHeader>
        <CardTitle>
          {company.charAt(0).toUpperCase() + company.slice(1)}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <List>
          {products[company].map(
            ({ productName, productInStock, productUrl, productImage }) => (
              <ListItem key={productName}>
                <ProductContainer>
                  {/* <img src={productImage} alt="" /> */}
                  <ProductImage src={productImage} />
                  <ProductContentWrapper>
                    <ProductTitle>{productName}</ProductTitle>
                    <ProductStatus inStock={productInStock}>
                      {productInStock ? "Finns i lager" : "Slut"}
                    </ProductStatus>
                    <ProductLink
                      href={productUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Gå till produkt
                    </ProductLink>
                  </ProductContentWrapper>
                </ProductContainer>
              </ListItem>
            )
          )}
        </List>
      </CardContent>
    </Card>
  ));
};

const App = () => {
  const [products, setProducts] = useState(null);

  console.log("state updated");

  useEffect(() => {
    const sse = new EventSource("http://localhost:3001/product-status");
    sse.onmessage = (e) => setProducts(JSON.parse(e.data));
  }, []);

  return <AppContainer>{products && renderProducts(products)}</AppContainer>;
};

export default App;
