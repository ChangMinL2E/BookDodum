package com.sasatech.bookdodum.repository;

import com.sasatech.bookdodum.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User getByUserid(String userid);


    User findByUserid(String userid);

    Boolean existsByName(String name);

    Boolean existsByUserid(String userid);
}
