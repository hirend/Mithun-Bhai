package com.hiren.customer.model;

import static javax.persistence.GenerationType.IDENTITY;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;


@Entity
@Table(name = "CustomerHist", catalog = "dbo")
public class CustomerHist {
	
	@Id
	@GeneratedValue(strategy = IDENTITY)
	@Column(name = "CustomerHistId", unique = true, nullable = false)
	private int customerHistId;
	
	@Column(name = "RegDate", nullable = false)
	public Date regDate;
	
	@Column(name = "Description", nullable = false, length=500)
	private String description;
	
	@JsonIgnore
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "CustomerId", nullable = false)
	private Customer customer;

	public int getCustomerHistId() {
		return customerHistId;
	}

	public void setCustomerHistId(int customerHistId) {
		this.customerHistId = customerHistId;
	}

	public Date getRegDate() {
		return regDate;
	}

	public void setRegDate(Date regDate) {
		this.regDate = regDate;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Customer getCustomer() {
		return customer;
	}

	public void setCustomer(Customer customer) {
		this.customer = customer;
	}

	
}
