import React, { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  Package,
  ShoppingBag,
  MessageSquare,
  Users,
  Menu,
  LayoutDashboard,
  LogOut,
  Ticket,
  Upload,
  X,
  Loader2,
  Image as ImageIcon,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { createProduct } from "../redux/slice/productSlice";
import { toast } from "react-toastify";

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();
  const { sellerId } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState([]);
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    img: [],
    category: "",
    description: "",
    inStockValue: 0,
    visibility: true,
  });
  const location = useLocation();
  const dispatch = useDispatch();

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
      path: `/admin/`,
    },
    {
      name: "Products",
      icon: <Package className="w-5 h-5" />,
      path: `/admin/products/`,
    },
    {
      name: "Orders",
      icon: <ShoppingBag className="w-5 h-5" />,
      path: `/admin/orders/`,
    },
    {
      name: "Users",
      icon: <Users className="w-5 h-5" />,
      path: `/admin/customers/`,
    },
    {
      name: "Reviews",
      icon: <MessageSquare className="w-5 h-5" />,
      path: `/admin/reviews/`,
    },
  ];

  const toggleSidebar = () => {
    if (window.innerWidth < 1024) {
      setIsOpen(!isOpen);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
    console.log(productData);
  };

  const handleImageSelect = (event) => {
    const files = Array.from(event.target.files);
    if (files.length === 0) return;

    const fileURLs = files.map((file) => URL.createObjectURL(file));
    setSelectedFile(files);
    setProductData((prevData) => ({
      ...prevData,
      img: files,
    }));
  };

  const removeImage = (index) => {
    setSelectedFile((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsUploading(true);

      const response = await dispatch(createProduct(productData));

      if (response.meta.requestStatus === "fulfilled") {
        setProductData({
          name: "",
          price: "",
          img: [],
          category: "",
          description: "",
          productId: "",
          inStockValue: 0,
        });

        setUploadStatus("Product created successfully!");
        toast.success(`Product ${productData.name} created successfully`);
      } else {
        setUploadStatus("Error creating product: " + response.payload);
        toast.error(`Error creating product: ${response.payload}`);
      }
    } catch (error) {
      console.error("Error creating product:", error);
      setUploadStatus("Error creating product: " + error.message);
      toast.error(`Error creating product: ${error.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-screen bg-gray-800 shadow-xl transition-all duration-300
                    ${
                      isOpen
                        ? "translate-x-0 w-64"
                        : "-translate-x-full w-64 lg:translate-x-0 lg:w-20"
                    }`}
      >
        <div className="flex items-center justify-between p-6 border-b text-white">
          {isOpen && <div className="text-2xl font-bold">Zang Global</div>}
        </div>

        <div className="space-y-6 px-4">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="flex items-center gap-4 text-white py-2 hover:bg-gray-700 rounded-md"
            >
              {item.icon}
              {isOpen && <span>{item.name}</span>}
            </Link>
          ))}
        </div>


        
 
 


            
            
            
            
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
                          onClick={""}
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

      {/* Main Content Area */}
      <main className="h-full w-full ">
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
                <h3 className="text-base font-semibold text-gray-800">Product img</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <label className="flex-1 cursor-pointer group">
                      <div className="flex items-center justify-center h-36 px-4 transition-all border-2 border-dashed rounded-xl border-gray-300 group-hover:border-pink-400 group-hover:bg-pink-50/50">
                        <div className="flex flex-col items-center space-y-2 text-center">
                          <ImageIcon className="w-8 h-8 text-gray-400 group-hover:text-primary" />
                          <span className="text-sm text-gray-500 group-hover:text-primary">
                            {selectedFile.length > 0
                              ? `${selectedFile.length} img selected`
                              : "Drop img here or click to browse"}
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

                      // disabled={selectedFile.length === 0 || isUploading}
                      className={`px-4 py-2.5 rounded-lg flex items-center gap-2 transition-all ${selectedFile.length === 0 || isUploading
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
        <Outlet />

        
      </main>
    </div>
  );
};

export default AdminLayout;


