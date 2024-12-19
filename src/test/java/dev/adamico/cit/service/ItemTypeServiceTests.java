package dev.adamico.cit.service;

import dev.adamico.cit.Models.ItemType;
import dev.adamico.cit.Repositories.ItemTypeRepository;
import dev.adamico.cit.Services.ItemTypeService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static dev.adamico.cit.mock.ItemTypeEntityMocks.getItemType;

@ExtendWith(MockitoExtension.class)
public class ItemTypeServiceTests {
    @Mock
    private ItemTypeRepository itemTypeRepository;

    @InjectMocks
    private ItemTypeService itemTypeService;

    Long id = 1L;
    ItemType entityMock = getItemType();

    @Test
    void findItemTypeById(){
        Mockito.when(itemTypeRepository.findById(id)).thenReturn(Optional.of(entityMock));

        ItemType result = itemTypeService.findById(id).orElse(null);

        Assertions.assertNotNull(result);
        Assertions.assertEquals(id, result.getId());
        Assertions.assertEquals("Cable", result.getName());
    }

    @Test
    void findItemTypeById_whenItemTypeDoesNotExist(){
        Mockito.when(itemTypeRepository.findById(id)).thenReturn(Optional.empty());

        ItemType result = itemTypeService.findById(id).orElse(null);

        Assertions.assertNull(result);
    }
}
