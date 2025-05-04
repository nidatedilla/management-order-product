SELECT
    o.id AS order_id,
    o.customer_name,
    o.order_date,
    SUM(oi.quantity) AS total_items,
    SUM(oi.quantity * oi.price) AS total_price
FROM
    orders o
    JOIN order_items oi ON o.id = oi.order_id
GROUP BY
    o.id,
    o.customer_name,
    o.order_date;

-- * * KETERANGAN * * --
-- Menggabungkan (JOIN) tabel orders dan order_items berdasarkan order_id.
-- SUM(oi.quantity) menjumlahkan semua item yang dipesan dalam satu order_id.
-- SUM(oi.quantity * oi.price) menghitung total harga untuk tiap pesanan (harga satuan × jumlah).
-- GROUP BY digunakan untuk mengelompokkan berdasarkan masing-masing pesanan (per baris order_id).