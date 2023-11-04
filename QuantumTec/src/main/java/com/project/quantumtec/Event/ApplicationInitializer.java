package com.project.quantumtec.Event;

import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
public class ApplicationInitializer {

    @EventListener
    public void onApplicationEvent(ContextRefreshedEvent event) {
        
    }
}
