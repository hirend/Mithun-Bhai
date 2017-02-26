package com.hiren.customer.service;

import com.hiren.customer.model.Customer;

public interface CustomerService {
	
	public final static String EMAIL_COMMON_PART = new StringBuilder().append("<!DOCTYPE html>")
			.append("<html>")
			.append("<head>")
			.append("<title>Notification Email</title>")
			.append("</head>")
			.append("<style>")
			.append("tbody th { background: #613005; color: #fef1e7; text-align: left}")
			.append("tbody tr:nth-child(odd) { background: #f8ae6d; }")
			.append("tbody tr:nth-child(even) { background: #fcd6b6; }")
			.append("table td {word-wrap:break-word;}")
			.append("dt { float: left; clear: left; width: 18%; font-weight: bold; margin-bottom: 5px;}")
			.append("dd { word-wrap:break-word; margin-bottom: 5px; margin-left: 20%;}")
			.append("table { table-layout: fixed;}")
			.append("</style>")
			.append("<body>")
			.append("<table width=\"95%\" align=\"center\">")
			.append("<tr>")
			.append("<th width=\"10%\">When</th>")
			.append("<th width=\"10%\">Who</th>")
			.append("<th width=\"80%\">What was done</th>")
			.append("</tr>")
			.toString();
	
	public void saveCustomer(Customer customer);
	public Customer getCustomerById(int customerId);
	public void sendNotificationEmail(String when, String who, String what, String toEmail);

}
