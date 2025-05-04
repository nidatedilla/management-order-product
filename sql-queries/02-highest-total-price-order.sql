SELECT
    o.id AS order_id,
    o.customer_name,
    o.order_date,
    SUM(oi.quantity * oi.price) AS total_price
FROM
    orders o
    JOIN order_items oi ON o.id = oi.order_id
GROUP BY
    o.id,
    o.customer_name,
    o.order_date
ORDER BY
    total_price DESC
LIMIT
    1;

-- * * KETERANGAN * * --
-- Menggabungkan (JOIN) tabel orders dan order_items berdasarkan order_id.
-- GROUP BY berdasarkan order untuk dapat menghitung SUM(oi.quantity * oi.price) per pesanan.
-- ORDER BY total_price DESC untuk mengurutkan dari total tertinggi ke terendah.
-- LIMIT 1 untuk mengambil hanya satu baris (pesanan paling mahal).