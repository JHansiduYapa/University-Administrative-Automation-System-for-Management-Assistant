package com.example.ARManagement.service;

import com.example.ARManagement.dto.BatchDTO;
import com.example.ARManagement.entity.Batch;
import com.example.ARManagement.repository.BatchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.time.LocalDate;

@Service
public class BatchService{

    @Autowired
    private BatchRepository batchRepository;

    public List<BatchDTO> getAllBatches() {
        List<Batch> batches = batchRepository.findAll();
        System.out.print(batches.toString());
        return batches.stream().map(this::convertEntityToDTO).collect(Collectors.toList());
    }


    public BatchDTO createBatch(BatchDTO batchDTO) {
        // Convert DTO to entity
        Batch batch = new Batch();
        batch.setBatchName(batchDTO.getBatchName());

        // Assuming the frontend sends a proper date string (or you can customize date conversion)
        batch.setRegDate(batchDTO.getRegDate() != null ? batchDTO.getRegDate() : LocalDate.now());
        batch.setStudentCount(batchDTO.getStudentCount());

        Batch savedBatch = batchRepository.save(batch);
        return convertEntityToDTO(savedBatch);
    }

    // Conversion methods
    private BatchDTO convertEntityToDTO(Batch batch) {
        return new BatchDTO(
                batch.getBatchId(),
                batch.getBatchName(),
                batch.getRegDate(),
                batch.getStudentCount()
        );
    }
}
