
import { useEffect, useState } from "react";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import VendorCard from "./components/VendorCard.jsx";
import MenuList from "./components/MenuList.jsx";
import CartPage from "./components/CartPage.jsx";
import { Loading, ErrorMessage } from "./components/Status.jsx";

function App() {
  const [vendors, setVendors] = useState([]);
  const [selectedVendorId, setSelectedVendorId] =  useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  const [cart, setCart] = useState([]);
  const [view, setView] = useState("menu");
  const [lastOrder, setLastOrder] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch("/api/vendors.json", {
      signal: controller.signal
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setVendors(data);
        setSelectedVendorId(data[0]?.id ?? null);
        setError(null);
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, [reloadKey]);

  const selectedVendor = vendors.find(
    (vendor) => vendor.id === selectedVendorId
  );

  function handleAddToCart(item) {
    if (!item.available) return;

    setCart((prev) => {
      const existing = prev.find(
        (line) => line.item.id === item.id
      );

      if (existing) {
        return prev.map((line) =>
          line.item.id === item.id
            ? { ...line, qty: line.qty + 1 }
            : line
        );
      }

      return [...prev, { item, qty: 1 }];
    });
  }

  function handleChangeQty(itemId, delta) {
    setCart((prev) =>
      prev
        .map((line) =>
          line.item.id === itemId
            ? { ...line, qty: line.qty + delta }
            : line
        )
        .filter((line) => line.qty > 0)
    );
  }

  function handleRemove(itemId) {
    setCart((prev) =>
      prev.filter((line) => line.item.id !== itemId)
    );
  }

  const cartCount = cart.reduce(
    (sum, line) => sum + line.qty,
    0
  );

  function handlePlaceOrder(details) {
    const total = cart.reduce(
      (sum, line) => sum + line.item.price * line.qty,
      0
    );

    setLastOrder({ ...details, total });
    setCart([]);
    setView("done");
  }

  let content;

  if (view === "cart") {
    content = (
      <CartPage
        cart={cart}
        onChangeQty={handleChangeQty}
        onRemove={handleRemove}
        onPlaceOrder={handlePlaceOrder}
      />
    );
  } else if (view === "done") {
    content = (
      <div className="card">
        <h2>Order placed successfully!</h2>
        <p>Name: {lastOrder?.name}</p>
        <p>Mahallah: {lastOrder?.mahallah}</p>
        <p>Pickup time: {lastOrder?.pickupTime}</p>
        <h3>Total: RM {lastOrder?.total.toFixed(2)}</h3>
        <button
          className="btn"
          onClick={() => setView("menu")}
        >
          Back to Vendors
        </button>
      </div>
    );
  } else if (loading) {
    content = <Loading />;
  } else if (error) {
    content = (
      <ErrorMessage
        message={error}
        onRetry={() => {
          setLoading(true);
          setError(null);
          setReloadKey((k) => k + 1);
        }}
      />
    );
  } else {
    content = (
      <>
        <h2>Choose a Restaurant</h2>

        <div className="vendor-grid">
          {vendors.map((vendor) => (
            <VendorCard
              key={vendor.id}
              vendor={vendor}
              isSelected={vendor.id === selectedVendorId}
              onSelect={setSelectedVendorId}
            />
          ))}
        </div>

        {selectedVendor && (
          <>
            <h2>Menu: {selectedVendor.name}</h2>
            <MenuList
              items={selectedVendor.menu}
              onAdd={handleAddToCart}
            />
          </>
        )}
      </>
    );
  }

  return (
    <>
      <Header
        cartCount={cartCount}
        onShowMenu={() => setView("menu")}
        onShowCart={() => setView("cart")}
      />

      <main className="container">
        {content}
      </main>

      <Footer />
    </>
  );
}

export default App;
