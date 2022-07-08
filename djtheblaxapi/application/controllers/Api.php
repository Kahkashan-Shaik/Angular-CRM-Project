<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Api extends CI_Controller  {

	public function __construct()
	{
		parent::__construct();
		$this->load->model('api_model');
		$this->load->helper('url');
		$this->load->helper('text');
	}
	public function login() 
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header('Access-Control-Allow-Headers: Accept,Accept-Language,Content-Language,Content-Type');

		$formdata = json_decode(file_get_contents('php://input'), true);

		if($formdata){
			$uemail = $formdata['uemail'];
			$password = $formdata['password'];

			$user = $this->api_model->login($uemail, $password);

			if($user) {
				$response = array(
					'user_id' => 1,
					'first_name' => $user->first_name,
					'last_name' => $user->last_name,
					'access_token' => $user->token
				);
			}
			else {
				$response = array();
			}
			return $this->output
				->set_content_type('application/json')
				->set_output(json_encode($response));
		}

	}

	// Customer APIS
	public function get_all_customers(){

		header("Access-Control-Allow-Origin: *");
		$customers = $this->api_model->get_customers();
		$cust_data = array();
		if($customers){
			foreach ($customers as $customer) {
					$cust_data[] = array(
						'id' => $customer->id,
						'cust_name' => $customer->cust_name,
						'cust_phone' => $customer->cust_phone,
						'cust_desc' => $customer->cust_desc,
						'status' => $customer->status,
						'creation_date' => $customer->creation_date
					);
				}	
			$response['status'] = 'DJ200';
			$response['data'] = $cust_data;
		}else{
			$response['status'] = 'DJ201';
			$response['data'] = $cust_data;
		}
		return $this->output
				->set_content_type('application/json')
				->set_output(json_encode($response));
	}


	/*Function to create New Customer*/
	public function add_new_customer(){
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header('Access-Control-Allow-Headers: Accept,Accept-Language,Content-Language,Content-Type');

		$formdata = json_decode(file_get_contents('php://input'), true);

		if($formdata){
			if(!empty($formdata['cust_name']) && !empty($formdata['cust_phone'])){

				$cust_data = array(
					"cust_name" => $formdata['cust_name'],	
					"cust_phone" => $formdata['cust_phone'],	
					"cust_desc" => $formdata['cust_desc'],	
					"status" => $formdata['status'],
					'creation_date' => date('Y-m-d H:i:s', time())
				);
				$res = $this->api_model->insert_customer_data($cust_data);
				if($res){
					$response["status"] = "DJ200";
					$response["data"] = "Customer Created Successfully";
				}else{
					$response["status"] = "DJ003";
					$response["data"] = "System is not able to process,Try after some time";
				}
			}else{	
				$response["status"] = "DJ002";
				$response["data"] = "Customer Name and Phone Number Cannot be empty";
			}
		}else{
			$response["status"] = "DJ001";
			$response["data"] = "System is not able to process,Try after some time";
			
		}
		return $this->output
				   ->set_content_type('application/json')
				   ->set_output(json_encode($response));

	}

	public function customer_actions($id, $action){
		header('Access-Control-Allow-Origin: *');
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
		header("Access-Control-Allow-Headers: authorization, Content-Type");
		
		if(isset($id) && isset($action)){
			if($action == 'delete'){
				$res = $this->api_model->delete_customer($id);
				$response['status'] = 'DJ200';
				$response['data'] = 'Customer Deleted Successfully';
			}
			if($action == 'show'){
				$cust_data = $this->api_model->get_customer($id);
				if($cust_data){
					$res = array(
						'id' => $cust_data->id,
						'cust_name' => $cust_data->cust_name,
						'cust_phone' => $cust_data->cust_phone,
						'cust_desc' => $cust_data->cust_desc,
						'status' => $cust_data->status,
					);
					$response['status'] = 'DJ200';
					$response['data'] = $res;
				}else{
					$response['status'] = 'DJ002';
					$response['data'] = 'System is not able to process!, No data found';
				}
			}
			if($action == 'update'){

				$formdata = json_decode(file_get_contents('php://input'));
				if($formdata){
					$cust_data = array(
						'cust_name' => $formdata->cust_name,
						'cust_phone' => $formdata->cust_phone,
						'cust_desc' => $formdata->cust_desc	
					);
					$res = $this->api_model->update_customer($id, $cust_data);		
					$response['status'] = 'DJ200';
					$response['data'] = "Customer Updated Successfully";

				}else{
					$response['status'] = 'DJ001';
					$response['data'] = 'System is not able to process your request!';
				}
			}
		}else{
			$response['status'] = 'DJ001';
			$response['data'] = 'System is not to process your response!';
		}
	  	return $this->output
	  		->set_status_header(200)
	  		->set_content_type('application/json')
	  		->set_output(json_encode($response));
	}

	// Manufacturere APIS
	
	public function get_all_manufacturer(){
		header("Access-Control-Allow-Origin: *");
		$manufacturer = $this->api_model->get_manufacturers();
		$manu_data = array();
		if($manufacturer){
			foreach ($manufacturer as $manufactur) {
					$manu_data[] = array(
						'id' => $manufactur->id,
						'manufac_name' => $manufactur->manufac_name,
						'manufac_phone' => $manufactur->manufac_phone,
						'manufac_desc' => $manufactur->manufac_desc,
						'status' => $manufactur->status,
						'creation_date' => $manufactur->creation_date
					);
				}	
			$response['status'] = 'DJ200';
			$response['data'] = $manu_data;
		}else{
			$response['status'] = 'DJ201';
			$response['data'] = $manu_data;
		}
		return $this->output
				->set_content_type('application/json')
				->set_output(json_encode($response));

	}

	/*Function to create New Customer*/
	public function add_new_manufacturer(){
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header('Access-Control-Allow-Headers: Accept,Accept-Language,Content-Language,Content-Type');

		$formdata = json_decode(file_get_contents('php://input'), true);

		if($formdata){
			if(!empty($formdata['manufac_name']) && !empty($formdata['manufac_phone'])){

				$manufac_data = array(
					"manufac_name" => $formdata['manufac_name'],	
					"manufac_phone" => $formdata['manufac_phone'],	
					"manufac_desc" => $formdata['manufac_desc'],	
					"status" => $formdata['status'],
					'creation_date' => date('Y-m-d H:i:s', time())
				);
				$res = $this->api_model->insert_manufacturer_data($manufac_data);
				if($res){
					$response["status"] = "DJ200";
					$response["data"] = "Manufacturer Created Successfully";
				}else{
					$response["status"] = "DJ003";
					$response["data"] = "System is not able to process,Try after some time";
				}
			}else{	
				$response["status"] = "DJ002";
				$response["data"] = "Manufacturer Name and Phone Number Cannot be empty";
			}
		}else{
			$response["status"] = "DJ001";
			$response["data"] = "System is not able to process,Try after some time";
			
		}
		return $this->output
				   ->set_content_type('application/json')
				   ->set_output(json_encode($response));

	}
	// Function for Delete, Update, Edit Manufacturer
	public function manufacturer_actions($id, $action){
		header('Access-Control-Allow-Origin: *');
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
		header("Access-Control-Allow-Headers: authorization, Content-Type");
		
		if(isset($id) && isset($action)){
			if($action == 'delete'){
				$res = $this->api_model->delete_manufacturer($id);
				$response['status'] = 'DJ200';
				$response['data'] = 'Manufacturer Deleted Successfully';
			}
			if($action == 'show'){
				$manufac_data = $this->api_model->get_manufacturer($id);
				if($manufac_data){
					$res = array(
						'id' => $manufac_data->id,
						'manufac_name' => $manufac_data->manufac_name,
						'manufac_phone' => $manufac_data->manufac_phone,
						'manufac_desc' => $manufac_data->manufac_desc,
						'status' => $manufac_data->status,
					);
					$response['status'] = 'DJ200';
					$response['data'] = $res;
				}else{
					$response['status'] = 'DJ002';
					$response['data'] = 'System is not able to process!, No data found';
				}
			}
			if($action == 'update'){

				$formdata = json_decode(file_get_contents('php://input'));
				if($formdata){
					$manufac_data = array(
						'manufac_name' => $formdata->manufac_name,
						'manufac_phone' => $formdata->manufac_phone,
						'manufac_desc' => $formdata->manufac_desc	
					);
					$res = $this->api_model->update_manufacturer($id, $manufac_data);		
					$response['status'] = 'DJ200';
					$response['data'] = "Manufacturer Updated Successfully";

				}else{
					$response['status'] = 'DJ001';
					$response['data'] = 'System is not able to process your request!';
				}
			}
		}else{
			$response['status'] = 'DJ001';
			$response['data'] = 'System is not to process your response!';
		}
	  	return $this->output
	  		->set_status_header(200)
	  		->set_content_type('application/json')
	  		->set_output(json_encode($response));
	}

	// Order APIS

	public function get_all_ordertypes(){
		header("Access-Control-Allow-Origin: *");
		$ordertypedtls = $this->api_model->get_all_ordertypes();
		$ordertype_data = array();
		if($ordertypedtls){
			foreach ($ordertypedtls as $manufactur) {
					$ordertype_data[] = array(
						'id' => $manufactur->id,
						'order_type' => $manufactur->order_type,
					);
				}	
			$response['status'] = 'DJ200';
			$response['data'] = $ordertype_data;
		}else{
			$response['status'] = 'DJ201';
			$response['data'] = $ordertype_data;
		}
		return $this->output
				->set_content_type('application/json')
				->set_output(json_encode($response));	
	}

	// Create New Order Api
	/*Function to create New Customer*/
	// public function add_new_order(){

	// 	header("Access-Control-Allow-Origin: *");
 //   		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
 //    	header("Access-Control-Allow-Headers: authorization, Content-Type");

	// 	$formdata = json_decode(file_get_contents('php://input'), true);

	// 	if($formdata){
	// 		if(1){

	// 			$get_customername = $this->api_model->get_customer($formdata['cust_id']);
	// 			$get_manufacname =$this->api_model->get_manufacturer($formdata['manufac_id']);
	// 			$get_ordertypename = $this->api_model->get_ordertype($formdata['order_status_id']);


	// 				$filename = NULL;

	// 				$isUploadError = FALSE;

	// 				if ($_FILES && $_FILES['order_img']['name']) {
	// 					$filename = $_FILES['order_img']['name'];
	// 					$filename = "1";

	// 					$config['upload_path']          = './media/images/';
	// 		            $config['allowed_types']        = 'gif|jpg|png|jpeg';
	// 		            $config['max_size']             = 500;

	// 		            $this->load->library('upload', $config);
	// 		            if ( ! $this->upload->do_upload('order_img')) {
	// 		            	$filename="2";

	// 		            	$isUploadError = TRUE;

	// 						$response = array(
	// 							'status' => 'DJ005',
	// 							'message' => $this->upload->display_errors()
	// 						);
	// 		            }
	// 		            else {
	// 		            	$uploadData = $this->upload->data();
	// 	            		$filename = "3";
	// 		            }
	// 				}else{
	// 					$filename = "sdfkhsdf";
	// 					$response["status"] = "DJ205";
	// 					$response["data"] = "Image Uplaoding Problem";
	// 					// exit();
						
	// 				}

	// 			$order_data = array(
	// 				"order_date" => $formdata['order_date'],	
	// 				"date_delivered_to_cust" => $formdata['date_delivered_to_cust'],	
	// 				"date_delivery_to_cust" => $formdata['date_delivery_to_cust'],
	// 				"date_delivery_from_manufac" => $formdata['date_delivery_from_manufac'],	
	// 				"date_delivered_from_manufac"=>$formdata['date_delivered_from_manufac'],	
	// 				"cust_id" => $formdata['cust_id'],	
	// 				"cust_name" => $get_customername->cust_name,	
	// 				"manufac_id" => $formdata['manufac_id'],
	// 				"manufac_name" => $get_manufacname->manufac_name,	
	// 				"order_status_id" => $formdata['order_status_id'],
	// 				"order_status_name" => $get_ordertypename->order_type,	
	// 				"order_desc" => $formdata['order_desc'],
	// 				"order_img" => $filename,
	// 				'creation_date' => date('Y-m-d H:i:s', time())
	// 			);
	// 			if( ! $isUploadError) {
	// 				// $res = $this->api_model->insert_order_data($order_data);
	// 				// if($res){
	// 				if(1){
	// 				$response["status"] = "DJ200";
	// 				// $response["data"] = "Order Created Successfully";
	// 				$response["data"] = $formdata;
	// 			}else{
	// 				$response["status"] = "DJ004";
	// 				$response["data"] = "System is not able to process,Try after some time";
	// 			}
	// 			}else{
	// 				$response["status"] = "DJ003";
	// 				$response["data"] = "File Uploading Problem";
	// 			}
	// 		}else{	
	// 			$response["status"] = "DJ002";
	// 			$response["data"] = "Order Name and Phone Number Cannot be empty";
	// 		}
	// 	}else{
	// 		$response["status"] = "DJ001";
	// 		// $response["data"] = "System is not able to process,Try after some time";
	// 		$response['data'] = $this->input->post('order_img');
			
	// 	}
	// 	return $this->output
	// 			   ->set_content_type('application/json')
	// 			   ->set_output(json_encode($response));

	// }
	public function add_new_order(){

		header("Access-Control-Allow-Origin: *");
   		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
    	header("Access-Control-Allow-Headers: authorization, Content-Type");

			if(!empty($this->input->post('cust_id')) && !empty($this->input->post('manufac_id'))){
				$get_customername = $this->api_model->get_customer($this->input->post('cust_id'));
				$get_manufacname =$this->api_model->get_manufacturer($this->input->post('manufac_id'));
				$get_ordertypename = $this->api_model->get_ordertype($this->input->post('order_status_id'));
					$filename = NULL;
					$isUploadError = FALSE;
					if ($_FILES && $_FILES['order_img']['name']) {

						$config['upload_path']          = './media/images/';
			            $config['allowed_types']        = 'gif|jpg|png|jpeg';
			            $config['max_size']             = 500;

			            $this->load->library('upload', $config);
			            if ( ! $this->upload->do_upload('order_img')) {
			            	

			            	$isUploadError = TRUE;

							$response = array(
								'status' => 'DJ005',
								'data' => $this->upload->display_errors()
							);
			            }
			            else {
			            	$uploadData = $this->upload->data();
		            		$filename = $uploadData['file_name'];
			            }
					}else{
						$response["status"] = "DJ205";
						$response["data"] = "Image Uplaoding Problem";
					}

				$order_data = array(
					"order_date" => $this->input->post('order_date'),	
					"date_delivered_to_cust" => $this->input->post('date_delivered_to_cust'),	
					"date_delivery_to_cust" => $this->input->post('date_delivery_to_cust'),
					"date_delivery_from_manufac" => $this->input->post('date_delivery_from_manufac'),	
					"date_delivered_from_manufac"=>$this->input->post('date_delivered_from_manufac'),	
					"cust_id" => $this->input->post('cust_id'),	
					"cust_name" => $get_customername->cust_name,	
					"manufac_id" => $this->input->post('manufac_id'),
					"manufac_name" => $get_manufacname->manufac_name,	
					"order_status_id" => $this->input->post('order_status_id'),
					"order_status_name" => $get_ordertypename->order_type,	
					"order_desc" => $this->input->post('order_desc'),
					"order_img" => $filename,
					'creation_date' => date('Y-m-d H:i:s', time())
				);
				if( ! $isUploadError) {
					$res = $this->api_model->insert_order_data($order_data);
					if($res){
					$response["status"] = "DJ200";
					$response["data"] = "Order Created Successfully";
				}else{
					$response["status"] = "DJ004";
					$response["data"] = "System is not able to process,Try after some time";
				}
				}else{
					$response["status"] = "DJ003";
					$response["data"] = "File Uploading Problem";
				}
			}else{	
				$response["status"] = "DJ002";
				$response["data"] = "Order Name and Phone Number Cannot be empty";
			}
		
		return $this->output
				   ->set_content_type('application/json')
				   ->set_output(json_encode($response));

	}
	// Api for fetching all orders
	public function get_all_orders(){


		header("Access-Control-Allow-Origin: *");
		$orders = $this->api_model->get_all_orders();
		$order_data = array();
		if($orders){
			foreach ($orders as $order) {
					$order_data[] = array(
						'id' => $order->id,
						'order_img' => $order->order_img,
						'order_date' => date('F, d Y', strtotime($order->order_date)),
						'cust_name' => $order->cust_name,
						'manufac_name' => $order->manufac_name,
						'date_delivery_from_manufac' => date('F, d Y', strtotime($order->date_delivery_from_manufac)),
						'date_delivery_to_cust' => date('F, d Y', strtotime($order->date_delivery_to_cust)),
						'date_delivered_to_cust' => date('F, d Y', strtotime($order->date_delivered_to_cust)),
						'order_desc' => $order->order_desc,
						'order_status_name' => $order->order_status_name,
						'order_status_id' => $order->order_status_id
					);
				}	
			$response['status'] = 'DJ200';
			$response['data'] = $order_data;
		}else{
			$response['status'] = 'DJ201';
			$response['data'] = $order_data;
		}
		return $this->output
				->set_content_type('application/json')
				->set_output(json_encode($response));

	}
	// API to delete order by ID
	public function delete_orderbyid($id){
		header('Access-Control-Allow-Origin: *');
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
		header("Access-Control-Allow-Headers: authorization, Content-Type");

		if(isset($id)){
				$res = $this->api_model->delete_orderbyid($id);
				$response['status'] = 'DJ200';
				$response['data'] = 'Order Deleted Successfully';	
		}else{	
			$response['status'] = 'DJ001';
			$response['data'] = 'System is not able to process your request!';
		}
		return $this->output
				->set_content_type('application/json')
				->set_output(json_encode($response));
	}

	// Fetch Pending Order
	public function fetch_pendingOrder(){
		header('Access-Control-Allow-Origin: *');
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
		header("Access-Control-Allow-Headers: authorization, Content-Type");

		$orders = $this->api_model->fetch_pendingorders();
		$order_data = array();
		if($orders){
			foreach ($orders as $order) {
					$order_data[] = array(
						'id' => $order->id,
						'order_img' => $order->order_img,
						'order_date' => date('F, d Y', strtotime($order->order_date)),
						'cust_name' => $order->cust_name,
						'manufac_name' => $order->manufac_name,
						'date_delivery_from_manufac' => date('F, d Y', strtotime($order->date_delivery_from_manufac)),
						'date_delivery_to_cust' => date('F, d Y', strtotime($order->date_delivery_to_cust)),
						'date_delivered_to_cust' => date('F, d Y', strtotime($order->date_delivered_to_cust)),
						'order_desc' => $order->order_desc,
						'order_status_name' => $order->order_status_name,
						'order_status_id' => $order->order_status_id
					);
				}	
			$response['status'] = 'DJ200';
			$response['data'] = $order_data;
		}else{
			$response['status'] = 'DJ201';
			$response['data'] = 'Sorry No pending orders found!';
		}
		return $this->output
				->set_content_type('application/json')
				->set_output(json_encode($response));
	}
	// Fetch Completed Orders
	public function fetch_completedOrder(){
		header('Access-Control-Allow-Origin: *');
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
		header("Access-Control-Allow-Headers: authorization, Content-Type");

		$orders = $this->api_model->fetch_completedorders();
		$order_data = array();
		if($orders){
			foreach ($orders as $order) {
					$order_data[] = array(
						'id' => $order->id,
						'order_img' => $order->order_img,
						'order_date' => date('F, d Y', strtotime($order->order_date)),
						'cust_name' => $order->cust_name,
						'manufac_name' => $order->manufac_name,
						'date_delivery_from_manufac' => date('F, d Y', strtotime($order->date_delivery_from_manufac)),
						'date_delivery_to_cust' => date('F, d Y', strtotime($order->date_delivery_to_cust)),
						'date_delivered_to_cust' => date('F, d Y', strtotime($order->date_delivered_to_cust)),
						'order_desc' => $order->order_desc,
						'order_status_name' => $order->order_status_name,
						'order_status_id' => $order->order_status_id
					);
				}	
			$response['status'] = 'DJ200';
			$response['data'] = $order_data;
		}else{
			$response['status'] = 'DJ201';
			$response['data'] = 'Sorry No pending orders found!';
		}
		return $this->output
				->set_content_type('application/json')
				->set_output(json_encode($response));
	}

	public function fetch_dashboardCount(){
		header('Access-Control-Allow-Origin: *');
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
		header("Access-Control-Allow-Headers: authorization, Content-Type");
		$custcount = $this->api_model->fetch_customercount();
		$manufaccount = $this->api_model->fetch_manufacturercount();
		$pendingordcount = $this->api_model->fetch_pendingorderscount();
		$compeltedordcount = $this->api_model->fetch_completedorderscount();

		$dashboardcount = array(
								'totalcustomers' => (isset($custcount) ? $custcount : 0),
								'totalmanufacturers' => (isset($manufaccount) ? $manufaccount : 0),
								'totalpendingorders' => (isset($pendingordcount) ? $pendingordcount : 0),
								'totalcompletedorders' => (isset($compeltedordcount) ? $compeltedordcount : 0),
							);
				$response['status'] = 'DJ200';
				$response['data'] = $dashboardcount;
		return $this->output
				->set_content_type('application/json')
				->set_output(json_encode($response));
	}
	// APIS for filters
	public function fetch_orders_bycust_id($id){
		header('Access-Control-Allow-Origin: *');
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
		header("Access-Control-Allow-Headers: authorization, Content-Type");

		$orders = $this->api_model->fetch_orders_by_custid($id);
		$order_data = array();
		if($orders){
			foreach ($orders as $order) {
					$order_data[] = array(
						'id' => $order->id,
						'order_img' => $order->order_img,
						'order_date' => date('F, d Y', strtotime($order->order_date)),
						'cust_name' => $order->cust_name,
						'manufac_name' => $order->manufac_name,
						'date_delivery_from_manufac' => date('F, d Y', strtotime($order->date_delivery_from_manufac)),
						'date_delivery_to_cust' => date('F, d Y', strtotime($order->date_delivery_to_cust)),
						'date_delivered_to_cust' => date('F, d Y', strtotime($order->date_delivered_to_cust)),
						'order_desc' => $order->order_desc,
						'order_status_name' => $order->order_status_name,
						'order_status_id' => $order->order_status_id
					);
				}	
			$response['status'] = 'DJ200';
			$response['data'] = $order_data;
		}else{
			$response['status'] = 'DJ201';
			$response['data'] = 'Sorry No Orders Records Found';
		}
		return $this->output
				->set_content_type('application/json')
				->set_output(json_encode($response));	
	}
	public function fetch_orders_bymanufac_id($id){
		header('Access-Control-Allow-Origin: *');
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
		header("Access-Control-Allow-Headers: authorization, Content-Type");

		$orders = $this->api_model->fetch_orders_by_manufacid($id);
		$order_data = array();
		if($orders){
			foreach ($orders as $order) {
					$order_data[] = array(
						'id' => $order->id,
						'order_img' => $order->order_img,
						'order_date' => date('F, d Y', strtotime($order->order_date)),
						'cust_name' => $order->cust_name,
						'manufac_name' => $order->manufac_name,
						'date_delivery_from_manufac' => date('F, d Y', strtotime($order->date_delivery_from_manufac)),
						'date_delivery_to_cust' => date('F, d Y', strtotime($order->date_delivery_to_cust)),
						'date_delivered_to_cust' => date('F, d Y', strtotime($order->date_delivered_to_cust)),
						'order_desc' => $order->order_desc,
						'order_status_name' => $order->order_status_name,
						'order_status_id' => $order->order_status_id
					);
				}	
			$response['status'] = 'DJ200';
			$response['data'] = $order_data;
		}else{
			$response['status'] = 'DJ201';
			$response['data'] = 'Sorry No Orders Records Found';
		}
		return $this->output
				->set_content_type('application/json')
				->set_output(json_encode($response));	
	}
	public function fetch_orders_bystatus_id($id){
		header('Access-Control-Allow-Origin: *');
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
		header("Access-Control-Allow-Headers: authorization, Content-Type");

		$orders = $this->api_model->fetch_orders_by_statusid($id);
		$order_data = array();
		if($orders){
			foreach ($orders as $order) {
					$order_data[] = array(
						'id' => $order->id,
						'order_img' => $order->order_img,
						'order_date' => date('F, d Y', strtotime($order->order_date)),
						'cust_name' => $order->cust_name,
						'manufac_name' => $order->manufac_name,
						'date_delivery_from_manufac' => date('F, d Y', strtotime($order->date_delivery_from_manufac)),
						'date_delivery_to_cust' => date('F, d Y', strtotime($order->date_delivery_to_cust)),
						'date_delivered_to_cust' => date('F, d Y', strtotime($order->date_delivered_to_cust)),
						'order_desc' => $order->order_desc,
						'order_status_name' => $order->order_status_name,
						'order_status_id' => $order->order_status_id
					);
				}	
			$response['status'] = 'DJ200';
			$response['data'] = $order_data;
		}else{
			$response['status'] = 'DJ201';
			$response['data'] = 'Sorry No Orders Records Found';
		}
		return $this->output
				->set_content_type('application/json')
				->set_output(json_encode($response));	
	}

}
