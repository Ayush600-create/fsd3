import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useParams,
  useNavigate,
  Navigate
} from "react-router-dom";

/* Pages */

function Home() {
  return <h2>Home Page</h2>;
}

function About() {
  return <h2>About Page</h2>;
}

function Products() {
  return (
    <div>
      <h2>Products</h2>
      <Link to="/products/1">Product 1</Link>
    </div>
  );
}

function ProductDetail() {
  const { id } = useParams();
  return <h3>Product ID: {id}</h3>;
}

function Dashboard() {
  return <h2>Dashboard (Protected)</h2>;
}

function Login() {
  const navigate = useNavigate();

  const login = () => {
    localStorage.setItem("auth", "true");
    navigate("/dashboard");
  };

  return <button onClick={login}>Login</button>;
}

function NotFound() {
  return <h1>404 - Page Not Found</h1>;
}

/* Protected Route */

function ProtectedRoute({ children }) {
  const isAuth = localStorage.getItem("auth") === "true";
  return isAuth ? children : <Navigate to="/login" />;
}

/* Main App */

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/about">About</Link> |{" "}
        <Link to="/products">Products</Link> |{" "}
        <Link to="/dashboard">Dashboard</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
