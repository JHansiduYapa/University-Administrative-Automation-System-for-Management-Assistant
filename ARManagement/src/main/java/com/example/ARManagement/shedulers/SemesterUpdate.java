//package com.example.ARManagement.shedulers;
//
//import com.example.ARManagement.entity.Batch;
//import com.example.ARManagement.repository.BatchRepository;
//import com.example.ARManagement.repository.SemesterRepository;
//import com.example.ARManagement.entity.Semester;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.scheduling.annotation.Scheduled;
//import org.springframework.stereotype.Component;
//import java.time.LocalDate;
//import java.util.List;
//
//@Component
//public class SemesterUpdate {
//
//    @Autowired
//    private SemesterRepository semesterRepo;
//
//    @Autowired
//    private BatchRepository batchRepository;
//
//    @Scheduled(cron = "0 0 0 * * ?") // Runs daily at midnight
//    public void runAtMidnight() {
//        try {
//            List<Batch> batches = batchRepository.findAll();
//            boolean updated = false;
//
//            for (Semester semester : semesters) {
//                if (!semester.getEndDate().isAfter(LocalDate.now())) {
//                    semester.setSemesterNumber(semester.getSemesterNumber() + 1);
//                    updated = true;
//                }
//            }
//            if (updated) {
//                semesterRepo.saveAll(semesters); // Save all updated semesters
//                System.out.println("Semester numbers updated successfully on: " + LocalDate.now());
//            } else {
//                System.out.println("No semesters required updating on: " + LocalDate.now());
//            }
//        } catch (Exception e) {
//            System.err.println("Error updating semester numbers: " + e.getMessage());
//            e.printStackTrace();
//        }
//    }
//}
