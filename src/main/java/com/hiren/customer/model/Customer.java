package com.hiren.customer.model;

import static javax.persistence.GenerationType.IDENTITY;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.hiren.users.model.User;

@Entity
@Table(name = "Customer", catalog = "dbo")
public class Customer {
		
	@Id
	@GeneratedValue(strategy = IDENTITY)
	@Column(name = "CustomerId", unique = true, nullable = false)
	public int customerId;
		
	@Column(name = "Name", nullable = false, length=60)
	public String name;
	
	@Column(name = "Area", nullable = false, length=40)
	public String area;
		
	@Column(name = "City", nullable = false, length=20)
	public String city;
		
	@Column(name = "Email", nullable = false, length=60)
	public String email;
	
	@Column(name = "Authorized", nullable = false)
	public boolean authorized;
	
	@Column(name = "NextOrderDate", nullable = false)
	public Date nextOrderDate;

	@Column(name = "NextPaymentDate", nullable = false)
	public Date nextPaymentDate;
	 
	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "AssignedTo")	
	public User assignedTo;
	
	@Column(name = "CreatedDate", nullable = false)
	public Date createdDate;
	
	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "CreatedBy")	
	public User createdBy;
	
	@Column(name = "ModifiedDate", nullable = false)
	public Date modifiedDate;
	
	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "ModifiedBy")	
	public User modifiedBy;

	/**
	 * @return the customerId
	 */
	public int getCustomerId() {
		return customerId;
	}

	/**
	 * @param customerId the customerId to set
	 */
	public void setCustomerId(int customerId) {
		this.customerId = customerId;
	}

	/**
	 * @return the name
	 */
	public String getName() {
		return name;
	}

	/**
	 * @param name the name to set
	 */
	public void setName(String name) {
		this.name = name;
	}

	/**
	 * @return the area
	 */
	public String getArea() {
		return area;
	}

	/**
	 * @param area the area to set
	 */
	public void setArea(String area) {
		this.area = area;
	}

	/**
	 * @return the city
	 */
	public String getCity() {
		return city;
	}

	/**
	 * @param city the city to set
	 */
	public void setCity(String city) {
		this.city = city;
	}

	/**
	 * @return the email
	 */
	public String getEmail() {
		return email;
	}

	/**
	 * @param email the email to set
	 */
	public void setEmail(String email) {
		this.email = email;
	}

	/**
	 * @return the authorized
	 */
	public boolean isAuthorized() {
		return authorized;
	}

	/**
	 * @param authorized the authorized to set
	 */
	public void setAuthorized(boolean authorized) {
		this.authorized = authorized;
	}

	/**
	 * @return the nextOrderDate
	 */
	public Date getNextOrderDate() {
		return nextOrderDate;
	}

	/**
	 * @param nextOrderDate the nextOrderDate to set
	 */
	public void setNextOrderDate(Date nextOrderDate) {
		this.nextOrderDate = nextOrderDate;
	}

	/**
	 * @return the nextPaymentDate
	 */
	public Date getNextPaymentDate() {
		return nextPaymentDate;
	}

	/**
	 * @param nextPaymentDate the nextPaymentDate to set
	 */
	public void setNextPaymentDate(Date nextPaymentDate) {
		this.nextPaymentDate = nextPaymentDate;
	}

	/**
	 * @return the assignedTo
	 */
	public User getAssignedTo() {
		return assignedTo;
	}

	/**
	 * @param assignedTo the assignedTo to set
	 */
	public void setAssignedTo(User assignedTo) {
		this.assignedTo = assignedTo;
	}

	/**
	 * @return the createdDate
	 */
	public Date getCreatedDate() {
		return createdDate;
	}

	/**
	 * @param createdDate the createdDate to set
	 */
	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	/**
	 * @return the createdBy
	 */
	public User getCreatedBy() {
		return createdBy;
	}

	/**
	 * @param createdBy the createdBy to set
	 */
	public void setCreatedBy(User createdBy) {
		this.createdBy = createdBy;
	}

	/**
	 * @return the modifiedDate
	 */
	public Date getModifiedDate() {
		return modifiedDate;
	}

	/**
	 * @param modifiedDate the modifiedDate to set
	 */
	public void setModifiedDate(Date modifiedDate) {
		this.modifiedDate = modifiedDate;
	}

	/**
	 * @return the modifiedBy
	 */
	public User getModifiedBy() {
		return modifiedBy;
	}

	/**
	 * @param modifiedBy the modifiedBy to set
	 */
	public void setModifiedBy(User modifiedBy) {
		this.modifiedBy = modifiedBy;
	}

	
}
