package pl.edu.ug.ulearn.model;

import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Setter
@Getter
@ToString
@EqualsAndHashCode
@Entity
public class Course implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, unique = false)
    private Long id;

    private String courseTitle;
    private String courseDescription;
    private String courseTag;

    private double price;
    private int parts;
    private int exercises;
    private String imageUrl;

    @Column(nullable = false, unique = false)
    private String courseCode;
}
