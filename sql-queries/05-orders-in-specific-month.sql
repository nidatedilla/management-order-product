SELECT
    o.id AS order_id,
    o.customer_name,
    o.order_date,
    SUM(oi.quantity * oi.price) AS total_price
FROM
    orders o
    JOIN order_items oi ON o.id = oi.order_id
WHERE
    EXTRACT(
        YEAR
        FROM
            o.order_date
    ) = 2025
    AND EXTRACT(
        MONTH
        FROM
            o.order_date
    ) = 05
GROUP BY
    o.id,
    o.customer_name,
    o.order_date;

-- * * KETERANGAN * * --
-- JOIN orders dengan order_items berdasarkan order_id agar bisa menghitung total harga per pesanan.
-- Cari pesanan berdasarkan tanggal (order_date), contohnya difilter hanya untuk bulan Maret 2025.
-- EXTRACT(YEAR FROM order_date) dan EXTRACT(MONTH FROM order_date) digunakan untuk memfilter tahun dan bulan dari datetime.
-- GROUP BY digunakan untuk mengelompokkan hasil berdasarkan order_id, customer_name, dan order_date.