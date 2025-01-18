package dev.adamico.cit.Controllers;

import com.fasterxml.jackson.annotation.JsonView;
import dev.adamico.cit.Models.Setting;
import dev.adamico.cit.Services.SettingService;
import dev.adamico.cit.Views;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/settings")
public class SettingsController {
    @Autowired
    private SettingService settingsService;

    @GetMapping
    @JsonView(Views.Basic.class)
    private List<Setting> findAllSettings(){
        return settingsService.findAll();
    }

    @GetMapping("/id")
    @JsonView(Views.Basic.class)
    private Setting findSettingById(@RequestParam Long id){
        return settingsService.findById(id);
    }

    @GetMapping("/key")
    @JsonView(Views.Basic.class)
    private String findValueByKey(@RequestParam String key){
        return settingsService.findByKey(key);
    }

    @PutMapping("/edit")
    private void updateSetting(@RequestBody Map<String, String>  payload){
        settingsService.updateSettingByKey(payload.get("key"), payload.get("value"));
    }
}
