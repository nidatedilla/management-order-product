SELECT
    p.id AS product_id,
    p.name AS product_name,
    COALESCE(SUM(oi.quantity), 0) + p.stock AS initial_stock,
    p.stock AS remaining_stock
FROM
    products p
    LEFT JOIN order_items oi ON p.id = oi.product_id
GROUP BY
    p.id,
    p.name,
    p.stock;

-- * * KETERANGAN * * --
-- Ambil data dari tabel products sebagai data utama.
-- JOIN ke tabel order_items untuk mengetahui jumlah produk yang pernah dipesan (quantity).
-- Gunakan COALESCE(SUM(oi.quantity), 0) agar aman dari NULL jika produk belum pernah dipesan.
-- Initial_stock dihitung dari stok sekarang (real-time) + total quantity yang pernah dipesan
-- LEFT JOIN ke order_items dan GROUP BY agar semua produk ter-cover, termasuk yang belum pernah dipesan.