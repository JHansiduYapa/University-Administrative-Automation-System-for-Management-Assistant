package com.example.ARManagement.tests;

import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import org.testng.Assert;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;

import static io.restassured.RestAssured.*;

public class SemesterControllerTest {

    @BeforeClass
    public void setup() {
        RestAssured.baseURI = "http://localhost:8080/api/semester";
    }

    @Test
    public void testGetSemesters() {
        given()
                .when().get("/")
                .then().statusCode(200);
    }

    @Test
    public void testAddSemester() {
        String semesterJson = "{ \"id\": 1, \"name\": \"Spring 2025\" }";

        String response = given()
                .contentType(ContentType.JSON)
                .body(semesterJson)
                .when()
                .post("/add")
                .then()
                .statusCode(200)
                .extract().asString();

        Assert.assertTrue(response.contains("Spring 2025"), "Semester not added correctly!");
    }

    @Test
    public void testTestingEndpoint() {
        String response = given()
                .when().get("/test")
                .then().statusCode(200)
                .extract().asString();

        Assert.assertEquals(response, "test pass", "Test endpoint failed!");
    }
}
