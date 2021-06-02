package com.licenta.socialmedia.configuration;

import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.util.MultiValueMap;

public class RmeSessionChannelInterceptor implements ChannelInterceptor {

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        final StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(message);
        final StompCommand command = headerAccessor.getCommand();
        if (command != null) {
            switch (command) {
                case CONNECTED:
                    final StompHeaderAccessor accessor = StompHeaderAccessor.create(headerAccessor.getCommand());
                    accessor.setSessionId(headerAccessor.getSessionId());
                    @SuppressWarnings("unchecked") final MultiValueMap<String, String> nativeHeaders = (MultiValueMap<String, String>) headerAccessor.getHeader(StompHeaderAccessor.NATIVE_HEADERS);
                    accessor.addNativeHeaders(nativeHeaders);

                    // add custom headers
                    accessor.addNativeHeader("CUSTOM01", "CUSTOM01");

                    final Message<?> newMessage = MessageBuilder.createMessage(new byte[0], accessor.getMessageHeaders());
                    return newMessage;
                default:
                    break;
            }
        }
        return message;
    }
}