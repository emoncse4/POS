import React, {useState, useEffect} from 'react';
import axios from 'axios';
import LayoutApp from '../../components/Layout';
import Product from '../../components/Product';
import { Col, Row } from 'antd';
import { useDispatch } from 'react-redux';

const Home = () => {

  const dispatch = useDispatch();

  const[productData, setProductData] = useState([]);
  const[selectedCategory, setSelectedCategory] = useState('pizzas');
  const categories = [
    {
      name: "pizzas",
      imageUrl: "https://www.kindpng.com/picc/m/268-2680281_-pizza-soleil-food-cartoon-food-stickers-menu.png"
    },
    {
      name: "burgers",
      imageUrl: "https://www.citypng.com/public/uploads/preview/-21600800191xwelbjhtcu.png"
    },
    {
      name: "drinks",
      imageUrl: "https://i.pinimg.com/736x/e5/f9/df/e5f9dfc28deaf252ad0908de2981749d.jpg"
    },
  ]

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        dispatch({
          type: "SHOW_LOADING",
        });
        const {data} = await axios.get('/api/products/getproducts')
        setProductData(data);
        dispatch({
          type: "HIDE_LOADING",
        });
        console.log(data);
      }catch(error) {
        console.log(error);
      }
    };
    getAllProducts();
  }, [dispatch])

  return (
    <LayoutApp>
      <div className="category">
        {categories.map((category) => (
          <div key={category.name} className={`categoryFlex ${selectedCategory === category.name && 'category-active'}`} onClick={() => setSelectedCategory(category.name)}>
            <h3 className="categoryName">{category.name}</h3>
            <img src={category.imageUrl} alt={category.name} height={60} width={60} />
          </div>
        ))}
      </div>
      <Row>
        {productData.filter((i) => i.category === selectedCategory).map(product => (
          <Col xs={24} sm={6} md={12} lg={6} >
            <Product key={product.id} product={product} />
          </Col>
        ))}
      </Row>
    </LayoutApp>
  )
};

export default Home