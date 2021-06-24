package pl.edu.ug.ulearn.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.edu.ug.ulearn.model.Course;

import java.util.List;
import java.util.Optional;

public interface CourseRepo extends JpaRepository<Course, Long> {
    void deleteCourseById(Long id);

    Optional<Course> findCourseById(Long id);
}
