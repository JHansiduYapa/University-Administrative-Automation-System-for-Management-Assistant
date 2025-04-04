package BatchControllerTest;

import com.example.ARManagement.controller.BatchController;
import com.example.ARManagement.entity.Batch;
import com.example.ARManagement.service.BatchService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Arrays;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.hamcrest.Matchers.*;

public class BatchControllerTest {

    private MockMvc mockMvc;

    @Mock
    private BatchService batchService;

    @InjectMocks
    private BatchController batchController;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(batchController).build();
    }

    @Test
    public void testGetBatches() throws Exception {
        // Prepare mock data
        Batch batch1 = new Batch();
        // Note: Use the actual field setter methods from your Batch class
        // This is a generic example that should be adapted to your actual Batch structure

        Batch batch2 = new Batch();
        // Set properties for batch2

        List<Batch> mockBatches = Arrays.asList(batch1, batch2);

        // Mock service behavior
        when(batchService.allBatches()).thenReturn(mockBatches);

        // Perform GET request and verify response
        mockMvc.perform(get("/api/batch/")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

        // Verify service method was called once
        verify(batchService, times(1)).allBatches();
    }

    @Test
    public void testTestingEndpoint() throws Exception {
        // Perform GET request and verify response
        mockMvc.perform(get("/api/batch/test")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", is("test pass")));
    }

    @Test
    public void testAddBatch() throws Exception {
        // Prepare mock data
        Batch newBatch = new Batch();
        // Set properties for newBatch

        // Mock service behavior
        when(batchService.addBatch(any(Batch.class))).thenReturn(newBatch);

        // Perform POST request and verify response
        mockMvc.perform(post("/api/batch/add")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{}")) // Add appropriate JSON content based on your Batch structure
                .andExpect(status().isOk());

        // Verify service method was called once with correct parameters
        verify(batchService, times(1)).addBatch(any(Batch.class));
    }
}
