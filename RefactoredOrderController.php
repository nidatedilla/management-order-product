<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Product;
use App\Models\Order;
use App\Models\OrderItem;
use Tymon\JWTAuth\Facades\JWTAuth;

class OrderController extends Controller
{
    public function __construct()
    {
        $this->middleware('jwt.auth');
    }

    public function store(Request $request)
    {
        try {
            DB::beginTransaction();

            $user = JWTAuth::user();

            $this->validate($request, [
                'customer_name' => 'required|string|max:255',
                'order_date' => 'required|date',
                'items' => 'required|array|min:1',
                'items.*.product_id' => 'required|integer|exists:products,id',
                'items.*.quantity' => 'required|integer|min:1'
            ]);

            $order = new Order();
            $order->user_id = $user->id;
            $order->customer_name = $request->customer_name;
            $order->order_date = $request->order_date;
            $order->save();

            $totalPrice = 0;

            foreach ($request->items as $item) {
                $product = Product::find($item['product_id']);

                if ($product->stock < $item['quantity']) {
                    DB::rollBack();
                    return response()->json([
                        'status' => 'error',
                        'message' => 'Insufficient stock for product ' . $product->name,
                    ], 400);
                }

                $subtotal = $product->price * $item['quantity'];
                $totalPrice += $subtotal;

                $orderItem = new OrderItem();
                $orderItem->order_id = $order->id;
                $orderItem->product_id = $product->id;
                $orderItem->quantity = $item['quantity'];
                $orderItem->price = $product->price;
                $orderItem->save();

                $product->stock -= $item['quantity'];
                $product->save();
            }

            DB::commit();

            $order = $order->load('items.product');

            $order->items->each(function ($item) {
                $item->subtotal = $item->price * $item->quantity;
            });
            $order->total_price = $order->items->sum('subtotal');

            return response()->json([
                'status' => 'success',
                'message' => 'Order created successfully',
                'data' => $order
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to create order',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
