SELECT
    p.id AS product_id,
    p.name AS product_name,
    SUM(oi.quantity) AS total_quantity
FROM
    products p
    JOIN order_items oi ON p.id = oi.product_id
GROUP BY
    p.id,
    p.name
ORDER BY
    total_quantity DESC
LIMIT
    1;

-- * * KETERANGAN * * --
-- JOIN products dengan order_items agar bisa menghitung berapa kali suatu produk dipesan.
-- SUM(oi.quantity) menjumlahkan total quantity produk tersebut di semua pesanan.
-- GROUP BY untuk mengelompokkan data per produk.
-- ORDER BY total_quantity DESC untuk mencari yang paling banyak dipesan.
-- LIMIT 1 ambil produk terpopuler saja.