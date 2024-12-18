// const express = require('express');
// const bodyParser = require('body-parser');
// const app = express();
// const PORT = 5000;

// // Middleware
// app.use(bodyParser.json());

// // Mock Data
// const products = [
//   { id: 1, name: 'Áo sơ mi nam', category: 'Nam', price: 500000, bestSeller: true },
//   { id: 2, name: 'Áo phông nữ', category: 'Nữ', price: 300000, bestSeller: false },
//   { id: 3, name: 'Áo khoác nam', category: 'Nam', price: 800000, bestSeller: true },
// ];

// const cart = [];
// const users = [
//   { id: 1, username: 'user1', password: 'password1' },
// ];

// // Routes

// // GET /api/products: Lấy danh sách sản phẩm
// app.get('/api/products', (req, res) => {
//   res.json(products);
// });

// // GET /api/products/bestsellers: Lấy danh sách sản phẩm bán chạy
// app.get('/api/products/bestsellers', (req, res) => {
//   const bestSellers = products.filter(product => product.bestSeller);
//   res.json(bestSellers);
// });

// // POST /api/cart: Thêm sản phẩm vào giỏ hàng
// app.post('/api/cart', (req, res) => {
//   const { productId, quantity } = req.body;
//   const product = products.find(p => p.id === productId);

//   if (!product) {
//     return res.status(404).json({ error: 'Product not found' });
//   }

//   const existingItem = cart.find(item => item.productId === productId);
//   if (existingItem) {
//     existingItem.quantity += quantity;
//   } else {
//     cart.push({ productId, quantity });
//   }

//   res.json(cart);
// });

// // GET /api/cart: Lấy thông tin giỏ hàng
// app.get('/api/cart', (req, res) => {
//   const cartDetails = cart.map(item => {
//     const product = products.find(p => p.id === item.productId);
//     return { ...product, quantity: item.quantity };
//   });
//   res.json(cartDetails);
// });

// // POST /api/search: Tìm kiếm sản phẩm
// app.post('/api/search', (req, res) => {
//   const { query } = req.body;
//   const results = products.filter(product =>
//     product.name.toLowerCase().includes(query.toLowerCase())
//   );
//   res.json(results);
// });

// // POST /api/user/login: Người dùng đăng nhập
// app.post('/api/user/login', (req, res) => {
//   const { username, password } = req.body;
//   const user = users.find(u => u.username === username && u.password === password);

//   if (!user) {
//     return res.status(401).json({ error: 'Invalid credentials' });
//   }

//   res.json({ message: 'Login successful', userId: user.id });
// });

// // Start Server
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });
