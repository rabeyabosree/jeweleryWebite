import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AllProduct } from "../../redux/reducers/productReducer";

function ShopPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products, error, loading } = useSelector((state) => state.products);

  // 🔹 Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSales, setSelectedSales] = useState([]);
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);

  // 🔹 Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // 🔹 Unique filter values
  const uniqueCategories = [...new Set(products.map((p) => p.category))];
  const uniqueSales = [...new Set(products.map((p) => p.sale))];
  const uniqueMaterials = [...new Set(products.flatMap((p) => p.materials))];

  // 🔹 Price ranges
  const priceRanges = [
    { label: "Under 5,000", min: 0, max: 5000 },
    { label: "5,000 - 10,000", min: 5000, max: 10000 },
    { label: "10,000 - 20,000", min: 10000, max: 20000 },
    { label: "20,000 - 50,000", min: 20000, max: 50000 },
    { label: "Above 50,000", min: 50000, max: Infinity }
  ];

  // 🔹 Toggle functions
  const toggleSelection = (value, selectedArray, setSelectedArray) => {
    if (selectedArray.includes(value)) {
      setSelectedArray(selectedArray.filter((v) => v !== value));
    } else {
      setSelectedArray([...selectedArray, value]);
    }
    setCurrentPage(1); // Reset page when filter changes
  };

  const togglePriceRange = (label) => {
    if (selectedPriceRanges.includes(label)) {
      setSelectedPriceRanges(selectedPriceRanges.filter((l) => l !== label));
    } else {
      setSelectedPriceRanges([...selectedPriceRanges, label]);
    }
    setCurrentPage(1); // Reset page when filter changes
  };

  // 🔹 Filtered products
  const filteredProducts = products
    .filter((p) =>
      selectedCategories.length > 0 ? selectedCategories.includes(p.category) : true
    )
    .filter((p) =>
      selectedSales.length > 0 ? selectedSales.includes(p.sale) : true
    )
    .filter((p) =>
      selectedMaterials.length > 0
        ? p.materials.some((m) => selectedMaterials.includes(m))
        : true
    )
    .filter((p) =>
      selectedPriceRanges.length > 0
        ? selectedPriceRanges.some((label) => {
            const range = priceRanges.find((r) => r.label === label);
            return p.price >= range.min && p.price < range.max;
          })
        : true
    )
    .filter((p) =>
      searchTerm ? p.title.toLowerCase().includes(searchTerm.toLowerCase()) : true
    );

  // 🔹 Pagination calculations
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentItems = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    dispatch(AllProduct());
  }, [dispatch]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="min-h-screen">
      {/* Hero section */}
      <div className="py-12 bg-[#d4a373] text-center text-white">
        <h1 className="text-4xl font-semibold tracking-wide">Shop Page</h1>
        <p className="mt-2 text-sm opacity-90">
          Explore our beautiful jewelry collections and find your perfect piece
        </p>
        <div className="flex items-center justify-center mt-4 text-sm">
          <a href="/" className="hover:underline">Home</a>
          <MdKeyboardArrowRight className="text-lg" />
          <a href="/shop" className="hover:underline">Shop</a>
        </div>
      </div>

      {/* Main layout */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8 py-10 px-6">
        {/* Left Sidebar — Filters */}
        <aside className="p-5 h-fit space-y-6">
          {/* Search input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // reset page on search
              }}
              className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d4a373] pr-10"
            />
            <CiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-xl cursor-pointer" />
          </div>

          {/* Categories Filter */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Categories</h3>
            <ul className="space-y-2 text-gray-700">
              {uniqueCategories.map((cat) => (
                <li key={cat}>
                  <label className="flex items-center gap-2 cursor-pointer hover:text-[#d4a373]">
                    <input
                      type="checkbox"
                      className="accent-[#d4a373]"
                      checked={selectedCategories.includes(cat)}
                      onChange={() =>
                        toggleSelection(cat, selectedCategories, setSelectedCategories)
                      }
                    />
                    {cat}
                  </label>
                </li>
              ))}
            </ul>
          </div>

          {/* Sale Filter */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Sale</h3>
            <ul className="space-y-2 text-gray-700">
              {uniqueSales.map((s) => (
                <li key={s}>
                  <label className="flex items-center gap-2 cursor-pointer hover:text-[#d4a373]">
                    <input
                      type="checkbox"
                      className="accent-[#d4a373]"
                      checked={selectedSales.includes(s)}
                      onChange={() =>
                        toggleSelection(s, selectedSales, setSelectedSales)
                      }
                    />
                    {s}% Off
                  </label>
                </li>
              ))}
            </ul>
          </div>

          {/* Materials Filter */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Materials</h3>
            <ul className="space-y-2 text-gray-700">
              {uniqueMaterials.map((m) => (
                <li key={m}>
                  <label className="flex items-center gap-2 cursor-pointer hover:text-[#d4a373]">
                    <input
                      type="checkbox"
                      className="accent-[#d4a373]"
                      checked={selectedMaterials.includes(m)}
                      onChange={() =>
                        toggleSelection(m, selectedMaterials, setSelectedMaterials)
                      }
                    />
                    {m}
                  </label>
                </li>
              ))}
            </ul>
          </div>

          {/* Price Range Filter */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Price Range</h3>
            <ul className="space-y-2 text-gray-700">
              {priceRanges.map((range) => (
                <li key={range.label}>
                  <label className="flex items-center gap-2 cursor-pointer hover:text-[#d4a373]">
                    <input
                      type="checkbox"
                      className="accent-[#d4a373]"
                      checked={selectedPriceRanges.includes(range.label)}
                      onChange={() => togglePriceRange(range.label)}
                    />
                    {range.label}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Right Side — Products List */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Shop Collection</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentItems.length > 0 ? (
              currentItems.map((item) => (
                <div
                  key={item._id}
                  className="overflow-hidden hover:shadow-lg transition bg-white rounded-lg cursor-pointer"
                  onClick={() => navigate(`/shops/${item._id}`)}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-56 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                    <p className="text-gray-600 text-sm mb-2">{item.category}</p>
                    <p className="text-[#d4a373] font-semibold mb-3">{item.price}</p>
                    <button className="w-full bg-[#d4a373] text-white py-2 rounded-md hover:bg-[#b58457] transition">
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center col-span-full">No products found.</p>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                Prev
              </button>
              {Array.from({ length: totalPages }, (_, idx) => (
                <button
                  key={idx + 1}
                  onClick={() => setCurrentPage(idx + 1)}
                  className={`px-3 py-1 rounded ${
                    currentPage === idx + 1
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                Next
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default ShopPage;
