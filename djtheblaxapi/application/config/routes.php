<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/*
| -------------------------------------------------------------------------
| URI ROUTING
| -------------------------------------------------------------------------
| This file lets you re-map URI requests to specific controller functions.
|
| Typically there is a one-to-one relationship between a URL string
| and its corresponding controller class/method. The segments in a
| URL normally follow this pattern:
|
|	example.com/class/method/id/
|
| In some instances, however, you may want to remap this relationship
| so that a different class/function is called than the one
| corresponding to the URL.
|
| Please see the user guide for complete details:
|
|	https://codeigniter.com/user_guide/general/routing.html
|
| -------------------------------------------------------------------------
| RESERVED ROUTES
| -------------------------------------------------------------------------
|
| There are three reserved routes:
|
|	$route['default_controller'] = 'welcome';
|
| This route indicates which controller class should be loaded if the
| URI contains no data. In the above example, the "welcome" class
| would be loaded.
|
|	$route['404_override'] = 'errors/page_missing';
|
| This route will tell the Router which controller/method to use if those
| provided in the URL cannot be matched to a valid route.
|
|	$route['translate_uri_dashes'] = FALSE;
|
| This is not exactly a route, but allows you to automatically route
| controller and method names that contain dashes. '-' isn't a valid
| class or method name character, so it requires translation.
| When you set this option to TRUE, it will replace ALL dashes in the
| controller and method URI segments.
|
| Examples:	my-controller/index	-> my_controller/index
|		my-controller/my-method	-> my_controller/my_method
*/
$route['default_controller'] = 'api';
// $route['blogsdata'] = 'Api/blogsdata';
// $route['featuredBlogs'] = 'Api/featuredBlogs';
// $route['loginPage'] = 'Api/loginPage';
$route['login'] = 'Api/login';
// Customers Routes
$route['customer'] = 'Api/get_all_customers';
$route['addCustomer'] = 'Api/add_new_customer';
$route['customer_update/(:any)/(:any)'] = 'Api/customer_actions/$1/$2';
// Manufacturers Routes
$route['manufacturer'] = 'Api/get_all_manufacturer';
$route['addManufacturer'] = 'Api/add_new_manufacturer';
$route['manufacturer_update/(:any)/(:any)'] = 'Api/manufacturer_actions/$1/$2';

$route['ordertypes'] = 'Api/get_all_ordertypes';
$route['addOrder'] = 'Api/add_new_order';
$route['orders'] = 'Api/get_all_orders';
$route['order_delete/(:any)'] = 'Api/delete_orderbyid/$1';
$route['pendingorders'] = 'Api/fetch_pendingOrder';
$route['completedorders'] = 'Api/fetch_completedOrder';
$route['dashbaordcount'] = 'Api/fetch_dashboardCount';	
$route['ordersbycustid/(:any)'] = 'Api/fetch_orders_bycust_id/$1';
$route['ordersbymanufacid/(:any)'] = 'Api/fetch_orders_bymanufac_id/$1';
$route['ordersbystatusid/(:any)'] = 'Api/fetch_orders_bystatus_id/$1';

$route['404_override'] = '';
$route['translate_uri_dashes'] = FALSE;
