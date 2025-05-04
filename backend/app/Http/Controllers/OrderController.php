<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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

    public function show($id)
    {
        $order = Order::with(['items.product'])->find($id);

        if (!$order) {
            return response()->json([
                'message' => 'Order not found.'
            ], 404);
        }

        return response()->json([
            'data' => $order
        ]);
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'customer_name' => 'required|string|min:3',
            'order_date' => 'required|date',
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
        ]);

        DB::beginTransaction();

        try {
            $orderItems = [];

            foreach ($request->items as $item) {
                $product = Product::findOrFail($item['product_id']);

                if ($product->stock < $item['quantity']) {
                    DB::rollBack();
                    return response()->json([
                        'error' => "Insufficient stock for product ID {$product->id}"
                    ], 400);
                }

                $product->stock -= $item['quantity'];
                $product->save();

                $orderItems[] = [
                    'product_id' => $product->id,
                    'quantity' => $item['quantity'],
                    'price' => $product->price,
                ];
            }

            $order = Order::create([
                'customer_name' => $request->customer_name,
                'order_date' => $request->order_date,
            ]);

            foreach ($orderItems as $item) {
                $item['order_id'] = $order->id;
                OrderItem::create($item);
            }

            DB::commit();

            return response()->json([
                'message' => 'Order created successfully.',
                'order' => $order->load('items.product')
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'error' => 'Failed to create order.',
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
