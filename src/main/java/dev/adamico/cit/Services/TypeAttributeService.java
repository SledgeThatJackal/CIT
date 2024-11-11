package dev.adamico.cit.Services;

import dev.adamico.cit.Models.TypeAttribute;
import dev.adamico.cit.Repositories.TypeAttributeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TypeAttributeService {
    @Autowired
    private TypeAttributeRepository typeAttributesRepository;

    public List<TypeAttribute> findAll(){
        return typeAttributesRepository.findAll();
    }

    public List<TypeAttribute> findByTypeId(Long id){
        return typeAttributesRepository.findByTypeId(id);
    }

    public void saveTypeAttribute(TypeAttribute typeAttribute){
        typeAttributesRepository.save(typeAttribute);
    }

    public void deleteTypeAttribute(Long id){
        typeAttributesRepository.deleteById(id);
    }
}
