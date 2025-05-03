<?php

namespace App\Http\Controllers;

use App\Models\Order;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::with(['items.product'])->get();

        if ($orders->isEmpty()) {
            return response()->json([
                'message' => 'No orders found.'
            ], 404);
        }

        return response()->json([
            'data' => $orders
        ]);
    }
}
