package com.todo.list.service;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.todo.list.dto.RequestDto;
import com.todo.list.dto.ResponseDto;
import com.todo.list.mapper.TaskMapper;
import com.todo.list.model.Task;
import com.todo.list.repository.TextRepo;

@Service
public class TaskServiceImp implements TaskService{

  private TextRepo repo ;
  private TaskMapper mapper;

  public TaskServiceImp(TextRepo repo , TaskMapper mapper){
    this.repo=repo;
    this.mapper = mapper;
  }


  @Override
  public List<ResponseDto> getAllTask() {
    return repo.findAll()
            .stream()
            .map(mapper::toDto)
            .toList();
  }

  @Override
  public ResponseDto createNewTask(RequestDto dto) {
    
   Task task = mapper.toEntity(dto);
   Task saved = repo.save(task);

   return mapper.toDto(saved);
  }

  @Override
  public ResponseDto updateExitsTask(Long id, RequestDto dto) {
   Task existing =  repo.findById(id).orElseThrow(() -> new RuntimeException("List id: " +id + " does not exists"));

   existing.setText(dto.getText());
   existing.setCompleted(dto.isCompleted());
   
   mapper.toEntity(dto);
   Task updated = repo.save(existing);
   
   return mapper.toDto(updated);
  }

  @Override
  public ResponseEntity<Void> deleteTask(Long id) {
  if (!repo.existsById(id)) {
    return ResponseEntity.notFound().build();
  }

  repo.deleteById(id);
  return ResponseEntity.noContent().build();
  }
  
}
