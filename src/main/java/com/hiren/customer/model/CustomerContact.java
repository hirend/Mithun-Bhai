package com.hiren.customer.model;

import static javax.persistence.GenerationType.IDENTITY;

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
@Table(name = "CustomerContact", catalog = "dbo")
public class CustomerContact {

	@Id
	@GeneratedValue(strategy = IDENTITY)
	@Column(name = "ContactId", unique = true, nullable = false)
	private int contactId;
	
	@Column(name = "Type", nullable = false, length=20)
	private String type;
	
	@Column(name = "Name", nullable = false, length=60)
	private String name;
		
	@Column(name = "Number", nullable = false, length=15)
	private String number;
		
	@JsonIgnore
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "CustomerId", nullable = false)
	private Customer customer;


	public int getContactId() {
		return contactId;
	}


	public void setContactId(int contactId) {
		this.contactId = contactId;
	}


	public String getType() {
		return type;
	}


	public void setType(String type) {
		this.type = type;
	}


	public String getName() {
		return name;
	}


	public void setName(String name) {
		this.name = name;
	}


	public String getNumber() {
		return number;
	}


	public void setNumber(String number) {
		this.number = number;
	}


	public Customer getCustomer() {
		return customer;
	}


	public void setCustomer(Customer customer) {
		this.customer = customer;
	}
	
	
}
