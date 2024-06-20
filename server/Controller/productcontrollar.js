const Product = require('../Models/productmodel');
const { uploaded } = require('../utils/cloudinary');

// Controller function to add a new product
exports.addProduct = async (req, res) => {
  uploaded(req, res, async function(err) {
    if (err) {
      console.error('Error uploading image:', err);
      return res.status(500).json({ error: 'Failed to upload image' });
    }

    const { productName, price ,userName ,userEmail} = req.body;
    const imageUrl = req.file ? req.file.path : null;

    try {
      const product = new Product({ productName, price, imageUrl ,userName ,userEmail});
      await product.save();
      res.status(201).json({ message: 'Product added successfully', product });
    } catch (error) {
      console.error('Error adding product:', error);
      res.status(500).json({ error: 'Failed to add product' });
    }
  });
};

// Controller function to fetch all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};


exports.getProductsByUserName = async (req, res) => {
  try {
    const userName = req.params.userName;
    const products = await Product.find({ userName });
    if (products.length === 0) {
      return res.status(404).json({ message: 'No products found for this user' });
    }
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};



exports.deleteUser = async (req, res) => {
  try {
      const deletedDoctor = await Doctor.findByIdAndDelete(req.params.id);
      if (!deletedDoctor) {
          return res.status(404).json({ message: 'Doctor not found' });
      }
      res.status(200).json({ message: 'Doctor deleted successfully' });
  } catch (error) {
      res.status(500).json({ message: 'Error deleting doctor', error });
  }
};


exports.getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

