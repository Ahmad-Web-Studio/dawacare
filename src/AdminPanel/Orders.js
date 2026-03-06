import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import "./AdminPanel.css";

const statusClass = {
  Pending:    "badge badge-processing",
  Processing: "badge badge-processing",
  Shipped:    "badge badge-shipped",
  Cancelled:  "badge badge-cancelled",
  Delivered:  "badge badge-delivered",
};

const Orders = () => {
  const [orders, setOrders]             = useState([]);
  const [loading, setLoading]           = useState(true);
  const [search, setSearch]             = useState("");
  const [orderStatus, setOrderStatus]   = useState("All Order Status");
  const [paymentStatus, setPaymentStatus] = useState("All Payment Status");
  const [selectedOrder, setSelectedOrder] = useState(null);

  // ── Fetch orders from Firestore ──────────────────────────────
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const snapshot = await getDocs(collection(db, "orders"));
        const data = snapshot.docs.map((docSnap) => ({
          docId: docSnap.id,
          ...docSnap.data(),
        }));
        // Sort newest first
        data.sort((a, b) => b.createdAt?.seconds - a.createdAt?.seconds);
        setOrders(data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  // ── Update status in Firestore + local state ─────────────────
  const handleStatusChange = async (docId, newStatus) => {
    try {
      await updateDoc(doc(db, "orders", docId), { status: newStatus });
      setOrders((prev) =>
        prev.map((o) => (o.docId === docId ? { ...o, status: newStatus } : o))
      );
      if (selectedOrder?.docId === docId) {
        setSelectedOrder((prev) => ({ ...prev, status: newStatus }));
      }
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  // ── Helpers ──────────────────────────────────────────────────
  const formatDate = (ts) => {
    if (!ts?.seconds) return "—";
    return new Date(ts.seconds * 1000).toLocaleString();
  };

  const fullName = (order) =>
    `${order.customerDetails?.firstName ?? ""} ${order.customerDetails?.lastName ?? ""}`.trim() || "—";

  const fullAddress = (cd) =>
    [cd?.street, cd?.address2, cd?.city, cd?.region, cd?.country, cd?.postalCode]
      .filter(Boolean)
      .join(", ");

  const itemTotal = (items = []) =>
    items.reduce((sum, i) => sum + (i.newPrice ?? 0) * (i.quantity ?? 1), 0);

  // ── Filter ───────────────────────────────────────────────────
  const filtered = orders.filter((o) => {
    const name = fullName(o).toLowerCase();
    const id   = (o.docId ?? "").toLowerCase();
    const matchSearch  = name.includes(search.toLowerCase()) || id.includes(search.toLowerCase());
    const matchOrder   = orderStatus   === "All Order Status"   || o.status === orderStatus;
    const matchPayment = paymentStatus === "All Payment Status" || o.customerDetails?.paymentMethod === paymentStatus;
    return matchSearch && matchOrder && matchPayment;
  });

  // ── Stats ────────────────────────────────────────────────────
  const totalRevenue = orders.reduce((sum, o) => sum + (o.total ?? 0), 0);
  const pendingCount   = orders.filter((o) => o.status === "Pending" || o.status === "Processing").length;
  const deliveredCount = orders.filter((o) => o.status === "Delivered").length;

  // ── Render ───────────────────────────────────────────────────
  return (
    <div className="orders-page">
      <h1 className="orders-title">Orders</h1>

      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Total Orders</div>
          <div className="stat-value">{orders.length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Pending Orders</div>
          <div className="stat-value">{pendingCount}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Delivered Orders</div>
          <div className="stat-value">{deliveredCount}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Total Revenue</div>
          <div className="stat-value">Rs. {totalRevenue.toLocaleString()}</div>
        </div>
      </div>

      {/* Filters */}
      <div className="filters">
        <input
          className="order-search-input"
          type="text"
          placeholder="Search by Order ID or customer name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="filter-select"
          value={orderStatus}
          onChange={(e) => setOrderStatus(e.target.value)}
        >
          <option>All Order Status</option>
          <option>Pending</option>
          <option>Processing</option>
          <option>Shipped</option>
          <option>Cancelled</option>
          <option>Delivered</option>
        </select>
        <select
          className="filter-select"
          value={paymentStatus}
          onChange={(e) => setPaymentStatus(e.target.value)}
        >
          <option>All Payment Status</option>
          <option>cod</option>
          <option>online</option>
        </select>
      </div>

      {/* Table */}
      <div className="table-wrapper">
        {loading ? (
          <div className="orders-loading">Loading orders…</div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((order) => (
                <tr key={order.docId}>
                  <td><span className="order-id">#{order.docId.slice(0, 8)}</span></td>
                  <td>{fullName(order)}</td>
                  <td>{formatDate(order.createdAt)}</td>
                  <td><span className="amount">Rs. {(order.total ?? 0).toLocaleString()}</span></td>
                  <td>
                    <span className="payment-method">
                      {order.customerDetails?.paymentMethod?.toUpperCase() ?? "—"}
                    </span>
                  </td>
                  <td>
                    <span className={statusClass[order.status] || "badge"}>
                      {order.status ?? "—"}
                    </span>
                  </td>
                  <td>
                    <div className="action-cell">
                      <button
                        className="btn-view"
                        onClick={() => setSelectedOrder(order)}
                      >
                        View
                      </button>
                      <select
                        className="action-select"
                        value={order.status ?? "Pending"}
                        onChange={(e) => handleStatusChange(order.docId, e.target.value)}
                      >
                        <option>Pending</option>
                        <option>Processing</option>
                        <option>Shipped</option>
                        <option>Delivered</option>
                        <option>Cancelled</option>
                      </select>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && !loading && (
                <tr>
                  <td colSpan="7" className="no-results">No orders found.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* ── Order Slip Modal ── */}
      {selectedOrder && (
        <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
          <div className="modal-slip" onClick={(e) => e.stopPropagation()}>

            {/* Header */}
            <div className="slip-header">
              <div className="slip-brand">
                <div className="slip-brand-dot" />
                <span>AdminPanel</span>
              </div>
              <button className="slip-close" onClick={() => setSelectedOrder(null)}>
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>

            <div className="slip-divider" />

            {/* Title + Status */}
            <div className="slip-title-row">
              <h2 className="slip-title">Order Receipt</h2>
              <span className={statusClass[selectedOrder.status] || "badge"}>
                {selectedOrder.status}
              </span>
            </div>
            <p className="slip-order-id">#{selectedOrder.docId}</p>
            <p className="slip-date">{formatDate(selectedOrder.createdAt)}</p>

            <div className="slip-divider dashed" />

            {/* Customer Information */}
            <div className="slip-section-label">Customer Information</div>
            <div className="slip-info-grid">
              <div className="slip-info-row">
                <span className="slip-info-key">Name</span>
                <span className="slip-info-val">{fullName(selectedOrder)}</span>
              </div>
              <div className="slip-info-row">
                <span className="slip-info-key">Email</span>
                <span className="slip-info-val">{selectedOrder.customerDetails?.email ?? "—"}</span>
              </div>
              <div className="slip-info-row">
                <span className="slip-info-key">Phone</span>
                <span className="slip-info-val">{selectedOrder.customerDetails?.phone ?? "—"}</span>
              </div>
              <div className="slip-info-row">
                <span className="slip-info-key">Address</span>
                <span className="slip-info-val">{fullAddress(selectedOrder.customerDetails)}</span>
              </div>
              <div className="slip-info-row">
                <span className="slip-info-key">Payment</span>
                <span className="slip-info-val">
                  {selectedOrder.customerDetails?.paymentMethod?.toUpperCase() ?? "—"}
                </span>
              </div>
              {selectedOrder.customerDetails?.orderNotes && (
                <div className="slip-info-row">
                  <span className="slip-info-key">Notes</span>
                  <span className="slip-info-val">{selectedOrder.customerDetails.orderNotes}</span>
                </div>
              )}
            </div>

            <div className="slip-divider dashed" />

            {/* Order Items */}
            <div className="slip-section-label">Order Items</div>
            <div className="slip-items-header">
              <span>Product</span>
              <span>Qty</span>
              <span>Price</span>
            </div>

            {(selectedOrder.items ?? []).map((item, i) => (
              <div className="slip-item-row" key={i}>
                <div className="slip-item-info">
                  <img
                    className="slip-item-img"
                    src={item.productImage}
                    alt={item.productName}
                    onError={(e) => { e.target.style.display = "none"; }}
                  />
                  <div className="slip-item-meta">
                    <span className="slip-item-name">{item.productName}</span>
                    <span className="slip-item-brand">{item.brandName}</span>
                  </div>
                </div>
                <span>{item.quantity}</span>
                <div className="slip-item-prices">
                  <span className="slip-item-new">Rs. {(item.newPrice ?? 0).toLocaleString()}</span>
                  {item.oldPrice && item.oldPrice !== item.newPrice && (
                    <span className="slip-item-old">Rs. {item.oldPrice.toLocaleString()}</span>
                  )}
                  {item.discount && (
                    <span className="slip-item-discount">{item.discount} off</span>
                  )}
                </div>
              </div>
            ))}

            <div className="slip-divider" />

            {/* Totals */}
            <div className="slip-totals">
              <div className="slip-total-row">
                <span>Subtotal</span>
                <span>Rs. {itemTotal(selectedOrder.items).toLocaleString()}</span>
              </div>
              <div className="slip-total-row">
                <span>Shipping</span>
                <span>Rs. {(selectedOrder.shipping ?? 0).toLocaleString()}</span>
              </div>
              <div className="slip-total-row total-final">
                <span>Total</span>
                <span>Rs. {(selectedOrder.total ?? 0).toLocaleString()}</span>
              </div>
            </div>

            <div className="slip-divider dashed" />

            <p className="slip-footer">Thank you for your order!</p>

            <button className="slip-print-btn" onClick={() => window.print()}>
              🖨 Print Slip
            </button>

          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;