package com.hiren.mail;


public interface MailService {    
    void sendEmail(String subject, String emailAddress, String[] ccEmailAddress, String message);
}
