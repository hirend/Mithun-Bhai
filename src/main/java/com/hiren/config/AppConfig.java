package com.hiren.config;

import java.sql.SQLException;
import java.util.List;
import java.util.Properties;

import javax.persistence.EntityManagerFactory;

import org.apache.commons.dbcp.BasicDataSource;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowire;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.orm.hibernate4.HibernateTransactionManager;
import org.springframework.orm.hibernate4.LocalSessionFactoryBuilder;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.view.InternalResourceViewResolver;
import org.springframework.web.servlet.view.JstlView;

@EnableWebMvc
@Configuration
@ComponentScan({ "com.hiren.*" })
@EnableTransactionManagement
@Import({ SecurityConfig.class })
public class AppConfig extends WebMvcConfigurerAdapter {

	protected EntityManagerFactory entityManagerFactory;
	protected JpaTransactionManager transactionManager;
	
	@Bean
    public SessionFactory sessionFactory() {
        LocalSessionFactoryBuilder builder = new LocalSessionFactoryBuilder(dataSource());
        builder
        	.scanPackages("com.hiren.users.model")
            .addProperties(getHibernateProperties());

        return builder.buildSessionFactory();
    }
		

	private Properties getHibernateProperties() {
        Properties prop = new Properties();
        prop.put("hibernate.format_sql", "true");
        prop.put("hibernate.show_sql", "true");
        prop.put("hibernate.dialect", "org.hibernate.dialect.MySQL5Dialect");
        return prop;
    }
	
	@Bean(name = "entityManagerFactory", autowire = Autowire.BY_NAME)
    public EntityManagerFactory entityManagerFactory() throws SQLException {
        if (entityManagerFactory == null) {
            final LocalContainerEntityManagerFactoryBean emFactoryBean = new LocalContainerEntityManagerFactoryBean();
            emFactoryBean.setDataSource(dataSource());

            emFactoryBean.setPackagesToScan("com.hiren.users.model","com.hiren.customer.model");

            HibernateJpaVendorAdapter hibernateJpaVendorAdapter = new HibernateJpaVendorAdapter();
            hibernateJpaVendorAdapter.setShowSql(true);
            hibernateJpaVendorAdapter.setDatabasePlatform("org.hibernate.dialect.SQLServerDialect");
            hibernateJpaVendorAdapter.setGenerateDdl(false);
            emFactoryBean.setJpaVendorAdapter(hibernateJpaVendorAdapter);

            emFactoryBean.afterPropertiesSet();
            entityManagerFactory = emFactoryBean.getObject();
        }
        return entityManagerFactory;
    }
	
	 @Bean(name = "transactionManager", autowire = Autowire.BY_NAME)
	    public JpaTransactionManager transactionManager() throws SQLException {
	        if (transactionManager == null) {
	            transactionManager = new JpaTransactionManager(entityManagerFactory());
	            transactionManager.afterPropertiesSet();
	        }
	        return transactionManager;
	    }
	
	@Bean(name = "dataSource")
	public BasicDataSource dataSource() {
		
		BasicDataSource ds = new BasicDataSource();
	    ds.setDriverClassName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
		ds.setUrl("jdbc:sqlserver://localhost\\sqlexpress");
		ds.setUsername("mc_login");
		ds.setPassword("mc123");
		return ds;
	}	
		
	@Bean
	public InternalResourceViewResolver viewResolver() {
		InternalResourceViewResolver viewResolver = new InternalResourceViewResolver();
		viewResolver.setViewClass(JstlView.class);
		viewResolver.setPrefix("/WEB-INF/pages/");
		viewResolver.setSuffix(".jsp");
		return viewResolver;
	}
	
	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/static/**").addResourceLocations("/static/");
        registry.addResourceHandler("/app/**").addResourceLocations("/app/");
    }
	
}