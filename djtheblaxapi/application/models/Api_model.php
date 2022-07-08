<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Api_model extends CI_Model 
{
	
	/*Login API*/
	public function login($uemail, $password) 
	{
		$this->db->where('uemail', $uemail);
		$this->db->where('password', md5($password));
		$query = $this->db->get('dj_users');

		if($query->num_rows() == 1) {
			return $query->row();
		}
	}
	/*Customer List API*/
	public function get_customers(){
		$query = $this->db->get('dj_customers');
		return $query->result();
	}
	/*Create New Customer*/
	public function insert_customer_data($customer_data){

		$this->db->insert('dj_customers', $customer_data);
		return $this->db->insert_id();

	}
	/*Delete Customer By Id*/
	public function delete_customer($id){
		$this->db->where('id', $id);
		$this->db->delete('dj_customers');
	}
	/*Get Customer By Id*/
	public function get_customer($id){
		$this->db->where('id', $id);
		$query = $this->db->get('dj_customers');
		if($query->num_rows() == 1){
			return $query->row();
		}
	}
	/*Update Custome By Id*/
	public function update_customer($id, $cust_data){
		$this->db->where('id', $id);
		$this->db->update('dj_customers', $cust_data);
	}

	// Manufactuere Management
	/*Customer List API*/
	public function get_manufacturers(){
		$query = $this->db->get('dj_manufacturer');
		return $query->result();
	}
	/*Create New Customer*/
	public function insert_manufacturer_data($customer_data){

		$this->db->insert('dj_manufacturer', $customer_data);
		return $this->db->insert_id();

	}
	/*Delete Customer By Id*/
	public function delete_manufacturer($id){
		$this->db->where('id', $id);
		$this->db->delete('dj_manufacturer');
	}
	/*Get Customer By Id*/
	public function get_manufacturer($id){
		$this->db->where('id', $id);
		$query = $this->db->get('dj_manufacturer');
		if($query->num_rows() == 1){
			return $query->row();
		}
	}
	/*Update Custome By Id*/
	public function update_manufacturer($id, $cust_data){
		$this->db->where('id', $id);
		$this->db->update('dj_manufacturer', $cust_data);
	}
	/*Check Access Token*/
	public function checkToken($token)
	{
		$this->db->where('token', $token);
		$query = $this->db->get('users');

		if($query->num_rows() == 1) {
			return true;
		}
		return false;
	}
	// Get all Order Types
	public function get_all_ordertypes(){
		$query = $this->db->get('dj_ordertypes');
		return $query->result();
	}
	/*Get Customer By Id*/
	public function get_ordertype($id){
		$this->db->where('id', $id);
		$query = $this->db->get('dj_ordertypes');
		if($query->num_rows() == 1){
			return $query->row();
		}
	}
	/*Create New Order*/
	public function insert_order_data($order_data){

		$this->db->insert('dj_orders', $order_data);
		return $this->db->insert_id();

	}
	/*  Fetch All orders */
	public function get_all_orders(){
		$query = $this->db->get('dj_orders');
		return $query->result();
	}
	/*Delete Customer By Id*/
	public function delete_orderbyid($id){
		$this->db->where('id', $id);
		$this->db->delete('dj_orders');
	}
	// Fetch Order By Id
	public function fetch_pendingorders(){
		$this->db->where('order_status_id', '2');
		$query = $this->db->get('dj_orders');
		return $query->result();
	}
	// Fetch Order By Id
	public function fetch_completedorders(){
		$this->db->where('order_status_id', '4');
		$query = $this->db->get('dj_orders');
		return $query->result();
	}
	// fetch Order Count
	public function fetch_customercount(){
		$this->db->select('*');
		$this->db->from('dj_customers');
		return $this->db->count_all_results();
	}
	// fetch Order Count
	public function fetch_manufacturercount(){
		$this->db->select('*');
		$this->db->from('dj_manufacturer');
		return $this->db->count_all_results();
	}
	// fetch pending orders
	public function fetch_pendingorderscount(){
		$this->db->select('*');
		$this->db->from('dj_orders');
		$this->db->where('order_status_id', '2');
		return $this->db->count_all_results();
	}
	// fetch pending orders
	public function fetch_completedorderscount(){
		$this->db->select('*');
		$this->db->from('dj_orders');
		$this->db->where('order_status_id', '4');
		return $this->db->count_all_results();
	}
	// fetch orders by Customer ID
	public function fetch_orders_by_custid($id){
		$this->db->where('cust_id', $id);
		$query = $this->db->get('dj_orders');
		return $query->result();
	}
	// fetch orders by Manufacturer ID
	public function fetch_orders_by_manufacid($id){
		$this->db->where('manufac_id', $id);
		$query = $this->db->get('dj_orders');
		return $query->result();
	}
	// fetch orders by Order Status ID
	public function fetch_orders_by_statusid($id){
		$this->db->where('order_status_id', $id);
		$query = $this->db->get('dj_orders');
		return $query->result();
	}
}
