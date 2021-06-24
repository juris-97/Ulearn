package pl.edu.ug.ulearn.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.edu.ug.ulearn.exception.CourseNotFoundException;
import pl.edu.ug.ulearn.model.Course;
import pl.edu.ug.ulearn.repo.CourseRepo;

import java.util.Comparator;
import java.util.List;
import java.util.UUID;

@Service
public class CourseService {
    private final CourseRepo courseRepo;

    @Autowired
    public CourseService(CourseRepo courseRepo){
        this.courseRepo = courseRepo;
    }

    public Course addCourse(Course course){
        course.setCourseCode(UUID.randomUUID().toString());
        return courseRepo.save(course);
    }

    public List<Course> findAllCourses(){
        return courseRepo.findAll();
    }

    public Course updateCourse(Course course){
        return courseRepo.save(course);
    }

    public Course findCourseById(Long id){
        return courseRepo.findCourseById(id)
                .orElseThrow(() -> new CourseNotFoundException("User by ID " + id + " was not found"));
    }

    public List<Course> sortCourseByPriceAscending(){
        List<Course> sortedCourses = courseRepo.findAll();
        sortedCourses.sort(new Comparator<Course>() {
            @Override
            public int compare(Course course, Course t1) {
                return Double.compare(course.getPrice(), t1.getPrice());
            }
        });

        return sortedCourses;
    }

    public void deleteCourse(Long id){
        courseRepo.deleteCourseById(id);
    }
}
