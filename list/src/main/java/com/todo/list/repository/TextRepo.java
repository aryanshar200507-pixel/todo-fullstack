package com.todo.list.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.todo.list.model.Task;

public interface TextRepo extends JpaRepository<Task , Long> {

}
