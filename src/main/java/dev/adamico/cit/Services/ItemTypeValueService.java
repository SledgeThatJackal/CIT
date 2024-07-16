package dev.adamico.cit.Services;

import dev.adamico.cit.Repositories.ItemTypeValueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ItemTypeValueService {
    @Autowired
    private ItemTypeValueRepository itemTypeValueRepository;
}
