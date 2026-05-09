import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, LogOut, Menu, X } from "lucide-react";

// Product Data
const PRODUCTS = [
  {
    id: "p1",
    name: "Linen Drop Tee",
    brand: "VEKLAM BASICS",
    price: 42,
    cat: "T-Shirt",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=600&fit=crop",
    isNew: true,
    icon: "👕",
  },
  {
    id: "p2",
    name: "Cloud Hoodie",
    brand: "VEKLAM COZY",
    price: 89,
    cat: "Hoodie",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=500&h=600&fit=crop",
    isTrending: true,
    icon: "🧥",
  },
  {
    id: "p3",
    name: "Wide Leg Trousers",
    brand: "VEKLAM FIT",
    price: 67,
    cat: "Pants",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4b4fec?w=500&h=600&fit=crop",
    icon: "👖",
  },
  {
    id: "p4",
    name: "Oversized Coat",
    brand: "VEKLAM LUXE",
    price: 145,
    cat: "Coat",
    image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=500&h=600&fit=crop",
    isTrending: true,
    icon: "🧣",
  },
  {
    id: "p5",
    name: "Slip Midi Dress",
    brand: "VEKLAM LUXE",
    price: 98,
    cat: "Dress",
    image: "https://images.unsplash.com/photo-1572804013427-4d7ca7268217?w=500&h=600&fit=crop",
    isNew: true,
    icon: "👗",
  },
  {
    id: "p6",
    name: "Bucket Hat",
    brand: "VEKLAM BASICS",
    price: 28,
    cat: "Accessories",
    image: "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=500&h=600&fit=crop",
    icon: "🎩",
  },
];

export default function Home() {
  const [currentPage, setCurrentPage] = useState<string>("hero");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [cart, setCart] = useState<any[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const categories = ["All", "T-Shirt", "Hoodie", "Pants", "Coat", "Dress", "Accessories"];
  const filteredProducts =
    selectedCategory === "All"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.cat === selectedCategory);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email && password) {
      setCurrentPage("dashboard");
      setEmail("");
      setPassword("");
    }
  };

  const handleDemoLogin = (role: string): void => {
    setCurrentPage("dashboard");
  };

  const addToCart = (product: any): void => {
    setCart([...cart, product]);
  };

  const toggleWishlist = (id: string): void => {
    if (wishlist.includes(id)) {
      setWishlist(wishlist.filter((w) => w !== id));
    } else {
      setWishlist([...wishlist, id]);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-2xl font-black tracking-tight">VEKLAM</div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#" className="text-sm font-medium text-slate-600 hover:text-slate-900">
              Features
            </a>
            <button
              onClick={() => setCurrentPage("login")}
              className="text-sm font-medium text-slate-600 hover:text-slate-900"
            >
              Login
            </button>
            <Button
              onClick={() => setCurrentPage("login")}
              className="bg-amber-600 hover:bg-amber-700 text-white rounded-full px-6"
            >
              Get Started
            </Button>
          </div>
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      {currentPage === "hero" && (
        <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white min-h-screen flex items-center">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
              Redefining Fashion <br /> Ecosystems
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-8 font-light">
              The all-in-one platform for designers, manufacturers, and fashion enthusiasts to create, collaborate, and scale.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => setCurrentPage("login")}
                className="bg-amber-600 hover:bg-amber-700 text-white rounded-full px-8 py-6 text-lg font-semibold"
              >
                Explore Platform
              </Button>
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white/10 rounded-full px-8 py-6 text-lg font-semibold"
              >
                Learn More
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Login Section */}
      {currentPage === "login" && (
        <section className="pt-32 pb-20 px-4 min-h-screen flex items-center">
          <div className="max-w-md mx-auto w-full">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
              <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
              <p className="text-slate-600 mb-6">Sign in to access your fashion dashboard</p>

              <form onSubmit={handleLogin} className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 bg-slate-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 bg-slate-50"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white rounded-lg py-2 font-semibold"
                >
                  Sign In
                </Button>
              </form>

              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-slate-500">Or continue with your role</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button
                  onClick={() => handleDemoLogin("customer")}
                  variant="outline"
                  className="rounded-lg border-slate-300"
                >
                  Customer
                </Button>
                <Button
                  onClick={() => handleDemoLogin("designer")}
                  variant="outline"
                  className="rounded-lg border-slate-300"
                >
                  Designer
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Dashboard Section */}
      {currentPage === "dashboard" && (
        <section className="pt-24 pb-20 px-4">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-4xl font-bold">Veklam Shop</h2>
                <p className="text-slate-600 mt-2">Welcome back, Customer</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <ShoppingCart size={24} />
                  {cart.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cart.length}
                    </span>
                  )}
                </div>
                <Button
                  onClick={() => setCurrentPage("hero")}
                  variant="outline"
                  className="rounded-full"
                >
                  <LogOut size={18} className="mr-2" />
                  Logout
                </Button>
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-6 py-2 rounded-full font-medium whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? "bg-slate-900 text-white"
                      : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="relative aspect-square overflow-hidden bg-slate-200">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                    {product.isNew && (
                      <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                        NEW
                      </span>
                    )}
                    {product.isTrending && (
                      <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                        🔥 TREND
                      </span>
                    )}
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="absolute bottom-3 right-3 bg-white rounded-full p-2 shadow-lg hover:bg-slate-100 transition-all"
                    >
                      <Heart
                        size={20}
                        className={
                          wishlist.includes(product.id)
                            ? "fill-red-500 text-red-500"
                            : "text-slate-400"
                        }
                      />
                    </button>
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-slate-500 font-semibold mb-1">{product.brand}</p>
                    <h3 className="font-bold text-lg mb-3">{product.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-amber-600">${product.price}</span>
                      <Button
                        onClick={() => addToCart(product)}
                        className="bg-slate-900 hover:bg-slate-800 text-white rounded-lg px-4 py-2"
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
