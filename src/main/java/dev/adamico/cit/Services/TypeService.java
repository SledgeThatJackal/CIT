package dev.adamico.cit.Services;

import dev.adamico.cit.Models.Type;
import dev.adamico.cit.Repositories.TypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TypeService {
    @Autowired
    private TypeRepository typeRepository;

    public Type findTypeById(Long id){
        return typeRepository.findById(id).orElse(null);
    }

    public List<Type> findAllTypes(){
        return typeRepository.findAll();
    }

    public Type saveType(Type type){
        return typeRepository.save(type);
    }

    public void deleteType(Long id){
        typeRepository.deleteById(id);
    }
}
