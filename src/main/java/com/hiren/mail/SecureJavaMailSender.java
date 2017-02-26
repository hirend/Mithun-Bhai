package com.hiren.mail;


import java.security.PrivilegedActionException;
import java.security.PrivilegedExceptionAction;
import java.util.Date;
import java.util.Properties;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.security.auth.Subject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class SecureJavaMailSender implements MailService {
    
	@Autowired
	MailServerConfig config;
	
    private Subject subject;

    public Subject getSubject() {
        return subject;
    }

    public void setSubject(Subject subject) {
        this.subject = subject;
    }

    public void sendEmailNotification(String customerData) {
    	
    }
    

    @Override
      public void sendEmail(String subject, String emailAddress, String[] ccEmailAddress, String htmlMessage) {
        SimpleMailMessage emailmessage = new SimpleMailMessage();
       
        
            JavaMailSender javaMailSender = createMailSender(config);
            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            
            try {
	            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, false, "utf-8");                       
	            mimeMessage.setContent(htmlMessage, "text/html");            
	            helper.setTo(emailAddress);            
				helper.setSubject((config.getSubjectPrefix() + " ") + subject);			
	            helper.setFrom(config.getFrom());
	            helper.setCc(ccEmailAddress);
	            helper.setSentDate(new Date());
            } catch (MessagingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}                                    

            send(mimeMessage, javaMailSender);        
    }    

    private void send(MimeMessage simpleMessage, JavaMailSender javaMailSender) throws MailException {
        final MimeMessage finalMineMessage = simpleMessage;
        final JavaMailSender finalJavaMailSender = javaMailSender;

        try {
            Subject.doAs(subject,
                    new PrivilegedExceptionAction<Void>() {
                        public Void run() {
                            finalJavaMailSender.send(finalMineMessage);
                            return null;
                        }
                    });
        } catch (PrivilegedActionException e) {
            throw new RuntimeException(e);
        }
    }
    
    private JavaMailSender createMailSender(MailServerConfig config) {
        JavaMailSenderImpl javaMailSender = new JavaMailSenderImpl();
        javaMailSender.setHost(config.getHost());
        javaMailSender.setPort(config.getPort());


        javaMailSender.setUsername(config.getUsername());
        javaMailSender.setPassword(config.getPassword());
       

        if (config.isSecure()) {
            Properties properties = new Properties();
            properties.setProperty("mail.smtp.auth", "true");
            properties.setProperty("mail.smtp.starttls.enable", "true");
            properties.setProperty("mail.smtp.starttls.required", "true");

            javaMailSender.setJavaMailProperties(properties);
        }
        return javaMailSender;
    }    
}
