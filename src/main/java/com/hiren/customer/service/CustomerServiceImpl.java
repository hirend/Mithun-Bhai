package com.hiren.customer.service;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import com.hiren.customer.dao.CustomerDao;
import com.hiren.customer.model.Customer;
import com.hiren.customer.model.CustomerHist;
import com.hiren.mail.SecureJavaMailSender;
import com.hiren.users.dao.UserDao;


@Service
public class CustomerServiceImpl implements CustomerService {
	 
	private static String[] CEO_EMAIL_ADDRESSES;
	
	@Autowired
	CustomerDao customerDao;
	
	@Autowired
	SecureJavaMailSender mailSender;
	
	@Autowired
	UserDao userDao;
	
	@Override
	@Transactional
	public void saveCustomer(Customer customer) {		
		customerDao.saveCustomer(customer);
		
		String toEmail = null;
		if(customer.getAssignedTo() != null) {
			toEmail = userDao.findByUserName(customer.getAssignedTo().getUsername()).getEmail();
		}		
		CustomerHist hist = customer.getHist().iterator().next();
		sendNotificationEmail(hist.getRegDate().toString(),hist.getCreatedBy().getUsername(),hist.getDescription(), toEmail);
	}

	@Override
	@Transactional
	public Customer getCustomerById(int customerId) {
		return customerDao.getCustomerById(customerId);
	}

	@Override
	public void sendNotificationEmail(String when, String who, String what, String toEmail) {
		
		String emailBodyContent = new StringBuilder().append(EMAIL_COMMON_PART)
				.append("<tr>")
				.append("<td>")
				.append(when)
				.append("</td>")
				.append("<td>")
				.append(who)
				.append("</td>")
				.append("<td>")
				.append(what)
				.append("</td>")
				.append("</tr>")
				.append("</table>")
				.append("</body>")
				.append("</html>")
				.toString(); 
				
		if(toEmail==null || "".equals(toEmail)) {
			toEmail = StringUtils.arrayToCommaDelimitedString(CEO_EMAIL_ADDRESSES);
		}
		if(toEmail!=null && !"".equals(toEmail)) {
			mailSender.sendEmail("Auto generated notification email from Arrowline", toEmail, CEO_EMAIL_ADDRESSES, emailBodyContent);
		}		
	}
	
	@PostConstruct
	public void setCeoEmailAddress() {
		CEO_EMAIL_ADDRESSES = userDao.getAllCeoEmailAddresses();
	}
}
