package edu.cit.onlinegrocerysystem.service;

import edu.cit.onlinegrocerysystem.model.DeliveryLog;
import edu.cit.onlinegrocerysystem.repository.DeliveryLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DeliveryLogService {
    @Autowired
    private DeliveryLogRepository deliveryLogRepository;

    public DeliveryLog addLog(DeliveryLog log) {
        return deliveryLogRepository.save(log);
    }

    public List<DeliveryLog> getLogsForOrder(Long deliveryOrderId) {
        return deliveryLogRepository.findByDeliveryOrderIdOrderByTimestampAsc(deliveryOrderId);
    }
} 