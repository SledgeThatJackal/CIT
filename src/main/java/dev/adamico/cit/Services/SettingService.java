package dev.adamico.cit.Services;

import dev.adamico.cit.Models.Setting;
import dev.adamico.cit.Repositories.SettingsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class SettingService {
    @Autowired
    private SettingsRepository settingsRepository;

    public List<Setting> findAll(){
        return settingsRepository.findAll();
    }

    public Setting findById(Long id){
        return settingsRepository.findById(id).orElseThrow();
    }

    public String findByKey(String key){
        return settingsRepository.findValueByKey(key).orElseThrow();
    }

    @Transactional
    public void updateSettingByKey(String key, String value){
        settingsRepository.updateValueByKey(key, value);
    }
}
