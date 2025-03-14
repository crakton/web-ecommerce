import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  Package,
  ShoppingBag,
  MessageSquare,
  Users,
  Calendar,
  Menu,
  LayoutDashboard,
  LogOut,
  Ticket,
  Upload,
  X,
  Loader2,
  Image as ImageIcon,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { createProduct } from "../../redux/slice/productSlice";



const Sidebar = () => {
  const navigate = useNavigate();
  const { sellerId } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState([]);
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    img: [],
    category: "",
    description: "",
    rating: 0,
    productId: "",
    inStockValue: 0,
    soldStockValue: 0,
  });
  const location = useLocation();

  const dispatch = useDispatch()

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuItems = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
      path: `/admin/${sellerId}`,
    },
    {
      name: "Products",
      icon: <Package className="w-5 h-5" />,
      path: `/admin/products/${sellerId}`,
    },
    {
      name: "Orders",
      icon: <ShoppingBag className="w-5 h-5" />,
      path: `/admin/orders/${sellerId}`,
    },

    {
      name: "Users",
      icon: <Users className="w-5 h-5" />,
      path: `/admin/customers/${sellerId}`,
    },

    {
      name: "Coupons",
      icon: <Ticket className="w-5 h-5" />,
      path: `/seller/coupons/${sellerId}`
    },
    {
      name: "Reviews",
      icon: <MessageSquare className="w-5 h-5" />,
      path: `/admin/reviews/${sellerId}`,
    },
  ];

  const toggleSidebar = () => {
    if (window.innerWidth < 1024) {
      setIsOpen(!isOpen);
    }
  };

  const generateProductId = () => {
    const randomId = Math.floor(100000 + Math.random() * 900000).toString();
    setProductData({ ...productData, productId: randomId });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
    console.log(productData)
  };

  const handleImageSelect = (event) => {
    const files = Array.from(event.target.files);
    const fileURLs = files.map(file => URL.createObjectURL(file)); // Generate preview URLs

    setSelectedFile(files);
    setProductData(prevData => ({
        ...prevData,
        img: fileURLs  // ✅ Store image URLs instead
    }));
};

  
  const removeImage = (index) => {
    setSelectedFile((prev) => prev.filter((_, i) => i !== index));
  };

  const handleLogout = async () => {
    try {
      const response = await fetch(
        "https://api.merabestie.com/admin/logout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ sellerId }),
        }
      );

      if (response.ok) {
        navigate("/seller/login");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setIsUploading(true)
      const response = dispatch(createProduct(productData)); // Await the dispatch
      console.log(productData)

      if (!response.error) { // Check if no error occurred

        setProductData({
          name: "",
          price: "",
          img: [],
          category: "",
          description: "",
          rating: 0,
          productId: "",
          inStockValue: 0,
          soldStockValue: 0,
        });
        setUploadStatus("Product created successfully!");
      } else {
        setUploadStatus("Error creating product: " + response.error.message);
      }
    } catch (error) {
      console.error("Error creating product:", error);
      setIsUploading(false)
      setUploadStatus("Error creating product: " + error.message);
    }
  };


  return (
    <>
      {/* Toggle button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 p-2 rounded-lg bg-white shadow-lg hover:bg-gray-100 lg:hidden z-50 transition-colors"
      >
        <Menu className="w-6 h-6 text-gray-600" />
      </button>

      {/* Product Dialog */}
      {showDialog && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto animate-in fade-in-0 zoom-in-95">
            {/* Header */}
            <div className="border-b p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-gray-800">Add New Product</h2>
                <button
                  onClick={() => setShowDialog(false)}
                  className="rounded-full p-2 hover:bg-gray-100 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-8">
              {/* Image Upload Section */}
              <section className="space-y-4">
  <h3 className="text-base font-semibold text-gray-800">Product Images</h3>
  <div className="space-y-4">
    <div className="flex items-center gap-4">
      <label className="flex-1 cursor-pointer group">
        <div className="flex items-center justify-center h-36 px-4 transition-all border-2 border-dashed rounded-xl border-gray-300 group-hover:border-pink-400 group-hover:bg-pink-50/50">
          <div className="flex flex-col items-center space-y-2 text-center">
            <ImageIcon className="w-8 h-8 text-gray-400 group-hover:text-primary" />
            <span className="text-sm text-gray-500 group-hover:text-primary">
              {selectedFile.length > 0
                ? `${selectedFile.length} images selected`
                : "Drop images here or click to browse"}
            </span>
          </div>
          <input
            type="file"
            accept="image/*"
            multiple  // Allow multiple files
            onChange={handleImageSelect}
            className="hidden"
            disabled={isUploading}
          />
        </div>
      </label>
      <button
    
        disabled={selectedFile.length === 0 || isUploading}
        className={`px-4 py-2.5 rounded-lg flex items-center gap-2 transition-all ${
          selectedFile.length === 0 || isUploading
            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
            : "bg-secondary hover:bg-primary text-white shadow-sm"
        }`}
      >
        {isUploading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <Upload className="w-5 h-5" />
        )}
        <span className="font-medium">{isUploading ? "Uploading..." : "Upload"}</span>
      </button>
    </div>

    {/* Image Preview Grid */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {selectedFile.map((file, index) => (
        <div key={index} className="relative group rounded-xl overflow-hidden shadow-sm">
          <img
            src={URL.createObjectURL(file)}
            alt={`Preview ${index + 1}`}
            className="w-full h-24 object-cover"
          />
          <button
            onClick={() => removeImage(index)}
            className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>
      ))}
    </div>
  </div>
</section>

              {/* Product Modal */}
              <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Product Name</label>
                  <input
                    type="text"
                    name="name"
                    value={productData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition-shadow outline-none"
                    placeholder="Enter product name"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Price</label>
                  <input
                    type="number"
                    name="price"
                    value={productData.price}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition-shadow outline-none"
                    placeholder="Enter price"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Category</label>
                  <select
                    name="category"
                    value={productData.category}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition-shadow outline-none"
                  >
                    <option value="">Select Category</option>
                    <option value="fashion">Fashion</option>
                    <option value="gift-items">Gift Items</option>
                    <option value="greeting-cards">Greeting Cards</option>
                    <option value="stationary">Stationary</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Rating</label>
                  <input
                    type="number"
                    name="rating"
                    value={productData.rating}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition-shadow outline-none"
                    min={0}
                    max={5}
                    step={0.1}
                    placeholder="Enter rating (0-5)"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Product ID</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      name="productId"
                      value={productData.productId}
                      readOnly
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 outline-none"
                      placeholder="Click generate to create ID"
                    />
                    <button
                      onClick={generateProductId}
                      className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-primary transition-colors shadow-sm font-medium"
                    >
                      Generate
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Stock Information</label>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="number"
                      name="inStockValue"
                      value={productData.inStockValue}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition-shadow outline-none"
                      placeholder="In Stock"
                    />
                    <input
                      type="number"
                      name="soldStockValue"
                      value={productData.soldStockValue}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition-shadow outline-none"
                      placeholder="Sold Stock"
                    />
                  </div>
                </div>
              </section>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={productData.description}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition-shadow outline-none"
                  rows={4}
                  placeholder="Enter product description"
                />
              </div>

              {/* Form Actions */}
              <div className="flex items-center justify-end gap-3 pt-6 border-t">
                <button
                  onClick={() => setShowDialog(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                      onClick={handleSubmit}
                      className={`px-4 py-2.5 rounded-lg flex items-center gap-2 transition-all ${!selectedFile || isUploading
                          ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                          : 'bg-green-600 hover:bg-green-400 text-white shadow-sm'
                        }`}
                    >
                      {isUploading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <Upload className="w-5 h-5" />
                      )}
                      <span className="font-medium">{isUploading ? 'Creating...' : 'Create Product'}</span>
                    </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-screen bg-gradient-to-b from-pink-50 to-white shadow-xl transition-all duration-300 
                  lg:translate-x-0 lg:w-64 z-40
                  ${isOpen ? "translate-x-0 w-64" : "-translate-x-full w-64 lg:translate-x-0 lg:w-20"}`}
      >
        <div className="flex items-center justify-between p-6 border-b">
          {isOpen && (
            <div className="text-2xl font-bold text-primary">
              Zang Global
            </div>
          )}
        </div>

        <div className="flex flex-col h-[calc(100vh-160px)] justify-between">
          <nav className="flex-1 px-4 py-6">
            <ul className="space-y-1">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center px-4 py-3 rounded-lg transition-all
                      ${location.pathname === item.path
                        ? "bg-pink-100 text-primary"
                        : "text-gray-600 hover:bg-pink-50 hover:text-primary"
                      }
                      ${isOpen ? "justify-start space-x-3" : "justify-center"}`}
                  >
                    {item.icon}
                    {isOpen && <span className="font-medium">{item.name}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="p-4 space-y-4">
            {isOpen && (
              <>
                <button
                  onClick={() => setShowDialog(true)}
                  className="w-full flex items-center justify-center px-4 py-2 bg-green-600 text-green-100 rounded-lg hover:bg-primary transition-colors"
                >
                  <Package className="w-5 h-5 mr-2" />
                  Add Product
                </button>

                <Link
                  to="/"
                  className="w-full flex items-center justify-center px-4 py-2 bg-secondary text-white rounded-lg hover:bg-mutedSecondary transition-colors"
                >
                  Go to Website
                </Link>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-primary transition-colors"
                >
                  <LogOut className="w-5 h-5 mr-2" />
                  Logout
                </button>

                <div className="text-center text-gray-400 text-sm">
                  Zang Global Admin © 2024
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;