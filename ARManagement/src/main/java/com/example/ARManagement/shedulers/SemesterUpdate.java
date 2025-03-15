package com.example.ARManagement.shedulers;

import com.example.ARManagement.repository.SemesterRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import java.time.LocalDate;

@Component
public class SemesterUpdate {

    @Autowired
    private SemesterRepo SemesterRepo;

    // Cron expression for running at midnight every day
    @Scheduled(cron = "0 0 0 * * ?")  // This cron expression runs the task at midnight every day
    public void runAtMidnight() {
        // Get today's date dynamically
        LocalDate currentDate = LocalDate.now();

        // Convert LocalDate to String (yyyy-MM-dd) for the stored procedure
        String dateParam = currentDate.toString();  // Today's date in 'yyyy-MM-dd' format

        // Call the stored procedure through the repository
        try {
            SemesterRepo.updateSemesterName(dateParam);
            System.out.println("Stored procedure executed successfully with date: " + dateParam);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
