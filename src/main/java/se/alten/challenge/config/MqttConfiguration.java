package se.alten.challenge.config;


import java.util.Iterator;

import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.integration.annotation.ServiceActivator;
import org.springframework.integration.annotation.Splitter;
import org.springframework.integration.channel.DirectChannel;
import org.springframework.integration.channel.PublishSubscribeChannel;
import org.springframework.integration.endpoint.MessageProducerSupport;
import org.springframework.integration.mqtt.core.DefaultMqttPahoClientFactory;
import org.springframework.integration.mqtt.core.MqttPahoClientFactory;
import org.springframework.integration.mqtt.inbound.MqttPahoMessageDrivenChannelAdapter;
import org.springframework.integration.mqtt.support.DefaultPahoMessageConverter;
import org.springframework.integration.splitter.AbstractMessageSplitter;
import org.springframework.integration.support.MessageBuilder;
import org.springframework.integration.websocket.ServerWebSocketContainer;
import org.springframework.integration.websocket.outbound.WebSocketOutboundMessageHandler;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.MessageHandler;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;

@Configuration
public class MqttConfiguration {
	
	@Autowired
	Environment env;
	
	@Bean
	public ServerWebSocketContainer serverWebSocketContainer() {
		return new ServerWebSocketContainer("/socket").withSockJs();
	}
	
	
	@Bean
	@ServiceActivator(inputChannel = "splitChannel")
	public MessageHandler webSocketOutboundAdapter() {
		return new WebSocketOutboundMessageHandler(serverWebSocketContainer());
	}
	
	
	@Bean
	public MessageChannel messageChannel() {
		return new PublishSubscribeChannel();
	}
	
	@Bean
	public MessageChannel splitChannel() {
		return new DirectChannel();
	}
	
	@Bean 
	@Splitter(inputChannel="messageChannel")
	public SessionIdSplitter sessionIdSplitter() {
		
		SessionIdSplitter splitter = new SessionIdSplitter();
		splitter.setOutputChannel(splitChannel());
		return splitter;
	}
	
	@Bean
	public MqttPahoClientFactory mqttClientFactory() {
		DefaultMqttPahoClientFactory factory = new DefaultMqttPahoClientFactory();
		MqttConnectOptions options = new MqttConnectOptions();
		options.setServerURIs(new String[] { env.getProperty("MQTT_BROKER_URI") });
		factory.setConnectionOptions(options);
		return factory;
	}
	
	@Bean
	public MessageProducerSupport mqttInbound() {
		MqttPahoMessageDrivenChannelAdapter adapter = new MqttPahoMessageDrivenChannelAdapter("VehicleDataStream",
				mqttClientFactory(), "states/#");
		adapter.setCompletionTimeout(5000);
		adapter.setConverter(new DefaultPahoMessageConverter());
		adapter.setQos(1);
		adapter.setOutputChannel(messageChannel());
		return adapter;
	}
	
	
	public class SessionIdSplitter extends AbstractMessageSplitter {

		@Override
		protected Object splitMessage(Message<?> message) {
			
			 
			 final Iterator<String> iterator = serverWebSocketContainer().getSessions().keySet().iterator();
			
			 Iterator<MessageBuilder<?>> builderIterator = new Iterator<MessageBuilder<?>>() {

				@Override
				public boolean hasNext() {
					return iterator.hasNext();
				}

				@Override
				public MessageBuilder<?> next() {
					String sessionId = iterator.next();
				    return MessageBuilder.fromMessage(message).setHeader(SimpMessageHeaderAccessor.SESSION_ID_HEADER, sessionId);
				}
				 
			 };
			
			return builderIterator;
		}
		
	}

}
