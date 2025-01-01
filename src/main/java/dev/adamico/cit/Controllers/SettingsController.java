package dev.adamico.cit.Controllers;

import dev.adamico.cit.Models.Setting;
import dev.adamico.cit.Services.SettingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/settings")
public class SettingsController {
    @Autowired
    private SettingService settingsService;

    @GetMapping
    private List<Setting> findAllSettings(){
        return settingsService.findAll();
    }

    @GetMapping("/id")
    private Setting findSettingById(@RequestParam Long id){
        return settingsService.findById(id);
    }

    @GetMapping("/key")
    private String findValueByKey(@RequestParam String key){
        return settingsService.findByKey(key);
    }

    @PutMapping("/edit")
    private void updateSetting(@RequestParam String key, @RequestParam String value){
        settingsService.updateSettingByKey(key, value);
    }
}
