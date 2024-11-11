package dev.adamico.cit.Services;

import dev.adamico.cit.Repositories.ItemAttributeRepository;
import dev.adamico.cit.Repositories.TypeAttributeRepository;
import dev.adamico.cit.Repositories.TypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TypeService {
    @Autowired
    private TypeRepository typeRepository;

    @Autowired
    private TypeAttributeRepository typeAttributesRepository;

    @Autowired
    private ItemAttributeRepository itemAttributeRepository;

}
