package com.hiren.mail;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;


@Configuration
public class MailServerConfig {
    
    private String host;

    
    private int port;

    
    private String username;

    
    private String password;

    
    private String from;

    
    private String subjectPrefix;
    
    private boolean secure;


	public String getHost() {
		return host;
	}

	@Value("smtp.gmail.com")
	public void setHost(String host) {
		this.host = host;
	}


	public int getPort() {
		return port;
	}

	@Value("587")
	public void setPort(int port) {
		this.port = port;
	}


	public String getUsername() {
		return username;
	}

	@Value("hdeveliya483@gmail.com")
	public void setUsername(String username) {
		this.username = username;
	}


	public String getPassword() {
		return password;
	}

	@Value("harrya123")
	public void setPassword(String password) {
		this.password = password;
	}


	public String getFrom() {
		return from;
	}

	@Value("hdeveliya483@gmail.com")
	public void setFrom(String from) {
		this.from = from;
	}


	public String getSubjectPrefix() {
		return subjectPrefix;
	}

	@Value(" ")
	public void setSubjectPrefix(String subjectPrefix) {
		this.subjectPrefix = subjectPrefix;
	}

	public boolean isSecure() {
		return secure;
	}

	@Value("true")
	public void setSecure(boolean secure) {
		this.secure = secure;
	}
	
	
}
