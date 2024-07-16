package dev.adamico.cit.Services;

import dev.adamico.cit.Repositories.TypeAttributeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TypeAttributeService {
    @Autowired
    private TypeAttributeRepository typeAttributeRepository;
}
