<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<html>
<head>
<link href="<c:url value='/static/css/Header.css' />" rel="stylesheet"></link>
</head>
<body>
			<nav>
			<!-- Navigation -->
			<ul class="dropdownMenu">
				<li><a href="./">Home</a></li>
				
				<li><a href="#">Customer</a>
					<ul class="droprightMenu">
						<li><a href="./createCustomer">Create Customer</a></li>							
						<li><a href="./viewCustomer">View Customer Buckets</a></li>
					</ul></li>

				<li><a href="#">Profile</a>
					<ul class="droprightMenu">
						<li><a href="#">Login</a></li>
						<li><a href="#">Register</a></li>
						<li><a href="#">Edit Profile</a></li>
						<li><a href="#">My Posts</a></li>
						<li><a href="#">Logout</a></li>
					</ul></li>

				<li><a href="#">Help</a></li>
			</ul>
		</nav>

</body>
</html>