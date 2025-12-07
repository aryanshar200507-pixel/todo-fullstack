package com.todo.list.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.todo.list.dto.RequestDto;
import com.todo.list.dto.ResponseDto;
import com.todo.list.model.Task;

@Mapper(componentModel = "spring")
public interface TaskMapper{
  

  ResponseDto toDto(Task task);

  @Mapping(target = "id", ignore = true)
  Task toEntity(RequestDto dto);


}
