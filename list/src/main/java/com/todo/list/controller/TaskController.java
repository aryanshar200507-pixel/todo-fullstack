package com.todo.list.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.todo.list.dto.RequestDto;
import com.todo.list.dto.ResponseDto;
import com.todo.list.service.TaskServiceImp;

import jakarta.validation.Valid;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/task")
public class TaskController {
  
  private final TaskServiceImp serviceImp;

  public TaskController(TaskServiceImp serviceImp){
    this.serviceImp = serviceImp;
  }

  @GetMapping()
  public List<ResponseDto> getall(){
    return serviceImp.getAllTask();
  }

  @PostMapping("/text")
  public ResponseDto createTask(@RequestBody RequestDto dto){
    return serviceImp.createNewTask(dto);
  }

  @PutMapping("/edit/{id}")
  public ResponseDto updateTask(@Valid @PathVariable Long id , @RequestBody RequestDto dto){
    return serviceImp.updateExitsTask(id, dto);
  }

  @DeleteMapping("/delete/{id}")
  public ResponseEntity<Void> delete(@Valid @PathVariable Long id){
    return serviceImp.deleteTask(id);
  }
}
