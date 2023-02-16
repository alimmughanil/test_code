<?php

namespace App\Http\Controllers;

use App\Models\Phone;
use App\Models\Customer;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CustomerController extends Controller
{
    public function index(Request $request){
        if($request->search){
            $customer = Customer::where('name','LIKE','%'.$request->search.'%')->get();
        }
        else {
            $customer = Customer::all();
        }
        $data = [
            'title'=>'Dashboard',
            'customer'=>$customer
        ];
        return Inertia::render('Customer/Dashboard', $data);
    }
    public function create(){
        return Inertia::render('Customer/Create');
    }

    public function store(Request $request)
    {
       $validatedData = $request->validate([
            'name' => 'required',
            'address' => 'required',
            'phone' => 'required',
            'price1' => 'required|numeric',
            'price_total' => 'required|numeric',
        ]);
        $customer = Customer::create([
            'name' => $validatedData['name'],
            'address' => $validatedData['address'],
            'price1' => $validatedData['price1'],
            'price2' => $request->price2,
            'price_total' => $validatedData['price_total'],
        ]);
        $phoneData = json_decode($request->phone);

        foreach ($phoneData as $data) {
            $phone = Phone::create([
                'customer_id' => $customer->id,
                'phone_label' => $data->phone_label,
                'phone_number' => $data->phone_number,
            ]);
        }
        
        return redirect('/customer')->with('success', 'Tambah Data Berhasil');
    }
}