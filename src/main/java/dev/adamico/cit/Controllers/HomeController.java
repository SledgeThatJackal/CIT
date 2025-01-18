package dev.adamico.cit.Controllers;

import dev.adamico.cit.Models.Home;
import dev.adamico.cit.Services.HomeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/home")
public class HomeController {
    @Autowired
    private HomeService homeService;

    @GetMapping
    public Home getHome(){
        return homeService.getHome();
    }
}
