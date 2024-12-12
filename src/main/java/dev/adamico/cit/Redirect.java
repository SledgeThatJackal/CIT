package dev.adamico.cit;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping
public class Redirect {
    @RequestMapping("/{path:[^\\.]+}/**")
    public String forward() {
        return "forward:/index.html";
    }

    @RequestMapping("/login")
    public String forwardLogin(){
        return "forward:/index.html";
    }
}
