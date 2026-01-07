import React, { useMemo, useState } from "react";
import "./styles.css";

const CATEGORIES = ["Inicio", "Novedades", "Hogar", "Jardín", "Cocina", "Regalos", "Ofertas"];

const COLLECTIONS = [
  {
    title: "Imprescindibles de temporada",
    subtitle: "Selección destacada para esta semana",
    image:
      "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=1600&q=70",
  },
  {
    title: "Favoritos para el hogar",
    subtitle: "Decoración y detalles",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=70",
  },
  {
    title: "Selección de jardín",
    subtitle: "Exterior y plantas",
    image:
      "https://images.unsplash.com/photo-1492496913980-501348b61469?auto=format&fit=crop&w=1600&q=70",
  },
];

const PRODUCTS = [
  {
    id: "p1",
    title: "Tazón cerámico",
    price: 12990,
    tag: "Nuevo",
    image:
      "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=1200&q=70",
  },
  {
    id: "p2",
    title: "Servilletas de lino (set)",
    price: 17990,
    tag: "Más vendido",
    image:
      "https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=1200&q=70",
  },
  {
    id: "p3",
    title: "Macetero de escritorio",
    price: 14990,
    tag: "Tendencia",
    image:
      "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?auto=format&fit=crop&w=1200&q=70",
  },
  {
    id: "p4",
    title: "Vela aromática",
    price: 15990,
    tag: "Regalo",
    image:
      "https://images.unsplash.com/photo-1603006905393-8f1157b8038b?auto=format&fit=crop&w=1200&q=70",
  },
  {
    id: "p5",
    title: "Tabla de madera",
    price: 21990,
    tag: "Cocina",
    image:
      "https://images.unsplash.com/photo-1543353071-087092ec393a?auto=format&fit=crop&w=1200&q=70",
  },
  {
    id: "p6",
    title: "Manta decorativa",
    price: 29990,
    tag: "Hogar",
    image:
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=70",
  },
];

function formatCLP(value) {
  return value.toLocaleString("es-CL", { style: "currency", currency: "CLP" });
}

/** ---- Carrito (demo) helpers ---- */
function addItem(cart, product, qty = 1) {
  const found = cart.find((i) => i.id === product.id);
  if (found) {
    return cart.map((i) => (i.id === product.id ? { ...i, qty: i.qty + qty } : i));
  }
  return [...cart, { id: product.id, title: product.title, price: product.price, image: product.image, qty }];
}

function setQty(cart, productId, qty) {
  if (qty <= 0) return cart.filter((i) => i.id !== productId);
  return cart.map((i) => (i.id === productId ? { ...i, qty } : i));
}

function countItems(cart) {
  return cart.reduce((sum, i) => sum + i.qty, 0);
}

function totalCart(cart) {
  return cart.reduce((sum, i) => sum + i.price * i.qty, 0);
}

/** ---- UI ---- */
function Header({
  categories,
  onCategory,
  activeCategory,
  query,
  setQuery,
  cartCount,
  onOpenCart,
}) {
  return (
    <header className="header">
      <div className="topbar">
        <div className="container topbar__inner">
          <p className="topbar__text">
            Demo visual (sin pago real aún). Carrito funcional de muestra.
          </p>
          <div className="topbar__links">
            <a href="#ayuda">Ayuda</a>
            <a href="#cuenta">Cuenta</a>
          </div>
        </div>
      </div>

      <div className="nav">
        <div className="container nav__inner">
          <div className="brand">
            <span className="brand__mark">●</span> TIENDA DEMO
          </div>

          <nav className="menu" aria-label="Categorías">
            {categories.map((c) => (
              <button
                key={c}
                className={`menu__item ${activeCategory === c ? "is-active" : ""}`}
                onClick={() => onCategory(c)}
                type="button"
              >
                {c}
              </button>
            ))}
          </nav>

          <div className="actions">
            <div className="search">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar productos..."
                aria-label="Buscar"
              />
            </div>

            <button className="iconBtn" type="button" title="Favoritos (demo)">
              ♡
            </button>

            <button
              className="iconBtn"
              type="button"
              title="Carrito"
              onClick={onOpenCart}
            >
              🛒
              <span className="badge">{cartCount}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero">
      <div className="hero__bg" />
      <div className="container hero__inner">
        <div className="hero__content">
          <p className="kicker">Colección destacada</p>
          <h1>Diseño limpio con foco en productos e imágenes</h1>
          <p className="lead">
            Esta demo muestra look & feel + carrito funcional. El pago (Webpay o Mercado Pago)
            se integra en la siguiente etapa.
          </p>
          <div className="hero__cta">
            <button className="btn btn--primary" type="button">
              Ver colección
            </button>
            <button className="btn btn--ghost" type="button">
              Ver catálogo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Collections({ items }) {
  return (
    <section className="section">
      <div className="container">
        <div className="section__head">
          <h2>Colecciones</h2>
          <p>Bloques grandes con imagen, similar al estilo de la referencia.</p>
        </div>

        <div className="collections">
          {items.map((it) => (
            <article key={it.title} className="collectionCard">
              <div
                className="collectionCard__img"
                style={{ backgroundImage: `url(${it.image})` }}
                role="img"
                aria-label={it.title}
              />
              <div className="collectionCard__body">
                <h3>{it.title}</h3>
                <p>{it.subtitle}</p>
                <button className="linkBtn" type="button">
                  Ver más →
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductGrid({ products, onQuickView, onAdd }) {
  return (
    <section className="section section--tight">
      <div className="container">
        <div className="section__head">
          <h2>Productos</h2>
          <p>Grilla responsiva. Vista rápida y agregar al carrito (demo).</p>
        </div>

        <div className="grid">
          {products.map((p) => (
            <article className="card" key={p.id}>
              <div className="card__media">
                <img src={p.image} alt={p.title} loading="lazy" />
                <span className="pill">{p.tag}</span>
                <button className="quickBtn" type="button" onClick={() => onQuickView(p)}>
                  Vista rápida
                </button>
              </div>

              <div className="card__body">
                <h3 className="card__title">{p.title}</h3>
                <div className="card__row">
                  <span className="price">{formatCLP(p.price)}</span>
                  <button className="miniBtn" type="button" onClick={() => onAdd(p)}>
                    Agregar
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div>
          <div className="brand brand--footer">
            <span className="brand__mark">●</span> TIENDA DEMO
          </div>
          <p className="muted">
            Demo visual. Próximo paso: catálogo real, panel de administración y pagos.
          </p>
        </div>

        <div className="footer__cols">
          <div>
            <h4>Información</h4>
            <a href="#envios">Envíos</a>
            <a href="#cambios">Cambios</a>
            <a href="#contacto">Contacto</a>
          </div>
          <div>
            <h4>Legal</h4>
            <a href="#tyc">Términos</a>
            <a href="#priv">Privacidad</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function QuickViewModal({ product, onClose, onAdd }) {
  if (!product) return null;
  return (
    <div className="modal" role="dialog" aria-modal="true">
      <div className="modal__backdrop" onClick={onClose} />
      <div className="modal__panel">
        <button className="modal__close" onClick={onClose} type="button">
          ✕
        </button>
        <div className="modal__content">
          <img className="modal__img" src={product.image} alt={product.title} />
          <div className="modal__side">
            <p className="kicker">{product.tag}</p>
            <h3 className="modal__title">{product.title}</h3>
            <p className="modal__price">{formatCLP(product.price)}</p>
            <p className="muted modal__desc">
              Descripción de ejemplo. Luego se conecta a base de datos y productos reales.
            </p>

            <div className="modal__actions">
              <button className="btn btn--primary" type="button" onClick={() => onAdd(product)}>
                Agregar al carrito
              </button>
              <button className="btn btn--ghost" onClick={onClose} type="button">
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Drawer lateral del carrito */
function CartDrawer({ open, onClose, cart, onInc, onDec, onRemove }) {
  if (!open) return null;

  const total = totalCart(cart);

  return (
    <div className="drawerWrap" role="dialog" aria-modal="true">
      <div className="drawerBackdrop" onClick={onClose} />
      <aside className="drawer">
        <div className="drawer__head">
          <h3>Carrito</h3>
          <button className="drawer__close" onClick={onClose} type="button">
            ✕
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="drawer__empty">
            <p className="muted">Tu carrito está vacío.</p>
            <button className="btn btn--ghost" type="button" onClick={onClose}>
              Seguir viendo productos
            </button>
          </div>
        ) : (
          <>
            <div className="drawer__items">
              {cart.map((it) => (
                <div className="cartItem" key={it.id}>
                  <img className="cartItem__img" src={it.image} alt={it.title} />
                  <div className="cartItem__mid">
                    <div className="cartItem__title">{it.title}</div>
                    <div className="cartItem__meta">{formatCLP(it.price)}</div>

                    <div className="qty">
                      <button className="qty__btn" type="button" onClick={() => onDec(it.id)}>
                        −
                      </button>
                      <span className="qty__num">{it.qty}</span>
                      <button className="qty__btn" type="button" onClick={() => onInc(it.id)}>
                        +
                      </button>
                      <button className="removeBtn" type="button" onClick={() => onRemove(it.id)}>
                        Quitar
                      </button>
                    </div>
                  </div>

                  <div className="cartItem__right">{formatCLP(it.price * it.qty)}</div>
                </div>
              ))}
            </div>

            <div className="drawer__foot">
              <div className="sumRow">
                <span>Total</span>
                <strong>{formatCLP(total)}</strong>
              </div>

              <button className="btn btn--primary btn--full" type="button" disabled>
                Continuar al pago (demo)
              </button>
              <p className="drawer__note">
                Nota: el pago real se habilita al integrar Webpay o Mercado Pago.
              </p>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

export default function App() {
  const [activeCategory, setActiveCategory] = useState("Inicio");
  const [query, setQuery] = useState("");
  const [quick, setQuick] = useState(null);

  // Carrito
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState([]);

  const cartCount = useMemo(() => countItems(cart), [cart]);

  const addToCart = (product) => {
    setCart((prev) => addItem(prev, product, 1));
    setCartOpen(true);
  };
  const inc = (id) => setCart((prev) => {
    const item = prev.find((i) => i.id === id);
    return item ? setQty(prev, id, item.qty + 1) : prev;
  });
  const dec = (id) => setCart((prev) => {
    const item = prev.find((i) => i.id === id);
    return item ? setQty(prev, id, item.qty - 1) : prev;
  });
  const remove = (id) => setCart((prev) => prev.filter((i) => i.id !== id));

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PRODUCTS.filter((p) => {
      const matchQuery = !q || p.title.toLowerCase().includes(q);
      const matchCat = activeCategory === "Inicio" || activeCategory === "Novedades" || p.tag === activeCategory;
      return matchQuery && matchCat;
    });
  }, [activeCategory, query]);

  return (
    <div className="app">
      <Header
        categories={CATEGORIES}
        onCategory={setActiveCategory}
        activeCategory={activeCategory}
        query={query}
        setQuery={setQuery}
        cartCount={cartCount}
        onOpenCart={() => setCartOpen(true)}
      />

      <main>
        <Hero />
        <Collections items={COLLECTIONS} />
        <ProductGrid products={filtered} onQuickView={setQuick} onAdd={addToCart} />
      </main>

      <Footer />

      <QuickViewModal
        product={quick}
        onClose={() => setQuick(null)}
        onAdd={(p) => {
          addToCart(p);
          setQuick(null);
        }}
      />

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onInc={inc}
        onDec={dec}
        onRemove={remove}
      />
    </div>
  );
}
