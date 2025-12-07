package com.todo.list.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.todo.list.dto.RequestDto;
import com.todo.list.dto.ResponseDto;

public interface TaskService {
  
   List<ResponseDto> getAllTask();

   ResponseDto createNewTask(RequestDto dto);

   ResponseDto updateExitsTask(Long id , RequestDto dto );

   ResponseEntity<Void> deleteTask(Long id);
  
}
