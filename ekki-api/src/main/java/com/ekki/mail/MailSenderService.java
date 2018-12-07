package com.ekki.mail;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class MailSenderService {

	@Autowired
	private JavaMailSender mailSender;

	public void sendSimpleMail(SimpleMail mail) {
		ExecutorService executorService = Executors.newSingleThreadExecutor();
		executorService.execute(() -> {
			SimpleMailMessage message = new SimpleMailMessage();

			message.setTo(mail.getTo());
			message.setReplyTo(mail.getReplyTo());
			message.setSubject(mail.getSubject());
			message.setText(mail.getContent());

			mailSender.send(message);
		});
	}

	public void sendHTMLMail(SimpleMail mail) {
		ExecutorService executorService = Executors.newSingleThreadExecutor();
		executorService.execute(() -> {
			try {
				MimeMessage message = mailSender.createMimeMessage();
				MimeMessageHelper helper = new MimeMessageHelper(message, false, "utf-8");

				helper.setTo(mail.getTo());
				helper.setSubject(mail.getSubject());
				helper.setFrom(new InternetAddress("auto@ekki.com", "Ekki"));
				message.setContent(mail.getContent(), "text/html");

				mailSender.send(message);
			} catch (Exception e) {
				e.printStackTrace();
			}
		});
	}

}
