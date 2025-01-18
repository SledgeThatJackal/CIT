package dev.adamico.cit.Services;

import dev.adamico.cit.Models.Home;
import dev.adamico.cit.Repositories.ContainerRepository;
import dev.adamico.cit.Repositories.ItemRepository;
import dev.adamico.cit.Repositories.ItemTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class HomeService {
    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private ContainerRepository containerRepository;

    @Autowired
    private ItemTypeRepository itemTypeRepository;

    public Home getHome(){
        return new Home(containerRepository.count(), itemRepository.count(), itemRepository.findItemTypesAndCounts());
    }
}
