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

    @Scheduled(cron = "0 0 0 * * ?")
    public void runAtMidnight() {
        LocalDate currentDate = LocalDate.now();

        String dateParam = currentDate.toString();

        try {
            SemesterRepo.updateSemesterName(dateParam);
            System.out.println("Stored procedure executed successfully with date: " + dateParam);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
